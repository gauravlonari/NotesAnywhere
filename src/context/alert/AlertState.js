import React from 'react'
import alertContext from './AlertContext'
import { useState } from 'react';

export default function AlertState(props) {

    const [alert,setAlert]=useState(null);
    const showAlert=(type,msg,time=2000,toHide=true)=>{
        setAlert({msg:msg,type:type});
        if(toHide){
            setTimeout(() => {
            setAlert(null);
            }, time);
        }
  }

  return (
    <alertContext.Provider value={{alert,showAlert}}>
      {props.children}
    </alertContext.Provider>
  )
}
