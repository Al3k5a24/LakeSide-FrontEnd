import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../../utils/ApiFunctions'

const Room = () => {
    const[data,setData]=useState([])
    const[error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(true)
    const[currentPage,setCurrentPage]=useState(1)
    const[roomsPerPage]=useState(6)
    const[filteredData,setFilteredData]=useState([])

    //call method from API to get all rooms
    useEffect(()=>{
        setIsLoading(true)
        //getAllRooms is defined in utils/ApiFunctions.js
        getAllRooms().then((data)=>{
            setData(data)
            setFilteredData(data)
            setIsLoading(false)
        })
    })

  return (
    <div>
      
    </div>
  )
}

export default Room
