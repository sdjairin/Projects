import user_image from "./user-image.png";
import code_icon from "./code-icon.png";
import code_icon_dark from "./code-icon-dark.png";
import edu_icon from "./edu-icon.png";
import edu_icon_dark from "./edu-icon-dark.png";
import project_icon from "./project-icon.png";
import project_icon_dark from "./project-icon-dark.png";
import vscode from "./vscode.png";
import postman from "./postman.png";
import figma from "./figma.png";
import git from "./git.png";
import mongodb from "./mongodb.png";
import right_arrow_white from "./right-arrow-white.png";
import logo from "./logo.png";
import logo_dark from "./logo_dark.png";
import mail_icon from "./mail_icon.png";
import mail_icon_dark from "./mail_icon_dark.png";
import profile_img from "./profile-img.png";
import download_icon from "./download-icon.png";
import hand_icon from "./hand-icon.png";
import header_bg_color from "./header-bg-color.png";
import moon_icon from "./moon_icon.png";
import sun_icon from "./sun_icon.png";
import arrow_icon from "./arrow-icon.png";
import arrow_icon_dark from "./arrow-icon-dark.png";
import menu_black from "./menu-black.png";
import menu_white from "./menu-white.png";
import close_black from "./close-black.png";
import close_white from "./close-white.png";
import web_icon from "./web-icon.png";
import fullstack_icon from "./fullstack-icon.png";
import optimize_icon from "./optimize-icon.png";
import ecom_icon from "./ecom-icon.png";
import right_arrow from "./right-arrow.png";
import send_icon from "./send-icon.png";
import right_arrow_bold from "./right-arrow-bold.png";
import right_arrow_bold_dark from "./right-arrow-bold-dark.png";
import express from "./express-js.png";
import react from "./react.png";
import node from "./nodejs.png";
import tailwind from "./tailwindcss.png";
import stripe_api from "./stripe.png";
import socket_io from "./socket.png";
import nextjs from "./nextjs.png";
import motion from "./motion.png";

export const assets = {
  user_image,
  code_icon,
  code_icon_dark,
  edu_icon,
  edu_icon_dark,
  project_icon,
  project_icon_dark,
  vscode,
  postman,
  figma,
  git,
  mongodb,
  right_arrow_white,
  logo,
  logo_dark,
  mail_icon,
  mail_icon_dark,
  profile_img,
  download_icon,
  hand_icon,
  header_bg_color,
  moon_icon,
  sun_icon,
  arrow_icon,
  arrow_icon_dark,
  menu_black,
  menu_white,
  close_black,
  close_white,
  web_icon,
  fullstack_icon,
  optimize_icon,
  ecom_icon,
  right_arrow,
  send_icon,
  right_arrow_bold,
  right_arrow_bold_dark,
  express,
  react,
  node,
  tailwind,
  stripe_api,
  socket_io,
  nextjs,
  motion,
};

export const techStack1 = [
  assets.mongodb,
  assets.express,
  assets.react,
  assets.node,
  assets.tailwind,
  assets.stripe_api,
];

export const techStack2 = [
  assets.mongodb,
  assets.express,
  assets.react,
  assets.node,
  assets.tailwind,
  assets.socket_io,
];

export const techStack3 = [
  assets.react,
  assets.tailwind,
  assets.nextjs,
  assets.motion,
];

