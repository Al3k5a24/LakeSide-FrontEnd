import React, { useState } from 'react'
import { addRoom } from '../../utils/ApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelector'

const AddRoom = () => {

    //defining new room object
    const[newRoom, setNewRoom]=useState({
        photo:null,
        roomType:"",
        roomPrice:""
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
                value.parseInt(value);
            }else{
                value=""
            }
        }
        setNewRoom({...newRoom, [name]:value})
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
            newRoom.roomType,newRoom.roomPrice)

            if(success!==undefined){
                setSuccessMessage("A new room was created!")
                
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
    <section className='container my-21 max-w-3xl mx-auto'>
        <div className='flex flex-col justify-center'>
            <div className='bg-gray-400 items-center py-4 px-3 rounded-lg shadow-md space-y-3'>
                <h2 className=' font-bold md:text-3xl'>Add a New Room</h2>
                <form onSubmit={(handleSubmit)}>
                    <div className='mb-3'>
                        <label htmlFor="roomType" className='flex flex-row items-start ml-2'>Room Type</label>
                        <div className='flex relative items-start mt-2 ml-3'>
                            <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} 
                            newRoom={newRoom}/>
                        </div>
                    </div>

                    <div className='mb-3 space-x-3'>
                        <label htmlFor="roomPrice"
                        className=''>Room Price</label>
                            <input 
                            id='roomPrice' 
                            type="text" 
                            name='roomPrice'
                            value={newRoom.roomPrice}
                            onChange={handleRoomInputChange}
                            required
                            className='bg-gray-300 px-4 py-0.5'/>
                    </div>

                     <div className='mb-3 space-x-3'>
                        <label htmlFor="roomPhoto">Room Photo</label>
                        <input type="file" 
                        id='roomPhoto'
                        name='roomPhoto'
                        accept='image/*'
                        required 
                        onChange={handleImageChange}/>

                        {imagePreview && (
                        <img src={imagePreview}
                        alt='Preview Room photo'
                        style={{maxWidth:"400px",maxHeight:"400px"}}/>
                        )}
                    </div>
                        <button>Submit</button>
                </form>
            </div>
        </div>
    </section>
    
    
    </>
  )
}

export default AddRoom
