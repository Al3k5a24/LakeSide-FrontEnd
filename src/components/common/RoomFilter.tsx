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
    <div className="inline-flex gap-3 rounded-lg items-center shadow-md w-full max-w-xl">
  <span id="room-type-filter" className="text-gray-800 p-3 text-xl font-medium">
    Filter rooms by type
  </span>

  <select
    value={filter}
    onChange={handleSelectChange}
    className="p-2 rounded-lg border border-gray-400 bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <option value={""}>Select a room type</option>
    {roomTypes.map((type, index) => (
      <option key={index} value={String(type)}>
        {String(type)}
      </option>
    ))}
  </select>

  <button
    type="button"
    onClick={clearFilter}
    className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200"
  >
    Clear Filter
  </button>
</div>

  )
}

export default RoomFilter
