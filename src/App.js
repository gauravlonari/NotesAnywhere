import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Header from "./components/header/Header";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import About from "./components/about/About";
import NoteState from "./context/notes/NoteState";
import Homepage from "./components/homepage/Homepage";
import AlertState from "./context/alert/AlertState";
import Alert from "./components/alert/Alert";
import LoginState from "./context/login/LoginState";
import Session from "./components/login/Session";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import ChangePassword from "./components/login/ChangePassword";
import Profile from "./components/login/Profile";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import loadingContext from "./context/loading/LoadingContext";
import LoadingBar from "react-top-loading-bar";

function App() {
  const { progress, setProgress } = useContext(loadingContext);
  return (
    <Router>
      <AlertState>
        <LoginState>
          <NoteState>
            <LoadingBar
              progress={progress}
              height={3}
              onLoaderFinished={() => setProgress(0)}
            />
            <Header />
            <Alert />
            <div className="container">
              <Routes>
                <Route index element={<Homepage />}></Route>
                <Route path="about" element={<About />}></Route>
                <Route
                  path="login"
                  element={<Navigate to="/app/login" replace />}
                ></Route>
                <Route
                  path="register"
                  element={<Navigate to="/app/register" replace />}
                ></Route>
                <Route
                  path="changepassword"
                  element={<Navigate to="/app/changepassword" replace />}
                ></Route>
                <Route
                  path="home"
                  element={<Navigate to="/" replace />}
                ></Route>
                <Route path="app" element={<Session />}>
                  <Route index element={<Login />}></Route>
                  <Route path="login" element={<Login />}></Route>
                  <Route path="register" element={<Register />}></Route>
                  <Route
                    path="changepassword"
                    element={<ChangePassword />}
                  ></Route>
                </Route>
                <Route path="profile" element={<Profile />}></Route>
              </Routes>
            </div>
          </NoteState>
        </LoginState>
      </AlertState>
    </Router>
  );
}

export default App;