export const workData = [
  {
    title: "E-commerce site",
    category: "MERN Stack Development",
    bgImage: "/crisp1.png",
    images: ["/crisp1.png", "/crisp2.png", "/crisp3.png"],
    slug: "e-commerce",
    stack: techStack1,
    description:
      "This project is a fully functional e-commerce website built with the MERN stack (MongoDB, Express.js, React, Node.js). It offers a seamless shopping experience for users and robust management tools for administrators.",
    summary:
      "The front-end, crafted with React and styled using Tailwind CSS, provides a modern, responsive, and intuitive user interface. On the back-end, Express.js and Node.js power a secure and efficient API, while MongoDB handles all data storage.A key feature of this platform is the dedicated admin panel, which allows for efficient order management and utilizes Stripe for secure and streamlined payment processing. This project showcases a comprehensive understanding of full-stack development, from user-facing design to secure data handling and payment integration.",
    functionality: [
      "User Authentication",
      "Product Management",
      "Shopping Cart",
      "Order Processing",
      "Payment Integration with Stripe",
    ],
    link: "https://crisp-frontend.vercel.app/",
  },
  {
    title: "Chat Application",
    category: "MERN Stack Development",
    bgImage: "/chat-app1.png",
    images: ["/chat-app1.png", "/chat-app2.png", "/chat-app3.png"],
    slug: "chat-app",
    stack: techStack2,
    description:
      "This project is a fully functional real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js), enhanced with Socket.IO for instant messaging and styled with Tailwind CSS. It offers users a seamless and dynamic communication experience.",
    summary:
      "The front-end, developed with React and styled using Tailwind CSS, provides a modern, responsive, and intuitive user interface. On the back-end, Express.js and Node.js power a fast and secure API, while MongoDB handles all message and user data storage. The integration of Socket.IO enables real-time bidirectional communication, which is essential for the instant messaging functionality. This project demonstrates a comprehensive understanding of full-stack development, from UI/UX design to real-time data processing and database management.",
    functionality: [
      "Instant messaging",
      "real-time communication",
      "User authentication",
    ],
    link: "https://chat-app-nu-gold.vercel.app/login",
  },
  {
    title: "Portfolio Website",
    category: "Web Development",
    bgImage: "/port1.png",
    images: ["/port1.png", "/port2.png", "/port3.png"],
    slug: "portfolio",
    stack: techStack3,
    description:
      "This project is my personal portfolio website, meticulously designed and built with Next.js, Tailwind CSS, and React. It serves as a dynamic showcase of my projects and skills, with a strong focus on a fluid user experience and a modern design.",
    summary:
      "The website is developed using Next.js for optimal performance, SEO, and a streamlined development process. The front-end, crafted with React and styled with Tailwind CSS, ensures a responsive and intuitive user interface. A key feature of this portfolio is the integration of Framer Motion for elegant and responsive animations, significantly enhancing interactivity and aesthetics. Furthermore, the site offers seamless switching between a light and dark mode, contributing to accessibility and user preference. This project demonstrates my ability to combine advanced web technologies to create a high-quality, interactive, and visually appealing online presence.",
    functionality: [
      "Responsiveness",
      "modern UI/UX",
      "engaging animations",
      "light and dark mode",
      "SEO optimization",
    ],
    link: "https://chat-app-nu-gold.vercel.app/login",
  },
];

export const serviceData = [
  {
    icon: assets.web_icon,
    title: "Web development",
    description:
      "High-performance websites with modern design and functionality...",
    features: [
      "Responsive Design",
      "CMS Integration",
      "Custom Features",
      "Performance Boost",
    ],
  },
  {
    icon: assets.fullstack_icon,
    title: "Full-Stack development",
    description:
      "End-to-end development services, covering both frontend and backend...",
    features: [
      "Frontend & Backend",
      "API Integration",
      "Database Management",
      "Authentication",
    ],
  },
  {
    icon: assets.ecom_icon,
    title: "E-commerce Solutions",
    description:
      "Create and optimize E-Commerce platforms for seamless online shopping...",
    features: ["Product Management", "Payment Gateway", "Cart & Checkout"],
  },
];

export const infoList = [
  {
    icon: assets.code_icon,
    iconDark: assets.code_icon_dark,
    title: "Languages",
    description: "HTML, CSS, JavaScript React Js, Next Js, Node Js, Express Js",
  },
  {
    icon: assets.edu_icon,
    iconDark: assets.edu_icon_dark,
    title: "Education",
    description: "Full-stack Development from Winc Academy",
  },
  {
    icon: assets.project_icon,
    iconDark: assets.project_icon_dark,
    title: "Projects",
    description: "Built 3 projects",
  },
];

export const toolsData = [
  assets.vscode,
  assets.postman,
  assets.mongodb,
  assets.figma,
  assets.git,
];
