# 👨‍💼 Admin Dashboard - Complete Guide

## 🔐 Authentication (No Username/Password Required)

Your platform uses **Clerk** for secure authentication:
- ✅ Email-based sign-up (no traditional username)
- ✅ No password storage on your servers
- ✅ Secure token-based authentication
- ✅ OAuth integration (Google sign-in available)

---

## 🎯 How to Access Admin Dashboard

### Step 1: Navigate to Admin Area
```
http://localhost:5173/admin
```

### Step 2: Sign Up as Admin
**Admin Email:** `sangammukherjee2022@gmail.com`

**Process:**
1. Click "Sign up" link
2. Enter email: `sangammukherjee2022@gmail.com`
3. Create a password (minimum 15 characters required)
   - Example: `AdminPassword123456`
4. Verify email (if required)
5. You're automatically an **ADMIN** ✅

### Step 3: Access Dashboard
After signing in with the admin email, you'll be redirected to:
- **Admin Dashboard:** `/admin` or `/admin/dashboard`
- Full admin features unlocked

---

## 📊 Admin Dashboard Features

### 1. Dashboard (Home) - `/admin/dashboard`
```
📈 Key Statistics:
├─ Total Products: Count of all products in catalog
├─ Total Categories: Count of product categories
├─ Total Sales: Sum of all paid orders
├─ Total Orders: Count of all orders
└─ Returned Orders: Count of orders with "returned" status
```

**What You Can Do:**
- View real-time sales metrics
- Monitor inventory status
- Track order performance
- Quick overview of store health

### 2. Products Management - `/admin/products`
```
🛍️ Product Operations:
├─ View all products
├─ Add new product
├─ Edit product details
├─ Update product images
├─ Manage pricing and discounts
├─ Change product status
└─ Delete products (if needed)
```

**Fields You Can Manage:**
- Product Name
- Description
- Price
- Discount Percentage
- Product Images
- Category Assignment
- Stock Level
- Brand/Manufacturer

**Current Products in System:**
1. Smart Watch Pro (TechWatch) - ₹399 (15% off)
2. Leather Backpack (UrbanStyle) - ₹129 (25% off)
3. Premium Wireless Headphones (AudioTech) - ₹299 (20% off)
4. Vintage Camera (PhotoGear) - ₹189 (10% off)
5. Running Shoes (SportFit) - ₹159

### 3. Orders Management - `/admin/orders`
```
📦 Order Operations:
├─ View all customer orders
├─ Filter by order status
├─ Track payment status
├─ Update order status
├─ View customer details
├─ Track shipment
└─ Process returns/refunds
```

**Order Details Available:**
- Order ID
- Customer Name & Email
- Order Date
- Items Ordered
- Total Amount
- Payment Status (pending, paid, failed)
- Order Status (processing, shipped, delivered, returned)
- Delivery Address

### 4. Promotions/Coupons - `/admin/promo`
```
🎟️ Coupon Operations:
├─ Create new promo codes
├─ Edit coupon details
├─ Set discount percentage
├─ Set minimum order value
├─ Limit coupon usage
├─ Track coupon redemptions
└─ Deactivate/Delete coupons
```

**Current Active Coupons:**
1. **WELCOME20** - 20% discount
   - Min Order: ₹50
   - Usage Limit: 100
   - Uses Remaining: 100 (at launch)

2. **SUMMER50** - 50% discount
   - Min Order: ₹100
   - Usage Limit: 50
   - Uses Remaining: 50 (at launch)

3. **SAVE15** - 15% discount
   - Min Order: ₹75
   - Usage Limit: 200
   - Uses Remaining: 200 (at launch)

### 5. Settings - `/admin/settings`
```
⚙️ Configuration:
├─ Store settings
├─ Notifications preferences
├─ Payment gateway settings
├─ Email configuration
├─ Tax settings
└─ General site configuration
```

**Settings Categories:**
- Store name and description
- Email notifications
- Order notifications
- Admin contact info
- Shipping settings
- Tax rates
- Currency settings

