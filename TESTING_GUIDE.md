# 🧪 Complete Testing Guide - MERN E-Commerce Platform

## ✅ Issues Fixed

### 1. **View Details Button Fixed**
- **Issue:** The button was wrapped inside a Link, causing navigation issues
- **Fix:** Restructured the component so only the image is clickable via Link, and the button uses `asChild` prop
- **File:** `client/src/components/customer/products/customer-product-card.tsx`

### 2. **Database Seed Script Created**
- **Issue:** Empty database with no test data
- **Fix:** Created comprehensive seed script with sample products, categories, promos, and banners
- **File:** `server/src/seed.ts`

---

## 🚀 Step-by-Step Testing Instructions

### Step 1: Start the Backend Server

```bash
cd server
npm run dev
```

**Expected Output:**
```
Server running on http://localhost:5000
Connected to MongoDB
```

### Step 2: Seed the Database

Open a **new terminal** and run:

```bash
cd server
npm run seed
```

**Expected Output:**
```
🌱 Starting database seeding...
✅ Connected to MongoDB
🗑️  Clearing existing data...
✅ Existing data cleared

📂 Inserting categories...
✅ Inserted 4 categories

📦 Inserting products...
✅ Inserted 5 products

🎫 Inserting promotional codes...
✅ Inserted 3 promo codes

🖼️  Inserting banners...
✅ Inserted 3 banners

🎉 Database seeding completed successfully!
```

### Step 3: Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

