import React, { useState } from 'react'

const RoomFilter = ({data,setFilteredData}) => {
    const[filter,setFilter]=useState("")

    //function that will handle filtration
    const handleSelectChange=(e)=>{
        const selectedRoomType=e.target.value
        setFilter(selectedRoomType)

        //set to lower case for accurate matching
        const filteredRooms = data.filter((room)=>room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()))
        setFilteredData(filteredRooms)
    }
    
    //if nothing is selected, return all data and display it
    const clearFilter=()=>{
        setFilter("")
        setFilteredData(data)
    }

    //array of unique room types from 
    const roomTypes=[...new Set((data || []).map((room)=>room.roomType))]

  return (
    <div>
      <span id="room-type-filter">Filter rooms by type</span>
      <select
      value={filter}
      onChange={handleSelectChange}>
        <option value={""}>Select a room type</option>
        {roomTypes.map((type,index)=>(
            <option key={index} value={String(type)}>
                {String(type)}
            </option>
        ))}
      </select>
      <button type="button" onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
  )
}

export default RoomFilter
