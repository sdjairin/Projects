import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

export const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t border-t-white/20">
        <Title text1={"About"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="about-image"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-white">
          <p>
            At Crisp, we’re more than just a sneaker store — we’re a community
            built around style, comfort, and culture. Born from a love for clean
            design and fresh kicks, we’re here to connect sneaker lovers with
            the latest drops, timeless classics, and hidden gems. Whether you're
            a seasoned collector or just starting out, Crisp brings you curated
            collections that speak to every taste and lifestyle.
          </p>
          <p>
            Our mission is to make high-quality sneakers accessible, authentic,
            and inspiring. We work with trusted brands and suppliers to
            guarantee originality, and we’re always looking ahead to the trends
            that matter. At Crisp, it’s not just about what you wear — it’s
            about how it makes you feel. Stay fresh, stay crisp.
          </p>
          <b className="text-white">Our Mission</b>
          <p>
            Our mission at Crisp is to redefine the sneaker shopping experience
            by blending authenticity, accessibility, and community. We aim to
            inspire confidence and self-expression through a carefully selected
            range of sneakers that reflect both timeless style and modern
            culture. By staying true to quality and staying ahead of trends,
            we’re here to help you step into every day with purpose — and a
            fresh pair.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-white">
          <b>Quality Assurance:</b>
          <p>
            At Crisp, quality isn't just a promise — it's our standard. Every
            pair of sneakers we offer goes through a strict verification process
            to ensure authenticity, durability, and craftsmanship. We partner
            only with trusted suppliers and brands, so you can shop with
            confidence knowing that what you receive is 100% genuine and built
            to last. Your trust means everything to us, and we’re committed to
            delivering nothing but the best.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-white">
          <b>Convenience:</b>
          <p>
            Shopping at Crisp is designed to be smooth, simple, and stress-free.
            From easy browsing to secure checkout and fast shipping, we’ve built
            every step of the experience with your comfort in mind. Whether
            you’re shopping on your phone or desktop, finding your next favorite
            pair has never been easier. We handle the details — you just focus
            on staying fresh.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-white">
          <b>Exceptional Customer Service:</b>
          <p>
            At Crisp, we believe that great service is just as important as
            great sneakers. Our customer support team is here to help you every
            step of the way — whether you have a question, need help with an
            order, or just want some sneaker advice. We’re fast, friendly, and
            always ready to make sure your experience is smooth and satisfying.
            Because at Crisp, you’re not just a customer — you’re part of the
            family.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};
