import React from "react";
import loginContext from "./LoginContext";
import { HOST_URL, APP_ID } from "../../config";
import alertContext from "../alert/AlertContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import loadingContext from '../loading/LoadingContext'

export default function LoginState(props) {
  const { showAlert } = useContext(alertContext);
  const navigate = useNavigate();
  
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {setProgress}=useContext(loadingContext);

  const checkUnauthorized = (status) => {
    if (status === 401) {
      try {
        showAlert("info", "You need to login first");
        localStorage.removeItem("token");
        setProgress(100);
        navigate("/app/login");
      } catch (e) {
        console.log(e.message);
        setProgress(100);
        navigate("/app/login");
      }
      return false;
    }
    return true;
  };

  const userLogin = async (creds) => {
    try {
      setProgress(10);
      const data = await fetch(HOST_URL + "/api/auth/login", {
        // mode:"no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          appId: APP_ID
        },
        body: JSON.stringify(creds),
      });
      setProgress(40);
      const jsonData = await data.json();
      setProgress(70)
      if (data.status !== 200) {
        showAlert("danger", jsonData.error);
        setProgress(100);
        return;
      }
      localStorage.setItem("token", jsonData.authToken);
      showAlert("success", "Login successful.");
      setProgress(90);
      navigate("/");
      setProgress(100);
    } catch (e) {
      showAlert("danger", "Some Error Occured");
      console.log(e);
      setProgress(100)
    }
  };
  const userRegister = async (creds) => {
    try {
      setProgress(10)
      const data = await fetch(HOST_URL + "/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          appId: APP_ID
        },
        body: JSON.stringify(creds),
      });
      setProgress(40);
      const jsonData = await data.json();
      setProgress(70)
      if (data.status !== 200) {
        showAlert("danger", jsonData.error);
        setProgress(100);
        return;
      }
      localStorage.setItem("token", jsonData.authToken);
      showAlert("success", "Registration successful. Logged in");
      setProgress(100)
      navigate("/");
    } catch (e) {
      showAlert("danger", "Some Error Occured");
      console.log(e.message);
      setProgress(100)
    }
  };

  const userGetProfile=async ()=>{
    try {
      setProgress(10)
      const data = await fetch(HOST_URL + "/api/auth/getuser", {
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem('token'),
          appId: APP_ID
        },
      });
      setProgress(40)
      const jsonData = await data.json();
      setProgress(70)
      if(checkUnauthorized(data.status)){
        if (data.status !== 200) {
          showAlert("danger", jsonData.error);
          setProgress(100)
          return null;
        }
        setProgress(100)
        return jsonData;
      }
      } catch (e) {
        showAlert("danger", "Some Error Occured");
        console.log(e.message);
        setProgress(100)
      }
    }
    const userChangePassword=async (pass,newpass)=>{
      try{
        setProgress(10)
        const data = await fetch(HOST_URL + "/api/auth/changepassword", {
          method: "POST",
          headers: {
            "Authorization": localStorage.getItem('token'),
            "Content-Type":"application/json",
            appId: APP_ID
          },
          body:JSON.stringify({password:pass,newpassword:newpass})
        });
        setProgress(40)
        const jsonData = await data.json();
        setProgress(70)
        if(checkUnauthorized(data.status)){
          if (data.status !== 200) {
            showAlert("danger", jsonData.error);
            setProgress(100)
            return false;
          }
          showAlert("success","Password Changed");
          setProgress(100)
          navigate('/')
          return true;
        }
      }
      catch(e){
        console.log(e.message)
        showAlert("danger","Some Error Occured")
        setProgress(100)
        return false;
      }
    }

  return (
    <loginContext.Provider value={{ userLogin, userRegister,userGetProfile,userChangePassword }}>
      {props.children}
    </loginContext.Provider>
  );
}
