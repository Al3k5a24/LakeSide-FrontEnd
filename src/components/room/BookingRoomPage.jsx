import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomById } from "../../utils/ApiFunctions";
import { FaDollarSign } from 'react-icons/fa'

const BookingRoomPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [room,setRoom]=useState()
  const [imagePreview, setImagePreview] = useState("");
  const [date, setDate] = useState(new Date());


  //get roomId from URL so we can fetch the room data and update
  const { roomId } = useParams();
  console.log("roomId from URL:", roomId);

  useEffect(()=>{
    const fetchRoomData=async()=>{
      try {
        const roomData=await getRoomById(roomId)
        setRoom(roomData)
        setIsLoading(false)

        // If the photo is a binary data, convert it to a URL for preview
            // deepseek
            if (roomData.photo) {
            let blob;   
            
            if (Array.isArray(roomData.photo)) {
                // Ako je byte array
                const uint8Array = new Uint8Array(roomData.photo);
                blob = new Blob([uint8Array], { type: 'image/jpeg' });
            } else if (roomData.photo instanceof Blob) {
                // Ako je već Blob
                blob = roomData.photo;
            } else if (typeof roomData.photo === 'string') {
                // Ako je base64 string
                const response = await fetch(`data:image/jpeg;base64,${roomData.photo}`);
                blob = await response.blob();
            } else {
                console.error('Unknown photo format:', typeof roomData.photo);
                return;
            }
            const fileURL = URL.createObjectURL(blob);
            setImagePreview(fileURL);
            console.log(fileURL);
        }
      } catch (error) {
        
      }
    }
  fetchRoomData();},[roomId])

  //if data is Loading, or there is an error, show appropriate message
  if (isLoading) {
    return <div>Loading data...</div>;
  }
  if (error) {
    return <div>Error: {error.message} </div>;
  }

  return (
    <section className="grid grid-cols-2">
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
            <FaDollarSign />
          </span>
          <p className="font-semibold font-sans px-4 py-1 rounded-xl bg-neutral-400/50">
            {room.roomPrice} / night
          </p>
        </div>
        <p className="text-gray-600 text-center max-w-md">
          Some room information should be displayed here
        </p>
      </div>

        <div className="flex items-start justify-between">
          <label className="mb-2 font-medium">Full name:</label>
          <input className="border border-black rounded-lg px-3 py-2 w-3/4" 
          type="text" />
        </div>
    </section>
  );
};

export default BookingRoomPage;
