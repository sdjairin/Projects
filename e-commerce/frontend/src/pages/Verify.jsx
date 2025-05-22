import { useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";

export const Verify = () => {
  const query = new URLSearchParams(useLocation().search);
  const success = query.get("success");
  const orderId = query.get("orderId");

  const { setCartItems, backendUrl, token } = useContext(ShopContext);

  useEffect(() => {
    // here you can handle the success or failure of the payments
    if (success === "true" && orderId) {
      console.log("Payment successful, orderId:", orderId);
      setCartItems({}); // Clear the cart items
    } else {
      console.log("Payment failed");
    }
  }, [success, orderId, setCartItems, backendUrl, token]);

  return (
    <div>
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold text-white">
          {success === "true"
            ? "Thanks for your order! We will contact you soon."
            : "Payment failed"}
        </h1>
        <p className="mt-4 text-white">{orderId && `Order ID: ${orderId}`}</p>
      </div>
    </div>
  );
};
