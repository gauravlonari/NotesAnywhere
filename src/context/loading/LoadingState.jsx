import loadingContext from './LoadingContext'
import React,{useState} from 'react'

export default function LoadingState(props) {
    const [progress, setProgress] = useState(0);
    return (
        <loadingContext.Provider value={{progress,setProgress}}>
            {props.children}
        </loadingContext.Provider>
    )
}
