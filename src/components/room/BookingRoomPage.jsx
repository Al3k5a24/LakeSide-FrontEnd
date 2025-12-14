import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookRoom, getRoomById } from "../../utils/ApiFunctions";
import { FaDollarSign, FaTimes } from "react-icons/fa";

const BookingRoomPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const [adultsValue, setAdultsValue] = useState(0);
  const [childrenValue, setChildrenValue] = useState(0);
  const [InDate, setInDate] = useState(new Date());
  const [OutDate, setOutDate] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    roomType: "",
    roomPrice: 0,
    photo: null,
  });

  const [bookedRoom, setBookedRoom] = useState({
    numOfAdults: 0,
    numOfChildren: 0,
    checkInDate: null,
    checkOutDate: null,
  });

  const handleNumOfAdultsChange = (e) => {
    const value = e.target.value;
    setAdultsValue(value);
    setBookedRoom({ ...bookedRoom, numOfAdults: parseInt(value) });
  };

  const handleNumOfChildrenChange = (e) => {
    const value = e.target.value;
    setChildrenValue(value);
    setBookedRoom({ ...bookedRoom, numOfChildren: parseInt(value) });
  };

  const handleCheckInDateChange = (e) => {
    const value = e.target.value;
    setInDate(value);
    setBookedRoom({ ...bookedRoom, checkInDate: value });
  };

  const handleCheckOutDateChange = (e) => {
    const value = e.target.value;
    setOutDate(value);
    setBookedRoom({ ...bookedRoom, checkOutDate: value });
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setIsLoading(false);

        if (roomData.photo) {
          let blob;

          if (Array.isArray(roomData.photo)) {
            const uint8Array = new Uint8Array(roomData.photo);
            blob = new Blob([uint8Array], { type: "image/jpeg" });
          } else if (roomData.photo instanceof Blob) {
            blob = roomData.photo;
          } else if (typeof roomData.photo === "string") {
            const response = await fetch(
              `data:image/jpeg;base64,${roomData.photo}`
            );
            blob = await response.blob();
          } else {
            console.error("Unknown photo format:", typeof roomData.photo);
            return;
          }
          const fileURL = URL.createObjectURL(blob);
          setImagePreview(fileURL);
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchRoomData();
  }, [roomId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading room details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold">Error</h3>
          <p className="text-red-700 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await bookRoom(roomId, bookedRoom);
      if (response.status === 200) {
        setSuccessMessage("Room booked successfully!");
        setErrorMessage("");
        setTimeout(() => {
          navigate("/u/browse-rooms");
        }, 2000);
      } else {
        setErrorMessage("Failed to book room. Please try again.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage(`Failed to book room: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateNights = () => {
    if (!bookedRoom.checkInDate || !bookedRoom.checkOutDate) return 0;
    const start = new Date(bookedRoom.checkInDate);
    const end = new Date(bookedRoom.checkOutDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotalPrice = () => {
    return room.roomPrice * calculateNights();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Image */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-96 md:h-auto">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Room"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Price Badge on Image */}
              <div className="absolute bottom-6 left-6">
                <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg">
                  <div className="flex items-baseline">
                    <FaDollarSign className="text-red-500 text-2xl mr-1" />
                    <span className="text-3xl font-bold text-gray-900">{room.roomPrice}</span>
                    <span className="text-gray-600 ml-2">/ night</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Details Section */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {room.roomType}
                </h1>
                
                <p className="text-gray-600 mb-6">
                  Experience luxury and comfort in our beautifully designed room. Perfect for a relaxing getaway with all modern amenities.
                </p>

                {/* Amenities */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                      </svg>
                      <span className="text-sm">Free WiFi</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-sm">Air Conditioning</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">Smart TV</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm">Room Service</span>
                    </div>
                  </div>
                </div>

                {/* Room Features */}
                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Up to 4 Guests
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    35 m²
                  </div>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book This Room
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Make a Reservation</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Success/Error Messages */}
                {successMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {errorMessage}
                  </div>
                )}

                {/* Booking Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Guests Section */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Adults
                      </label>
                      <select
                        onChange={handleNumOfAdultsChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                      >
                        <option value="" disabled selected>
                          Select adults
                        </option>
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults</option>
                        <option value="3">3 Adults</option>
                        <option value="4">4+ Adults</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Children
                      </label>
                      <select
                        onChange={handleNumOfChildrenChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                      >
                        <option value="" disabled selected>
                          Select children
                        </option>
                        <option value="0">No Children</option>
                        <option value="1">1 Child</option>
                        <option value="2">2 Children</option>
                        <option value="3">3+ Children</option>
                      </select>
                    </div>
                  </div>

                  {/* Dates Section */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-In Date
                      </label>
                      <input
                        onChange={handleCheckInDateChange}
                        type="date"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-Out Date
                      </label>
                      <input
                        onChange={handleCheckOutDateChange}
                        type="date"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Price Summary */}
                  {calculateNights() > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4 mt-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Price Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            ${room.roomPrice} × {calculateNights()} night{calculateNights() > 1 ? 's' : ''}
                          </span>
                          <span className="font-medium">${calculateTotalPrice()}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 mt-2">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span className="text-red-600">${calculateTotalPrice()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Confirm Reservation"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingRoomPage;