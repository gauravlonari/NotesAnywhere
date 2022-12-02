import React from 'react'
import {BsCodeSlash} from 'react-icons/bs'
import {GiSpanner} from 'react-icons/gi'
import {GiBulletImpacts} from 'react-icons/gi'
import {GiBurningDot} from 'react-icons/gi'

export default function About() {
  return (
    <div>
        {/* <p className="fs-4">About this App</p> */}
        <p className="fs-4 fw-normal mb-1"><span className="fw-bold">NotesAnywhere</span> is an online notes keeping application. Just Login and you are ready to go.</p>
        <p className="text-secondary fw-normal"><BsCodeSlash/> Made by using MERN stack.</p>
        <p className="fs-5 mb-0"><GiSpanner/> Features include:</p>
        <ul style={{listStyleType:"none"}}>
          <li><GiBulletImpacts/> Sign in, Register and Change Password</li>
          <li><GiBulletImpacts/> Authentication and Authorization</li>
          <li><GiBulletImpacts/> Notes Homepage</li>
          <li><GiBulletImpacts/> User Verification</li>
          <li><GiBulletImpacts/> Notes Verification</li>
          <li><GiBulletImpacts/> User Specific Notes</li>
          <li><GiBulletImpacts/> Notes operations:
            <ul style={{listStyleType:"none"}}>
              <li><GiBurningDot/> Add Note</li>
              <li><GiBurningDot/> Delete Note</li>
              <li><GiBurningDot/> Update Note</li>
            </ul>
          </li>
          <li><GiBulletImpacts/> Profile Page</li>
          <li><GiBulletImpacts/> Login and Logout Options</li>
        </ul>
        
    </div>
  )
}
