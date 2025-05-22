import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// global variables
const currency = "eur";
const deliveryCharge = 10;

// gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing order using stripe
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentIntentId: "",
      paymentStatus: "pending",
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_Items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_Items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items: line_Items,
      mode: "payment",
      metadata: {
        orderId: newOrder._id.toString(),
        userId: userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      url: session.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// webhook for stripe payment
const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;
    const userId = session.metadata?.userId;

    if (orderId) {
      await orderModel.findByIdAndUpdate(orderId, {
        paymentStatus: "succeeded",
        paymentIntentId: session.payment_intent,
        paymentMethod: session.payment_method_types?.[0] || "Other",
      });
      console.log("Payment succeeded for order:", orderId);

      // Update user cart data
      if (userId) {
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        console.log("User cart cleared for user:", userId);
      }
    } else {
      console.warn("No order ID found in session metadata.");
    }
  }

  res.json({ received: true });
};

// all orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// user order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { placeOrder, stripeWebhook, allOrders, userOrders, updateStatus };
