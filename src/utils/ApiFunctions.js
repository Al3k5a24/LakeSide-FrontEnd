//connection between frontend and backend
import axios from "axios"

//url for website api 
export const api=axios.create({
    baseURL :"http://localhost:8080"
})

//this function adds a new room
export async function addRoom(photo, roomType, roomPrice) {
    const formData=new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)

    //checks if all went well in add Room method
    const response = await api.post("/rooms/add/new-room",formData)
    if(response.status===201){
        return true;
    }else return false;
}

//function gets all room types from database
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types")
        return response.data
    } catch (error) {
       throw new Error("Could not fetch room types")
    }
}

//function to fetch data from backend which will be used to display all rooms
export async function getAllRooms(){
    try{
        const result = await api.get("/rooms/all-rooms")
        return result.data
    }catch(error){
        throw new Error("Error fetching rooms")
    }
}

//function to delete a room
export async function deleteRoom(roomId){
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Could not delete room ${room.message}`)
    }
}

//function to update room details
export async function updateRoom(roomId, roomData){
    const formData=new FormData()
    formData.append("roomType",roomData.roomType)
    formData.append("roomPrice",roomData.roomPrice)
    if (roomData.photo) {
    formData.append("photo", roomData.photo);}

    const response=await api.put(`/rooms/update/room/${roomId}`, formData)
    return response
}

//function to get single room by id
export async function getRoomById(roomId){
    try {
        const result=await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Could not fetch room ${error.message}`)
    }
}

export async function bookRoom(roomId, bookingData){
    try {
        const formData=new FormData()
        formData.append("guestFullName",bookingData.guestFullName)
        formData.append("guestEmail",bookingData.guestEmail)
        formData.append("numOfAdults",bookingData.numOfAdults)
        formData.append("numOfChildren",bookingData.numOfChildren)
        formData.append("checkInDate",bookingData.checkInDate)
        formData.append("checkOutDate",bookingData.checkOutDate)
        const response=await api.post(`/rooms/browse-rooms/booking/${roomId}`,formData)
        return response
    } catch (error) {
        throw new Error(`Could not book room ${error.message}`)
    }
}