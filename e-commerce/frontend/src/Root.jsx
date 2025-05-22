import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";

export const Root = () => {
  return (
    <div>
      <div className="px-4 sm:px-[5vw] md:px=[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
