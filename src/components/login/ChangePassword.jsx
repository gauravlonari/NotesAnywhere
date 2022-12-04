import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import alertContext from '../../context/alert/AlertContext';
import loginContext from '../../context/login/LoginContext';
import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {TextField} from '@mui/material'
import loadingContext from '../../context/loading/LoadingContext';

export default function ChangePassword() {
  const {userChangePassword}=useContext(loginContext)
  const navigate=useNavigate();
  const {showAlert}=useContext(alertContext)
  const {progress}=useContext(loadingContext)
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/session/login');
      showAlert("info","Please Login first to continue");
    }
    // eslint-disable-next-line
  },[])

  const [credentials, setCredentials] = useState({password:"",newpassword:"",cnewpassword:""});
  const [passwordError, setPasswordError] = useState({error:false,errorText:""}); 
  const [newPasswordError, setNewPasswordError] = useState({error:false,errorText:""});
  const [cNewPasswordError, setCNewpasswordError] = useState({error:false,errorText:""});

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault();
    let error=false;
    
    if(credentials.password.length<8){
        setPasswordError({error:true,errorText:"Password must be of 8 characters at least"})
        error=true;
    }
    else
        setPasswordError({error:false,errorText:""})

    if(credentials.newpassword.length<8){
        setNewPasswordError({error:true,errorText:"Password must be of 8 characters at least"})
        error=true;
    }
    else
        setNewPasswordError({error:false,errorText:""})
    
    if(credentials.cnewpassword !== credentials.newpassword){
        setCNewpasswordError({error:true,errorText:"Create Password and Confirm password do not match"})
        error=true;
    }
    else
        setCNewpasswordError({error:false,errorText:""})

    if(error) return;
    userChangePassword(credentials.password,credentials.newpassword);
}

  return (
    <div>
      <form onSubmit={submitForm}>
                <p className="fs-5">Update Account Password: </p>
                <div className="mb-3">
                    <TextField label="Current Password" type="password" name='password' title='Enter current password here' placeholder='Enter current password here' value={credentials.password} onChange={onChange} error={passwordError.error} helperText={passwordError.errorText} required fullWidth />
                </div>
                <div className="mb-2">
                    <TextField label="Create Password" type="password" name='newpassword' title='Create the password' placeholder='Enter your password here' value={credentials.newpassword} onChange={onChange} error={newPasswordError.error} helperText={newPasswordError.errorText} required fullWidth />
                </div>
                <div className="mb-2">
                    <TextField label="Confirm Password" type="password" name='cnewpassword' title='Confirm the password' placeholder='Enter the password again' value={credentials.cnewpassword} onChange={onChange} error={cNewPasswordError.error} helperText={cNewPasswordError.errorText} required fullWidth />
                </div>
                <div className="mb-3">
                    <NavLink className="text-decoration-none" onClick={()=>{navigate(-1)}}>Don't want to cancel? Go back</NavLink>
                </div>

                <button type="submit" className="btn btn-primary" disabled={progress?true:false}>Change Password</button>
            </form>
    </div>
  )
}
