# 🚀 StaffSync (TaskFlow)

A **full-stack MERN Employee Management System** built to manage users, employees, onboarding, and admin controls — all served from a **single backend** for simple deployment.

Live, production-ready, and designed with real-world dashboards in mind.

---

## 🌐 Live Demo

🔗 **Live URL:** https://teamflow-3.onrender.com
*(Free Render instance — first load may take ~30–50 seconds)*

---

## 🧩 What This Project Does

### 👤 User Side

* Secure authentication (JWT)
* User dashboard with employee statistics
* Onboarding flow
* Clean UI with navbar + sidebar layout

### 🛠 Admin Side

* Admin dashboard with stats
* Employee management (view/add/edit)
* Protected admin routes
* Shared layout with sidebar + content area

### ⚙️ Backend

* Express + MongoDB
* JWT authentication
* Role-ready architecture (admin/user)
* Serves frontend build directly (all-in-one deploy)

---

## 🏗 Project Structure

```
taskflow/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── employeeRoutes.js
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── admin/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── routes/
│   │   ├── user/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── routes/
│   │   ├── auth/
│   │   ├── context/
│   │   ├── services/
│   │   │   └── api.js
│   │   └── shared/
│   ├── dist/   (generated during build)
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔑 Tech Stack

**Frontend**

* React (Vite)
* Tailwind CSS
* React Router
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication

**Deployment**

* Render (all-in-one frontend + backend)

---

## 🚀 Deployment Approach (What We Did)

* Built frontend using Vite (`npm run build`)
* Served `frontend/dist` via Express
* Used relative API paths (`/api`) for production safety
* Fixed Linux case-sensitive imports for Render
* Deployed as **single web service** on Render

This avoids CORS issues and simplifies hosting.

---

## 🧪 Local Setup

```bash
# Clone repo
git clone https://github.com/Infinity0075/taskflow.git

# Backend
cd backend
npm install
npm start

# Frontend (development)
cd frontend
npm install
npm run dev
```

Create a `.env` file in backend:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

## 🔮 Upcoming Updates (Planned)

* 🔐 Proper role-based access control (RBAC)
* 📊 Advanced analytics in dashboards
* 🖼 Profile images & avatars
* 🔄 Employee status workflow
* 📱 Better mobile responsiveness
* 🧩 Modular permissions system

---

## 📌 Why This Project Matters

This project is not a tutorial clone.
It demonstrates:

* Real authentication
* Real dashboards
* Real deployment problems (and fixes)
* Clean structure for scaling

Built with the mindset of **shipping**, not just learning.

---

## 👨‍💻 Author

**Anant Madhav Pathak**
Aspiring Software Engineer | MERN Stack Developer

If you like this project, ⭐ the repo and feel free to explore the code.

---

### ✅ Status: Deployed & Stable
