import React, { useState } from "react";
import loginContext from "./LoginContext";
import host from "../../config";
import alertContext from "../alert/AlertContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginState(props) {
  const { showAlert } = useContext(alertContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUnauthorized = (status) => {
    if (status === 401) {
      try {
        showAlert("info", "You need to login first");
        localStorage.removeItem("token");
        navigate("/session/login");
      } catch (e) {
        console.log(e.message);
        navigate("/session/login");
      }
      return false;
    }
    return true;
  };

  const userLogin = async (creds) => {
    try {
      const data = await fetch(host + "/api/auth/login", {
        mode:"no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });
      const jsonData = await data.json();

      if (data.status !== 200) {
        showAlert("danger", jsonData.error);
        return;
      }
      localStorage.setItem("token", jsonData.authToken);
      showAlert("success", "Login successful.");
      navigate("/");
    } catch (e) {
      showAlert("danger", "Some Error Occured");
      console.log(e.message);
    }
  };
  const userRegister = async (creds) => {
    try {
      const data = await fetch(host + "/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });
      const jsonData = await data.json();

      if (data.status !== 200) {
        showAlert("danger", jsonData.error);
        return;
      }
      localStorage.setItem("token", jsonData.authToken);
      showAlert("success", "Registration successful. Logged in");
      navigate("/");
    } catch (e) {
      showAlert("danger", "Some Error Occured");
      console.log(e.message);
    }
  };

  const userGetProfile=async ()=>{
    try {
      const data = await fetch(host + "/api/auth/getuser", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem('token'),
        },
      });
      const jsonData = await data.json();

      if(checkUnauthorized(data.status)){
        if (data.status !== 200) {
          showAlert("danger", jsonData.error);
          return null;
        }
        return jsonData;
      }
      } catch (e) {
        showAlert("danger", "Some Error Occured");
        console.log(e.message);
      }
    }
    const userChangePassword=async (pass,newpass)=>{
      try{
        const data = await fetch(host + "/api/auth/changepassword", {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem('token'),
            "Content-Type":"application/json"
          },
          body:JSON.stringify({password:pass,newpassword:newpass})
        });
        const jsonData = await data.json();
  
        if(checkUnauthorized(data.status)){
          if (data.status !== 200) {
            showAlert("danger", jsonData.error);
            return false;
          }
          showAlert("success","Password Changed");
          navigate('/')
          return true;
        }
      }
      catch(e){
        console.log(e.message)
        showAlert("danger","Some Error Occured")
        return false;
      }
    }

  return (
    <loginContext.Provider value={{ userLogin, userRegister,isLoggedIn,setIsLoggedIn,userGetProfile,userChangePassword }}>
      {props.children}
    </loginContext.Provider>
  );
}
