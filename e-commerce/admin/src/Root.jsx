import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Login from "./components/Login.jsx";
import { ToastContainer } from "react-toastify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "€";

const Root = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div>
      <div className="min-h-screen">
        <ToastContainer />
        {token === "" ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <Navbar setToken={setToken} />
            <hr className="text-white/20" />
            <div className="flex w-full">
              <Sidebar />
              <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-base">
                <Outlet context={{ token }} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Root;
