import React, { createContext, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile, signInAccount } from "../../utils/ApiAuth";

const LoginForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [user, SetUser] = useState({
    email: "",
    password: "",
  });

  const handleEmailInputChange = (e) => {
    const value = e.target.value;
    SetUser({ ...user, email: value });
  };

  const handlePassInputChange = (e) => {
    const value = e.target.value;
    SetUser({ ...user, password: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInAccount(user);
      if (response.status === 200) {
        setSuccessMessage("Successfully logged in!");
        setErrorMessage("");
        navigate("/u");
      }else{
        setErrorMessage("Could not log in account!");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage(`Failed to log in account: ${error.message}`);
    }
  };

  return (
    <div className="w-full max-w-lg max-h-full rounded-lg bg-gray-50 border border-gray-200 p-4 mx-2">
      <form
        onSubmit={handleSubmit}
        className="bg-[#F3EFE6] items-center py-4 px-3 rounded-3xl inset-shadow-sm inset-shadow-gray-400 drop-shadow-xl/40 space-y-3"
      >
        <div className="py-4 flex justify-center">
          <img
            src="./src/assets/hotel-svgrepo-com.png"
            alt="icon"
            width="100"
            height="100"
            loading="lazy"
          />
          {/* //displays success message if there is any */}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-3 w-full text-center">
              {successMessage}
            </div>
          )}

          {/* //displays error message if there is any */}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3 w-full text-center">
              {errorMessage}
            </div>
          )}
        </div>
        <h1 className="mb-4 text-center text-2xl font-semibold">
          Sign in existing account
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm text-gray-400">
            Email
          </label>
          <input
            id="email"
            name="email"
            onChange={handleEmailInputChange}
            required
            type="email"
            placeholder="name@example.com"
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
            onChange={handlePassInputChange}
            required
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="py-2 w-full rounded-xl border border-gray-300 bg-slate-100 px-2 text-center placeholder-[#7f8c8d] text-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-row mb-2 text-right">
          <Link to={"/forgot-password"} className="ml-auto">
            <p className="text-sm text-gray-400 hover:text-red-500">
              Forgot password?
            </p>
          </Link>
        </div>
        <div className="flex items-center justify-center mt-5 mb-3">
          <button
            type="submit"
            className="py-2.5 font-medium w-1/2 rounded-2xl bg-red-500 text-white transition-colors duration-300 hover:bg-red-600"
          >
            Sign in
          </button>
        </div>
        <div className="flex flex-row items-center justify-center">
          <Link to={"/register"}>
            <p className="text-sm text-gray-400 hover:text-red-500">
              Haven't created an account yet?
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
