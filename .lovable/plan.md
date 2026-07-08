## School Admin Dashboard — Build Plan

Add a separate `/admin` section to this project (Compufy pages stay untouched) with staff login, role-based access, and management of students, enrolment, finances, and announcements.

### 1. Backend (Lovable Cloud)

**Enable Lovable Cloud** to get Postgres + auth + edge functions.

**Enum**
- `app_role`: `admin` | `finance` | `teacher`

**Tables** (all with RLS + GRANTs to authenticated + service_role)

| Table | Purpose | Key columns |
|---|---|---|
| `profiles` | Staff profile linked to `auth.users` | id, user_id, full_name, email, created_at |
| `user_roles` | Role assignments (separate table — never on profiles) | id, user_id, role |
| `students` | Student records | id, first_name, last_name, grade, guardian_name, guardian_phone, guardian_email, enrolment_status (`pending`/`approved`/`rejected`), date_of_birth, enrolled_at, created_at |
| `fee_invoices` | Fees issued to students | id, student_id, term, amount_due, amount_paid, due_date, status (`unpaid`/`partial`/`paid`), created_at |
| `announcements` | Notices | id, title, body, published, author_id, created_at |

**Security-definer function** `has_role(user_id, role)` — used in all RLS policies to avoid recursion.

**Trigger** `on_auth_user_created` → auto-create profile row.

**RLS policy matrix**

| Table | admin | finance | teacher |
|---|---|---|---|
| students | full CRUD | read | read + insert/update |
| fee_invoices | full CRUD | full CRUD | read |
| announcements | full CRUD | read | full CRUD |
| profiles | read all | read self | read self |
| user_roles | read all, admin manages | read self | read self |

### 2. Frontend routes

```text
/admin/login        → staff sign-in (email + password)
/admin              → dashboard (KPIs + charts)
/admin/students     → student list, CRUD, enrolment approvals
/admin/finance      → invoices list, per-student balances, revenue
/admin/announcements→ create/edit/publish announcements
```

- `ProtectedRoute` wrapper: checks session, redirects to `/admin/login` if missing.
- `RoleGate` component: hides sections based on role (teacher won't see finance).
- Sidebar shell using shadcn `Sidebar` with role-aware menu items.
- Header shows current user + sign-out.

### 3. Dashboard (`/admin`)

KPI cards: Total Students · Pending Enrolments · Fees Outstanding · Revenue This Term
Charts (recharts, already in project):
- Line: enrolment trend by month
- Bar: revenue by term
- Donut: fee status split (paid / partial / unpaid)
Recent announcements list.

### 4. Students page

Table with search + grade filter. "Add Student" dialog. Row actions: edit, approve/reject enrolment, delete (admin only). Tab for "Pending Approvals".

### 5. Finance page

Invoices table with status badges, filter by term & status. "Create Invoice" dialog. "Record Payment" action updates `amount_paid` and recomputes status. Summary strip: total invoiced / collected / outstanding.

### 6. Announcements page

Card grid of announcements with draft/published toggle. Rich-ish textarea editor. Delete confirm.

### 7. Navigation touch-up

Add a discreet "Staff Login" link in the existing Compufy footer pointing to `/admin/login` — nothing else on public pages changes.

### 8. Initial roles

After first staff signs up, they'll have no role and see an "awaiting access" screen. I'll ship a small SQL snippet in chat so you can promote yourself to `admin` from the Cloud SQL editor. From then on, admins assign roles to other staff via the Students/Users area (basic role assignment UI on the dashboard).

### Out of scope (can be added later)

- Student-facing portal login
- Online fee payments (Stripe/Paddle)
- Email notifications
- File uploads (report cards, receipts)

---

**Ready to build?** Approve and I'll enable Lovable Cloud, create the schema + RLS, then scaffold the routes, sidebar, and pages in that order.