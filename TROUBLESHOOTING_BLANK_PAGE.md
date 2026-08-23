# 🔧 Troubleshooting: Blank Page Issue

## ✅ Current Status

Your servers are running:
- ✅ **Backend:** Running on port 5000 (MongoDB connected)
- ✅ **Frontend:** Running on port **5174** (NOT 5173 - port was in use)

## 🎯 Solution: Use the Correct URL

### Open your browser and go to:
```
http://localhost:5174
```

**⚠️ IMPORTANT:** The frontend is on port **5174**, NOT 5173!

Port 5173 was already in use by another process, so Vite automatically switched to 5174.

---

## 📋 Quick Checklist

If the page is still blank, try these steps:

### 1. Clear Browser Cache
- Press `Ctrl + Shift + Delete`
- Select "Cached images and files"
- Click "Clear data"
- Refresh page with `Ctrl + F5`

### 2. Check Browser Console
- Press `F12` to open DevTools
- Go to "Console" tab
- Look for any red error messages
- **Common errors to look for:**
  - CORS errors
  - Failed to fetch errors
  - Module not found errors

### 3. Check Network Tab
- Press `F12` to open DevTools
- Go to "Network" tab
- Refresh the page
- Check if files are loading (look for red failed requests)

### 4. Try Different Browser
Sometimes browser extensions can interfere:
- Try opening in Chrome Incognito mode: `Ctrl + Shift + N`
- Or try a different browser (Edge, Firefox)

### 5. Restart the Frontend Server
If still not working, restart the frontend:
```powershell
# In the client terminal, press Ctrl+C to stop
# Then restart:
npm run dev
```

---

## 🔍 Verify Servers Are Running

### Check Backend (Port 5000):
```powershell
curl http://localhost:5000/health
```
Should return a response (even if 404, server is running)

### Check Frontend (Port 5174):
Open browser to: `http://localhost:5174`

---

## 🐛 Common Issues & Solutions

### Issue 1: "This site can't be reached"
**Cause:** Frontend server not running

**Solution:**
```powershell
cd c:\Users\Baha\Downloads\1776082915315-7635f9fc5f355fec\mern-ecommerce-2026\client
npm run dev
```

### Issue 2: Blank white page, no errors
**Cause:** JavaScript not loading or React error

**Solution:**
1. Open DevTools Console (F12)
2. Look for error messages
3. Try hard refresh: `Ctrl + Shift + R`
4. Clear browser cache and reload

### Issue 3: Page loads but shows "Clerk is not configured"
**Cause:** Missing environment variable

**Solution:**
Check `client/.env` has:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_cXVhbGl0eS1hcmFjaG5pZC0yNDE5LmNsZXJrLmFjY291bnRzLmRldiQ
VITE_BACKEND_URL=http://localhost:5000
```

### Issue 4: CORS errors in console
**Cause:** Backend not allowing frontend port

**Solution:**
Check `server/.env` has port 5174:
```
CORS_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:3000
```

### Issue 5: "Failed to fetch" errors
**Cause:** Backend not running

**Solution:**
```powershell
cd c:\Users\Baha\Downloads\1776082915315-7635f9fc5f355fec\mern-ecommerce-2026\server
npm run dev
```

---

## 🔧 Manual Server Start (If Needed)

### Terminal 1 - Backend:
```powershell
cd c:\Users\Baha\Downloads\1776082915315-7635f9fc5f355fec\mern-ecommerce-2026\server
npm run dev
```

**Expected output:**
```
MongoDB connected
Server is now listening to port 5000
```

### Terminal 2 - Frontend:
```powershell
cd c:\Users\Baha\Downloads\1776082915315-7635f9fc5f355fec\mern-ecommerce-2026\client
npm run dev
```

**Expected output:**
```
VITE v8.0.2  ready in XXXXms
➜  Local:   http://localhost:5174/
```

---

## ✅ What You Should See

### On Homepage (`http://localhost:5174`):
- Navigation bar with logo
- Hero section with banner images
- Product collections
- Categories
- Footer

