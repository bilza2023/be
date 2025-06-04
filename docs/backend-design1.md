That’s a solid summary draft. Here’s a refined collection with clean phrasing and structure to use as the foundation for `backend-design.md`:

---

### 🧱 Core Decisions (Working Draft)

1. **No roles — only students:**
   All authenticated users are treated as students. There is no concept of admin, teacher, or moderator within the Workshop backend.

2. **Courses are tcodes:**
   All course and content metadata is stored in a single `tcodes` table. Each `tcode` represents a course, subject, or content unit (e.g., `fbise9math`).

3. **Public content is static:**
   Any content marked as “open” or public is moved out of the backend entirely and served via static folders. The backend does not route or validate public content.

4. **Tcode access is REST-exposed:**
   The `tcodes` table is exposed via REST, allowing access to course metadata and structure as needed by the frontend.

5. **Database Tables:**

   * `users`: all logged-in students
   * `messages`: general-purpose message queue (system/user)
   * `tcodes`: content index table
   * `subscriptions`: access records tying students to tcodes

6. **Subscription packages are abstracted:**
   The `/packages` folder exports a map of named subscription packages. These define rules like duration, pricing, and trial conditions.

7. **Per-tcode subscription model:**
   Subscriptions are defined per tcode. A student may subscribe to `fbise9math` and only have access to that. All access checks happen at the tcode level.

8. **Student studio is always accessible:**
   Even after subscriptions expire, students retain access to their history, messages, and dashboard (the “student studio”).

---

Let me know if you'd like to move this into a formatted `.md` next.
`p-p`
