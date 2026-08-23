import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { clerkClient, getAuth } from "@clerk/express";
import { AppError } from "../../utils/AppError";
import { User } from "../../models/User";
import { ok } from "../../utils/envelope";

export const authRouter = Router();

authRouter.post(
  "/sync",
  requireAuth,

  asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);

    if (!userId) {
      throw new AppError(401, "User is not logged in. Means unauth user! !");
    }

    const clerkUser = await clerkClient.users.getUser(userId);

    const extractEmailFromUserInfo =
      clerkUser.emailAddresses.find(
        (item) => item.id === clerkUser.primaryEmailAddressId,
      ) || clerkUser.emailAddresses[0];

    const email = extractEmailFromUserInfo.emailAddress;

    const fullName = [clerkUser.firstName, clerkUser.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    const name = fullName || clerkUser.username;

    const raw = process.env.ADMIN_EMAILS || "";
    const adminEmails = new Set(
      raw
        .split(",")
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean),
    );

    // if the current user is existing user or not
    // update/do nothing
    // create the user and save in our db with
    // role

    const existingUser = await User.findOne({ clerkUserId: userId });
    const shouldBeAdmin = email ? adminEmails.has(email.toLowerCase()) : false;

    const nextRole =
      existingUser?.role === "admin"
        ? "admin"
        : shouldBeAdmin
          ? "admin"
          : existingUser?.role || "user";

    const newlyCreatedDbUser = await User.findOneAndUpdate(
      {
        clerkUserId: userId,
      },
      {
        clerkUserId: userId,
        email,
        name,
        role: nextRole,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    res.status(200).json(
      ok({
        user: {
          id: newlyCreatedDbUser._id,
          clerkUserId: newlyCreatedDbUser.clerkUserId,
          email: newlyCreatedDbUser.email,
          name: newlyCreatedDbUser.name,
          role: newlyCreatedDbUser.role,
        },
      }),
    );
  }),
);

authRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);

    if (!userId) {
      throw new AppError(401, "User is not logged in. Means unauth user! !");
    }

    const dbUser = await User.findOne({ clerkUserId: userId });

    if (!dbUser) {
      throw new AppError(404, "User is not found in DB");
    }

    res.status(200).json(
      ok({
        user: {
          id: dbUser._id,
          clerkUserId: dbUser.clerkUserId,
          email: dbUser.email,
          name: dbUser.name,
          role: dbUser.role,
        },
      }),
    );
  }),
);

// Hardcoded Admin Login
authRouter.post(
  "/admin-login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const ADMIN_EMAIL = process.env.ADMIN_LOGIN_EMAIL || "admin@ecommerce.com";
    const ADMIN_PASSWORD = process.env.ADMIN_LOGIN_PASSWORD || "Admin@12345";

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      throw new AppError(401, "Invalid admin credentials");
    }

    // Find or create hardcoded admin user
    let adminUser = await User.findOne({ email: ADMIN_EMAIL });

    if (!adminUser) {
      adminUser = await User.create({
        clerkUserId: `hardcoded_admin_${Date.now()}`,
        email: ADMIN_EMAIL,
        name: "Super Admin",
        role: "admin",
      });
    }

    // Generate a simple session token (in production, use JWT)
    const sessionToken = Buffer.from(
      JSON.stringify({
        userId: adminUser._id,
        email: adminUser.email,
        role: adminUser.role,
        timestamp: Date.now(),
      }),
    ).toString("base64");

    res.status(200).json(
      ok({
        user: {
          id: adminUser._id,
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role,
        },
        token: sessionToken,
      }),
    );
  }),
);

