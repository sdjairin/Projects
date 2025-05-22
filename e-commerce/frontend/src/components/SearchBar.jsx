import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-black text-center">
      <div className="inline-flex items-center justify-center border border-white px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 text-white">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={assets.search} alt="search-icon" className="w-4" />
      </div>
      <img
        src={assets.close}
        alt="close"
        className="inline w-4 cursor-pointer"
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
};

export default SearchBar;
