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
    throw new Error(`Could not create account ${error.message}`)
}
}

export async function signInAccount(userData){
    try {
    const formData=new FormData();
    formData.append("email",userData.email);
    formData.append("password",userData.password);
    const response=await api.post("/auth/sign-in",formData)
    return response 
    } catch (error) {
        throw new Error(`Could not create account ${error.message}`)
    }
}

//function to get profile for user after successfull auth
export async function getUserProfile(){
    try{
        const result = await api.get("/auth/profile")
        //returning multiple properties
        return {
            fullName: result.data.fullName,
            email: result.data.email
        }
    }catch(error){
        throw new Error("Error fetching user profile")
    }
}

