import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { backendUrl } from "../Root.jsx";
import { toast } from "react-toastify";

const Add = () => {
  const { token } = useOutletContext();

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Adidas");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting form data...");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setCategory("Adidas");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload-image area"
              className="w-20 bg-white/20 rounded-lg"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload-image area"
              className="w-20 bg-white/20 rounded-lg"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload-image area"
              className="w-20 bg-white/20 rounded-lg"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload-image area"
              className="w-20 bg-white/20 rounded-lg"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 rounded-lg "
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 rounded-lg "
          type="text"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg"
          >
            <option value="Adidas">Adidas</option>
            <option value="Air Jordan">Air Jordan</option>
            <option value="Asics">Asics</option>
            <option value="New Balance">New Balance</option>
            <option value="Nike">Nike</option>
            <option value="Yeezy">Yeezy</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px] rounded-lg"
            type="number"
            placeholder="150"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("36")
                  ? prev.filter((item) => item !== "36")
                  : [...prev, "36"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("36") ? "bg-green-600" : "bg-[#3d3d3e]"
              } rounded-lg px-3 py-1 cursor-pointer`}
            >
              36
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("37")
                  ? prev.filter((item) => item !== "37")
                  : [...prev, "37"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("37") ? "bg-green-600" : "bg-[#3d3d3e]"
              } rounded-lg px-3 py-1 cursor-pointer`}
            >
              37
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("38")
                  ? prev.filter((item) => item !== "38")
                  : [...prev, "38"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("38") ? "bg-green-600" : "bg-[#3d3d3e]"
              } rounded-lg px-3 py-1 cursor-pointer`}
            >
              38
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("39")
                  ? prev.filter((item) => item !== "39")
                  : [...prev, "39"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("39") ? "bg-green-600" : "bg-[#3d3d3e]"
              } rounded-lg px-3 py-1 cursor-pointer`}
            >
              39
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("40")
                  ? prev.filter((item) => item !== "40")
                  : [...prev, "40"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("40") ? "bg-green-600" : "bg-[#3d3d3e]"
              } rounded-lg px-3 py-1 cursor-pointer`}
            >
              40
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("41")
                  ? prev.filter((item) => item !== "41")
                  : [...prev, "41"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("41") ? "bg-green-600" : "bg-[#3d3d3e]"
              } rounded-lg px-3 py-1 cursor-pointer`}
            >
              41
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("42")
                  ? prev.filter((item) => item !== "42")
                  : [...prev, "42"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("42") ? "bg-green-600" : "bg-[#3d3d3e]"
              } rounded-lg px-3 py-1 cursor-pointer`}
            >
              42
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("43")
                  ? prev.filter((item) => item !== "43")
                  : [...prev, "43"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("43") ? "bg-green-600" : "bg-[#3d3d3e]"
              } rounded-lg px-3 py-1 cursor-pointer`}
            >
              43
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("44")
                  ? prev.filter((item) => item !== "44")
                  : [...prev, "44"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("44") ? "bg-green-600" : "bg-[#3d3d3e]"
              } rounded-lg px-3 py-1 cursor-pointer`}
            >
              44
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-gray-600 rounded-lg active:bg-emerald-600 text-white"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