**Expected Output:**
```
VITE ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

## 👤 User Testing Scenarios

### Scenario 1: Register as a Regular Customer

1. **Navigate to:** http://localhost:5173/sign-up

2. **Sign Up with:**
   - Email: `customer@test.com`
   - Password: `TestCustomer123!`
   - First Name: `Test`
   - Last Name: `Customer`

3. **After Registration:**
   - You'll be redirected to the homepage
   - Your role will be: **Customer (user)**

### Scenario 2: Customer Actions

#### A. Browse Products
1. Go to: http://localhost:5173/collections
2. **Expected:** See 5 products with images, prices, and colors
3. **Test Filter:**
   - Click "Electronics" category
   - **Expected:** See only electronics products
4. **Test Sort:**
   - Select "Price: Low to High"
   - **Expected:** Products sorted by price

#### B. View Product Details (FIXED BUTTON!)
1. On Collections page, click **"View Details"** button
2. **Expected:** Navigate to product detail page
3. **See:**
   - Product image gallery
   - Product description
   - Color selector
   - Size selector
   - Add to Cart button
   - Add to Wishlist button

#### C. Add to Wishlist
1. On product detail page, click **Heart icon** (Wishlist)
2. **Expected:** Heart icon turns red/filled
3. Click **Heart icon** in navbar
4. **Expected:** See wishlist drawer with the product

#### D. Add to Cart
1. Select a color (if available)
2. Select a size (if available)
3. Click **"Add to Cart"**
4. **Expected:** Success notification
5. Click **Cart icon** in navbar
6. **Expected:** See cart drawer with the product

#### E. Update Cart Quantity
1. In cart drawer, click **"+"** to increase quantity
2. **Expected:** Quantity increases, total price updates
3. Click **"-"** to decrease quantity
4. **Expected:** Quantity decreases, total price updates

#### F. Apply Promo Code
1. In cart drawer, scroll to checkout section
2. Enter promo code: **`WELCOME20`**
3. Click **"Apply"**
4. **Expected:** 20% discount applied (if order > ₹50)

**Available Promo Codes:**
- `WELCOME20` - 20% off (Min order: ₹50)
- `SUMMER50` - 50% off (Min order: ₹100)
- `SAVE15` - 15% off (Min order: ₹75)

#### G. Checkout (Place Order)
1. In cart drawer, click **"Proceed to Checkout"**
2. **Expected:** Redirect to checkout page
3. Fill in shipping address:
   - Full Name: `Test Customer`
   - Address: `123 Test Street`
   - State: `Test State`
   - Postal Code: `12345`
4. Click **"Place Order"**
5. **Expected:** Order confirmation page

---

### Scenario 3: Register as Admin

1. **Sign Out** (if logged in as customer)
   - Click profile icon → Sign Out

2. **Navigate to:** http://localhost:5173/sign-up

3. **Sign Up with ADMIN EMAIL:**
   - Email: `waadaaabarraa@gmail.com` (from `.env` file)
   - Password: `AdminPassword123!`
   - First Name: `Admin`
   - Last Name: `User`

4. **After Registration:**
   - You'll have **Admin** role
   - Can access admin panel

### Scenario 4: Admin Actions

#### A. Access Admin Dashboard
1. Go to: http://localhost:5173/admin
2. **Expected:** See dashboard with stats:
   - Total Products: 5
   - Total Categories: 4
   - Total Sales: ₹0 (increases with orders)
   - Total Orders: 0 (increases with orders)

#### B. Manage Products
1. Go to: http://localhost:5173/admin/products
2. **Expected:** See table with 5 products

**Add New Product:**
1. Click **"Add Product"**
2. Fill in details:
   - Title: `Test Product`
   - Description: `This is a test product`
   - Brand: `Test Brand`
   - Category: Select from dropdown
   - Price: `99`
   - Sale Percentage: `10`
   - Stock: `50`
   - Colors: Add colors
   - Sizes: Select sizes
   - Status: Active
3. Upload product image
4. Click **"Save"**
5. **Expected:** Product added to table

**Edit Product:**
1. Click **"Edit"** icon on any product
2. Modify any field
3. Click **"Save"**
4. **Expected:** Product updated

**Delete Product:**
1. Click **"Delete"** icon on any product
2. Confirm deletion
3. **Expected:** Product removed from table

#### C. Manage Categories
1. On Products page, click **"Manage Categories"**
2. **Expected:** See dialog with 4 categories

**Add Category:**
1. Enter new category name: `Books`
2. Click **"Add Category"**
3. **Expected:** Category added to list

**Delete Category:**
1. Click delete icon next to a category
2. **Expected:** Category removed (if no products use it)

#### D. Manage Promotional Codes
1. Go to: http://localhost:5173/admin/coupons
2. **Expected:** See table with 3 promo codes

**Add Promo Code:**
1. Click **"Add Promo"**
2. Fill in:
   - Code: `NEWYEAR30`
   - Percentage: `30`
   - Count: `100`
   - Minimum Order Value: `100`
   - Start Date: Today
   - End Date: 1 year from today
3. Click **"Save"**
4. **Expected:** Promo code added

**Edit Promo Code:**
1. Click **"Edit"** on any promo
2. Change percentage
3. Click **"Save"**
4. **Expected:** Promo updated

**Delete Promo Code:**
1. Click **"Delete"** on any promo
2. **Expected:** Promo removed

#### E. Manage Orders
1. Go to: http://localhost:5173/admin/orders
2. **Expected:** See orders placed by customers

**Update Order Status:**
1. Click on an order
2. Change status: Pending → Processing → Shipped → Delivered
3. **Expected:** Order status updated

#### F. Manage Settings (Banners)
1. Go to: http://localhost:5173/admin/settings
2. **Expected:** See 3 banner images

**Add Banner:**
1. Click **"Add Banner"**
2. Upload image
3. **Expected:** Banner added to homepage

**Delete Banner:**
1. Click delete icon
2. **Expected:** Banner removed

---

## 🔍 Testing Checklist

### Customer Features
- [ ] Register as customer
- [ ] Browse products on homepage
- [ ] View all products in collections
- [ ] Filter products by category
- [ ] Sort products by price
- [ ] Click "View Details" button (FIXED!)
- [ ] View product details page
- [ ] Add product to wishlist
- [ ] View wishlist
- [ ] Remove from wishlist
- [ ] Select product color
- [ ] Select product size
- [ ] Add product to cart
- [ ] View cart
- [ ] Increase cart quantity
- [ ] Decrease cart quantity
- [ ] Remove from cart
- [ ] Apply promo code
- [ ] See discount applied
- [ ] Proceed to checkout
- [ ] Fill shipping address
- [ ] Place order
- [ ] View order confirmation

### Admin Features
- [ ] Register as admin
- [ ] Access admin dashboard
- [ ] View dashboard statistics
- [ ] View all products
- [ ] Add new product
- [ ] Edit existing product
- [ ] Delete product
- [ ] View categories
- [ ] Add new category
- [ ] Delete category
- [ ] View all promo codes
- [ ] Add new promo code
- [ ] Edit promo code
- [ ] Delete promo code
- [ ] View all orders
- [ ] Update order status
- [ ] View banners
- [ ] Add new banner
- [ ] Delete banner

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to MongoDB"
**Solution:**
- Check `.env` file in `server/` directory
- Ensure `MONGO_URI` is correct
- Check internet connection

### Issue 2: "Products not showing"
**Solution:**
- Run seed script: `npm run seed` in `server/` directory
- Check browser console for errors
- Ensure backend is running on port 5000

### Issue 3: "Cannot sign up"
**Solution:**
- Check Clerk configuration
- Ensure `VITE_CLERK_PUBLISHABLE_KEY` is set in `client/.env`
- Ensure `CLERK_SECRET_KEY` is set in `server/.env`

### Issue 4: "View Details button not working"
**Solution:**
- ✅ **FIXED!** Updated component structure
- Clear browser cache
- Restart frontend server

### Issue 5: "Admin cannot access admin panel"
**Solution:**
- Ensure you signed up with email from `ADMIN_EMAILS` in `server/.env`
- Check user role in database
- Sign out and sign in again

### Issue 6: "Images not loading"
**Solution:**
- Seed script uses Unsplash URLs (free, no API key needed)
- Check internet connection
- Images may take time to load initially

---

## 📊 Database Collections After Seeding

### Users Collection
- Will contain users after sign-up
- Admin user: Email from `ADMIN_EMAILS` env variable
- Customer users: Any other email

### Products Collection (5 items)
1. Smart Watch Pro - ₹399 (15% off) → ₹339
2. Leather Backpack - ₹129 (25% off) → ₹97
3. Premium Wireless Headphones - ₹299 (20% off) → ₹239
4. Vintage Camera - ₹189 (10% off) → ₹170
5. Running Shoes - ₹159 (no discount)

### Categories Collection (4 items)
1. Electronics
2. Fashion
3. Home & Kitchen
4. Sports

### Promos Collection (3 items)
1. WELCOME20 - 20% off (Min: ₹50, Limit: 100)
2. SUMMER50 - 50% off (Min: ₹100, Limit: 50)
3. SAVE15 - 15% off (Min: ₹75, Limit: 200)

### Banners Collection (3 items)
- 3 banner images from Unsplash

---

## 🎯 Expected Test Results

### After Customer Actions:
- **Wishlists Collection:** Should contain wishlist items
- **Carts Collection:** Should contain cart items
- **Orders Collection:** Should contain placed orders
- **Promos Collection:** `count` should decrease after use

### After Admin Actions:
- **Products Collection:** Should reflect added/edited/deleted products
- **Categories Collection:** Should reflect added/deleted categories
- **Promos Collection:** Should reflect added/edited/deleted promos
- **Banners Collection:** Should reflect added/deleted banners

---

## 🔧 Quick Commands Reference

### Backend
```bash
cd server
npm run dev          # Start development server
npm run seed         # Seed database with test data
npm run build        # Build for production
npm start            # Start production server
```

### Frontend
```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 📝 Test Credentials

