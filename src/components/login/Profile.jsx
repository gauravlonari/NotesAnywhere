import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import loginContext from '../../context/login/LoginContext'

export default function Profile() {
    const {getProfile} =useContext(loginContext);
    const [userData, setUserData] = useState({});
    // eslint-disable-next-line
    useEffect(()=>{const a=async()=>{setUserData(await getProfile())};a();},[]);

  return (
    <div>
        <p>Username: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <p>DateCreated: {Date(userData.dateCreated)}</p>
    </div>
  )
}
