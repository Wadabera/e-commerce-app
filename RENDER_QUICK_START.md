# 🚀 Deploy to Render - Quick Start (10 Minutes)

## Step 1: Push to GitHub (3 minutes)

```bash
# Navigate to project
cd mern-ecommerce-2026

# Initialize Git (if not done)
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub: https://github.com/new
# Then push:
git remote add origin https://github.com/YOUR-USERNAME/ethiopian-ecommerce.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy on Render (5 minutes)

### A. Sign Up
1. Go to https://render.com/
2. Click "Sign Up with GitHub"
3. Authorize Render

### B. Deploy Backend
1. Click "New" → "Web Service"
2. Connect your GitHub repo
3. Configure:
   ```
   Name: ecommerce-backend
   Root Directory: server
   Build Command: npm install && npm run build
   Start Command: npm start
   ```
4. Add Environment Variables:
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://waadaadhugaa2024_db_user:5GQ0sybOGFvEv2JC@ecommerceapp.wtalurd.mongodb.net/?appName=eCommerceapp
   CLERK_PUBLISHABLE_KEY=pk_test_cXVhbGl0eS1hcmFjaG5pZC0yNDE5LmNsZXJrLmFjY291bnRzLmRldiQ
   CLERK_SECRET_KEY=sk_test_9oaMFPKLEIzKMCFkMzacySqQrkqMPpLpyCD3sv5B0D
   CLOUDINARY_CLOUD_NAME=dmeaoei3t
   CLOUDINARY_API_KEY=236381388737316
   CLOUDINARY_API_SECRET=d7qSkREEJ298pXRo_5hdHvJjaTA
   ADMIN_LOGIN_EMAIL=waadaaabarraa@gmail.com
   ADMIN_LOGIN_PASSWORD=Admin@12345
   CORS_ORIGINS=https://ecommerce-frontend.onrender.com
   ```
5. Click "Create Web Service"

### C. Deploy Frontend
1. Click "New" → "Static Site"
2. Connect your GitHub repo
3. Configure:
   ```
   Name: ecommerce-frontend
   Root Directory: client
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```
4. Add Environment Variable:
   ```
   VITE_API_URL=https://ecommerce-backend.onrender.com
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_cXVhbGl0eS1hcmFjaG5pZC0yNDE5LmNsZXJrLmFjY291bnRzLmRldiQ
   ```
5. Click "Create Static Site"

---

## Step 3: Update URLs (2 minutes)

After both services deploy, you'll get URLs like:
- Backend: `https://ecommerce-backend.onrender.com`
- Frontend: `https://ecommerce-frontend.onrender.com`

### Update Backend CORS:
1. Go to backend service
2. Environment → `CORS_ORIGINS`
3. Update to your actual frontend URL
4. Save and redeploy

### Update Frontend API URL:
1. Go to frontend service
2. Environment → `VITE_API_URL`
3. Update to your actual backend URL
4. Save and redeploy

---

## ✅ Done!

Your app is live at:
**https://ecommerce-frontend.onrender.com**

### Admin Login:
- Email: waadaaabarraa@gmail.com
- Password: Admin@12345

---

## ⚠️ Important Notes

### Free Tier Limitations:
- Services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds (cold start)
- 750 hours/month free (enough for 1 service 24/7)

### Keep Services Awake:
Use UptimeRobot to ping your backend every 14 minutes:
https://uptimerobot.com/

---

## 🐛 Troubleshooting

### Build Fails:
- Check logs in Render dashboard
- Verify `package.json` has `build` script

### Backend Not Responding:
- Check `/health` endpoint
- Verify MongoDB connection string
- Check environment variables

### Frontend Shows Error:
- Verify `VITE_API_URL` points to backend
- Check CORS settings on backend
- Open browser console for details

---

## 📖 Full Guide

For detailed instructions, see `RENDER_DEPLOYMENT_GUIDE.md`

---

**Your Ethiopian E-Commerce platform is now live! 🎉🇪🇹**
