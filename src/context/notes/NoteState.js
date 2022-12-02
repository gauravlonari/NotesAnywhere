import React from "react";
import noteContext from "./NoteContext";
import { useState } from "react";
import host from "../../config";
import alertContext from "../alert/AlertContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function NoteState(props) {
  const navigate = useNavigate();
  const { showAlert } = useContext(alertContext);

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

  const fetchAllNotes = async () => {
    try {
      const data = await fetch(host + "/api/notes/fetchallnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        signal: AbortSignal.timeout(10000),
      });

      let ns = await data.json();

      if (checkUnauthorized(data.status)) {
        if (data.status !== 200) {
          showAlert("danger", ns.error);
        } else {
          setNotes(ns);
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
    }
  };

  const [notes, setNotes] = useState([]);

  const updateNote = async (note) => {
    // console.log("update")

    try {
      const data = await fetch(host + "/api/notes/updatenote/" + note._id, {
        method: "PUT",
        body: JSON.stringify({
          title: note.title,
          description: note.description,
          tag: note.tag,
        }),
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),
        },
        signal: AbortSignal.timeout(5000),
      });

      note = await data.json();
      if (checkUnauthorized(data.status)) {
        if (data.status !== 200) {
          showAlert("danger", note.error);
          return false;
        }
        showAlert("success", "Note Updated");
        setNotes(
          notes.map((n) => {
            return n._id === note._id ? note : n;
          })
        );
        return true;
      }
    } catch (e) {
      showAlert(
        "danger",
        "Some Error Occured while connecting to server. Cannot update the note"
      );
      console.log(e);
      return false;
    }
  };

  const deleteNote = async (id) => {
    // console.log("delete")

    try {
      const data = await fetch(host + "/api/notes/deletenote/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),
        },
        signal: AbortSignal.timeout(5000),
      });
      let note = await data.json();
      if (checkUnauthorized(data.status)) {
        if (data.status !== 200) {
          showAlert("danger", note.error);
          return;
        }
        showAlert("success", "Note Deleted");
        setNotes(
          notes.filter((note) => {
            return note._id !== id;
          })
        );
      }
    } catch (e) {
      showAlert(
        "danger",
        "Some Error Occured while connecting to server. Cannot delete the note"
      );
      console.log(e.message);
    }
  };

  const addNote = async (note) => {
    try {
      const data = await fetch(host + "/api/notes/addnote", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),
        },
        signal: AbortSignal.timeout(5000),
      });

      note = await data.json();
      if (checkUnauthorized(data.status)) {
        if (data.status !== 201) {
          showAlert("danger", note.error);
          return false;
        }
        showAlert("success", "Note Created");
        setNotes(notes.concat(note));
        return true;
      }
    } catch (e) {
      showAlert(
        "danger",
        "Some Error Occured while connecting to server. Cannot add the note"
      );
      console.log(e.message);
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
