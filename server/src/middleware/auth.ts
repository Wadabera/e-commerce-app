import { getAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { User } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";

function isClerkConfigured() {
  return Boolean(
    process.env.CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  );
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  if (!isClerkConfigured()) {
    return next(new AppError(503, "Authentication is not configured"));
  }

  const { userId } = getAuth(req);

  if (!userId) {
    return next(
      new AppError(401, "User is not logged in. Means unauth user! !"),
    );
  }

  next();
}

export async function getDbUserFromReq(req: Request) {
  if (!isClerkConfigured()) {
    throw new AppError(503, "Authentication is not configured");
  }

  const { userId } = getAuth(req);

  if (!userId) {
    throw new AppError(401, "User is not logged in. Means unauth user! !");
  }

  const dbUser = await User.findOne({ clerkUserId: userId });
  if (!dbUser) {
    throw new AppError(404, "User is not found in the DB");
  }

  return dbUser;
}

// Middleware to check admin token (for hardcoded admin login)
export const requireAdminToken = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    console.log("requireAdminToken - Auth header:", authHeader ? "Present" : "Missing");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("requireAdminToken - No Bearer token");
      throw new AppError(401, "No admin token provided");
    }

    const token = authHeader.substring(7); // Remove "Bearer "
    console.log("requireAdminToken - Token length:", token.length);
    
    // Decode the admin token (it's base64 encoded)
    try {
      const decoded = JSON.parse(Buffer.from(token, "base64").toString());
      console.log("requireAdminToken - Decoded user ID:", decoded.userId);
      
      // Verify it's a valid admin user
      const adminUser = await User.findById(decoded.userId);
      
      if (!adminUser) {
        console.log("requireAdminToken - User not found");
        throw new AppError(401, "Admin user not found");
      }
      
      if (adminUser.role !== "admin") {
        console.log("requireAdminToken - User is not admin, role:", adminUser.role);
        throw new AppError(403, "Admin access required");
      }

      console.log("requireAdminToken - Success! Admin:", adminUser.email);
      
      // Attach user to request for later use
      (req as any).user = adminUser;
      
      next();
    } catch (error) {
      console.log("requireAdminToken - Error:", error instanceof Error ? error.message : "Unknown");
      throw new AppError(401, "Invalid admin token");
    }
  },
);

// admin gate
//user logged in user + admin access

export const requireAdmin = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const extractCurrentDbUser = await getDbUserFromReq(req);

    if (extractCurrentDbUser.role !== "admin") {
      throw new AppError(403, "Admin access only");
    }

    next();
  },
);
