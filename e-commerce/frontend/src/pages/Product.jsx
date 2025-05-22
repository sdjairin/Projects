import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

export const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      const sortedSizes = [...product.sizes].sort((a, b) => a - b);
      setProductData({ ...product, sizes: sortedSizes });
      setImage(product.images[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/*-------------------- product Data ---------------------------------*/}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*------------------ product images -------------------------------*/}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images.map((item, index) => (
              <img
                src={item}
                key={index}
                alt="product-image"
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(item)}
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%}">
            <img src={image} alt="product-image" className="w-full h-auto" />
          </div>
        </div>

        {/*-------------------- product information-------------------------- */}
        <div className="flex-1 ">
          <h1 className="font-medium text-2xl mt-2 text-white">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star} alt="" className="w-3 5" />
            <img src={assets.star} alt="" className="w-3 5" />
            <img src={assets.star} alt="" className="w-3 5" />
            <img src={assets.star} alt="" className="w-3 5" />
            <img src={assets.star_dull} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium text-white">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-white md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8 text-white">
            <p>Select Size</p>
            <div className="gap-2 text-black grid grid-cols-4">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-white ${
                    item === size ? "border-orange-500" : ""
                  } cursor-pointer rounded`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-gray-600 text-white px-8 py-3 text-sm active:bg-emerald-600 rounded"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5 text-white" />
          <div className="text-sm text-white mt-5 flex flex-col gap-1">
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return en exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* -------------------------------Description & Review sEction---------------------------- */}
      <div className="mt-20">
        <div className="flex text-white">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-6 border px-6 py-6 text-sm text-white">
          <p>
            An e-commerce website is an online platform that allows businesses
            or individuals to sell products or services over the internet. It
            enables users to browse a wide range of items, make secure
            purchases, and have products delivered directly to their
            doorstep—all from the comfort of their own home. E-commerce
            simplifies the shopping experience by offering convenience,
            accessibility, and a seamless checkout process.
          </p>
          <p>
            Typically, an e-commerce website displays product listings with
            images, detailed descriptions, prices, and customer reviews. Users
            can filter and search for items, view related products, and add them
            to a virtual shopping cart. The website may also feature categories,
            promotional banners, shipping information, return policies, and
            customer support to enhance the overall shopping experience.
          </p>
        </div>
      </div>

      {/*-------------------------------Related Products---------------------------- */}
      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};
