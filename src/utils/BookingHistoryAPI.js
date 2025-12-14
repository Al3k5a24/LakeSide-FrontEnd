//connection between frontend and backend
import axios from "axios"

//url for website api 
export const api=axios.create({
    baseURL :"http://localhost:8080",
    withCredentials: true  // for cookies to be sent along with requests
})

//function to fetch data from backend which will be used to display all rooms
export async function getMyBookedRooms(){
    try{
        const result = await api.get("/my-bookings/all-booked-Rooms")
        return {
            checkInDate:result.data.checkInDate,
            checkOutDate:result.data.checkOutDate,
            totalNumOfGuests:result.data.totalNumOfGuests,
            roomType:result.data.bookedRoomType,
            roomPrice:result.data.totalPrice,
            status:result.data.status
        }
    }catch(error){
        throw new Error("Error fetching rooms")
    }
}