import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import RoomFilter from '../common/RoomFilter.jsx'
import RoomPaginator from '../common/RoomPaginator.jsx'
import { getAllRooms, deleteRoom } from '../../utils/ApiFunctions.js'
import { FaTrashAlt,FaEye, FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'

type Room = {
    id: number;
    roomType: string;
    roomPrice: number;
};

const ExistingRooms = () => {
     const[rooms,setRooms] =useState<Room[]>([])
     const[currentPage,setCurrentPage]=useState(1)
     const[roomsPerPage]=useState(8)
     const[isLoading,setIsLoading]=useState(false)
     const[filterRooms,setFilterRooms]=useState<Room[]>([])
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
            console.log("Rooms API response:", result);
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
            const filtered =  rooms.filter((room)=>room.roomType===selectedRoomType)
            setFilterRooms(filtered)
        }
        setCurrentPage(1)
     },[rooms,selectedRoomType])

     //ignore error, it works
     const handlePaginationClick=(pageNumber)=>{
        setCurrentPage(pageNumber)
     }

     const handleDeleteRoom=async(roomId)=>{
        try {
            const result=await deleteRoom(roomId)
            if(result===""){
            setSuccessMessage(`Room No ${roomId} deleted successfully!`)
            //refresh rooms
            fetchRooms()
        }else(
            console.error(`Error deleting room:", ${result.message}`)
        )
        } catch (error) {
            setErrorMessage(error.message)
        }
        //reset messages after 3 seconds
        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
        },3000)
     }

     //function to calculate number of pages
     //ignore error, it works
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
    <>
    {/* if rooms are not loaded,show loading message */}
      {isLoading ? (
        <p>Loading existing rooms...</p>
     ): ( 
      <section className='relative overflow-x-auto p-4 rounded-lg shadow-md'>
        <div className='p-3 overflow-auto flex flex-col items-baseline justify-between'>
            <h2 className='text-[32px] mb-4'>Existing rooms</h2>
        <Col md={6} className='mb-3'>
        <RoomFilter data={rooms} setFilteredData={setFilterRooms}/>
        </Col>
        </div>

  <div className="relative overflow-auto">
    <div className="overflow-x-auto rounded-lg">
        <table className='min-w-full bg-white mb-20'>
            <thead>
                <tr className='bg-[#2B4DC994] text-center text-xs font-thin text-white'>
                    <th className='p-2'>
                        <span className='block py-2 px-3 border-r border-gray-300'>ID</span>
                    </th>
                    <th className='p-2'>
                        <span className='block py-2 px-3 border-r border-gray-300'>Room Type</span>
                    </th>
                    <th className='p-2'>
                        <span className='block py-2 px-3 border-r border-gray-300'>Room Price</span>
                    </th>
                    <th className='p-2'>
                        <span>Action</span>
                    </th>
                </tr>
            </thead>

            <tbody>
                {currentRooms.map((room)=>(
                    <tr key={room.id} className='border-b border-b-gray-400 text-sm text-center text-gray-800'>
                        <td className='p-3 w-1/4'>{room.id}</td>
                        <td className='p-3 w-1/4'>{room.roomType}</td>
                        <td className='p-3 w-1/4'>{room.roomPrice}</td>
                        {/* Action button placeholders(Delete,View,Edit) */}
                        <td className='flex flex-row p-4 space-x-3 items-center justify-center'>
                            {/* insert react-router to guide to view or edit room details */}
                            <Link to={`/edit-room/${room.id}`} className='bg-blue-500
                             text-white flex space-x-5 px-3 py-2 rounded-md 
                             text-sm cursor-pointer'>
                            <span><FaEye/></span>
                            <span><FaEdit/></span>
                            </Link>
                            <button className='bg-red-500 text-white px-7 py-2 
                            rounded-md text-sm cursor-pointer'
                            onClick={()=>handleDeleteRoom(room.id)}
                            ><FaTrashAlt/></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
         {/* Room paginator  */}
         <RoomPaginator currentPage={currentPage}
        totalPages={calculateTotalPages(filterRooms,roomsPerPage,rooms)}
        onPageChange={handlePaginationClick}
        /> 
      </section>  
      )} 
    </>
  )
}

export default ExistingRooms