# Contributing to MediaMatrix

## Team
| Name | Role | GitHub |
|---|---|---|
| Suhaan Raqeeb Khavas | Backend, Auth, ElasticSearch | @suhaan-24 |
| Abhay Goudannavar | Frontend, Database Design, Firebase | @abhay-username |

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Firebase account
- Git

### Local Setup

**1. Clone the repo**
```bash
git clone https://github.com/suhaan-24/MediaMatrix.git
cd MediaMatrix
```

**2. Backend setup**
```bash
cd server
npm install
cp .env.example .env
# Fill in your .env values
npm run dev
```

**3. Frontend setup**
```bash
cd client
npm install
cp .env.example .env
# Fill in your .env values
npm run dev
```

---

## Branch Strategy

We follow a simple feature branch workflow. **Never push directly to `main`.**

### Branch Naming
```
feat/feature-name       → New features
fix/bug-description     → Bug fixes
chore/task-description  → Setup, config, refactoring
docs/what-you-updated   → Documentation updates
```

### Examples
```
feat/auth-system
feat/elasticsearch-search
fix/upload-validation
chore/backend-setup
docs/api-documentation
```

---

## Workflow (Follow This Every Time)

```bash
# 1. Always start from an updated main
git checkout main
git pull origin main

# 2. Create your feature branch
git checkout -b feat/your-feature-name

# 3. Make your changes, commit regularly
git add .
git commit -m "feat: add JWT authentication middleware"

# 4. Push your branch
git push origin feat/your-feature-name

# 5. Open a Pull Request on GitHub into main
# 6. The other person reviews and approves before merging
```

---

## Commit Message Format

Follow this structure so the history stays readable:

```
type: short description in lowercase
```

### Types
| Type | When to Use |
|---|---|
| `feat` | Adding a new feature |
| `fix` | Fixing a bug |
| `chore` | Setup, installs, config changes |
| `docs` | README, comments, documentation |
| `refactor` | Code cleanup without behavior change |
| `test` | Adding or updating tests |

### Examples
```
feat: add user registration endpoint
fix: resolve multer file size validation error
chore: initialize express server and folder structure
docs: add API documentation for auth routes
refactor: extract token generation into helper function
test: add unit tests for RBAC middleware
```

---

## Pull Request Rules

- Every PR must be reviewed by the other team member before merging
- PR title should follow the same format as commit messages
- Add a short description of what you built and how to test it
- Link any related issue in the PR description
- Do not merge your own PR without the other person's approval

### PR Description Template
```
## What does this PR do?
Brief description of the changes.

## How to test?
Steps to verify the feature works.

## Screenshots (if UI related)
Add screenshots here.

## Checklist
- [ ] Code works locally
- [ ] No console errors
- [ ] .env.example updated if new env vars added
- [ ] No sensitive data committed
```

---

## Folder Ownership

To avoid constant conflicts, respect these ownership boundaries:

| Folder | Owner | Notes |
|---|---|---|
| `server/controllers/` | Suhaan | Backend logic |
| `server/routes/` | Suhaan | API route definitions |
| `server/middleware/` | Suhaan | Auth, role middleware |
| `server/services/` | Suhaan | ElasticSearch sync |
| `server/models/` | Both | Coordinate before changing schemas |
| `client/src/components/` | Abhay | UI components |
| `client/src/pages/` | Abhay | Page views |
| `client/src/api/` | Abhay | API call functions |
| `server/config/` | Both | Coordinate before changing |

---

## Environment Variables

**Never commit `.env` files.** Always update `.env.example` when you add a new variable (with a blank or placeholder value).

### server/.env.example
```
PORT=5000
MONGO_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
FIREBASE_BUCKET=
ELASTIC_URL=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### client/.env.example
```
VITE_API_BASE_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_PROJECT_ID=
```

---

## Communication

- Sync daily — even a 5-minute check-in to say what's done and what's blocked
- If you're changing a shared model or config file, tell the other person first
- Agree on API request/response shapes before Abhay builds UI for them
- Use GitHub Issues to track tasks and bugs

---

## Questions?

If you're stuck or need to make a decision that affects both sides of the codebase, open a GitHub Issue tagged `discussion` and tag the other person.
