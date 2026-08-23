# 🚀 Quick Start Guide

## ✅ What's Been Fixed

1. **View Details Button** - Now working correctly!
2. **Database Seed Script** - Created to populate database with test data
3. **Comprehensive Testing Guide** - Step-by-step instructions

---

## 🎯 3-Minute Setup

### Step 1: Seed the Database (IMPORTANT!)
Open a terminal in the `server` folder:

```bash
cd server
npm run seed
```

This will populate your empty database with:
- 5 Products
- 4 Categories  
- 3 Promo Codes
- 3 Banners

### Step 2: Verify Servers are Running

**Backend** should be running on: http://localhost:5000
**Frontend** should be running on: http://localhost:5173

If not, start them:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Step 3: Test the Platform

#### Option A: Test as Customer
1. Go to: http://localhost:5173/sign-up
2. Sign up with: `customer@test.com`
3. Password: `TestCustomer123!`
4. Browse products: http://localhost:5173/collections
5. **Click "View Details" button** - It works now! ✅

#### Option B: Test as Admin
1. Go to: http://localhost:5173/sign-up
2. Sign up with: `waadaaabarraa@gmail.com` (admin email)
3. Password: `AdminPassword123!`
4. Go to admin panel: http://localhost:5173/admin
5. Manage products, orders, promos!

---

## 📋 Quick Test Checklist

### Customer Actions:
- [ ] Browse products on http://localhost:5173/collections
- [ ] Click **"View Details"** button (FIXED!)
- [ ] Add product to cart
- [ ] Add product to wishlist
- [ ] Apply promo code: `WELCOME20`
- [ ] Place an order

### Admin Actions:
- [ ] Access admin panel: http://localhost:5173/admin
- [ ] View dashboard statistics
- [ ] Add/edit/delete products
- [ ] Manage promotional codes
- [ ] View orders
- [ ] Manage banners

---

## 🎫 Available Promo Codes

- `WELCOME20` - 20% off (Min order: ₹50)
- `SUMMER50` - 50% off (Min order: ₹100)
- `SAVE15` - 15% off (Min order: ₹75)

---

## 📦 Seeded Products

1. **Smart Watch Pro** - ₹339 (15% off)
2. **Leather Backpack** - ₹97 (25% off)
3. **Premium Wireless Headphones** - ₹239 (20% off)
4. **Vintage Camera** - ₹170 (10% off)
5. **Running Shoes** - ₹159

---

## 🆘 Need More Help?

Read the complete **TESTING_GUIDE.md** for:
- Detailed step-by-step instructions
- All features testing scenarios
- Troubleshooting common issues
- Expected results at each step

---

## 🎉 You're All Set!

The platform is ready to use. The database is populated, and the **View Details button is working**! 

Start testing and enjoy! 🚀
