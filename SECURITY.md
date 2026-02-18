# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| main (latest) | ✅ |
| feature branches | ❌ |

---

## Reporting a Vulnerability

If you discover a security vulnerability in MediaMatrix, please **do not open a public GitHub Issue**. Instead, report it directly to the team:

- **Suhaan Raqeeb Khavas** — suhaanrk73@gmail.com
- **Abhay Goudannavar** — abhaygoudnvr@gmail.com

Please include:
- A description of the vulnerability
- Steps to reproduce it
- Potential impact
- Any suggested fix (optional)

We will acknowledge your report within **48 hours** and aim to resolve confirmed vulnerabilities within **7 days**.

---

## Our Security Practices

### Authentication
- Passwords are hashed using **bcrypt** with a minimum salt round of 12
- Authentication is handled via **JWT (JSON Web Tokens)**
  - Access tokens expire in **15 minutes**
  - Refresh tokens expire in **7 days**
- Tokens are verified on every protected route using middleware

### Authorization
- **Role-Based Access Control (RBAC)** is enforced server-side on every request
- Roles: `admin`, `creator`, `editor`, `viewer`
- Frontend role checks are for UX only — the backend always makes the final decision
- Users can only access, edit, or delete assets they are authorized for

### File Uploads
- Only whitelisted MIME types are accepted (images, videos, audio, documents)
- File size limits are enforced per file type
- Files are stored in **Firebase Storage** — never on the server itself
- Original file names are never used directly — files are renamed with a timestamp prefix before storage
- Uploaded files are scanned for MIME type mismatch before processing

### Environment Variables
- All secrets (JWT keys, Firebase credentials, API keys) are stored in `.env` files
- `.env` files are listed in `.gitignore` and **must never be committed**
- `.env.example` is provided with blank placeholder values only
- Firebase service account JSON (`firebaseServiceAccount.json`) is also gitignored

### API Security
- **Helmet.js** is used to set secure HTTP headers on all responses
- **CORS** is configured to allow only trusted origins
- All inputs are validated and sanitized before processing
- Rate limiting is applied on auth endpoints to prevent brute force attacks
- Payment webhook signatures are verified using **HMAC SHA256** before processing

### Data Security
- Paid assets are served via pre-generated watermarked URLs only — original URLs are never exposed without purchase verification
- CloudFront CDN URLs for originals are signed and time-limited for authorized downloads
- MongoDB queries use parameterized inputs via Mongoose — no raw query strings

---

## What To Never Commit

The following must **never** be pushed to the repository under any circumstances:

```
.env
.env.local
firebaseServiceAccount.json
Any file containing API keys, secrets, or tokens
```

If you accidentally commit any of these:
1. **Immediately revoke/regenerate** the exposed key or secret from the relevant platform (Firebase, MongoDB Atlas, Razorpay, AWS)
2. Remove the file from Git history using `git filter-branch` or BFG Repo Cleaner
3. Force push the cleaned history
4. Notify the other team member immediately

---

## Dependency Security

- Run `npm audit` regularly on both `client/` and `server/`
- Fix critical and high severity vulnerabilities before merging to `main`
- Keep dependencies updated — do not leave packages unmaintained for more than 2 weeks

```bash
# Run in both /client and /server
npm audit
npm audit fix
```

---

## Known Limitations (Current Scope)

As this is a student OJT project, the following are acknowledged limitations:

- No automated vulnerability scanning (e.g. Snyk, Dependabot) is configured yet
- No penetration testing has been performed
- Two-factor authentication (2FA) is not implemented in the current version
- AI auto-tagging API calls are not sandboxed

These may be addressed in future iterations.
