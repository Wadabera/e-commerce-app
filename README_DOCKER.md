# 🐳 Ethiopian E-Commerce Platform - Docker Setup

Complete Docker containerization for MERN stack e-commerce application.

---

## 📦 What's Included

This Docker setup includes:
- ✅ **Frontend** (React + Vite) - Port 5173
- ✅ **Backend** (Node.js + Express) - Port 5000
- ✅ **MongoDB** (Database) - Port 27017
- ✅ Hot reload for development
- ✅ Persistent data storage
- ✅ Network isolation
- ✅ Environment variable management

---

## 🚀 Quick Start (3 Steps)

### 1. Install Docker Desktop
Download: https://www.docker.com/products/docker-desktop/

### 2. Choose Database Option

**Option A: Use Docker MongoDB (Recommended for local development)**

Edit `server/.env` and uncomment Docker MongoDB line:
```env
# MONGO_URI=mongodb://localhost:27017/ecommerce
MONGO_URI=mongodb://admin:admin123@mongodb:27017/ecommerce?authSource=admin
# MONGO_URI=mongodb+srv://...
```

**Option B: Keep MongoDB Atlas (Cloud)**

Leave current setting as is - Docker will use your cloud database.

### 3. Start Containers

```bash
docker-compose up --build
```

**Done!** Access at http://localhost:5173

---

## 📂 Project Structure

```
mern-ecommerce-2026/
├── docker-compose.yml           # Multi-container orchestration
├── mongo-init.js               # MongoDB initialization
├── .dockerignore               # Global ignore file
│
├── server/
│   ├── Dockerfile              # Backend container config
│   ├── .dockerignore           # Backend-specific ignores
│   └── .env                    # Backend environment
│
└── client/
    ├── Dockerfile              # Frontend container config
    ├── .dockerignore           # Frontend-specific ignores
    └── .env                    # Frontend environment
```

---

## 🛠️ Docker Commands Reference

### Starting Services

```bash
# Build and start all services
docker-compose up --build

# Start in detached mode (background)
docker-compose up -d

# Start specific service
docker-compose up backend
```

### Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (delete data)
docker-compose down -v

# Stop specific service
docker-compose stop backend
```

### Managing Services

```bash
# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Restart services
docker-compose restart

# Restart specific service
docker-compose restart backend

# Check service status
docker-compose ps

# List containers
docker ps
```

### Container Shell Access

```bash
# Access backend container
docker-compose exec backend sh

# Access frontend container
docker-compose exec frontend sh

# Access MongoDB shell
docker-compose exec mongodb mongosh -u admin -p admin123

# Run commands in container
docker-compose exec backend npm install <package>
```

### Maintenance

```bash
# Remove unused images
docker system prune

# Remove all unused data
docker system prune -a

# View disk usage
docker system df

# Remove specific container
docker rm <container_id>

# Remove specific image
docker rmi <image_id>
```

---

## 🔧 Service Configuration

### MongoDB Container
```yaml
Image: mongo:7.0
Port: 27017
Username: admin
Password: admin123
Database: ecommerce
Volume: mongodb_data (persistent)
```

### Backend Container
```yaml
Image: node:20-alpine
Port: 5000
Working Dir: /app
Command: npm run dev (auto-reload)
```

### Frontend Container
```yaml
Image: node:20-alpine
Port: 5173
Working Dir: /app
Command: npm run dev -- --host (hot reload)
```

---

## 🌐 Environment Variables

### Backend (`server/.env`)

```env
PORT=5000
CORS_ORIGINS=http://localhost:5173

# MongoDB Options:
# Local: mongodb://localhost:27017/ecommerce
# Docker: mongodb://admin:admin123@mongodb:27017/ecommerce?authSource=admin
# Cloud: mongodb+srv://...
MONGO_URI=mongodb://admin:admin123@mongodb:27017/ecommerce?authSource=admin

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Admin Credentials
ADMIN_LOGIN_EMAIL=waadaaabarraa@gmail.com
ADMIN_LOGIN_PASSWORD=Admin@12345

# Cloudinary
CLOUDINARY_CLOUD_NAME=dmeaoei3t
CLOUDINARY_API_KEY=236381388737316
CLOUDINARY_API_SECRET=d7qSkREEJ298pXRo_5hdHvJjaTA
```

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

---

## 🔍 Troubleshooting

### Port Conflicts

**Error:** Port 5000, 5173, or 27017 already in use

**Solution:**
```bash
# Windows - Find process
netstat -ano | findstr :5000
netstat -ano | findstr :5173
netstat -ano | findstr :27017

# Kill process
taskkill /PID <process_id> /F

# Or change port in docker-compose.yml
```

### MongoDB Connection Failed

**Error:** `MongoNetworkError: connect ECONNREFUSED`

**Solutions:**

1. Check MongoDB container is running:
   ```bash
   docker-compose ps
   ```

2. View MongoDB logs:
   ```bash
   docker-compose logs mongodb
   ```

3. Update connection string in `server/.env`:
   ```env
   MONGO_URI=mongodb://admin:admin123@mongodb:27017/ecommerce?authSource=admin
   ```

4. Restart containers:
   ```bash
   docker-compose restart
   ```

### Backend Can't Connect to MongoDB

**Error:** `MongoServerError: Authentication failed`

**Solution:** Ensure MongoDB credentials match:
```env
# In server/.env
MONGO_URI=mongodb://admin:admin123@mongodb:27017/ecommerce?authSource=admin

