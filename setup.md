## 🧰 Project Setup Guide

This file documents the structure, environment, and testing philosophy of this backend API system.

---

### 🧱 Core Philosophy

> **"Plumbing must be simple and durable."**

This backend architecture is built on clarity, isolation, and complete testability.

---

### 🔧 Project Structure

* `/src/routes/public/` – public-facing APIs (users, messages, subscriptions, tcodes)
* `/src/routes/admin/` – admin-only APIs (protected by `x-admin-secret`)
* `/src/middleware/requireAdmin.js` – shared-secret middleware for admin access
* `/mongo/` – all Mongoose models and schemas
* `/tests/` – internal Jest test stories
* `/tests/external/` – `.http` files for manual API sanity checks

---

### 🌍 Environments

* `.env` – used in dev mode (via `npm run dev`)
* `.env.test` – used only during `npm run test`

Required variables:

```
MONGO_URI=mongodb://127.0.0.1:27017/taleemDB
JWT_SECRET=your-jwt-secret
ADMIN_SECRET=workshop-super-secret
PORT=3000
```

---

### 🧪 Testing Modes

#### 🧬 Internal: Jest Stories

Run with:

```bash
npm run test
```

This runs:

* story-based tests (e.g. register → login → me)
* admin flows (send → edit → delete message)
* token and access control

#### 🧾 External: REST Client (manual .http)

Use `.http` files in `tests/external/` folder.
Click "Send Request" in VS Code with REST Client plugin.

This allows instant:

* Public API testing (register/login/send)
* Admin API access (secret-based)
* Testing **without .env switching**

---

### 🧩 Testing Insights

* Each test uses its own email to avoid cross-test collisions
* Shared DB is reset using a custom `disconnectTestMongo()` helper
* `.env.test` isolates test DB from real data
* Admin API requires `x-admin-secret`, not login

---

### 🧠 Developer Realization

> "This project reached clarity when a single `.http` file revealed everything."

You don’t need Postman. You don’t need complex login UIs. You don’t need setup scripts.

If your `.http` file works → your backend is working.

---

### ✅ Core Stories Implemented

| Story                          | Status |
| ------------------------------ | ------ |
| User register → login          | ✅      |
| User send message              | ✅      |
| Admin read/edit/delete message | ✅      |
| User fetch own profile         | ✅      |

---

### 🚪 Future Stories (Optional)

* Admin: Create/update/delete tcodes
* Admin: Grant subscription to user
* User: Check access to a tcode
* Tcode: Fetch lesson content

---

### 🧾 Last Words

> When the architecture is right, testing becomes reading.
