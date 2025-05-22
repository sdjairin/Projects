import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

export const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t border-t-white/20">
        <Title text1={"Contact"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          alt="contact-image"
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col justify-center items-start gap-6 text-white">
          <p className="font-semibold text-xl">Our Store</p>
          <p>
            Sneakerstraat 12 <br /> 1017 AB, Amsterdam <br /> Nederland
          </p>
          <p>
            Tel:(020) 1234567 <br /> Email: contact@crisp.com
          </p>
          <p className="font-semibold text-xl">Careers at Crisp</p>
          <p>Learn more about our teams and job openings.</p>
          <button className=" bg-white text-black border-white px-8 py-4 text-sm hover:bg-slate-400 hover:text-white transition-all duration-500 rounded">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};
