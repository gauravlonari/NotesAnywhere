import React from "react";
import noteContext from "./NoteContext";
import { useState } from "react";
import {HOST_URL, APP_ID } from "../../config";
import alertContext from "../alert/AlertContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import loadingContext from '../loading/LoadingContext'

export default function NoteState(props) {
  const navigate = useNavigate();
  const { showAlert } = useContext(alertContext);
  const {setProgress}=useContext(loadingContext);

  const checkUnauthorized = (status) => {
    if (status === 401) {
      try {
        showAlert("info", "You need to login first");
        // localStorage.removeItem("token");
        setProgress(100);
        // navigate("/app/login");
      } catch (e) {
        console.log(e.message);
        setProgress(100);
        navigate("/app/login");
      }
      return false;
    }
    return true;
  };

  const fetchAllNotes = async () => {
    try {
      setProgress(10);
      const data = await fetch(HOST_URL + "/api/notes/fetchallnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            localStorage.getItem('token'),
          appId: APP_ID
        },
      });
      setProgress(40);
      let ns = await data.json();
      setProgress(70);
      if (checkUnauthorized(data.status)) {
        if (data.status !== 200) {
          showAlert("danger", ns.error);
          setProgress(100);
          return false;
        } else {
          setNotes(ns);
          setProgress(100);
          return true;
        }
      }
    } catch (e) {
      if (e.name === "TimeoutError")
        showAlert(
          "danger",
          "Could not connect to server, check your internet connection",
          1500,
          false
        );
      else
        showAlert(
          "danger",
          "Some Error Occured while fetching notes",
          1500,
          false
        );
      console.log(e);
      setProgress(100);
      return false;
    }
  };

  const [notes, setNotes] = useState([]);

  const updateNote = async (note) => {
    // console.log("update")
    setProgress(10);
    try {
      const data = await fetch(HOST_URL + "/api/notes/updatenote/" + note._id, {
        method: "PUT",
        body: JSON.stringify({
          title: note.title,
          description: note.description,
          tag: note.tag,
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization":
          localStorage.getItem('token'),
          appId: APP_ID
        },
      });
      setProgress(40);
      note = await data.json();
      setProgress(70);
      if (checkUnauthorized(data.status)) {
        if (data.status !== 200) {
          showAlert("danger", note.error);
          setProgress(100);
          return false;
        }
        showAlert("success", "Note Updated");
        setNotes(
          notes.map((n) => {
            return n._id === note._id ? note : n;
          })
        );
        setProgress(100);
        return true;
      }
    } catch (e) {
      showAlert(
        "danger",
        "Some Error Occured while connecting to server. Cannot update the note"
      );
      console.log(e);
      setProgress(100);
      return false;
    }
  };

  const deleteNote = async (id) => {
    // console.log("delete")
    setProgress(10);
    try {
      const data = await fetch(HOST_URL + "/api/notes/deletenote/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization":
          localStorage.getItem('token'),
          appId: APP_ID
        },
      });
      setProgress(40);
      let note = await data.json();
      setProgress(70);
      if (checkUnauthorized(data.status)) {
        if (data.status !== 200) {
          showAlert("danger", note.error);
          setProgress(100);
          return;
        }
        showAlert("success", "Note Deleted");
        setNotes(
          notes.filter((note) => {
            return note._id !== id;
          })
        );
        setProgress(100);
      }
    } catch (e) {
      showAlert(
        "danger",
        "Some Error Occured while connecting to server. Cannot delete the note"
      );
      console.log(e.message);
      setProgress(100);
    }
  };

  const addNote = async (note) => {
    setProgress(10);
    try {
      const data = await fetch(HOST_URL + "/api/notes/addnote", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
          "Authorization":
          localStorage.getItem('token'),
          appId: APP_ID
        },
      });
      setProgress(40);
      note = await data.json();
      setProgress(70);

      if (checkUnauthorized(data.status)) {
        if (data.status !== 201) {
          showAlert("danger", note.error);
          setProgress(100);
          return false;
        }
        showAlert("success", "Note Created");
        setNotes([note].concat(notes));
        setProgress(100);
        return true;
      }
    } catch (e) {
      showAlert(
        "danger",
        "Some Error Occured while connecting to server. Cannot add the note"
      );
      console.log(e.message);
      setProgress(100);
      return false;
    }
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        updateNote,
        fetchAllNotes,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
}
