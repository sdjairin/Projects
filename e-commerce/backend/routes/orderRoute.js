import express from "express";
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
  stripeWebhook,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// admin routes
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// payment route
orderRouter.post("/place", authUser, placeOrder);

// Webhook route for Stripe
orderRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// user routes
orderRouter.post("/user-orders", authUser, userOrders);

export default orderRouter;
