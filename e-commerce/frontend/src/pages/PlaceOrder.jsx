import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export const PlaceOrder = () => {
  const {
    backendUrl,
    token,
    cartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      console.log("Cart items:", cartItems);
      console.log("Products:", products);

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      console.log("Order Items:", orderItems);

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentIntent: "",
        paymentStatus: "pending",
        date: Date.now(),
      };

      const fullUrl = backendUrl + "/api/order/place";
      console.log("Posting to:", fullUrl);
      console.log("Order data:", orderData);

      const response = await axios.post(fullUrl, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Server response:", response.data);

      if (response.data.success) {
        const sessionUrl = response.data.url;
        window.location.replace(sessionUrl);
      } else {
        toast.error(response.data.message || "Unknown error from server.");
      }
    } catch (error) {
      console.error("Error processing order:", error);

      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong with placing the order.";

      toast.error(errMsg);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 min-h-[80vh] bordert"
    >
      {/* ------------left side------------ */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstname"
            value={formData.firstname}
            type="text"
            placeholder="First name"
            className="border border-white bg-slate-200 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastname"
            value={formData.lastname}
            type="text"
            placeholder="Last name"
            className="border border-white bg-slate-200 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email adress"
          className="border border-white bg-slate-200 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="border border-white bg-slate-200 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="border border-white bg-slate-200 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="border border-white bg-slate-200 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            placeholder="Zipcode"
            className="border border-white bg-slate-200 rounded py-1.5 px-3.5 w-full"
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            className="border border-white bg-slate-200 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="Phone"
          className="border border-white bg-slate-200 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/* ------------right side------------ */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-6">
          {/* ------------payment method selection-------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="w-full text-end mt-4">
              <button
                type="submit"
                className="bg-slate-400 text-white px-16 py-3 text-sm rounded"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