---

## 🔒 Security & Access Control

### Admin Requirements
✅ **Only users with admin email can access:**
- Admin email: `sangammukherjee2022@gmail.com`
- Automatically assigned admin role on sign-up
- No additional approval needed

### Protected Routes
```
/admin/*                    → Requires Clerk authentication
/admin/dashboard            → Requires admin role
/admin/products             → Requires admin role
/admin/orders               → Requires admin role
/admin/promo                → Requires admin role
/admin/settings             → Requires admin role
```

### What Gets Protected
- ✅ All admin API endpoints require authentication
- ✅ Admin role verification on backend
- ✅ Clerk middleware validates JWT tokens
- ✅ Non-admin users redirected to login

---

## 📋 Admin API Endpoints

### Dashboard Stats
```
GET /admin/dashboard/lite

Response:
{
  "status": "success",
  "data": {
    "totalProducts": 5,
    "totalCategories": 4,
    "totalSales": 12450,
    "totalOrders": 45,
    "totalReturnedOrders": 2
  }
}
```

### Products Management
```
GET /admin/products                    → Get all products
POST /admin/products                   → Create new product
GET /admin/products/:id                → Get product details
PUT /admin/products/:id                → Update product
DELETE /admin/products/:id             → Delete product
```

### Orders Management
```
GET /admin/orders                      → Get all orders
GET /admin/orders/:id                  → Get order details
PUT /admin/orders/:id/status          → Update order status
```

### Promotions Management
```
GET /admin/promo                       → Get all promos
POST /admin/promo                      → Create new promo
PUT /admin/promo/:id                   → Update promo
DELETE /admin/promo/:id                → Delete promo
```

---

## 🚀 Admin Workflow Example

### Example 1: Add New Product
```
1. Click "Products" in admin menu
2. Click "Add New Product" button
3. Fill in details:
   - Name: "Bluetooth Speaker"
   - Price: ₹1999
   - Discount: 15%
   - Category: Electronics
   - Image: Upload image
4. Click "Save Product"
5. Product appears in store instantly
```

### Example 2: Create Promotional Code
```
1. Click "Promotions" in admin menu
2. Click "Create Coupon" button
3. Fill in details:
   - Code: NEWYEAR25
   - Discount: 25%
   - Min Order: ₹100
   - Usage Limit: 500
4. Click "Create"
5. Code active immediately for customers
```

### Example 3: Update Order Status
```
1. Click "Orders" in admin menu
2. Find order in list
3. Click on order
4. Change status from "Processing" to "Shipped"
5. Customer receives notification
6. Click "Save"
```

---

## 🔧 Troubleshooting Admin Access

### Issue: "Access Denied" on `/admin`
**Solution:** Make sure you signed up with the exact admin email:
- Email: `sangammukherjee2022@gmail.com`
- Verify no typos

### Issue: Can't Sign Up
**Solution:** 
- Check that Clerk is configured (development mode is fine for testing)
- Ensure .env file has Clerk keys configured
- Try Google OAuth if email sign-up has issues

### Issue: Admin Dashboard Not Loading
**Solution:**
- Verify both servers are running (backend on 5000, frontend on 5173)
- Check browser console for errors
- Clear browser cache and try again
- Ensure MongoDB connection is active

---

## 📧 Backend Role-Based Access

### Middleware Protection (server/src/middleware/auth.ts)
```typescript
// requireAdmin middleware checks:
1. User is authenticated (Clerk JWT token valid)
2. User's email matches ADMIN_EMAILS configuration
3. User has admin role assigned
4. If all checks pass → Allow access
5. If any check fails → Return 403 Forbidden
```

### Admin Email Configuration (server/.env)
```
ADMIN_EMAILS=sangammukherjee2022@gmail.com
```

Change this to add more admin emails:
```
ADMIN_EMAILS=admin1@example.com,admin2@example.com,sangammukherjee2022@gmail.com
```

---

## ✨ Admin Features in Development