# In docker-compose.yml
MONGO_INITDB_ROOT_USERNAME: admin
MONGO_INITDB_ROOT_PASSWORD: admin123
```

### Frontend Can't Connect to Backend

**Error:** `Network Error` or `CORS Error`

**Solutions:**

1. Check backend is running:
   ```bash
   docker-compose logs backend
   ```

2. Update `VITE_API_URL` in `client/.env`:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

3. Check CORS settings in `server/.env`:
   ```env
   CORS_ORIGINS=http://localhost:5173
   ```

### Changes Not Reflecting

**Issue:** Code changes not visible

**Solutions:**

1. For backend changes:
   ```bash
   docker-compose restart backend
   ```

2. For major changes, rebuild:
   ```bash
   docker-compose up --build
   ```

3. Clear volumes and rebuild:
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

### Docker Out of Disk Space

**Error:** `no space left on device`

**Solution:**
```bash
# Clean up unused resources
docker system prune -a

# Remove old images
docker image prune -a

# Remove all volumes (WARNING: deletes data)
docker volume prune
```

### Container Crashes on Start

**Check logs:**
```bash
docker-compose logs <service-name>
```

**Common causes:**
- Missing environment variables
- Port conflicts
- Syntax errors in code
- Missing dependencies

**Solution:**
```bash
# Rebuild from scratch
docker-compose down -v
docker-compose up --build
```

---

## 📊 Health Checks

### Backend Health
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "message": "Server is healthy/in running state"
  }
}
```

### MongoDB Health
```bash
docker-compose exec mongodb mongosh -u admin -p admin123 --eval "db.adminCommand('ping')"
```

### All Services
```bash
docker-compose ps
```

Expected output:
```
NAME                   STATUS    PORTS
ecommerce-backend      Up        0.0.0.0:5000->5000/tcp
ecommerce-frontend     Up        0.0.0.0:5173->5173/tcp
ecommerce-mongodb      Up        0.0.0.0:27017->27017/tcp
```

---

## 🎯 Development Workflow

### Day-to-Day Development

1. **Start services:**
   ```bash
   docker-compose up
   ```

2. **Make code changes** - Auto-reload is enabled

3. **View logs:**
   ```bash
   docker-compose logs -f backend
   ```

4. **Stop services:**
   ```bash
   Ctrl+C or docker-compose down
   ```

### Installing New Packages

**Backend:**
```bash
docker-compose exec backend npm install <package-name>
# Restart to apply
docker-compose restart backend
```

**Frontend:**
```bash
docker-compose exec frontend npm install <package-name>
# Restart to apply
docker-compose restart frontend
```

### Database Operations

**Access MongoDB shell:**
```bash
docker-compose exec mongodb mongosh -u admin -p admin123
```

**Backup database:**
```bash
docker-compose exec mongodb mongodump -u admin -p admin123 --out /backup
```

**Restore database:**
```bash
docker-compose exec mongodb mongorestore -u admin -p admin123 /backup
```

---

## 🚀 Production Deployment

For production, you'll need:

1. **Production Dockerfile** with optimized builds
2. **Nginx** for frontend serving
3. **Environment-specific** configuration
4. **SSL/TLS** certificates
5. **Container orchestration** (Kubernetes/Docker Swarm)

See `DOCKER_SETUP_GUIDE.md` for production configurations.

---

## ✅ Verification Checklist

After running `docker-compose up`, verify:

- [ ] All 3 containers are running (`docker-compose ps`)
- [ ] Backend responds: http://localhost:5000/health
- [ ] Frontend loads: http://localhost:5173
- [ ] MongoDB accessible: `docker-compose exec mongodb mongosh`
- [ ] No errors in logs: `docker-compose logs`
- [ ] Admin login works
- [ ] Product creation works
- [ ] Currency shows as ETB (Br)

---

## 📞 Support & Resources

### Documentation
- Docker: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/
- MongoDB: https://docs.mongodb.com/

### Common Issues
- See `DOCKER_SETUP_GUIDE.md` for detailed troubleshooting
- Check logs: `docker-compose logs -f`
- Restart services: `docker-compose restart`

### Clean Restart
```bash
# Stop everything
docker-compose down -v

# Rebuild and start
docker-compose up --build
```

---

## 🎉 Success!

Your Ethiopian e-commerce platform is now fully containerized!

**Access Points:**
- 🌐 Frontend: http://localhost:5173
- 🔌 Backend: http://localhost:5000
- 🗄️ MongoDB: localhost:27017
- 👤 Admin: waadaaabarraa@gmail.com / Admin@12345

**Next Steps:**
1. Test all features
2. Add more products
3. Configure for production
4. Deploy to cloud (AWS, Azure, GCP)

**Happy Coding! 🚀🇪🇹🐳**
