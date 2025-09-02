import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../../utils/ApiFunctions'

const RoomTypeSelector = ({handleRoomInputChange,newRoom}) => {

    const[roomTypes,setRoomTypes]=useState([""])
    const[showNewRoomTypeInput,setShowNewRoomTypeInput]=useState(false)
    const[newRoomType,setNewRoomType]=useState("")

    //if user wants to enter new room type
    useEffect(()=>{
        // data is from backend
        getRoomTypes().then((data)=>{
            setRoomTypes(data)
        })
    },[])

    const handleNewRoomInputChange=(e)=>{
        setNewRoomType(e.target.value);
    }

    //function that will add that new room type
    const handleAddnewRoomType=()=>{
      if(newRoomType!== ""){
        setRoomTypes([...roomTypes,newRoomType])
        setNewRoomType("");
        setShowNewRoomTypeInput(false);
      }
    }

  return (
    <>
      {roomTypes.length>0 && (
        <div>
          <select className='block w-2xs appearance-none rounded-md bg-black/5 py-1.5 
          pr-12 pl-3 text-base outline-1 
          outline-offset-2 text-gray-500  outline-gray-300 focus:outline-offset-2
          focus:outline-2'
          id="roomType" name="roomType" value={newRoom.roomTypes}
          onChange={(e)=>{
            if(e.target.value==="Add New"){
              setShowNewRoomTypeInput(true);
            }else{
              setShowNewRoomTypeInput(false);
              handleRoomInputChange(e);
            }
          }}>

            <option className='' value={""}>Select room type</option>
            <option value={"Add New"}>Add New</option>
            {roomTypes.map((type,index)=>(
              <option key={index} value={type}>
                {type}
                </option>            
              ))}
          </select>
          {showNewRoomTypeInput && (
            <div className='grid grid-cols-1 items-baseline md:grid-cols-2 sm:grid-cols-1'>
              <input className='relative rounded-md bg-black/5 py-1.5 
          pr-12 pl-3 text-base outline-1 items-start
          outline-offset-2 placeholder:text-gray-500 focus:outline-offset-2
          focus:outline-2 mt-5'
              type="text"
              placeholder='Enter new room type'
              onChange={handleNewRoomInputChange}/>
              <button className='ml-2 p-1 right-0 w-2/8 focus:outline-none
               text-white bg-red-700 hover:bg-red-800 
               focus:ring-4 focus:ring-red-300 font-medium 
               rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={handleAddnewRoomType}>Add</button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default RoomTypeSelector
