import React, { useContext } from 'react'
import { capitalize } from '../CommonFunctions'
import alertContext from '../../context/alert/AlertContext'

export default function Alert() {
    const {alert}=useContext(alertContext)

  return (
    <div style={{height:"45px",zIndex:1}} className="container sticky-top">
        {alert && <div className={`alert alert-primary alert-${alert.type}`} role="alert">
            <strong>{alert.type==="danger"?"Error":capitalize(alert.type)}</strong>: {alert.msg}
        </div>} 
    </div>
  )
}