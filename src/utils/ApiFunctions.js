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
        throw new error("Erro fetching room types")
    }
}