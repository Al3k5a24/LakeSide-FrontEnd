//connection between frontend and backend
import axios from "axios"

//url for website api 
export const api=axios.create({
    baseURL :"http://localhost:8080"
})