/**
 * Seed Script for E-Shopify Database
 *
 * This script populates the MongoDB database with sample data for testing
 * Usage: npx ts-node seed.ts
 *
 * ⚠️ WARNING: This script will INSERT data. In production, use with caution.
 */

import "dotenv/config";
import mongoose from "mongoose";

// Sample data
const sampleBanners = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=400&fit=crop",
    createdAt: new Date("2026-08-01"),
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=400&fit=crop",
    createdAt: new Date("2026-08-05"),
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&h=400&fit=crop",
    createdAt: new Date("2026-08-10"),
  },
];

const sampleCategories = [
  { name: "Electronics" },
  { name: "Fashion" },
  { name: "Home & Kitchen" },
  { name: "Sports" },
];

const sampleProducts = [
  {
    title: "Premium Wireless Headphones",
    brand: "AudioTech",
    description: "High-quality wireless headphones with noise cancellation",
    price: 299,
    salePercentage: 20,
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop",
        isCover: true,
      },
    ],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Smart Watch Pro",
    brand: "TechWatch",
    description: "Advanced smartwatch with health tracking features",
    price: 399,
    salePercentage: 15,
    images: [
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop",
        isCover: true,
      },
    ],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Vintage Camera",
    brand: "PhotoGear",
    description: "Classic vintage camera in excellent condition",
    price: 189,
    salePercentage: 10,
    images: [
      {
        url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=500&fit=crop",
        isCover: true,
      },
    ],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Leather Backpack",
    brand: "UrbanStyle",
    description: "Premium leather backpack perfect for daily use",
    price: 129,
    salePercentage: 25,
    images: [
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
        isCover: true,
      },
    ],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Running Shoes",
    brand: "SportFit",
    description: "Professional running shoes with advanced cushioning",
    price: 159,
    salePercentage: 0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
        isCover: true,
      },
    ],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const samplePromos = [
  {
    code: "WELCOME20",
    percentage: 20,
    count: 100,
    minimumOrderValue: 50,
    startsAt: new Date("2026-01-01"),
    endsAt: new Date("2026-12-31"),
    createdAt: new Date(),
  },
  {
    code: "SUMMER50",
    percentage: 50,
    count: 50,
    minimumOrderValue: 100,
    startsAt: new Date("2026-06-01"),
    endsAt: new Date("2026-08-31"),
    createdAt: new Date(),
  },
  {
    code: "SAVE15",
    percentage: 15,
    count: 200,
    minimumOrderValue: 75,
    startsAt: new Date("2026-07-01"),
    endsAt: new Date("2026-09-30"),
    createdAt: new Date(),
  },
];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Clear existing data (optional - comment out to keep existing data)
    // console.log("🗑️  Clearing existing data...");
    // await mongoose.connection.db?.collection("banners").deleteMany({});
    // await mongoose.connection.db?.collection("categories").deleteMany({});
    // await mongoose.connection.db?.collection("products").deleteMany({});
    // await mongoose.connection.db?.collection("promos").deleteMany({});
    // console.log("✅ Cleared existing data");

    // Insert Banners
    console.log("\n📸 Inserting sample banners...");
    await mongoose.connection.db
      ?.collection("banners")
      .insertMany(sampleBanners);
    console.log(`✅ Inserted ${sampleBanners.length} banners`);

    // Insert Categories
    console.log("\n📂 Inserting sample categories...");
    await mongoose.connection.db
      ?.collection("categories")
      .insertMany(sampleCategories);
    console.log(`✅ Inserted ${sampleCategories.length} categories`);

    // Insert Products
    console.log("\n🛍️  Inserting sample products...");
    await mongoose.connection.db
      ?.collection("products")
      .insertMany(sampleProducts);
    console.log(`✅ Inserted ${sampleProducts.length} products`);

    // Insert Promos
    console.log("\n🎟️  Inserting sample promos...");
    await mongoose.connection.db?.collection("promos").insertMany(samplePromos);
    console.log(`✅ Inserted ${samplePromos.length} promos`);

    console.log("\n🎉 Seed data successfully inserted!");
    console.log("\n📊 Summary:");
    console.log(`   - Banners: ${sampleBanners.length}`);
    console.log(`   - Categories: ${sampleCategories.length}`);
    console.log(`   - Products: ${sampleProducts.length}`);
    console.log(`   - Promos: ${samplePromos.length}`);
    console.log("\n✨ Your database is ready for testing!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB");
  }
}

// Run the seed function
seedDatabase();
