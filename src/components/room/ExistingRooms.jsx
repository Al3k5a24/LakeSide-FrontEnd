import React, { useEffect, useState } from 'react'

const ExistingRooms = () => {
     const[rooms,setRooms] =useState([])
     const[currentPage,setCurrentPage]=useState(1)
     const[roomsPerPage]=useState(8)
     const[isLoading,setIsLoading]=useState(false)
     const[filterRooms,setFilterRooms]=useState([])
     const[selectedRoomType,setSelectedRoomType]=useState("")
     const[successMessage,setSuccessMessage]=useState("")
     const[errorMessage,setErrorMessage]=useState("")

     useEffect(()=>{
        fetchRooms()
     },[])

     //fetch all rooms from database
     const fetchRooms = async()=>{
        setIsLoading(true)
        try {
            const result=await getAllRooms()
            setRooms(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage("Error has occured while loading rooms!")
        }
     }

     useEffect(()=>{
        //if not selected, return all rooms
        if(selectedRoomType === ""){
            setFilterRooms(rooms)
        }else{
            const filtered =
            rooms.filter((room)=>room.roomType===selectedRoomType)
        }
        setCurrentPage(1)
     },[rooms,selectedRoomType])

     //function to calculate number of pages
     const calculateTotalPages=((filterRooms,roomsPerPage,rooms)=>{
        //calculate based on filter
        //if there is no room(length=0) use all rooms to calculate
         const totalRooms = filterRooms.length>0 ? filterRooms.length : rooms.length
         return Math.ceil(totalRooms / roomsPerPage)
        })

    const indexOfLastRoom=currentPage * roomsPerPage
    const indexOfFirstRoom=indexOfLastRoom - roomsPerPage
    const currentRooms=filterRooms.slice(indexOfFirstRoom,indexOfLastRoom)
    return (
    <div>
      
    </div>
  )
}

export default ExistingRooms
