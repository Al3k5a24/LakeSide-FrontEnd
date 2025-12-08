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
        const result = await api.get("/rooms/all-rooms")
        return result.data
    }catch(error){
        throw new Error("Error fetching rooms")
    }
}