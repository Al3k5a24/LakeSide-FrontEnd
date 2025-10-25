import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';
import RoomTypeSelector from '../common/RoomTypeSelector';

const EditRoom = () => {

      //roomPrice state to handle input 
      const [priceValue,setpriceValue]=useState("")
      
        //defining new room object
      const[Room, setRoom]=useState({
          photo:null,
          roomType:"",
          roomPrice:0
      })
  
      //get input
      const handlePriceChange=(e)=>{
          const value=e.target.value;
          setpriceValue(value);
          setRoom({...Room, roomPrice: value});
      }
  
      const[imagePreview, setImagePreview] = useState("")
      const[successMessage,setSuccessMessage]=useState("")
      const[errorMessage,setErrorMessage]=useState("")
      
      //get roomId from URL so we can fetch the room data and update
      const { roomId } = useParams();

    //function that will handle image preview and selection
    const handleImageChange=(e)=>{
        const selectedImage= e.target.files[0]
        setRoom({...Room, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    //dynamic update state of object newRoom
    //checks if roomPrice is number
    const handleRoomInputChange = (e) =>{
        const{name,value}=e.target;
        setRoom({...Room,[name]:value})
    }

    useEffect(()=>{ 
        const fetchRoomData=async()=>{
            try {
                const roomData=await getRoomById(roomId)
                setRoom(roomData)
                setImagePreview(roomData.photo)
                setpriceValue(roomData.roomPrice)
                
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
        }
            catch (error) {
                console.error("Error fetching room data:", error)
            }
    }
    fetchRoomData()
  },[roomId])

    //function that will handle submit of update
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response=await updateRoom(roomId,Room)
            console.log("Update response:", response)
            if(response.status===200){
                setSuccessMessage("Room updated successfully!")
                setErrorMessage("")
            }else{
                setErrorMessage("Failed to update room. Please try again.")
                setSuccessMessage("")
            }
        }catch (error) {
            console.error("Error updating room:", error)
            setErrorMessage("Failed to update room. Please try again.")
        }
    }
        //    timeout to reload the page
           setTimeout(()=>{
            window.location.reload();
           },1500)

  return (
    <>
    <section className='block my-21 max-w-2xl mx-auto'>
        <div>
            <div className='bg-[#F3EFE6] items-center py-4 px-3 rounded-3xl inset-shadow-sm inset-shadow-gray-400 drop-shadow-xl/40 space-y-3'>
                <h2 className='flex ml-2 pb-3 items-start font-semibold md:text-3xl sm:text-2xl'>Edit Room</h2>

                {/* //displays success message if there is any */}
                {successMessage &&(
                    <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-3'>
                        {successMessage}
                    </div>
                )}

                {/* //displays error message if there is any */}
                {errorMessage &&(
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3'>
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={(handleSubmit)}>
                    <div className='mb-3'>
                        <label htmlFor="roomType" className='flex font-medium flex-row text-base items-start ml-2'>Room Type</label>
                        <div className='block items-start mt-2 ml-3 '>
                            <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} 
                            newRoom={Room} value={Room.roomType}/>
                        </div>
                    </div>

                        <label htmlFor="roomPrice"
                        className='flex font-medium text-base items-start ml-2 pt-5'>Room Price</label>
                    <div className='mb-3 mt-2 space-x-3 block'>
                            <input
                            id='roomPrice' 
                            type="number" 
                            name='roomPrice'
                            value={Room.roomPrice}
                            onChange={handlePriceChange}
                            placeholder='Enter room price'
                            className='block rounded-md
                             bg-black/5 w-2xs ml-2.5 
                             py-1.5 pr-3 pl-2.5 text-base
                              text-black placeholder:text-gray-500 
                              outline-1 -outline-offset-1 outline-gray-300
                              focus:outline-2'/>
                    </div>
                     <div className='grid grid-cols-1 gap-1'>
                        <label htmlFor="roomPhoto" className='flex font-medium text-base items-start ml-2 pt-5'>Room Photo</label>
                        <div className='mb-3 mt-2 space-x-3 block'>
                        <input type="file" 
                        id='roomPhoto'
                        name='roomPhoto'
                        accept='image/*'
                        onChange={handleImageChange}
                        className='grid m-2'/>

                        {imagePreview && (
                        <img src={imagePreview}
                        alt='Preview Room photo'
                        className='m-2 rounded-lg'
                        style={{maxWidth:"400px",maxHeight:"400px"}}/>
                        )}
                        </div>
                    </div>
                    {/* type="submit" for sending data to backend */}
                        <button type="submit" className='
                        px-7 py-2.5 text-sm 
                        font-medium text-white
                        bg-blue-700 hover:bg-blue-800
                        focus:ring-4 focus:outline-none
                        focus:ring-blue-300 
                        rounded-lg text-
                        dark:bg-blue-600
                        dark:hover:bg-blue-700
                        dark:focus:ring-blue-800'>Submit</button>

                        <Link
                to={"/existingRooms"}
                className="px-7 py-3 text-sm ml-3
                        font-medium text-white
                         bg-blue-700 hover:bg-blue-800
                          focus:ring-4 focus:outline-none
                           focus:ring-blue-300 
                           rounded-lg text-
                            dark:bg-blue-600
                             dark:hover:bg-blue-700
                              dark:focus:ring-blue-800">
                View all rooms
              </Link>
                </form>
            </div>
        </div>
    </section>
    </>
  )
}
export default EditRoom
