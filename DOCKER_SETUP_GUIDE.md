# 🐳 Docker Setup Guide - Ethiopian E-Commerce Platform

## 📋 Prerequisites

Before you begin, make sure you have installed:
- **Docker Desktop** for Windows: https://www.docker.com/products/docker-desktop/
- **Docker Compose** (included with Docker Desktop)

---

## 🚀 Quick Start

### Step 1: Update Environment Variables

Update the MongoDB connection string in `server/.env`:

```env
# Change from:
MONGODB_URI=mongodb://localhost:27017/ecommerce

# To:
MONGODB_URI=mongodb://admin:admin123@mongodb:27017/ecommerce?authSource=admin
```

### Step 2: Build and Start Containers

Open terminal in the project root and run:

```bash
docker-compose up --build
```

This will:
- ✅ Build Docker images for frontend and backend
- ✅ Start MongoDB container
- ✅ Start Backend API on port 5000
- ✅ Start Frontend on port 5173

### Step 3: Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **MongoDB:** mongodb://localhost:27017

---

## 🛠️ Docker Commands

### Start Services (detached mode)
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### Stop and Remove All Data
```bash
docker-compose down -v
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Restart Services
```bash
docker-compose restart
```

### Rebuild Specific Service
```bash
docker-compose up --build backend
docker-compose up --build frontend
```

### Check Running Containers
```bash
docker-compose ps
```

### Execute Commands Inside Container
```bash
# Backend shell
docker-compose exec backend sh

# Frontend shell
docker-compose exec frontend sh

# MongoDB shell
docker-compose exec mongodb mongosh -u admin -p admin123
```

---

## 📂 Docker Architecture

```
mern-ecommerce-2026/
├── docker-compose.yml       # Main Docker Compose configuration
├── mongo-init.js            # MongoDB initialization script
├── server/
│   ├── Dockerfile           # Backend Docker image
│   ├── .dockerignore        # Files to exclude from image
│   └── .env                 # Backend environment variables
└── client/
    ├── Dockerfile           # Frontend Docker image
    ├── .dockerignore        # Files to exclude from image
    └── .env                 # Frontend environment variables
```

---

## 🔧 Services Configuration

### 1. MongoDB
- **Container Name:** ecommerce-mongodb
- **Port:** 27017
- **Username:** admin
- **Password:** admin123
- **Database:** ecommerce
- **Data Volume:** mongodb_data (persistent storage)

### 2. Backend (Node.js)
- **Container Name:** ecommerce-backend
- **Port:** 5000
- **Base Image:** node:20-alpine
- **Auto-reload:** Enabled via nodemon

### 3. Frontend (React + Vite)
- **Container Name:** ecommerce-frontend
- **Port:** 5173
- **Base Image:** node:20-alpine
- **Hot-reload:** Enabled

---

## 🔍 Troubleshooting

### Issue: Port Already in Use
```bash
# Find process using port
netstat -ano | findstr :5000
netstat -ano | findstr :5173
netstat -ano | findstr :27017

# Kill process
taskkill /PID <process_id> /F
```

### Issue: MongoDB Connection Failed
1. Check if MongoDB container is running:
   ```bash
   docker-compose ps
   ```

2. Check MongoDB logs:
   ```bash
   docker-compose logs mongodb
   ```

3. Update `MONGODB_URI` in `server/.env`:
   ```
   MONGODB_URI=mongodb://admin:admin123@mongodb:27017/ecommerce?authSource=admin
   ```

### Issue: Frontend Can't Connect to Backend
1. Make sure backend is running:
   ```bash
   docker-compose logs backend
   ```

2. Check `VITE_API_URL` in `client/.env`:
   ```
   VITE_API_URL=http://localhost:5000
   ```

### Issue: Changes Not Reflecting
```bash
# Rebuild specific service
docker-compose up --build backend

# Or rebuild all
docker-compose up --build
```

### Issue: Docker Out of Space
```bash
# Clean up unused images and containers
docker system prune -a

# Remove all volumes (WARNING: deletes data)
docker system prune -a --volumes
```

---

## 🔒 Production Deployment

For production, create separate Docker files:

### server/Dockerfile.prod
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["node", "dist/server.js"]
```

### client/Dockerfile.prod
```dockerfile
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.prod.yml
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
    volumes:
      - mongodb_prod_data:/data/db
    networks:
      - ecommerce-network

  backend:
    build:
      context: ./server
      dockerfile: Dockerfile.prod
    restart: always
    environment:
      - NODE_ENV=production
    env_file:
      - ./server/.env.production
    depends_on:
      - mongodb
    networks:
      - ecommerce-network

  frontend:
    build:
      context: ./client
      dockerfile: Dockerfile.prod
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - ecommerce-network

volumes:
  mongodb_prod_data:

networks:
  ecommerce-network:
    driver: bridge
```

---

## 📊 Health Checks

### Check Backend Health
```bash
curl http://localhost:5000/health
```

### Check MongoDB Connection
```bash
docker-compose exec mongodb mongosh -u admin -p admin123 --eval "db.adminCommand('ping')"
```

### Check All Services Status
```bash
docker-compose ps
```

---

## 🎯 Development Workflow

### 1. Start Development
```bash
docker-compose up
```

### 2. Make Code Changes
- Changes auto-reload in both frontend and backend
- No need to restart containers

### 3. Install New Package
```bash
# Backend
docker-compose exec backend npm install <package-name>

# Frontend
docker-compose exec frontend npm install <package-name>
```

### 4. Run Database Migrations
```bash
docker-compose exec backend npm run migrate
```

### 5. View Logs
```bash
docker-compose logs -f backend
```

---

## 🌐 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://admin:admin123@mongodb:27017/ecommerce?authSource=admin

# Clerk
CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=dmeaoei3t
CLOUDINARY_API_KEY=236381388737316
CLOUDINARY_API_SECRET=d7qSkREEJ298pXRo_5hdHvJjaTA

# Admin
ADMIN_LOGIN_EMAIL=waadaaabarraa@gmail.com
ADMIN_LOGIN_PASSWORD=Admin@12345

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

---

## ✅ Verification Checklist

After running `docker-compose up`, verify:

- [ ] MongoDB container is running
- [ ] Backend container is running on port 5000
- [ ] Frontend container is running on port 5173
- [ ] Backend API health check responds: http://localhost:5000/health
- [ ] Frontend loads: http://localhost:5173
- [ ] Backend can connect to MongoDB
- [ ] Cloudinary credentials are loaded
- [ ] Admin login works

---

## 🎉 You're All Set!

Your Ethiopian e-commerce platform is now running in Docker!

**URLs:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000/health
- Admin Login: http://localhost:5173/sign-in

**Next Steps:**
1. Sign in as admin: waadaaabarraa@gmail.com / Admin@12345
2. Add products
3. Test customer features
4. Configure production deployment

---

## 📞 Support

If you encounter issues:
1. Check logs: `docker-compose logs -f`
2. Restart services: `docker-compose restart`
3. Rebuild: `docker-compose up --build`
4. Clean start: `docker-compose down -v && docker-compose up --build`

**Happy Coding! 🚀🇪🇹**
