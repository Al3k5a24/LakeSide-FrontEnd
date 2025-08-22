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
          <select className=''
          id="roomType" name="roomType" value={newRoom.roomTypes}
          onChange={(e)=>{
            if(e.target.value==="Add New"){
              setShowNewRoomTypeInput(true);
            }else{
              setShowNewRoomTypeInput(false);
              handleRoomInputChange(e);
            }
          }}>

            <option value={""}>Select room type</option>
            <option value={"Add New"}>Add New</option>
            {roomTypes.map((type,index)=>(
              <option key={index} value={type}>
                {type}
                </option>            
              ))}
          </select>
          {showNewRoomTypeInput && (
            <div>
              <input 
              type="text"
              placeholder='Enter new room type'
              onChange={handleNewRoomInputChange}/>
              <button onClick={handleAddnewRoomType}>Add</button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default RoomTypeSelector
