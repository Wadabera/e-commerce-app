# 🔄 How to Restart Backend Server

## ⚠️ IMPORTANT: Backend Must Be Restarted!

The backend server was started BEFORE we added the admin credentials to `.env`.
**Node.js loads environment variables only on startup**, so you MUST restart it!

---

## 🎯 Quick Restart Instructions

### Step 1: Find the Terminal Running Backend
Look for the terminal window that shows:
```
Server is now listening to port 5000
```

### Step 2: Stop the Server
In that terminal, press:
```
Ctrl + C
```

### Step 3: Restart the Server
In the same terminal, run:
```bash
npm run dev
```

### Step 4: Wait for Confirmation
You should see:
```
Server is now listening to port 5000
Connected to MongoDB
```

---

## ✅ Now Test Admin Login

1. Go to: **http://localhost:5174/admin-login**
2. Enter:
   - Email: `waadaaabarraa@gmail.com`
   - Password: `Admin@12345`
3. Click "Sign In as Admin"
4. You should be redirected to the admin dashboard!

---

## 🐛 If It Still Says "Invalid Credentials"

### Check 1: Backend Server Restarted?
Make sure you actually restarted the backend server (Ctrl+C then `npm run dev`)

### Check 2: Correct Credentials?
- Email: `waadaaabarraa@gmail.com` (no spaces, exact spelling)
- Password: `Admin@12345` (capital A, @, numbers)

### Check 3: Check Browser Console
1. Press F12 in browser
2. Go to Console tab
3. Look for any errors
4. Check Network tab for the API response

### Check 4: Test API Directly
Run this in PowerShell to test the endpoint:
```powershell
$body = @{email='waadaaabarraa@gmail.com'; password='Admin@12345'} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:5000/auth/admin-login" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
```

If this returns an error, the backend isn't loading the .env correctly.

---

## 📝 What's in Your .env File

Your `server/.env` file has these admin credentials:
```
ADMIN_LOGIN_EMAIL=waadaaabarraa@gmail.com
ADMIN_LOGIN_PASSWORD=Admin@12345
```

These are loaded when the backend starts. That's why **restart is required!**

---

## 🚀 Quick Summary

1. **Stop backend:** Ctrl + C in backend terminal
2. **Start backend:** `npm run dev` in server folder
3. **Test login:** http://localhost:5174/admin-login
4. **Use credentials:** waadaaabarraa@gmail.com / Admin@12345

---

**After restarting, it will work! The credentials are correct in the .env file.** ✅
