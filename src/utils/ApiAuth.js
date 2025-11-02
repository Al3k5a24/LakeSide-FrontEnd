//connection between frontend and backend
import axios from "axios"

//url for website api 
export const api=axios.create({
    baseURL :"http://localhost:8080"
})

export async function createAccount(userData){
try {
    const formData=new FormData();
    formData.append("fullName",userData.fullName);
    formData.append("email",userData.email);
    formData.append("password",userData.password);
    const response=await api.post("/auth/create-account",formData)
    return response
} catch (error) {
    throw new Error(`Could not create account ${error.error}`)
}
}