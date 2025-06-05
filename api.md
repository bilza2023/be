# 📘 Taleem API Overview (Slim Draft)

> This is a temporary draft to visualize API surface. Covers both public and admin routes.

---

## 🎓 Public API (Student-facing)

### 🔐 Auth

* `POST /users/register` — `{ email, password } → { token }`
* `POST /users/login` — `{ email, password } → { token }`
* `GET /users/me` — (auth required) → user info

---

### 📚 Tcodes

* `GET /tcodes/:id` — Fetch a specific question/slide

---

### 💬 Messages

* `POST /messages` — Log user/system message

---

### 🧾 Subscription Check

* `GET /me/subscription?tcode=xyz` → `{ access: true }`

---

## 🛠 Admin API (Workshop-facing)

> All admin routes are protected via `x-admin-secret`
> All admin routes are simple REST apis -- some of the routes here are highlighted for explanation

### 📘 Tcodes

* `POST /admin/tcodes` — Bulk upsert array of content rows
* `GET /admin/tcodes` — View/search all tcodes (filtered)

### 💬 Messages

* `GET /admin/messages` — View logs/messages (optional filters)

### 👥 Users

* `GET /admin/users` — List all users

### 🎟 Subscriptions

* `POST /admin/subscriptions` — Grant access to a tcode for a user
* `GET /admin/subscriptions` — List subscriptions (basic filtering)

---

## 📝 Notes

* All REST routes use `restGenerator`
* All input/output is JSON
* No roles, no session-based logic

---

Ready to document payloads and schemas once routes stabilize
