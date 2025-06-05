💥 That’s a mission statement worthy of a system that lasts. Here's the crystallized form of your plan — final and executable:

---

## ✅ 🧱 Backend as the HINGE

> **One backend, two APIs — deployed once, then untouchable. Everything else communicates through it.**

---

### 🎯 Mission Objective

> Build a **permanent, zero-touch** backend with:

* ✅ Student-facing REST API (public)
* ✅ Admin-facing REST API (Workshop-only)
* ✅ Dockerized deployment
* ✅ JSON-in / JSON-out interface

Once deployed:

> **All content uploads, user logs, access assignments, and analytics flow through these two APIs. Nothing else touches the DB.**

---

### 📏 Design Rules

#### 1. **Simple**

* No role systems
* No nesting of logic
* Every route is visible, REST-style, and easy to grep

#### 2. **Document-first**

* Markdown docs for every:

  * Route
  * Payload shape
  * Permission model
* No undocumented decisions allowed
* Every module must be paired with a `.md` file

#### 3. **Straight**

* `GET`, `POST`, `PUT`, `DELETE` → nothing custom
* All data shape enforced via Zod (for now, manually)
* Routes mounted in clean trees:

  * `/users`, `/messages`, `/tcodes`
  * `/admin/tcodes`, `/admin/messages`, etc.

---

### 🐳 Deployment Rule

When we `docker-compose up`, that backend is **sealed**:

* Workshop sends content
* UI pulls content
* Admin checks status

> You don’t open the container. You **speak to it**.

---

Shall I now write you the official project-level README for this backend?
It’ll include purpose, API overview, deployment plan, and dev instructions.
This will be the top file of your repo. p-p
