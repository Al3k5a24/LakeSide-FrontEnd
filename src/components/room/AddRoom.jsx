import React, { useState } from 'react'
import { addRoom } from '../../utils/ApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelector'

const AddRoom = () => {

    //roomPrice state to handle input 
    const [priceValue,setpriceValue]=useState("")

    //get input
    const handlePriceChange=(e)=>{
        const value=e.target.value;
        setpriceValue(value);
    }

    //defining new room object
    const[newRoom, setNewRoom]=useState({
        photo:null,
        roomType:"",
        roomPrice:0
    })

    const[imagePreview, setImagePreview] = useState("")
    const[successMessage,setSuccessMessage]=useState("")
    const[errorMessage,setErrorMessage]=useState("")
       
    //dynamic update state of object newRoom
    //checks if roomPrice is number
    const handleRoomInputChange = (e) =>{
        const name = e.target.name
        let value=e.target.value
        if(name === "roomPrice"){
            if(!isNaN(value)){
                value.parseInt(value,10);
            }else{
                value=""
            }
        }
        setNewRoom({...newRoom, [name]:value,})
    }

    //function that will handle image preview and selection
    const handleImageChange=(e)=>{
        const selectedImage= e.target.files[0]
        setNewRoom({...newRoom, photo: selectedImage})

        //link to preview image
        setImagePreview(URL.createObjectURL(selectedImage));
    }

    //function that will handle submit 
    const handleSubmit=async(e)=>{
       e.preventDefault()
       try {
        const success=await addRoom(newRoom.photo,
            newRoom.roomType,priceValue)

            if(success!==undefined){
                setSuccessMessage("A new room was created!")
               //refresh page after submit
                window.location.reload();
               
                //create new empty object
                setNewRoom({photo: null, roomType: "", roomPrice: ""})
                setImagePreview("")
                setErrorMessage("")
            }else{
                setErrorMessage("Error has occured!")
            }
       } catch (error) {
        setErrorMessage(error.message)
       }
    }

  return (
    <>
    <section className='block my-21 max-w-2xl mx-auto'>
        <div>
            <div className='bg-[#F3EFE6] items-center py-4 px-3 rounded-3xl inset-shadow-sm inset-shadow-gray-400 drop-shadow-xl/40 space-y-3'>
                <h2 className='flex ml-2 pb-3 items-start font-semibold md:text-3xl sm:text-2xl'>Add a New Room</h2>
                <form onSubmit={(handleSubmit)}>
                    <div className='mb-3'>
                        <label htmlFor="roomType" className='flex font-medium flex-row text-base items-start ml-2'>Room Type</label>
                        <div className='block items-start mt-2 ml-3 '>
                            <RoomTypeSelector required handleRoomInputChange={handleRoomInputChange} 
                            newRoom={newRoom}/>
                        </div>
                    </div>

                        <label htmlFor="roomPrice"
                        className='flex font-medium text-base items-start ml-2 pt-5'>Room Price</label>
                    <div className='mb-3 mt-2 space-x-3 block'>
                            <input
                            id='roomPrice' 
                            type="number" 
                            name='roomPrice'
                            required
                            value={priceValue}
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
                        required 
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
                        <button className='
                        px-7 py-2.5 text-sm 
                        font-medium text-white
                         bg-blue-700 hover:bg-blue-800
                          focus:ring-4 focus:outline-none
                           focus:ring-blue-300 
                           rounded-lg text-
                            dark:bg-blue-600
                             dark:hover:bg-blue-700
                              dark:focus:ring-blue-800'
                              >Submit</button>
                </form>
            </div>
        </div>
    </section>
    
    
    </>
  )
}

export default AddRoom
