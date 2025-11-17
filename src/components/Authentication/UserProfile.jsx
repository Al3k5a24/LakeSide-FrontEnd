import React, { useEffect, useState } from 'react'
import { getUserProfile } from '../../utils/ApiAuth';

const UserProfile = ({userData}) => {
    const [fullName, setFullName]=useState("");
    const [userEmail, setUserEmail] = useState("");
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [initials, setInitials]=useState("");
    //bcs we have full name, in order to make icon from initals
    //we need to separate first and last name and take initials
    //set only in useEffect when userData changes, otherwise infinite loop
    useEffect(() => {
    if (!userData?.fullName) return;

    // Split name i take initials
    const nameParts = userData.fullName.trim().split(' ').filter(Boolean); // filter(Boolean) uklanja prazne stringove
    
    let firstInitial = '';
    let lastInitial = '';

    if (nameParts.length === 1) {
      // Just a first name: take first character
      firstInitial = nameParts[0][0];
    } else if (nameParts.length > 1) {
      // Name and surname: take first characters of first and last parts
      firstInitial = nameParts[0][0];
      lastInitial = nameParts[nameParts.length - 1][0];
    }

    const initialsStr = `${firstInitial}${lastInitial}`.toUpperCase();
    setInitials(initialsStr);
    
  }, [userData?.fullName]);
    
    return (
    <div className='w-10 h-10 rounded-full bg-red-400 flex items-center justify-center text-white font-medium'>
      <span className="avatar-initials">{initials}</span>
    </div>
  )
}

export default UserProfile
