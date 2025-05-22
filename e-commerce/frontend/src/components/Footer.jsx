import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="logo" className="w-32 mb-5" />
          <p className="w-full md:w-3/4 text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            lacinia eros nec nulla euismod consectetur.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 text-white">COMPANY</p>
          <ul className="flex flex-col gap-1 text-white">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 text-white">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-white">
            <li>+31 201234567</li>
            <li>contact@crisp.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center text-white">
          Copyright 2025@ crisp.com - All Rights Reservered
        </p>
      </div>
    </div>
  );
};

export default Footer;
