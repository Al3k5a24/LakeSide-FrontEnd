import React from 'react'

const RoomPaginator = ({currentPage, totalPages, onPageChange}) => {
    //generate page numbers based on result from database
    const pageNumbers=Array.from({length : totalPages}, (_, i)=>i+1)
  return (
    <nav>
        <ul>
            {pageNumbers.map((pageNumber)=>(
                <li key={pageNumber}
                //add tailwind later for selected and non-selected page button!
                className={`${currentPage===pageNumber ? "active": "flex items-center justify-center"}`}>
                    <button onClick={()=>onPageChange(pageNumber)}>
                        {pageNumber}
                    </button>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default RoomPaginator