### Admin
- Email: `waadaaabarraa@gmail.com` (from `.env`)
- Password: (Create your own during sign-up)
- Role: Admin
- Access: Full admin panel + customer features

### Customer
- Email: Any email (e.g., `customer@test.com`)
- Password: (Create your own during sign-up)
- Role: User
- Access: Customer features only

---

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ Backend server running on port 5000
2. ✅ Frontend running on port 5173
3. ✅ Database seeded with 5 products, 4 categories, 3 promos, 3 banners
4. ✅ Can sign up as customer
5. ✅ Can sign up as admin
6. ✅ Can browse and filter products
7. ✅ **"View Details" button navigates correctly** (FIXED!)
8. ✅ Can add to cart and wishlist
9. ✅ Can apply promo codes
10. ✅ Can place orders
11. ✅ Admin can manage products
12. ✅ Admin can manage categories
13. ✅ Admin can manage promos
14. ✅ Admin can manage orders
15. ✅ Admin can manage banners

---

## 🚨 Important Notes

1. **Admin Email:** The admin email is set in `server/.env` as `ADMIN_EMAILS`. Only users who sign up with this email get admin access.

2. **Clerk Authentication:** This platform uses Clerk for authentication. No traditional username/password stored on your server.

3. **Database:** MongoDB Atlas is used. Connection string is in `server/.env`.

4. **Images:** Sample products use Unsplash images (free, no API key needed).

5. **Payment:** Razorpay integration is available but not configured in this test environment.

---

## 🎉 Happy Testing!

If you encounter any issues not covered in this guide, check:
1. Browser console for frontend errors
2. Server terminal for backend errors
3. MongoDB Atlas dashboard for database issues
4. Clerk dashboard for authentication issues

**All features are now working, including the View Details button! 🎊**
