import React, { useState } from 'react'

const RoomFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("")

  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value
    setFilter(selectedRoomType)

    const filteredRooms = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
    )
    setFilteredData(filteredRooms)
  }

  const clearFilter = () => {
    setFilter("")
    setFilteredData(data)
  }

  const roomTypes = [...new Set((data || []).map((room) => room.roomType))]

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Filter Icon & Label */}
        <div className="flex items-center space-x-2 text-gray-700">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-base font-semibold whitespace-nowrap">
            Filter by Room Type
          </span>
        </div>

        {/* Select Dropdown */}
        <div className="relative flex-1 w-full md:w-auto">
          <select
            value={filter}
            onChange={handleSelectChange}
            className="w-full appearance-none px-4 py-2.5 pr-10 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-400"
          >
            <option value="">All Room Types</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={String(type)}>
                {String(type)}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Clear Filter Button */}
        <button
          type="button"
          onClick={clearFilter}
          disabled={!filter}
          className={`px-5 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all duration-300 flex items-center space-x-2 ${
            filter
              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Clear Filter</span>
        </button>
      </div>

      {/* Active Filter Indicator */}
      {filter && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Showing results for:
            </span>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                {filter}
              </span>
              <span className="text-sm text-gray-500">
                ({data.filter((room) => room.roomType.toLowerCase().includes(filter.toLowerCase())).length} rooms)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomFilter