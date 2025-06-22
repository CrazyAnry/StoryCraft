# 🚀 StoryCraft Setup Guide (for Developers)

<div align="center">

![Setup](https://img.shields.io/badge/Setup-Ready%20to%20Go-brightgreen?style=for-the-badge&logo=rocket)

**Get StoryCraft running in minutes**

</div>

## 📋 Prerequisites

Before starting, make sure you have these installed:

| Requirement | Default Config | Notes |
|-------------|----------------|-------|
| **Node.js** | Latest LTS | Runtime environment |
| **Git** | Latest | For cloning repository |
| **npm** | Comes with Node.js | Package manager |
| **PostgreSQL** | Username: `postgres`<br>Password: `root` | Or update `.env` with your credentials |

## ⚡ Quick Setup

### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd StoryCraft
```

### 2️⃣ Configure Environment
Create a `.env` file in the `backend` folder with your database credentials
```env
DATABASE_URL="postgresql://postgres:root@localhost:5432/storycraft"
# Add other required environment variables
```

### 3️⃣ Backend Setup
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm i

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init
```

### 4️⃣ Frontend Setup
```bash
# Navigate to frontend folder (from root)
cd frontend

# Install dependencies
npm i
```

### 5️⃣ Launch Application
```bash
# From the root StoryCraft folder
npm run dev
```

## 🎉 You're All Set!

Your StoryCraft application should now be running! 

---

<div align="center">

**Having issues?** Check that PostgreSQL is running and your credentials in `.env` are correct

</div>