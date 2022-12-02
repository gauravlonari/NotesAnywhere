import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Session() {
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
