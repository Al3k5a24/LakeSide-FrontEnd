import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import RoomFilter from './../common/RoomFilter.jsx'
import RoomPaginator from './../common/RoomPaginator.jsx'

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

     const handlePaginationClick=(pageNumber)=>{
        setCurrentPage(pageNumber)
     }

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
    <>
    {/* if rooms are not loaded,show loading message */}
    {/* {isLoading ? (
        <p>Loading existing rooms...</p> */}
    {/* ): ( */}
      <section className='bg-amber-500 p-3 rounded'>
        <div>
            <h2>Existing rooms</h2>
        </div>
        {/* <Col md={6}>
        <RoomFilter data={rooms} setFilterData={setFilterRooms}/>
        </Col> */}

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Room Type</th>
                    <th>Room Price</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {currentRooms.map((room)=>(
                    <tr key={room.id}>
                        <td>{room.id}</td>
                        <td>{room.roomType}</td>
                        <td>{room.roomPrice}</td>
                        {/* Action button placeholders(Delete,View,Edit) */}
                        <td>
                            <button>view / Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Room paginator */}
        {/* <RoomPaginator currentPage={currentPage}
        totalPages={calculateTotalPages(filterRooms,roomsPerPage,rooms)}
        onPageChange={handlePaginationClick}
        /> */}
      </section>  
    {/* )} */}
    </>
  )
}

export default ExistingRooms
