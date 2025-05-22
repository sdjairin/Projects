import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Order Placed",
  },
  paymentIntentId: { type: String, required: false, default: "" }, // from Stripe
  paymentStatus: {
    type: String,
    enum: ["succeeded", "pending", "failed"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    required: false,
    enum: [
      "Card",
      "iDeal",
      "Klarna",
      "Bancontact",
      "Sofort",
      "Paypal",
      "Other",
    ],
    default: "Card",
  },

  date: { type: Number, required: true },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
