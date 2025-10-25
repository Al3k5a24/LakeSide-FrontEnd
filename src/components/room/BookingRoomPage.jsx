import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomById } from "../../utils/ApiFunctions";

const BookingRoomPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [romm,setRoom]=useState()
  const [imagePreview, setImagePreview] = useState("");

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
    return <div>Error: {error.message}</div>;
  }

  return (
    <section>
      <div>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview Room photo"
            className="m-2 rounded-lg"
            style={{ maxWidth: "400px", maxHeight: "400px" }}
          />
        )}
      </div>
    </section>
  );
};

export default BookingRoomPage;
