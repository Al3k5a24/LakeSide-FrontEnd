import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomById } from "../../utils/ApiFunctions";
import { FaDollarSign } from "react-icons/fa";

const BookingRoomPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState();
  const [imagePreview, setImagePreview] = useState("");
  const [date, setDate] = useState(new Date());

  //get roomId from URL so we can fetch the room data and update
  const { roomId } = useParams();
  console.log("roomId from URL:", roomId);

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

      <div
        className="grid grid-cols-2 items-start justify-between p-4 gap-4
        bg-[#F3EFE6] rounded-b-4xl 
          shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.1),0_8px_24px_-6px_rgba(0,0,0,0.35)]">
  
          <h2 className="text-3xl font-bold mt-4">
            Make a Reservation:
          </h2>

          <div className="flex items-center flex-shrink-0 text-black ml-auto">
            <span className="text-2xl font-semibold text-red-600 hover:text-red-700 transition-colors">
        lakeSide <span className="text-gray-800">hotel</span></span>
          </div>

        <div className="flex flex-col space-x-2 space-y-2.5 items-start justify-between">
          <label className="mb-1 font-medium">Full name:</label>
          <input
            className="flex border border-black items-start rounded-lg px-7 py-2 w-full"
            type="text"
            placeholder="Enter Full name here"
          />
        </div>

        <div className="flex flex-col space-x-2 space-y-2.5 items-start justify-between">
          <label className="mb-1 font-medium">E-Mail adress::</label>
          <input
            className="flex border border-black items-start rounded-lg px-7 py-2 w-full"
            type="text"
            placeholder="Enter E-Mail adress here"
          />
        </div>

        <div className="flex flex-col space-x-2 space-y-2.5 items-start justify-between">
          <label className="mb-1 font-medium">Number of adults:</label>
          <select className='flex border border-black items-start rounded-lg px-7 py-2.5 w-full'
          id="roomType" placeholder="Select number of adults"></select>
        </div>

        <div className="flex flex-col space-x-2 space-y-2.5 items-start justify-between">
          <label className="mb-1 font-medium">Number of children:</label>
          <select className='flex border border-black items-start rounded-lg px-7 py-2.5 w-full'
          id="roomType" placeholder="Select number of children"></select>
        </div>

        <div className="flex flex-col space-x-2 space-y-2.5 items-start justify-between">
          <label className="mb-1 font-medium">Check-In Date:</label>
          <input
            className="flex border border-black items-start rounded-lg px-7 py-2 w-full"
            type="date"
            placeholder="Enter Full name here"
          />
        </div>

        <div className="flex flex-col space-x-2 space-y-2.5 items-start justify-between">
          <label className="mb-1 font-medium">Check-Out Date:</label>
          <input
            className="flex border border-black items-start rounded-lg px-7 py-2 w-full"
            type="date"
            placeholder="Enter Full name here"
          />
        </div>
        <div className="flex justify-center col-span-2 mt-4 w-full">
          <button type="submit" className='
                        px-11 py-2.5 text-sm 
                        font-medium text-white
                        bg-red-700 hover:bg-red-800
                        focus:ring-4 focus:outline-none
                        focus:ring-blue-300 
                        rounded-lg text-
                        dark:bg-red-600
                        dark:hover:bg-red-700
                        dark:focus:ring-red-800'>Submit</button>
        </div>
      </div>
    </section>
  );
};

export default BookingRoomPage;
