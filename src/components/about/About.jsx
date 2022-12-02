import React from 'react'
import {BsCodeSlash} from 'react-icons/bs'
import {GiSpanner} from 'react-icons/gi'

export default function About() {
  return (
    <div>
        {/* <p className="fs-4">About this App</p> */}
        <p className="fs-4 fw-normal mb-1"><span className="fw-bold">NotesAnywhere</span> is an online notes keeping application. Just Login and you are ready to go.</p>
        <p className="text-secondary fw-normal"><BsCodeSlash/> Made by using MERN stack.</p>
        <p className="fs-5"><GiSpanner/> Features include:</p>
        <ul className=''>
          <li>Sign in, Register and Change Password</li>
          <li>Notes Homepage</li>
          <li>User Specific Notes</li>
          <li>Authentication and Authorization</li>
          <li>Notes operations:
            <ul>
              <li>Add Note</li>
              <li>Delete Note</li>
              <li>Update Note</li>
            </ul>
          </li>
          <li>Profile Page</li>
          <li>Login and Logout Options</li>
        </ul>
        
    </div>
  )
}
