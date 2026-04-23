import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Lazy init so dotenv has fully loaded before we read the keys
let _razorpay;
const getRazorpay = () => {
  if (!_razorpay) {
    _razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return _razorpay;
};

const razorpayErrMsg = (err) =>
  err?.error?.description || err?.message || JSON.stringify(err);

// Amounts in paise (1 INR = 100 paise)
const PLANS = {
  ondemand: { amount: 400000, name: 'On-Demand Pack (5 images)' },
  flex:     { amount: 240000, name: 'Flex Subscription (10 credits/mo)' },
  pro:      { amount: 1600000, name: 'Pro Volume (750 images/mo)' },
};

// POST /api/payments/create-order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { plan } = req.body;
    const planInfo = PLANS[plan];
    if (!planInfo) return res.status(400).json({ message: 'Invalid plan selected' });

    const order = await getRazorpay().orders.create({
      amount: planInfo.amount,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      notes: { userId: req.user._id.toString(), plan },
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      planName: planInfo.name,
      userName: req.user.name,
      userEmail: req.user.email,
    });
  } catch (err) {
    console.error('Razorpay order error:', razorpayErrMsg(err));
    res.status(500).json({ message: razorpayErrMsg(err) || 'Failed to create payment order' });
  }
});

// POST /api/payments/verify
router.post('/verify', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

    const expectedSig = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSig !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    await User.findByIdAndUpdate(req.user._id, {
      'subscription.plan': plan,
      'subscription.status': 'active',
      'subscription.stripeSessionId': razorpay_payment_id,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Payment verification error:', err.message);
    res.status(500).json({ message: 'Verification failed' });
  }
});

// GET /api/payments/subscription
router.get('/subscription', protect, async (req, res) => {
  const user = await User.findById(req.user._id).select('subscription');
  res.json({ success: true, subscription: user.subscription });
});

export default router;
