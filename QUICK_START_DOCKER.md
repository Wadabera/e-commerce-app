# 🚀 Quick Start with Docker - 5 Minutes Setup

## Step 1: Install Docker Desktop

Download and install Docker Desktop for Windows:
https://www.docker.com/products/docker-desktop/

---

## Step 2: Update MongoDB Connection

Open `server/.env` and change:

```env
# FROM:
MONGODB_URI=mongodb://localhost:27017/ecommerce

# TO:
MONGODB_URI=mongodb://admin:admin123@mongodb:27017/ecommerce?authSource=admin
```

---

## Step 3: Start Docker Containers

Open terminal in project root folder and run:

```bash
docker-compose up --build
```

Wait for all services to start. You'll see:
```
✅ Clerk middleware applied globally
MongoDB connected
Server is now listening to port 5000
```

---

## Step 4: Access Your Application

Open browser and go to:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000/health
- **Admin Login:** http://localhost:5173/sign-in

---

## 🎯 That's It!

Your Ethiopian e-commerce platform is now running in Docker containers!

### Admin Credentials:
- Email: waadaaabarraa@gmail.com
- Password: Admin@12345

### To Stop:
```bash
docker-compose down
```

### To Restart:
```bash
docker-compose up
```

---

## 📝 Common Commands

```bash
# View logs
docker-compose logs -f

# Restart after code changes
docker-compose restart

# Stop and remove everything
docker-compose down -v

# Check running containers
docker-compose ps
```

---

🎉 **Enjoy your dockerized e-commerce platform!** 🇪🇹
