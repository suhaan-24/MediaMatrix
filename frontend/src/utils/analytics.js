import { API_URL } from '../config';

export const trackEvent = async (event, page, metadata = {}) => {
  try {
    await fetch(`${API_URL}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, page, metadata }),
    });
  } catch {
    // analytics failure should never break the app
  }
};

export const trackPageView = (page) => trackEvent('page_view', page);
