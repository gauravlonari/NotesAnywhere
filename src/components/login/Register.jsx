import React from 'react'
import loginContext from '../../context/login/LoginContext';
import { TextField } from '@mui/material'
import { useState } from 'react';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import loadingContext from '../../context/loading/LoadingContext';

export default function Register() {
    const {progress}=useContext(loadingContext)
    const navigate=useNavigate()
    useEffect(()=>{
      if(localStorage.getItem('token')){
        navigate('/')
      }
    // eslint-disable-next-line
    },[])
    const { userRegister } = useContext(loginContext);
    const [credentials, setCredentials] = useState({ firstName:"", lastName: "", email: "", password: "",cpassword:""});
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const [passwordError, setPasswordError] = useState({error:false,errorText:""});
    const [cpasswordError, setCpasswordError] = useState({error:false,errorText:""});
    
    const submitForm = (e) => {
        e.preventDefault();
        let error=false;
        
        if(credentials.password.length<8){
            setPasswordError({error:true,errorText:"Password must be of 8 characters at least"})
            error=true;
        }
        else
            setPasswordError({error:false,errorText:""})
        
        if(credentials.cpassword !== credentials.password){
            setCpasswordError({error:true,errorText:"Create Password and Confirm password do not match"})
            error=true;
        }
        else
            setCpasswordError({error:false,errorText:""})
        

        if(error) return;
        userRegister(credentials);
    }
    return (
        <>
            <form onSubmit={submitForm}>
                <p className="fs-5">Fill in the following details: </p>
                <div className="mb-3">
                    <TextField label="First Name" type="text" name='firstName' title='First Name' placeholder='Enter first name here' value={credentials.firstName} onChange={onChange} required fullWidth />
                </div>
                <div className="mb-3">
                    <TextField label="Last Name" type="text" name='lastName' title='Last Name' placeholder='Enter last name here' value={credentials.lastName} onChange={onChange} required fullWidth />
                </div>
                <div className="mb-3">
                    <TextField label="Email" type="email" name='email' title='Enter your valid email' placeholder='Enter your email here' value={credentials.email} onChange={onChange}  required fullWidth />
                </div>
                <div className="mb-2">
                    <TextField label="Password" type="password" name='password' title='Create the password' placeholder='Enter your password here' value={credentials.password} onChange={onChange} error={passwordError.error} helperText={passwordError.errorText} required fullWidth />
                </div>
                <div className="mb-2">
                    <TextField label="Confirm Password" type="password" name='cpassword' title='Confirm the password' placeholder='Enter the password again' value={credentials.cpassword} onChange={onChange} error={cpasswordError.error} helperText={cpasswordError.errorText} required fullWidth />
                </div>
                <div className="mb-3">
                    <NavLink className="text-decoration-none" to="/app/login">Already have an account, sign in here</NavLink>
                </div>

                {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div> */}
                <button type="submit" className="btn btn-primary"  disabled={progress?true:false}>Sign Up</button>
            </form>
        </>
    )
}
