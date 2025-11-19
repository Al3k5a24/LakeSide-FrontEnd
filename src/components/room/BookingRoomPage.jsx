import React, { useEffect, useState } from "react";
import { matchPath, Navigate, useNavigate, useParams } from "react-router-dom";
import { bookRoom, getRoomById } from "../../utils/ApiFunctions";
import { FaDollarSign } from "react-icons/fa";
import { getUserProfile } from "../../utils/ApiAuth";

const BookingRoomPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const [adultsValue, setAdultsValue] = useState(0);
  const [childrenValue, setChildrenValue] = useState(0);
  const [InDate, setInDate] = useState(new Date());
  const [OutDate, setOutDate] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //get roomId from URL so we can fetch the room data and update
  const { roomId } = useParams();

  const [room, setRoom] = useState({
    roomType: "",
    roomPrice: 0,
    photo: null,
  });

  //defining new room object
  const [bookedRoom, setBookedRoom] = useState({
    guestFullName: "",
    guestEmail: "",
    numOfAdults: 0,
    numOfChildren: 0,
    checkInDate: null,
    checkOutDate: null,
  });

  //function to handle full name input change
  const handleFullnameChange = (e) => {
    const value = e.target.value;
    setBookedRoom({ ...bookedRoom, guestFullName: value });
  }

   //function to handle email input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setBookedRoom({ ...bookedRoom, guestEmail: value });
  }

  //function to handle number of adults input change
  const handleNumOfAdultsChange = (e) =>{
    const value = e.target.value;
    setAdultsValue(value);
    setBookedRoom({...bookedRoom, numOfAdults: parseInt(value)});
  }

  //function to handle number of children input change
  const handleNumOfChildrenChange = (e) =>{
    const value = e.target.value;
    setChildrenValue(value);
    setBookedRoom({...bookedRoom, numOfChildren: parseInt(value)});
  }

  //function to handle check in date input change
  const handleCheckInDateChange = (e) =>{
    const value = e.target.value;
    setInDate(value);
    setBookedRoom({...bookedRoom, checkInDate: value});
  }

  //function to handle check out date input change
  const handleCheckOutDateChange = (e) =>{
    const value = e.target.value;
    setOutDate(value);
    setBookedRoom({...bookedRoom, checkOutDate: value});
  }

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setIsLoading(false);

        // If the photo is a binary data, convert it to a URL for preview
        // deepseek
        if (roomData.photo) {
          let blob;

          if (Array.isArray(roomData.photo)) {
            // Ako je byte array
            const uint8Array = new Uint8Array(roomData.photo);
            blob = new Blob([uint8Array], { type: "image/jpeg" });
          } else if (roomData.photo instanceof Blob) {
            // Ako je već Blob
            blob = roomData.photo;
          } else if (typeof roomData.photo === "string") {
            // Ako je base64 string
            const response = await fetch(
              `data:image/jpeg;base64,${roomData.photo}`
            );
            blob = await response.blob();
          } else {
            console.error("Unknown photo format:", typeof roomData.photo);
            return;
          }
          const fileURL = URL.createObjectURL(blob);
          setImagePreview(fileURL);
          console.log(fileURL);
        }
      } catch (error) {}
    };
    fetchRoomData();
  }, [roomId]);

  //if data is Loading, or there is an error, show appropriate message
  if (isLoading) {
    return <div>Loading data...</div>;
  }
  if (error) {
    return <div>Error: {error.message} </div>;
  }

  //handle submit for booking page
  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    const response = await bookRoom(roomId, bookedRoom);
    if(response.status === 200){
      setSuccessMessage("Room booked successfully!");
      setErrorMessage("");
      setTimeout(() => {
      window.location.reload();
      }, 1000);
    }else{
      setErrorMessage("Failed to book room. Please try again.");
      setSuccessMessage("");
    }
  } catch (error) {
    setErrorMessage(`Failed to book room: ${error.message}`);
  }}

  return (
    <section className="grid grid-cols-2 gap-4 bg-white rounded-4xl">
      <div className="flex flex-col items-start justify-between space-y-2.5 p-4">
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview Room photo"
            className="m-2 rounded-lg"
            style={{ width: "500px", height: "300px" }}
          />
        )}

        <h2 className="text-3xl font-bold mt-4">{room.roomType}</h2>
        <div className="flex flex-row pt-2 text-xl items-center space-x-2">
          <span className="text-2xl font-bold">
            Price: <FaDollarSign className="inline-block mb-1" />
          </span>
          <p className="font-semibold font-sans px-4 py-1 rounded-xl bg-red-400/50 text-white">
            {room.roomPrice} / night
          </p>
        </div>
        <p className="text-gray-600 text-center max-w-md">
          Some room information should be displayed here
        </p>
      </div>

      <div className="flex flex-col items-start justify-between bg-[#F3EFE6] rounded-b-4xl shadow-[0_-4px_8px_-4px_rgba(0,0,0,0.1),0_8px_8px_-6px_rgba(0,0,0,0.35)] p-6">
        <h2 className="text-3xl font-bold mb-6">Make a Reservation:</h2>
        {/* //displays success message if there is any */}
                {successMessage &&(
                    <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-3 w-full text-center'>
                        {successMessage}
                    </div>
                )}

                {/* //displays error message if there is any */}
                {errorMessage &&(
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3 w-full text-center'>
                        {errorMessage}
                    </div>
                )}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 w-full">
          {/* <!-- Full Name --> */}
          <div className="flex flex-col items-start">
            <label className="mb-2 font-medium">Full name:</label>
            <input
            value={bookedRoom.guestFullName}
            onChange={handleFullnameChange}
              id="guestFullName"
              name="guestFullName"
              className="border border-black rounded-lg px-4 py-2.5 w-full"
              type="text"
              placeholder="Enter Full name here"
            />
          </div>

          {/* <!-- Email Address --> */}
          <div className="flex flex-col items-start">
            <label className="mb-2 font-medium">E-Mail address:</label>
            <input
            value={bookedRoom.guestEmail}
            onChange={handleEmailChange}
              id="guestEmail"
              name="guestEmail"
              className="border border-black rounded-lg px-4 py-2.5 w-full"
              type="email"
              placeholder="Enter E-Mail address here"
            />
          </div>

          {/* <!-- Number of Adults --> */}
          <div className="flex flex-col items-start">
            <label className="mb-2 font-medium">Number of adults:</label>
            <select
            onChange={handleNumOfAdultsChange}
              className="border border-black rounded-lg px-4 py-2.5 w-full"
              id="numOfAdults"
              name="numOfAdults"
            >
              <option value="" disabled selected>
                Select number of adults
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </select>
          </div>

          {/* <!-- Number of Children --> */}
          <div className="flex flex-col items-start">
            <label className="mb-2 font-medium">Number of children:</label>
            <select
            onChange={handleNumOfChildrenChange}
              className="border border-black rounded-lg px-4 py-2.5 w-full"
              id="numOfChildren"
              name="numOfChildren">
              <option value="" disabled selected>
                Select number of children
              </option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>

          {/* <!-- Check-In Date --> */}
          <div className="flex flex-col items-start">
            <label className="mb-2 font-medium">Check-In Date:</label>
            <input
            onChange={handleCheckInDateChange}
              id="checkInDate"
              name="checkInDate"
              className="border border-black rounded-lg px-4 py-2.5 w-full"
              type="date"/>
          </div>

          {/* <!-- Check-Out Date --> */}
          <div className="flex flex-col items-start">
            <label className="mb-2 font-medium">Check-Out Date:</label>
            <input
            onChange={handleCheckOutDateChange}
              id="checkOutDate"
              name="checkOutDate"
              className="border border-black rounded-lg px-4 py-2.5 w-full"
              type="date"/>
          </div>

          {/* <!-- Submit Button --> */}
          <div className="flex justify-center col-span-2 mt-2">
            <button
              type="submit"
              className="px-11 py-2.5 text-base font-medium text-white bg-red-700 hover:bg-red-800
               focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg dark:bg-red-600
                dark:hover:bg-red-700 dark:focus:ring-red-800 transition-colors">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingRoomPage;
