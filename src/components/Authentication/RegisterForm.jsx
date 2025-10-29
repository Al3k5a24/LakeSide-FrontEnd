import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <div className="w-full max-w-lg max-h-full rounded-lg bg-gray-50 border border-gray-200 p-4 mx-2">
      <form className="bg-[#F3EFE6] items-center py-4 px-3 rounded-3xl inset-shadow-sm inset-shadow-gray-400 drop-shadow-xl/40 space-y-3">
        <div className="py-4 flex justify-center">
          <a href="/">
            <img
              src="./src/assets/hotel-svgrepo-com.png"
              alt="icon"
              width="100"
              height="100"
              loading="lazy"
            />
          </a>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create an account
        </h2>
        <div className="flex flex-col items-start justify-start">
          <label htmlFor="email" className="mb-1 block text-sm text-gray-400">
            Full name:
          </label>
          <input
            id="email"
            className="w-full border mt-1 border-gray-300
             bg-slate-100 mb-2 outline-none rounded-xl py-2.5 px-3
             placeholder-[#7f8c8d] text-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
            type="text"
            placeholder="Full name"
            required
          />
        </div>

        <div className="flex flex-col items-start justify-start">
          <label htmlFor="email" className="mb-1 block text-sm text-gray-400">
            Email:
          </label>
          <input
            id="email"
            className="w-full border mt-1 mb-2 border-gray-300
             bg-slate-100 outline-none rounded-xl py-2.5 px-3
             placeholder-[#7f8c8d] text-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
            type="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="flex flex-col items-start justify-start">
          <label htmlFor="email" className="mb-1 block text-sm text-gray-400">
            Password:
          </label>
          <input
            id="email"
            className="w-full border mt-1 border-gray-300
             bg-slate-100 mb-2 outline-none rounded-xl py-2.5 px-3
             placeholder-[#7f8c8d] text-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
            type="text"
            placeholder="Password"
            required
          />
        </div>

        <div className="flex items-center justify-center mt-5 mb-3">
          <button className="w-1/2 mb-3 rounded-2xl bg-red-500 hover:bg-red-800 transition-all active:scale-95 py-2.5 text-white font-medium">
            Create Account
          </button>
        </div>

        <Link>
          <span className="flex items-center justify-center text-gray-500 hover:text-red-700">
            Already have an account?
          </span>
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;
