# 🚀 Quick Start - Frontend Connected to Render Backend

## ✅ What's Done

- Backend deployed: `https://e-commerce-app-backe.onrender.com`
- Frontend configured to connect to Render backend
- All files updated and pushed to GitHub

---

## 🎯 Test Locally (Recommended)

Run the frontend locally to test with your deployed backend:

```bash
cd client
npm install
npm run dev
```

**Result:**
- Frontend runs at: `http://localhost:5173`
- Connects to backend: `https://e-commerce-app-backe.onrender.com`

**Test it:**
1. Open browser: http://localhost:5173
2. Try to sign in or browse products
3. Check browser console (F12) - should see API calls to `https://e-commerce-app-backe.onrender.com`

---

## 🌐 Deploy Frontend to Render

### Option 1: Automatic (Blueprint)
1. Go to: https://dashboard.render.com/
2. Click **"New +"** → **"Blueprint"**
3. Connect repository: `Wadabera/e-commerce-app`
4. Branch: `main`
5. Click **"Apply"**
6. Render will automatically deploy both frontend and backend using `render.yaml`

### Option 2: Manual (Static Site)
1. Go to: https://dashboard.render.com/
2. Click **"New +"** → **"Static Site"**
3. Connect repository: `Wadabera/e-commerce-app`
4. **Settings:**
   - Name: `ecommerce-frontend` (or any name)
   - Branch: `main`
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
5. **Environment Variables:**
   ```
   VITE_BACKEND_URL=https://e-commerce-app-backe.onrender.com
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_cXVhbGl0eS1hcmFjaG5pZC0yNDE5LmNsZXJrLmFjY291bnRzLmRldiQ
   ```
6. Click **"Create Static Site"**

---

## 🔧 Important: Update Backend CORS

Your backend needs to allow requests from your frontend domain.

### In Render Backend Dashboard:

1. Go to your backend service: https://dashboard.render.com/
2. Click on: `e-commerce-app-backe` (or your backend service name)
3. Go to **"Environment"** tab
4. Add/Update this variable:
   ```
   CORS_ORIGINS=https://your-frontend-name.onrender.com,http://localhost:5173
   ```
   Replace `your-frontend-name` with the actual name Render gives your frontend

---

## 📋 Current Configuration

### Local Development (.env)
```env
VITE_BACKEND_URL=https://e-commerce-app-backe.onrender.com
```
- Frontend connects to deployed backend
- Good for testing without running backend locally

### Render Deployment (render.yaml)
```yaml
VITE_BACKEND_URL=https://e-commerce-app-backe.onrender.com
```
- Frontend on Render connects to backend on Render
- Production setup

### Docker Development (docker-compose.yml)
```yaml
VITE_BACKEND_URL=http://localhost:5000
```
- If you want to run everything locally in Docker
- Both frontend and backend run in containers

---

## 🧪 Testing Checklist

After deploying frontend:

- [ ] Frontend loads without errors
- [ ] Can view products on home page
- [ ] Can sign in (regular user)
- [ ] Can sign in as admin (waadaaabarraa@gmail.com / Admin@12345)
- [ ] Admin dashboard shows data
- [ ] Can create products (admin)
- [ ] Can add items to cart (customer)
- [ ] API calls appear in Network tab (F12)

---

## 🐛 Troubleshooting

### Frontend shows blank page
- Check browser console for errors
- Verify `VITE_BACKEND_URL` is set correctly
- Check Network tab - are API calls failing?

### API calls fail with CORS error
- Update backend `CORS_ORIGINS` to include your frontend URL
- Restart backend service on Render

### 404 errors on API calls
- Verify backend URL is correct: `https://e-commerce-app-backe.onrender.com`
- Check backend is running on Render
- Test backend directly: https://e-commerce-app-backe.onrender.com/health

### Environment variables not working
- In Render dashboard, verify environment variables are set
- After changing env vars, Render will auto-redeploy
- Clear browser cache and hard refresh (Ctrl+Shift+R)

---

## 📂 Files Changed

✅ `client/.env` - Backend URL updated
✅ `.env.render.frontend` - Backend URL updated  
✅ `render.yaml` - Frontend env var fixed
✅ `docker-compose.yml` - Consistent env var naming
✅ All pushed to GitHub

---

## 🎉 Next Steps

1. **Test locally:** `cd client && npm run dev`
2. **Deploy frontend** to Render (choose method above)
3. **Update backend CORS** to allow frontend domain
4. **Test production** - sign in, browse, add to cart
5. **Share your live URLs!** 🚀

---

**Repository:** https://github.com/Wadabera/e-commerce-app  
**Backend:** https://e-commerce-app-backe.onrender.com  
**Frontend:** (After deployment) https://your-frontend-name.onrender.com
