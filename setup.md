Great — let’s craft your `setup.md`. This file should serve as:

> ✅ A deployment + usage guide
> ✅ A wiring diagram for credentials, ports, and modes
> ✅ A team-readable intro to how the system runs

---

### 📄 `setup.md` — Workshop Backend

````md
# 🛠 Workshop Backend – Setup Guide

This backend powers the Workshop admin and public API system, using Node.js, Express, and MongoDB.

---

## 🚀 Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd be
npm install
````

---

## 🔧 Run Modes

### 🧪 Testing

Run with a disposable MongoDB and `.env.test`.

```bash
npm test
```

Runs 20 real-world stories using `jest --runInBand`.

---

### 🛠 Development

Runs locally using `.env` and your host MongoDB.

```bash
npm run dev
```

Uses:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/taleemDB
```

Start Mongo manually or via:

```bash
npm run dev:db
# This maps port 27017 and destroys container on stop
```

---

### 🐳 Docker Compose

Run app + Mongo in containers:

```bash
docker-compose up --build
```

MongoDB uses:

```yaml
MONGO_INITDB_ROOT_USERNAME: taleemAdmin
MONGO_INITDB_ROOT_PASSWORD: bils32611246950
```

App connects using:

```
MONGO_URI=mongodb://taleemAdmin:bils32611246950@mongo:27017/taleemDB?authSource=admin
```

Exposes:

* App on `http://localhost:3000`
* Mongo on `localhost:27017`

---

## 🔐 Secrets

| Key            | Purpose                  |
| -------------- | ------------------------ |
| `JWT_SECRET`   | Issues login tokens      |
| `ADMIN_SECRET` | Protects `/admin/*` APIs |

Defined in:

* `.env` for local/dev
* `.env.test` for tests
* `docker-compose.yml` for Docker

---

## 📁 Folder Overview

| Path              | Purpose                          |
| ----------------- | -------------------------------- |
| `src/routes/`     | Public + admin API endpoints     |
| `mongo/models.js` | Mongoose models (User, Message…) |
| `tests/stories/`  | Jest test stories (20)           |
| `utils/`          | Error formatting, filtering      |

---

## 🧪 Test Summary

All tests are real API flows (not units). Run with:

```bash
npm test
```

Test coverage includes:

* ✅ User onboarding
* ✅ Message lifecycle
* ✅ Tcode creation/access
* ✅ Subscription enforcement
* ✅ Admin security and errors
* ✅ Validation edge cases

---

## 📞 Health Check

```bash
GET /
→ "Workshop backend is running"
```

---

## ✅ Done

This API is stable, portable, and battle-tested.

```
Test Suites: 20 passed
Tests:       20 passed
```

