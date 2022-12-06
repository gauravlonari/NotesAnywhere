import React, { useContext, useEffect, useRef, useState } from 'react'
import ncontext from "../../context/notes/NoteContext";
import NoteItem from './NoteItem';
import DeleteNoteDialog from './DeleteNoteDialog';
import EditNoteDialog from './EditNoteDialog';
import { useNavigate } from 'react-router-dom';
import alertContext from '../../context/alert/AlertContext';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

export default function Notes() {
  const notesContext=useContext(ncontext);
  const {showAlert}=useContext(alertContext)
  const [currentNote, setCurrentNote] = useState({});
  const navigate=useNavigate()
  
  const deleteNoteDialog=useRef(null);
  const handleDeleteNote=(e,note)=>{
    e.preventDefault();
    deleteNoteDialog.current.click();
    setCurrentNote(note);
  }
  const editNoteDialog=useRef(null);
  const handleEditNote=(e,note)=>{
    e.preventDefault();
    setCurrentNote(note);
    editNoteDialog.current.click();
    // console.log("Notes")
    // console.log(note);
    // console.log(currentNote);
  }

  // eslint-disable-next-line
  useEffect(()=>{
    if(localStorage.getItem('token')){
      if(!sessionStorage.getItem("fot")||notesContext.notes.length===0){
        if(notesContext.fetchAllNotes()){
          sessionStorage.setItem("fot",true);
        }
        else{
          sessionStorage.setItem("fot",false);
        }
      }
    }
    else{
      navigate('/session/login');
      showAlert("info","Please Login first to continue");
    }
    // eslint-disable-next-line
  },[])

  return (
    <>
      <div className="mb-2 mt-3 pb-2 border-bottom">
        <h4 className="mb-3">Your Notes</h4>
        <div className="justify-content-center">
        <ResponsiveMasonry
                columnsCountBreakPoints={{300: 1, 765: 2, 1200: 3}}
            >
                <Masonry gutter='10px'>
                  {notesContext.notes.map((note,i)=>{return <NoteItem key={i+note._id} note={note} deleteNote={handleDeleteNote} editNote={handleEditNote}/>})}
                </Masonry>
            </ResponsiveMasonry>
            {notesContext.notes.length<1?<h5>No Notes Found</h5>: <></> }
        </div>
        <DeleteNoteDialog note={currentNote}/>
        <EditNoteDialog note={currentNote}/>
        <button ref={deleteNoteDialog} type="button" className="btn d-none" data-bs-toggle="modal" data-bs-target="#deleteNoteDialog"></button>
        <button ref={editNoteDialog} type="button" className="btn d-none" data-bs-toggle="modal" data-bs-target="#editNoteDialog"></button>
      </div>
    </>
  )
}
