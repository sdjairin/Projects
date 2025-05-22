import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-white">
        Subscribe now & get 20% off
      </p>
      <p className="text-white mt-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none bg-white py-3 rounded"
          required
        />
        <button
          type="submit"
          className="bg-white text-black text-xs px-10 py-4 rounded"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
