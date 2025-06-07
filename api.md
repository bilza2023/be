# 📘 Taleem API Overview (Unified)

> This document defines both the Public and Admin API surfaces for Taleem backend. It reflects the current working system with testable, verified flows.

---

## 🎓 Public API (Student-facing)

### 🔐 Auth

* `POST /users/register` — `{ email, password } → { token }`
* `POST /users/login` — `{ email, password } → { token }`
* `GET /users/me` — (auth required via `Bearer <token>`) → user info

---

### 📚 Tcodes

* `GET /tcodes/:id` — Fetch a specific lesson/question/slide by ID

---

### 💬 Messages

* `POST /messages` — Log a message from user/system

  * Auth required via `Authorization: Bearer <token>`
  * Sample: `{ senderType, content, tags, props }`

---

### 🧾 Subscription Check

* `GET /me/subscription?tcode=xyz` — Returns `{ access: true|false }`

  * Auth required via `Authorization: Bearer <token>`

---

## 🛠 Admin API (Workshop-facing)

> All admin routes require `x-admin-secret: workshop-super-secret` in headers.

### 📘 Tcodes

* `POST /admin/tcodes` — Create a new tcode entry
* `GET /admin/tcodes` — List/filter all tcodes
* `PUT /admin/tcodes/:id` — Update a tcode
* `DELETE /admin/tcodes/:id` — Remove a tcode

---

### 💬 Messages

* `GET /admin/messages` — View all messages (filterable)
* `PUT /admin/messages/:id` — Edit a message
* `DELETE /admin/messages/:id` — Delete a message

---

### 👥 Users

* `GET /admin/users` — List all registered users (email only)

---

### 🎟 Subscriptions

* `POST /admin/subscriptions` — Grant access to a user for a tcode
* `GET /admin/subscriptions` — List subscriptions
* `PUT /admin/subscriptions/:id` — Modify subscription
* `DELETE /admin/subscriptions/:id` — Remove access

---

## 📝 Notes

* All APIs use JSON for input/output
* Admin uses shared-secret access (`x-admin-secret`) — no user login
* User APIs require bearer token auth
* No role logic; access is defined by entry point (public vs admin)
* `.http` files and Jest tests validate all major routes

---

> This is the single source of truth for current Taleem backend routes.
> Ready to expand with schema examples or field-level docs when needed.
