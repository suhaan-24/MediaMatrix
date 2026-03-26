# MediaMatrix — Digital Asset Management

MediaMatrix is a professional-grade Digital Asset Management (DAM) platform, designed for seamless uploading, organizing, and discovering high-quality digital assets.

## 🚀 Key Features
- **Smart Search**: Powered by ElasticSearch for lightning-fast, relevant results.
- **Cloud Storage**: Integrated with Firebase Cloud Storage for secure and scalable media hosting.
- **Dynamic Organization**: Folder-based asset management system.
- **Full-Stack Performance**: React frontend with a robust Node.js/Express backend.
- **Secure Authentication**: JWT-based user login and registration.

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express, Mongoose (MongoDB)
- **Infrastructure**: Firebase Admin SDK (Storage), ElasticSearch (Search Index)

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Firebase Project (for Storage)
- ElasticSearch (Local or Cloud)

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
# Edit .env with your MongoDB, JWT, Firebase, and ElasticSearch credentials
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
# Edit .env with your VITE_API_URL and VITE_BACKEND_URL
npm run dev
```

---

## 📂 Project Structure
- `backend/src/`: Core backend logic (controllers, models, routes).
- `backend/scripts/`: Seed and utility scripts.
- `frontend/src/`: React application components and pages.
- `frontend/docs/`: Project documentation and original design mocks.

## 👥 Contributors
- **Suhaan** — Lead Backend Engineer (Auth, ElasticSearch, Infrastructure)
- **Abhay** — Lead Frontend Engineer (UX/UI, React Architecture, Firebase)

## 📄 License
This project is licensed under the MIT License.
