import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Session() {
  const navigate=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')
    }
  // eslint-disable-next-line
  },[])
  return (
    <>
      <div className="row min-page-height align-items-center">
        <div className="col-md text-center">
          <p className='login-page-heading'>Notes</p>
          <p className='login-page-subheading'>Anywhere</p>
        </div>
        <div className="col-md">
          <Outlet/>
        </div>
      </div>
    </>
  )
}
