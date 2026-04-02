# 🔐 Smart Locker Management System

<div align="center">

![Smart Locker Banner](https://img.shields.io/badge/Smart%20Locker-Management%20System-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xOCAySDZjLTEuMSAwLTIgLjktMiAydjE2YzAgMS4xLjkgMiAyIDJoMTJjMS4xIDAgMi0uOSAyLTJWNGMwLTEuMS0uOS0yLTItMnptLTMgMTRINXYtMmg4djJ6bTAtNEg1di0yaDh2MnptMC00SDV2LTJoOHYyem0yLTZoLTJ2LTJoMnYyeiIvPjwvc3ZnPg==)

[![Django](https://img.shields.io/badge/Django-4.x-092E20?style=flat-square&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![DRF](https://img.shields.io/badge/Django%20REST%20Framework-3.x-red?style=flat-square&logo=django)](https://www.django-rest-framework.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

A full-stack web application for managing smart storage lockers with role-based access control, JWT authentication, and real-time locker status tracking.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Docs](#-api-endpoints) • [Screenshots](#-project-structure)

</div>

---

## 📌 Overview

The **Smart Storage Locker Management System** is a complete full-stack application that enables users to register, log in, reserve lockers, and manage reservations — while admins can create, update, and deactivate lockers and oversee all reservations.

---

## ✨ Features

### 👤 User Features
- 📝 Register & Login with JWT Authentication
- 🔍 View all available lockers with real-time status
- 📅 Reserve a locker with a date/time picker
- 👁️ View personal reservations
- 🔓 Release (cancel) reservations

### 🛡️ Admin Features
- ➕ Create new lockers
- ✏️ Update locker details
- 🚫 Deactivate lockers
- 📋 View **all** reservations across all users
- 🔐 Full role-based access control

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Django 4.x + Django REST Framework |
| **Authentication** | JWT (SimpleJWT) |
| **Database** | MySQL 8.x |
| **Frontend** | React 18 + Vite |
| **Styling** | Tailwind CSS 3.x |
| **HTTP Client** | Axios |
| **Routing** | React Router DOM |

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure you have the following installed:

- Python 3.10+
- Node.js 18+
- MySQL 8+
- pip & npm

---

### 📦 Backend Setup

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/smart-locker-management.git
cd smart-locker-management
```

**2. Create and activate virtual environment**
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

**3. Install dependencies**
```bash
pip install django djangorestframework djangorestframework-simplejwt mysqlclient django-cors-headers python-decouple
```

**4. Create MySQL Database**
```sql
CREATE DATABASE smart_locker_db;
```

**5. Configure environment variables**

Create a `.env` file inside the `backend/` folder:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DB_NAME=smart_locker_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
```

**6. Run migrations**
```bash
python manage.py makemigrations
python manage.py migrate
```

**7. Create superuser (Admin)**
```bash
python manage.py createsuperuser
```

**8. Start backend server**
```bash
python manage.py runserver
```

Backend running at → `http://localhost:8000` ✅

---

### 💻 Frontend Setup

**1. Navigate to frontend**
```bash
cd ../frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Start development server**
```bash
npm run dev
```

Frontend running at → `http://localhost:5173` ✅

---

## 📡 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register/` | Register new user | Public |
| POST | `/api/auth/login/` | Login & get JWT tokens | Public |
| POST | `/api/auth/refresh/` | Refresh access token | Public |

### 🗄️ Lockers
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/lockers/` | List all lockers | Auth |
| POST | `/api/lockers/` | Create new locker | Admin |
| GET | `/api/lockers/<id>/` | Get locker details | Auth |
| PUT | `/api/lockers/<id>/` | Update locker | Admin |
| DELETE | `/api/lockers/<id>/` | Deactivate locker | Admin |

### 📋 Reservations
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/reservations/` | List reservations | Auth (own) / Admin (all) |
| POST | `/api/reservations/` | Create reservation | Auth |
| GET | `/api/reservations/<id>/` | Get reservation details | Auth |
| PUT | `/api/reservations/<id>/release/` | Release/cancel reservation | Auth |

---

## 🗂️ Project Structure

```
smart-locker-management/
│
├── backend/
│   ├── api/
│   │   ├── migrations/
│   │   ├── models.py          # User, Locker, Reservation models
│   │   ├── serializers.py     # DRF Serializers
│   │   ├── views.py           # API Views & ViewSets
│   │   ├── urls.py            # API URL routing
│   │   └── permissions.py     # Custom permissions (IsAdmin, IsAdminOrReadOnly)
│   ├── backend/
│   │   ├── settings.py        # Django settings
│   │   └── urls.py            # Root URL config
│   ├── .env                   # Environment variables (not committed)
│   └── manage.py
│
├── frontend/
│   └── src/
│       ├── api/
│       │   └── axios.js           # Axios instance + interceptors
│       ├── context/
│       │   └── AuthContext.jsx    # Global auth state
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── ReserveModal.jsx
│       │   └── ProtectedRoute.jsx
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Lockers.jsx
│       │   └── Reservations.jsx
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```

---

## 🔒 Authentication Flow

```
User Login → POST /api/auth/login/
         ↓
   Receive Access Token + Refresh Token
         ↓
   Store in localStorage
         ↓
   Attach Bearer Token to all API requests
         ↓
   Token Expired? → Auto-refresh via /api/auth/refresh/
         ↓
   Refresh failed? → Redirect to Login
```

---

## 👥 Role-Based Access

| Feature | User | Admin |
|---------|------|-------|
| View Lockers | ✅ | ✅ |
| Reserve Locker | ✅ | ✅ |
| View Own Reservations | ✅ | ✅ |
| Release Own Reservation | ✅ | ✅ |
| Create Locker | ❌ | ✅ |
| Update Locker | ❌ | ✅ |
| Deactivate Locker | ❌ | ✅ |
| View All Reservations | ❌ | ✅ |

---

## 🌐 Locker Status Flow

```
AVAILABLE  →  (User Reserves)  →  RESERVED
RESERVED   →  (User Releases)  →  AVAILABLE
AVAILABLE  →  (Admin Deactivates) → INACTIVE
```

---

## 📄 License

This project is built as part of an internship assignment for **Popkey Private Limited**.

---

## 👨‍💻 Author

**Your Name**
- GitHub: https://github.com/Nandhangit
- Email: snandhan825@email.com

---

<div align="center">
  Made with ❤️ using Django & React
</div>
