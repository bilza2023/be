Excellent — your current API doc is already clear and well-structured. Now that your API is **fully tested and hardened**, let’s polish and **sync it with actual reality**, reflecting:

* Test coverage alignment
* Updated phrasing for clarity
* Small extras like `health check`, `error format`, and response headers

---

### 📘 Taleem API Overview (Final - Synced with Backend + Tests)

> This document defines both the Public and Admin API surfaces for the Taleem backend. Every route is backed by real test coverage. Use this as the definitive reference for developers or integrators.

---

## 🎓 Public API (Student-facing)

### 🔐 Auth

* `POST /users/register`
  → `{ email, password }` → `{ token }`

* `POST /users/login`
  → `{ email, password }` → `{ token }`

* `GET /users/me`
  → Requires `Authorization: Bearer <token>`
  → Returns `{ email, _id }` (excluding password)

---

### 📚 Tcodes

* `GET /tcodes/:id`
  → Fetch a tcode/lesson by ID
  → Returns full tcode object or `404`

---

### 💬 Messages

* `POST /messages`
  → Log a message from the user
  → Auth required via `Authorization: Bearer <token>`
  → `{ senderType, content, tags, props }`
  → Responds with created message

---

### 🧾 Subscription Check

* `GET /me/subscription?tcode=<id>`
  → Requires `Authorization: Bearer <token>`
  → Responds with `{ access: true }` or `{ access: false }`
  → `401` if no/invalid token

---

## 🛠 Admin API (Workshop-facing)

> All admin routes require header:
> `x-admin-secret: workshop-super-secret`

### 📘 Tcodes

* `POST /admin/tcodes`
  → Create a new tcode
  → `{ tcode, chapter, exercise, title, slug, sortOrder }`

* `GET /admin/tcodes`
  → List all tcodes (optional query filters)

* `PUT /admin/tcodes/:id`
  → Update tcode details

* `DELETE /admin/tcodes/:id`
  → Hard delete by ID

---

### 💬 Messages

* `GET /admin/messages`
  → List all messages (filterable by tags, senderType, etc.)

* `PUT /admin/messages/:id`
  → Update a message (content, tags, etc.)

* `DELETE /admin/messages/:id`
  → Remove a message permanently

---

### 👥 Users

* `GET /admin/users`
  → Lists all registered users (email only)

---

### 🎟 Subscriptions

* `POST /admin/subscriptions`
  → Grant access to a user for a specific tcode

* `GET /admin/subscriptions`
  → List all subscriptions (filterable)

* `PUT /admin/subscriptions/:id`
  → Modify an existing subscription

* `DELETE /admin/subscriptions/:id`
  → Revoke access

---

## 🩺 Health Check

* `GET /`
  → Returns plain text: `Workshop backend is running`
  → Use for uptime checks / CI health probes

---

## ⚠️ Error Format

All errors follow this shape:

```json
{
  "error": "Validation failed",
  "details": "Field 'email' is required",
  "code": 400,
  "path": "/users/register",
  "method": "POST",
  "timestamp": "2025-06-07T17:30:00Z"
}
```

---

## 🛡 Auth + Access

| API        | Access              | Header Required           |
| ---------- | ------------------- | ------------------------- |
| Public API | Logged-in user only | `Authorization: Bearer …` |
| Admin API  | Secret-based access | `x-admin-secret: …`       |

No role system — access is segmented by route grouping.

---

## ✅ Test Coverage

All routes are backed by test stories (`/tests/stories/`):

* User registration, login, profile
* Message lifecycle (user + system)
* Admin control over tcodes, messages, subscriptions
* Subscription access control
* Validation failures and access errors

20/20 tests passing — no dead endpoints.

---

> 🧾 This is the live, synced source of truth for the Workshop API.
> Tests, behavior, and documentation are all aligned as of June 2025.

