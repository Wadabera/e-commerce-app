# ✅ Render Deployment Checklist

## 📋 Pre-Deployment

### Git & GitHub
- [ ] Git installed
- [ ] GitHub account created
- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] All files committed (including render.yaml)

### Environment Files
- [ ] `server/.env` configured
- [ ] `client/.env` configured
- [ ] MongoDB connection string ready
- [ ] Clerk keys ready
- [ ] Cloudinary keys ready

### Code Ready
- [ ] Build scripts in package.json
- [ ] Start scripts in package.json
- [ ] Health endpoint exists (`/health`)
- [ ] CORS configured
- [ ] PORT from environment variable

---

## 🚀 Deployment Steps

### Render Account
- [ ] Render account created (https://render.com)
- [ ] GitHub connected to Render
- [ ] Repository access granted

### Backend Service
- [ ] Web Service created
- [ ] Repository connected
- [ ] Root directory set to `server`
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] Environment variables added
- [ ] Service deployed successfully
- [ ] Health check passing

### Frontend Service
- [ ] Static Site created
- [ ] Repository connected
- [ ] Root directory set to `client`
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory set to `dist`
- [ ] Environment variables added
- [ ] Service deployed successfully

---

## ⚙️ Configuration

### Backend Environment Variables
- [ ] `NODE_ENV=production`
- [ ] `PORT=5000`
- [ ] `MONGO_URI` (MongoDB connection)
- [ ] `CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] `CLOUDINARY_CLOUD_NAME`
- [ ] `CLOUDINARY_API_KEY`
- [ ] `CLOUDINARY_API_SECRET`
- [ ] `ADMIN_LOGIN_EMAIL`
- [ ] `ADMIN_LOGIN_PASSWORD`
- [ ] `CORS_ORIGINS` (frontend URL)

### Frontend Environment Variables
- [ ] `VITE_API_URL` (backend URL)
- [ ] `VITE_CLERK_PUBLISHABLE_KEY`

### Database
- [ ] MongoDB Atlas account created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] Connection tested

---

## 🔧 Post-Deployment

### URLs Updated
- [ ] Backend URL copied from Render
- [ ] Frontend URL copied from Render
- [ ] Backend `CORS_ORIGINS` updated with frontend URL
- [ ] Frontend `VITE_API_URL` updated with backend URL
- [ ] Services redeployed after URL updates

### Testing
- [ ] Frontend loads successfully
- [ ] Backend health check responds
- [ ] Admin login works
- [ ] Dashboard shows data
- [ ] Products display
- [ ] Image upload works
- [ ] Currency shows as ETB (Br)
- [ ] Cart functionality works
- [ ] No CORS errors in console

---

## 🔐 Security

### Credentials
- [ ] Admin password changed from default
- [ ] Environment variables set (not in code)
- [ ] `.env` files in `.gitignore`
- [ ] Sensitive keys rotated

### CORS
- [ ] CORS allows only your frontend domain
- [ ] No wildcard (*) in production
- [ ] HTTPS only

---

## 📊 Monitoring

### Render Dashboard
- [ ] Backend service running
- [ ] Frontend service running
- [ ] No errors in logs
- [ ] Build successful
- [ ] Health checks passing

### Application
- [ ] All features working
- [ ] No console errors
- [ ] API responses correct
- [ ] Database connected

---

## 🌐 Optional

### Custom Domain
- [ ] Domain purchased
- [ ] DNS configured
- [ ] Custom domain added to Render
- [ ] SSL certificate active
- [ ] CORS updated with custom domain

### Uptime Monitoring
- [ ] UptimeRobot configured
- [ ] Pinging backend every 14 minutes
- [ ] Email alerts set up

### Analytics
- [ ] Google Analytics added
- [ ] User tracking configured

---

## 🐛 Troubleshooting

### If Build Fails
- [ ] Check build logs in Render
- [ ] Verify package.json has build script
- [ ] Check Node version compatibility
- [ ] Verify all dependencies installed

### If Service Won't Start
- [ ] Check start logs
- [ ] Verify start command correct
- [ ] Check PORT environment variable
- [ ] Verify MongoDB connection

### If Frontend Shows Errors
- [ ] Check browser console
- [ ] Verify API URL correct
- [ ] Check CORS settings
- [ ] Verify backend is running

### If Database Connection Fails
- [ ] Check MongoDB Atlas network access
- [ ] Verify connection string format
- [ ] Check database user permissions
- [ ] Test connection locally first

---

## 📝 Documentation

- [ ] README updated with live URLs
- [ ] Deployment notes documented
- [ ] Environment variables documented
- [ ] Admin credentials documented (securely)

---

## 🎉 Launch

### Final Checks
- [ ] All features tested in production
- [ ] Performance acceptable
- [ ] No errors in production logs
- [ ] Backup strategy in place
- [ ] Rollback plan prepared

### Go Live
- [ ] Announce to stakeholders
- [ ] Share admin credentials securely
- [ ] Monitor for first 24 hours
- [ ] Document any issues

---

## 📞 Support Resources

- [ ] Render docs bookmarked (https://render.com/docs)
- [ ] MongoDB Atlas docs bookmarked
- [ ] Clerk docs bookmarked
- [ ] Cloudinary docs bookmarked
- [ ] Support contacts saved

---

## ✅ Deployment Complete!

**Your Ethiopian E-Commerce platform is live!**

- Frontend: ______________________________
- Backend: ______________________________
- Admin: waadaaabarraa@gmail.com

**Date Deployed:** ____________

**Deployed By:** ____________

---

**🎉 Congratulations! Your store is now live on the internet! 🇪🇹🚀**
