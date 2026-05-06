# MediaMatrix — Digital Asset Management

🌐 **Live App: [https://media-matrix-one.vercel.app/](https://media-matrix-one.vercel.app/)**

MediaMatrix is a professional-grade Digital Asset Management (DAM) platform for seamless uploading, organizing, and discovering high-quality digital assets.

## Live Demo

| Service | URL |
|---------|-----|
| Frontend | [https://media-matrix-one.vercel.app/](https://media-matrix-one.vercel.app/) |
| Backend API | *(deploy to Render — see below)* |
| Health Check | `GET /api/health` |

---

## Key Features

- **Smart Search** — ElasticSearch-powered full-text search with MongoDB fallback
- **Cloud Storage** — Firebase Cloud Storage for secure, scalable media hosting
- **Folder Organization** — Hierarchical folder-based asset management
- **Authentication** — JWT-based login/register with role-based access control
- **Subscription Plans** — Razorpay-integrated payment flows
- **Analytics** — Built-in page-view and event tracking via `/api/analytics`
- **Performance** — HTTP compression, helmet security headers, Morgan request logging

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Tailwind CSS, Vite |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB (Atlas recommended) |
| Search | ElasticSearch (with MongoDB fallback) |
| Storage | Firebase Cloud Storage |
| Payments | Razorpay |
| Logging | Morgan (HTTP), console (app) |

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Browser (React)               │
│  Pages: Home / Search / Details / Subscription  │
│  Context: AuthContext, ToastContext              │
│  Analytics: trackPageView() on every route      │
└──────────────────┬──────────────────────────────┘
                   │ HTTPS (Axios / fetch)
┌──────────────────▼──────────────────────────────┐
│             Express API (Node.js)               │
│  Middleware: Helmet · Compression · Morgan       │
│  Routes: /auth /assets /search /folders         │
│          /payments /analytics /health            │
└────┬──────────────┬────────────────┬────────────┘
     │              │                │
┌────▼────┐  ┌──────▼──────┐  ┌─────▼──────┐
│ MongoDB │  │ElasticSearch│  │  Firebase  │
│ Atlas   │  │  (Search)   │  │  Storage   │
└─────────┘  └─────────────┘  └────────────┘
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Firebase project (for Storage)
- ElasticSearch (optional — app falls back to MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/MediaMatrix.git
cd MediaMatrix
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your credentials in .env
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Set VITE_API_URL and VITE_BACKEND_URL in .env
npm run dev
```

---

## Deployment

### Backend → Render

1. Create a new **Web Service** on [render.com](https://render.com)
2. Connect your GitHub repo, set **Root Directory** to `backend`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add all environment variables from `.env.example`
6. The `render.yaml` in the repo root pre-configures this for you

### Frontend → Vercel

1. Import the repo on [vercel.com](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Framework preset: **Vite**
4. Add environment variables:
   - `VITE_API_URL` = `https://your-render-url.onrender.com/api`
   - `VITE_BACKEND_URL` = `https://your-render-url.onrender.com`
5. The `vercel.json` handles SPA routing automatically

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Service health + DB/ES/Firebase status |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/me` | Get current user (protected) |
| GET | `/api/assets` | List assets (paginated, filterable) |
| POST | `/api/assets` | Upload a new asset |
| GET | `/api/search?q=&type=` | Full-text search |
| GET | `/api/folders` | List folders |
| POST | `/api/folders` | Create a folder |
| POST | `/api/payments/order` | Create Razorpay order |
| POST | `/api/analytics/track` | Track a page/event |
| GET | `/api/analytics/summary` | View analytics stats (protected) |

---

## Project Structure

```
MediaMatrix/
├── backend/
│   ├── src/
│   │   ├── config/         # DB, Firebase, ElasticSearch
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/     # Auth, upload
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routers
│   │   └── utils/          # Helpers
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar, UploadModal, ProtectedRoute
│   │   ├── context/        # AuthContext, ToastContext
│   │   ├── pages/          # Home, Search, Details, Subscription
│   │   └── utils/          # analytics.js
│   ├── vercel.json
│   └── .env.example
├── render.yaml
└── README.md
```

---

## Contributors

- **Suhaan** — Backend Engineering (Auth, ElasticSearch, Infrastructure, Analytics)
- **Abhay** — Frontend Engineering (UX/UI, React Architecture, Firebase)

## License

MIT
