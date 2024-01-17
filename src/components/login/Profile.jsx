import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import loginContext from '../../context/login/LoginContext'
import profileIcon from '../../assets/profileIcon.jpg'
import { getPrintDate } from '../CommonFunctions'
import { NavLink } from 'react-router-dom'

export default function Profile() {
  const { userGetProfile } = useContext(loginContext);
  const [userData, setUserData] = useState({});
  // eslint-disable-next-line
  useEffect(() => { const a = async () => { setUserData(await userGetProfile()) }; a(); }, []);

  return (
    <div>
      <p className="fs-4 text-center">
        Profile Details
      </p>
      <div className="card text-center">
        <img src={profileIcon} className="card-img-top m-auto" style={{maxWidth:"18rem"}} alt="profileIcon"/>
          <div className="card-body">
            <h5 className="card-title">{userData.firstName} {userData.lastName}</h5>
            <span className="card-text">
              <p className="mb-0">Email: {userData.email}</p>
              <p className='text-muted mb-1'>Account Created Date: {getPrintDate(userData.dateCreated)}</p>
              <NavLink to="/app/changepassword" className="text-decoration-none">Change Password</NavLink>
            </span>
          </div>
      </div>
    </div>
  )
}
