# 🚀 DEPLOY FRONTEND TO RENDER - COMPLETE GUIDE

## ✅ Backend is Live
**Backend URL:** https://e-commerce-app-backendgn.onrender.com

## ✅ Frontend is Configured
All files updated to use the correct backend URL.

---

## 📋 Step-by-Step: Deploy Frontend to Render

### Method 1: Manual Static Site (Recommended - Easier)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com/

2. **Create New Static Site**
   - Click **"New +"** button (top right)
   - Select **"Static Site"**

3. **Connect Repository**
   - Select: **"Wadabera/e-commerce-app"**
   - If not listed, click "Configure account" and authorize GitHub access
   - Click **"Connect"**

4. **Configure Build Settings**
   ```
   Name: ecommerce-frontend (or any name you like)
   Branch: main
   Root Directory: client
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

5. **Add Environment Variables**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   **Variable 1:**
   ```
   Key: VITE_BACKEND_URL
   Value: https://e-commerce-app-backendgn.onrender.com
   ```
   
   **Variable 2:**
   ```
   Key: VITE_CLERK_PUBLISHABLE_KEY
   Value: pk_test_cXVhbGl0eS1hcmFjaG5pZC0yNDE5LmNsZXJrLmFjY291bnRzLmRldiQ
   ```

6. **Create Static Site**
   - Click **"Create Static Site"**
   - Render will start building and deploying
   - Wait 5-10 minutes for first deployment

7. **Get Your Frontend URL**
   - After deployment, you'll see: `https://your-site-name.onrender.com`
   - Copy this URL - you'll need it!

---

### Method 2: Using Blueprint (Automatic)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com/

2. **Create New Blueprint**
   - Click **"New +"** → **"Blueprint"**
   - Connect repository: **"Wadabera/e-commerce-app"**
   - Render will auto-detect `render.yaml`

3. **Add Environment Secrets**
   Before clicking "Apply", add these environment variables:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `MONGO_URI` (for backend)
   - `CLERK_SECRET_KEY` (for backend)
   - etc.

4. **Click "Apply"**
   - Render will deploy both frontend and backend

---

## 🔧 IMPORTANT: Update Backend CORS

After deploying frontend, you MUST update the backend to allow requests from your frontend domain.

### Update Backend on Render:

1. Go to: https://dashboard.render.com/
2. Click on your backend service: **"e-commerce-app-backendgn"** (or similar name)
3. Go to **"Environment"** tab
4. Add/Update this variable:
   ```
   Key: CORS_ORIGINS
   Value: https://your-frontend-name.onrender.com,http://localhost:5173
   ```
   Replace `your-frontend-name` with the actual name Render assigned to your frontend

5. Click **"Save Changes"**
6. Backend will automatically redeploy

**Without this step, your frontend will get CORS errors!**

---

## 🧪 Test Your Deployment

After both frontend and backend are deployed:

### 1. Check Backend Health
Open in browser: https://e-commerce-app-backendgn.onrender.com/health

Should see:
```json
{"status": "ok"}
```

### 2. Open Frontend
Go to: https://your-frontend-name.onrender.com

### 3. Test These Features:
- [ ] Home page loads with products
- [ ] Can click on a product to view details
- [ ] Can sign in with Google (Clerk)
- [ ] Can browse collections
- [ ] Can add items to cart

### 4. Test Admin Access:
- [ ] Go to: https://your-frontend-name.onrender.com/sign-in
- [ ] Login with:
  - Email: `waadaaabarraa@gmail.com`
  - Password: `Admin@12345`
- [ ] Should redirect to admin dashboard
- [ ] Dashboard shows statistics
- [ ] Can create new products

---

## 🐛 Troubleshooting

### Frontend shows blank page
**Check:**
1. Browser console (F12) for errors
2. Network tab - are API calls successful?
3. Verify environment variables in Render dashboard

**Fix:**
- Go to Render → Your Frontend → Environment
- Verify `VITE_BACKEND_URL` is set correctly
- Trigger manual deploy: "Manual Deploy" → "Deploy latest commit"

### CORS Errors in Console
**Error looks like:**
```
Access to fetch at 'https://e-commerce-app-backendgn.onrender.com/...' 
from origin 'https://your-frontend.onrender.com' has been blocked by CORS policy
```

**Fix:**
1. Go to backend service on Render
2. Environment tab
3. Add `CORS_ORIGINS=https://your-frontend.onrender.com,http://localhost:5173`
4. Save and wait for redeploy

### 404 Errors on API Calls
**Check:**
- Backend URL is correct: `https://e-commerce-app-backendgn.onrender.com`
- Backend service is running (not sleeping)
- Test backend directly in browser

**Fix:**
- Free Render services sleep after 15 minutes of inactivity
- First request wakes it up (takes ~30 seconds)
- Consider using a service to ping your backend every 10 minutes

### Environment Variables Not Working
**Check:**
- In Render dashboard, verify all variables are set
- Variable names are EXACT (case-sensitive)
- No extra spaces in values

**Fix:**
- Delete and re-add the variable
- Trigger manual redeploy
- Clear browser cache (Ctrl+Shift+Delete)

---

## 📊 Deployment Checklist

Before considering deployment complete:

- [ ] Backend is live: https://e-commerce-app-backendgn.onrender.com
- [ ] Backend health check works: `/health` returns `{"status":"ok"}`
- [ ] Frontend is deployed and accessible
- [ ] Frontend environment variables set correctly
- [ ] Backend CORS updated to allow frontend domain
- [ ] Can browse products on home page
- [ ] Can sign in as regular user
- [ ] Can sign in as admin
- [ ] Admin dashboard shows data
- [ ] Can create products as admin
- [ ] Can add items to cart as customer

---

## 📝 Current Configuration

### Frontend Environment Variables:
```env
VITE_BACKEND_URL=https://e-commerce-app-backendgn.onrender.com
VITE_CLERK_PUBLISHABLE_KEY=pk_test_cXVhbGl0eS1hcmFjaG5pZC0yNDE5LmNsZXJrLmFjY291bnRzLmRldiQ
```

### Backend Environment Variables (Already set):
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
CLERK_SECRET_KEY=sk_test_...
CLOUDINARY_CLOUD_NAME=dmm3xpxxj
CLOUDINARY_API_KEY=695362598892938
CLOUDINARY_API_SECRET=2ZNbBHXPf6Y8gVLU5xnKxaWuqbY
ADMIN_EMAIL=waadaaabarraa@gmail.com
RAZORPAY_KEY_ID=rzp_test_VE8hFvq1uhFdCW
RAZORPAY_KEY_SECRET=mLQpb8Y8fv5yW0ZhM4wLRs0Y
```

---

## 🎉 After Successful Deployment

You'll have:
- ✅ **Backend:** https://e-commerce-app-backendgn.onrender.com
- ✅ **Frontend:** https://your-frontend-name.onrender.com
- ✅ **GitHub Repo:** https://github.com/Wadabera/e-commerce-app

### Share Your Live Site! 🚀

Test everything works, then share your URLs!

---

## 📞 Need Help?

If you encounter issues:
1. Check Render logs (Dashboard → Service → Logs)
2. Check browser console (F12)
3. Verify all environment variables are set
4. Make sure backend CORS is configured
5. Test backend health endpoint first

---

**Ready to deploy? Follow the steps above!** 🚀

**Repository:** https://github.com/Wadabera/e-commerce-app  
**Backend:** https://e-commerce-app-backendgn.onrender.com  
**Next Step:** Deploy frontend using Method 1 or Method 2 above
