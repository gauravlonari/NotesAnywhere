import React from 'react'
import loginContext from '../../context/login/LoginContext';
import { TextField } from '@mui/material'
import { useState } from 'react';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Register() {
    const navigate=useNavigate()
    useEffect(()=>{
      if(localStorage.getItem('token')){
        navigate('/')
      }
    // eslint-disable-next-line
    },[])
    const { userRegister } = useContext(loginContext);
    const [credentials, setCredentials] = useState({ name:"", email: "", password: "",cpassword:""});
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const [nameError, setNameError] = useState({error:false,errorText:""});
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
        
        if(!/^[a-zA-Z]+$/.test(credentials.name)){
            setNameError({error:true,errorText:"Username must contain alphabetic characters only"})
            error=true;
        }
        else
            setNameError({error:false,errorText:""})
        

        if(error) return;
        userRegister(credentials);
    }
    return (
        <>
            <form onSubmit={submitForm}>
                <p className="fs-5">Fill in the following details: </p>
                <div className="mb-3">
                    <TextField label="Username" type="text" name='name' title='Username with no space and special characters' placeholder='Enter your name here' value={credentials.name} onChange={onChange} error={nameError.error} helperText={nameError.errorText} required fullWidth />
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
                    <NavLink className="text-decoration-none" to="/session/login">Already have an account, sign in here</NavLink>
                </div>

                {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div> */}
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </>
    )
}
