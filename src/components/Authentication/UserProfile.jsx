import React, { useState } from 'react'
import { getUserProfile } from '../../utils/ApiAuth';

const UserProfile = ({userData}) => {
    const [fullName, setFullName]=useState("");
    const [userEmail, setUserEmail] = useState("");
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [initials, setInitials]=useState("");
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        firstName: "",
        lastName: "",
        initials: ""
    });

    useEffect(()=>{
        if(userData){
            processUser
        } 
       },[])

    //bcs we have full name, in order to make icon from initals
    //we need to separate first and last name and take initials

    const splitName=()=>{
    const nameParts = fullName.trim.split(' '); //trim white space and split
    if(nameParts.length===1){
        //if there is only first name, take first name
        setFirstName(nameParts[0]); 
        setLastName("");
    } else if(nameParts.length>1){
        setFirstName(nameParts[0])
        setLastName(nameParts[nameParts.length-1]); //last element 
    } else {
        setFirstName("");
        setLastName("");
    }};
    
    //create profile avatar from image
    const ProfileImage=({firstName,lastName})=>{
        const getInitals = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
        setInitials(getInitals);
    }
    
    return (
    <div className='w-15 h-15 rounded-full border-y-indigo-400'>
      <span className="avatar-initials">{initials}</span>
    </div>
  )
}

export default UserProfile
