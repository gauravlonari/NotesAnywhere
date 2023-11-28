import React from 'react'
import loginContext from '../../context/login/LoginContext';
import { TextField } from '@mui/material'
import { useState } from 'react';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import loadingContext from '../../context/loading/LoadingContext';

export default function Login() {
    const {progress}=useContext(loadingContext)
    const navigate=useNavigate()
    useEffect(()=>{
      if(localStorage.getItem('token')){
        navigate('/')
      }
    // eslint-disable-next-line
    },[])

    const { userLogin } = useContext(loginContext);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const [passwordError, setPasswordError] = useState({error:false,errorText:""});
    

    const submitForm = (e) => {
        e.preventDefault();
        if(credentials.password.length<8){
            setPasswordError({error:true,errorText:"Password must be of 8 characters at least"})
            return;
        }
        else
        setPasswordError({error:false,errorText:""})
        userLogin(credentials);
        setCredentials({...credentials,password:""})
    }
    return (
        <>
            <form onSubmit={submitForm}>
                <p className="fs-5">Enter your credentials: </p>
                <div className="mb-3">
                    <TextField label="Email" type="email" name='email' title='Login with registered email' placeholder='Enter your email here' value={credentials.email} onChange={onChange} required fullWidth />
                </div>
                <div className="mb-2">
                    <TextField label="Password" minLength="8" type="password" name='password' title='Enter the password' placeholder='Enter your password here' value={credentials.password} onChange={onChange} error={passwordError.error} helperText={passwordError.errorText} required fullWidth />
                </div>
                <div className="mb-3">
                    <NavLink className="text-decoration-none" to="/app/register">Don't have an account, sign up now</NavLink>
                </div>

                {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div> */}
                <button type="submit" className="btn btn-primary" disabled={progress?true:false}>Login</button>
            </form>
        </>
    )
}
