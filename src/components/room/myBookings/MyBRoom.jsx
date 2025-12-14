import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import RoomCard from './MyBRoomCard'
import RoomFilter from '../../common/RoomFilter'
import RoomPaginator from '../../common/RoomPaginator'
import { getMyBookedRooms } from '../../../utils/BookingHistoryAPI'

const MyBRoom = () => {
    const[data,setData]=useState([])
    const[error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(true)
    const[currentPage,setCurrentPage]=useState(1)
    const[roomsPerPage]=useState(6)
    const[filteredData,setFilteredData]=useState([{id:""}])

    //call method from API to get all rooms
    useEffect(()=>{
        setIsLoading(true)
        //getAllRooms is defined in utils/ApiFunctions.js
        getMyBookedRooms().then((data)=>{
            setData(data)
            setFilteredData(data)
            setIsLoading(false)
        }).catch((error)=>{
            setError(error.message)
            setIsLoading(false)
        })
    }, [])

    if(isLoading){
      return <div>Loading data...</div>
    }
    if(error){
      return <div>Error: {error.message}</div>
    }

    //handle pagination
    const handlePageChange=(pageNumber)=>{
      setCurrentPage(pageNumber)
    }

    const totalPages=Math.ceil(filteredData.length/roomsPerPage)
    
    const renderRooms = ()=>{
      const startIndex=(currentPage-1)*roomsPerPage
      const endIndex=startIndex+roomsPerPage
      //for every room in the filtered data, render a RoomCard component
      return filteredData.slice(startIndex, endIndex).map((room)=><RoomCard key={room.id} room={room}/>)
    }

  return (
    <Container>
      <Row>

        <Col md={6} >
        <RoomFilter data={data} setFilteredData={setFilteredData}/>
        </Col>

        <Col md={6} className='flex items-center justify-center mt-3 mb-3'>
        <RoomPaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </Col>

      </Row>

      <Row>
        {renderRooms()}
      </Row>

      <Row className='flex items-center justify-center mt-3 mb-3'>
        <Col md={6}>
        <RoomPaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </Col>
      </Row>
    </Container>
  )
}

export default MyBRoom