### Coming Soon
- [ ] Bulk product import/export
- [ ] Advanced order filtering
- [ ] Inventory management system
- [ ] Customer management interface
- [ ] Sales reports and analytics
- [ ] Automated email notifications
- [ ] Admin activity logs
- [ ] Multi-admin support with role levels

---

## 📱 Admin Dashboard UI Components

### Navigation Menu
```
┌─────────────────────┐
│   E-Shopify Admin   │
├─────────────────────┤
│ Dashboard           │
│ Products            │
│ Orders              │
│ Promotions          │
│ Settings            │
│ Logout              │
└─────────────────────┘
```

### Dashboard Cards
```
┌─────────────────┐  ┌─────────────────┐
│ Total Products  │  │ Total Categories│
│       5         │  │        4        │
└─────────────────┘  └─────────────────┘

┌─────────────────┐  ┌─────────────────┐
│  Total Sales    │  │  Total Orders   │
│   ₹12,450       │  │       45        │
└─────────────────┘  └─────────────────┘
```

---

## 🎯 Quick Access Links

| Feature | URL | Purpose |
|---------|-----|---------|
| Admin Home | `http://localhost:5173/admin` | Dashboard |
| Products | `http://localhost:5173/admin/products` | Manage inventory |
| Orders | `http://localhost:5173/admin/orders` | Manage sales |
| Promotions | `http://localhost:5173/admin/promo` | Create coupons |
| Settings | `http://localhost:5173/admin/settings` | Configure store |

---

## 💡 Important Notes

### Development Mode
- ⚠️ Clerk is running in development mode
- ⚠️ Only for testing (not production-ready)
- ✅ Fully functional for development
- ℹ️ See "Development mode" indicator in UI

### Production Deployment
Before going to production:
1. Upgrade Clerk to production plan
2. Configure production Clerk app keys
3. Update ADMIN_EMAILS to your actual admin
4. Enable production database backups
5. Set up monitoring and logging
6. Configure HTTPS/SSL

---

## 🔐 Security Best Practices

### For Admin Users
1. **Use Strong Passwords**
   - Minimum 15 characters
   - Mix of letters, numbers, symbols

2. **Keep Email Secure**
   - Only use admin email for authorized personnel
   - Don't share admin credentials

3. **Regular Backups**
   - Backup MongoDB regularly
   - Keep backup of product images
   - Archive old orders

4. **Audit Activity**
   - Review admin activity logs
   - Monitor order modifications
   - Track coupon usage

---

## 📞 Support & Documentation

### Key Files
```
Backend:
├─ server/src/middleware/auth.ts          (Admin verification)
├─ server/src/routes/admin/               (Admin API endpoints)
│  ├─ dashboard.routes.ts
│  ├─ product.routes.ts
│  ├─ orders.routes.ts
│  ├─ promo.routes.ts
│  └─ settings.routes.ts
└─ server/.env                            (Admin email config)

Frontend:
├─ client/src/pages/admin/                (Admin UI pages)
│  ├─ Dashboard.tsx
│  ├─ Products.tsx
│  ├─ Orders.tsx
│  ├─ Promos.tsx
│  └─ Settings.tsx
└─ client/src/features/admin/             (Admin logic & stores)
```

---

## ✅ Checklist for Admin Setup

- [ ] Both servers running (backend & frontend)
- [ ] Clerk development keys configured
- [ ] MongoDB connected with sample data
- [ ] Navigate to http://localhost:5173/admin
- [ ] Sign up with admin email: sangammukherjee2022@gmail.com
- [ ] Access admin dashboard
- [ ] Verify all sections load (Dashboard, Products, Orders, Promos, Settings)
- [ ] Test creating a new product
- [ ] Test creating a promotional code
- [ ] Test viewing orders (will show 0 initially)

---

**Admin Dashboard Status: ✅ FULLY OPERATIONAL**

All admin features are implemented and ready to use. Just sign up with the admin email to get started!

---

*Admin Dashboard Documentation - August 2026*
