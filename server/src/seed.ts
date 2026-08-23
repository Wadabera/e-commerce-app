import mongoose from "mongoose";
import { Category } from "./models/Category";
import { Product } from "./models/Product";
import { Promo } from "./models/Promo";
import { Banner } from "./models/Banner";
import { User } from "./models/User";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

// Sample data
const categories = [
  { name: "Electronics" },
  { name: "Fashion" },
  { name: "Home & Kitchen" },
  { name: "Sports" },
];

const products = [
  {
    title: "Smart Watch Pro",
    description:
      "Premium smartwatch with health tracking, GPS, and water resistance. Perfect for fitness enthusiasts and tech lovers.",
    brand: "TechWatch",
    price: 399,
    salePercentage: 15,
    stock: 50,
    colors: ["Black", "Silver", "Rose Gold"],
    sizes: ["M", "L"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        publicId: "sample_smartwatch",
        isCover: true,
      },
    ],
    status: "active",
  },
  {
    title: "Leather Backpack",
    description:
      "Stylish and durable leather backpack with multiple compartments. Ideal for work or travel.",
    brand: "UrbanStyle",
    price: 129,
    salePercentage: 25,
    stock: 30,
    colors: ["Brown", "Black", "Tan"],
    sizes: ["M", "L"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        publicId: "sample_backpack",
        isCover: true,
      },
    ],
    status: "active",
  },
  {
    title: "Premium Wireless Headphones",
    description:
      "Noise-canceling wireless headphones with 30-hour battery life and superior sound quality.",
    brand: "AudioTech",
    price: 299,
    salePercentage: 20,
    stock: 45,
    colors: ["Black", "White", "Blue"],
    sizes: [],
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        publicId: "sample_headphones",
        isCover: true,
      },
    ],
    status: "active",
  },
  {
    title: "Vintage Camera",
    description:
      "Classic vintage-style camera with modern digital technology. Capture memories in style.",
    brand: "PhotoGear",
    price: 189,
    salePercentage: 10,
    stock: 20,
    colors: ["Black", "Silver"],
    sizes: [],
    images: [
      {
        url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
        publicId: "sample_camera",
        isCover: true,
      },
    ],
    status: "active",
  },
  {
    title: "Running Shoes",
    description:
      "Lightweight and comfortable running shoes with advanced cushioning technology.",
    brand: "SportFit",
    price: 159,
    salePercentage: 0,
    stock: 60,
    colors: ["Red", "Blue", "Black", "White"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        publicId: "sample_shoes",
        isCover: true,
      },
    ],
    status: "active",
  },
];

const promos = [
  {
    code: "WELCOME20",
    percentage: 20,
    count: 100,
    minimumOrderValue: 50,
    startsAt: new Date("2026-01-01"),
    endsAt: new Date("2026-12-31"),
  },
  {
    code: "SUMMER50",
    percentage: 50,
    count: 50,
    minimumOrderValue: 100,
    startsAt: new Date("2026-06-01"),
    endsAt: new Date("2026-09-30"),
  },
  {
    code: "SAVE15",
    percentage: 15,
    count: 200,
    minimumOrderValue: 75,
    startsAt: new Date("2026-01-01"),
    endsAt: new Date("2026-12-31"),
  },
];

const banners = [
  {
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
    imagePublicId: "sample_banner_1",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200",
    imagePublicId: "sample_banner_2",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200",
    imagePublicId: "sample_banner_3",
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Promo.deleteMany({});
    await Banner.deleteMany({});
    console.log("✅ Existing data cleared");

    // Create admin user (you'll need to sign up with this email first)
    const adminEmail = process.env.ADMIN_EMAILS?.split(",")[0] || "admin@example.com";
    console.log(`\n👤 Admin email: ${adminEmail}`);
    console.log("⚠️  You need to sign up with this email first!");

    // Find or create a dummy admin user for seeding
    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      // Create a placeholder admin user
      adminUser = await User.create({
        clerkUserId: `seed_admin_${Date.now()}`,
        name: "Seed Admin",
        email: adminEmail,
        role: "admin",
      });
      console.log("✅ Created placeholder admin user");
    }

    // Insert categories
    console.log("\n📂 Inserting categories...");
    const insertedCategories = await Category.insertMany(categories);
    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    // Map category names to IDs
    const categoryMap: Record<string, mongoose.Types.ObjectId> = {};
    insertedCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Insert products with proper category references
    console.log("\n📦 Inserting products...");
    const productsWithCategories = products.map((product, index) => ({
      ...product,
      category:
        index === 0 || index === 2
          ? categoryMap["Electronics"]
          : index === 1
            ? categoryMap["Fashion"]
            : index === 3
              ? categoryMap["Electronics"]
              : categoryMap["Sports"],
      createdBy: adminUser!._id,
    }));

    const insertedProducts = await Product.insertMany(productsWithCategories);
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    // Insert promos
    console.log("\n🎫 Inserting promotional codes...");
    const insertedPromos = await Promo.insertMany(promos);
    console.log(`✅ Inserted ${insertedPromos.length} promo codes`);

    // Insert banners
    console.log("\n🖼️  Inserting banners...");
    const bannersWithCreator = banners.map((banner) => ({
      ...banner,
      createdBy: adminUser!._id,
    }));
    const insertedBanners = await Banner.insertMany(bannersWithCreator);
    console.log(`✅ Inserted ${insertedBanners.length} banners`);

    // Summary
    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   Categories: ${insertedCategories.length}`);
    console.log(`   Products: ${insertedProducts.length}`);
    console.log(`   Promo Codes: ${insertedPromos.length}`);
    console.log(`   Banners: ${insertedBanners.length}`);
    console.log(`   Admin Email: ${adminEmail}`);

    console.log("\n🚀 Next steps:");
    console.log(`   1. Start the server: npm run dev`);
    console.log(`   2. Sign up at http://localhost:5173/sign-up with: ${adminEmail}`);
    console.log(`   3. Access admin panel: http://localhost:5173/admin`);
    console.log(`   4. Browse products: http://localhost:5173/collections`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