### On Admin Login (`http://localhost:5174/admin-login`):
- Admin login form
- Email and password fields
- "Sign In as Admin" button

---

## 🎯 Test URLs

Once the frontend loads, test these URLs:

### Customer Pages:
- Home: `http://localhost:5174/`
- Sign Up: `http://localhost:5174/sign-up`
- Sign In: `http://localhost:5174/sign-in`
- Collections: `http://localhost:5174/collections`

### Admin Pages:
- Admin Login: `http://localhost:5174/admin-login`
- Admin Dashboard: `http://localhost:5174/admin` (after login)
- Products: `http://localhost:5174/admin/products`
- Orders: `http://localhost:5174/admin/orders`

---

## 🔍 Debug Commands

### Check if ports are listening:
```powershell
# Check port 5000 (backend)
netstat -ano | findstr :5000

# Check port 5174 (frontend)
netstat -ano | findstr :5174
```

### Check processes:
```powershell
# See what's using port 5173 (the occupied port)
netstat -ano | findstr :5173
```

### Kill a process if needed:
```powershell
# Replace XXXX with the PID from netstat command
taskkill /PID XXXX /F
```

---

## 🚨 If Nothing Works

### Nuclear Option - Complete Restart:

1. **Stop all servers:**
   - Press `Ctrl+C` in both terminals
   - Or close the terminals

2. **Check no node processes are running:**
```powershell
taskkill /IM node.exe /F
```

3. **Clear all caches:**
```powershell
# Clear npm cache
cd c:\Users\Baha\Downloads\1776082915315-7635f9fc5f355fec\mern-ecommerce-2026\client
npm cache clean --force

# Clear vite cache
Remove-Item -Recurse -Force node_modules/.vite -ErrorAction SilentlyContinue
```

4. **Restart servers:**
```powershell
# Terminal 1
cd c:\Users\Baha\Downloads\1776082915315-7635f9fc5f355fec\mern-ecommerce-2026\server
npm run dev

# Terminal 2
cd c:\Users\Baha\Downloads\1776082915315-7635f9fc5f355fec\mern-ecommerce-2026\client
npm run dev
```

5. **Open fresh browser window:**
   - Use incognito/private mode
   - Go to `http://localhost:5174`

---

## 📞 Still Having Issues?

### Check Browser Console for Errors

1. Press `F12` to open DevTools
2. Go to Console tab
3. Look for red errors

### Common Error Messages:

**Error:** `Failed to fetch dynamically imported module`
**Fix:** Clear browser cache, hard refresh (Ctrl+Shift+R)

**Error:** `Clerk is not configured`
**Fix:** Check client/.env file has VITE_CLERK_PUBLISHABLE_KEY

**Error:** `Network Error` or `ERR_CONNECTION_REFUSED`
**Fix:** Backend not running, start server on port 5000

**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`
**Fix:** Add port 5174 to server/.env CORS_ORIGINS (already done)

---

## ✅ Success Indicators

You'll know it's working when:

1. ✅ Browser opens `http://localhost:5174`
2. ✅ Page loads (not blank)
3. ✅ You see the e-commerce homepage
4. ✅ Navigation bar is visible
5. ✅ No errors in browser console (F12)
6. ✅ Can navigate to different pages

---

## 🎉 Quick Summary

### The Fix:
**Use port 5174 instead of 5173!**

### The URL:
```
http://localhost:5174
```

### Why:
Port 5173 was already in use, so Vite automatically switched to port 5174.

### Next Steps:
1. Open `http://localhost:5174` in your browser
2. Test the homepage loads
3. Try admin login at `http://localhost:5174/admin-login`
4. Test user registration at `http://localhost:5174/sign-up`

---

That's it! Your application should now be visible in the browser. 🚀
