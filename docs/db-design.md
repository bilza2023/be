# 🧠 Backend Design Overview – Workshop System

This document outlines the backend architecture for the Workshop system. It is optimized for simplicity, reusability, and clarity. All data and access flows are built around students, their subscriptions, and their interactions.

---

## 👥 User Model and Identity

### 1. `users`

* Purpose: Authentication and identity only
* Fields: `id`, `email`, `passwordHash`, `createdAt`
* Every logged-in user is treated as a **student** (no roles)

### 2. `user_preferences`

* Purpose: Stores stable UI/config preferences
* One row per user
* Example fields: `theme`, `language`, `playbackSpeed`

### 3. `user_progress`

* Purpose: Tracks current learning progress per tcode
* One row per (`userId`, `tcodeId`)
* Fields: `lastSlideSeen`, `percentComplete`, `lastActive`

### 4. `user_interactions`

* Purpose: Logs all user-initiated actions
* Append-only
* Fields: `userId`, `type`, `payload (JSON)`, `createdAt`
* Examples: `viewed-slide`, `searched`, `asked-question`

---

## 📚 Content and Access Control

### 5. `tcodes`

* Purpose: Defines available educational content
* Each row is one course, subject, or unit
* Content itself is static, metadata is here

### 6. `subscriptions`

* Purpose: Defines which user can access which `tcode`
* Fields: `userId`, `tcodeId`, `subscriptionType`, `startDate`, `durationDays`, `status`
* Access is determined by checking current date < startDate + duration

### 7. `packages` (code-based config)

* Not a table
* Defines named subscription types like `trial`, `monthly`, `internal-access`
* Each package maps to rules: `durationDays`, pricing, renewal policy, etc.

---

## 💬 Messaging and Communication

### 8. `messages`

* Purpose: Outgoing messages from system to user
* Used for: alerts, warnings, updates, reminders
* Messages can be tagged (`system`, `subscription`, `info`) and scoped
* Acts as a general-purpose system log to student

---

## 🧩 Core Design Principles

* **No roles**: All users are treated as students. Privileged access is granted through subscription types (e.g. `internal-dev`).
* **Public content is static**: Anything open or free is served outside the backend via static files or CDN.
* **Everything routes through REST**: `tcodes`, `users`, `messages`, and `subscriptions` are exposed via clean REST endpoints.
* **Interactions are centralized**: All user actions are logged consistently in `user_interactions`, and all preferences/progress are decoupled from the core user record.

Exactly — a JWT-based login system is well understood and doesn’t need deep discussion unless you’re doing something unusual. So for the doc, all we really need is a short, clear section like:

---

### 🔐 Authentication System (JWT)

* Login is handled via standard **email + password** form.
* On successful login, a **JWT token** is issued to the client.
* This token is attached to all authenticated requests via `Authorization: Bearer`.
* Backend uses a shared secret to verify the token and extract `userId`.
* Passwords are hashed using `bcrypt`.
* All protected routes use middleware to check the token and attach the current user to the request.

---

That keeps the doc complete without bloating it with boilerplate. Want me to add this to the markdown now?
`p-p`

---

## ✅ Summary

This backend is designed for simplicity, repeatability, and clarity. It can be cloned across multiple projects with only changes to the `tcodes` and `packages`. The separation of user actions, state, identity, and access ensures clean logic and low maintenance.
