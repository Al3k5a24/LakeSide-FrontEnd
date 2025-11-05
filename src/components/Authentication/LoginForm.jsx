import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
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
        <h1 className="mb-4 text-center text-2xl font-semibold">
          Sign in existing account
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm text-gray-400">
            Email
          </label>
          <input
          required
            type="email"
            id="email"
            placeholder="name@example.com"
            autocomplete="email"
            className="py-2 w-full rounded-xl border border-gray-300 bg-slate-100 px-5 text-center text-gray-400 placeholder-[#7f8c8d] focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-1 block text-sm text-gray-400"
          >
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            placeholder="Password"
            autocomplete="new-password"
            className="py-2 w-full rounded-xl border border-gray-300 bg-slate-100 px-2 text-center placeholder-[#7f8c8d] text-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-row mb-2 text-right">
          <Link to={"/register"}>
          <p className="text-sm text-gray-400 hover:text-red-500"> 
            Haven't created an account yet?
          </p>
          </Link>
          <Link to={"/forgot-password"} className="ml-auto">
          <p className="text-sm text-gray-400 hover:text-red-500"> 
            Forgot password?
          </p>
          </Link>
        </div>
        <div className="flex items-center justify-center mt-7 mb-3">
          <button className="py-2.5 font-medium w-1/2 rounded-2xl bg-red-500 text-white transition-colors duration-300 hover:bg-red-600">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
