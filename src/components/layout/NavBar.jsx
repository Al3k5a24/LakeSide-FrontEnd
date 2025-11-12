import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getUserProfile, signInAccount, signInAndGetProfile } from "../../utils/ApiAuth";
import UserProfile from "../Authentication/UserProfile";

const NavBar = () => {

  const [showAccount, setShowAccount] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const location = useLocation();

  //when on login or register page, we want to hide navbar so it is not visible
  const hideElementLogin = location.pathname === '/login';
  const hideElementRegister = location.pathname === '/register';

   const [user, SetUser] = useState({
       email: "",
       fullName: ""
     });
  //
  const handleAccountClick = () => {
    setShowAccount(!showAccount); //true
  }

  useEffect(()=>{
    const checkUserProfile = async () => {
      try {
        signInAndGetProfile.then((data)=>{
        setUserFullName(data.fullName);
        setUserEmail(data.email)
        setShowAccount(true)
        console.log(data.fullName)
        console.log(data.email)
      })
      } catch (error) {
        setShowAccount(false)
        SetUser(null)
      }
    } 
  checkUserProfile()  
   },[])

  return (
  hideElementLogin || !hideElementRegister && <nav className="relative flex flex-col md:flex-row w-full items-center justify-between px-6 py-4 mb-5 bg-[#F3EFE6] rounded-b-4xl 
  shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.1),0_8px_24px_-6px_rgba(0,0,0,0.35)] mt-3">
  {/* Logo */}
  <div className="flex items-center flex-shrink-0 text-black mr-6">
    <Link to="/" className="flex items-center gap-2">
      <span className="text-2xl font-semibold text-red-600 hover:text-red-700 transition-colors">
        lakeSide <span className="text-gray-800">hotel</span>
      </span>
    </Link>
  </div>

  {/* Placeholder for future mobile menu button
  <button className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors">
    <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
    <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
    <span className="block w-4 h-0.5 bg-gray-700"></span>
  </button> */}

  {/* Navigation Links */}
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0 space-y-3 lg:space-y-0 lg:space-x-8 text-lg font-medium">
    <NavLink
      to="/browse-rooms"
      className="block text-gray-700 hover:text-red-500 transition-colors">
      Browse all Rooms
    </NavLink>

    {/* View if user is logged in
      <NavLink className="block text-gray-700 hover:text-red-500 transition-colors">
        Admin
      </NavLink>
    */}

    <NavLink
      to="/my-booking"
      className="block text-gray-700 hover:text-red-500 transition-colors">
      Find my Booking
    </NavLink>

    <a className="hidden"></a>

    { showAccount ? <Link
      to="/login"
      className="ml-auto block text-gray-700 hover:text-red-500 transition-colors">
      Log in
    </Link> : <UserProfile userFullName={userFullName}/> }

    {/* View if user is logged in
      <Link className="block text-gray-700 hover:text-red-500 transition-colors">
        Profile
      </Link>
      <Link className="block text-gray-700 hover:text-red-500 transition-colors">
        Log out
      </Link>
    */}
  </div>
</nav>

  );
};

export default NavBar;