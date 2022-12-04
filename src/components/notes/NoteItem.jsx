import React, { useContext } from "react";
import {BiTrash} from 'react-icons/bi'
import {BiEdit} from 'react-icons/bi'
import loadingContext from '../../context/loading/LoadingContext';

export default function NoteItem(props) {
  const {progress}=useContext(loadingContext)

  return (
    <div className="col-md-4">
      <div className="card my-1">
        <div className="card-body">
          <h5 className="card-title">
            <p className="d-inline">{props.note.title}</p>
            <div className="d-inline float-end">
              <button onClick={(e)=>{props.editNote(e,props.note)}} className="card-link fs-5 note-item-options"  disabled={progress?true:false}><BiEdit/></button>
              <button onClick={(e)=>{props.deleteNote(e,props.note)}} className="card-link fs-5 note-item-options"><BiTrash/></button>
            </div>
            </h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.note.tag}</h6>
          <p className="card-text">
           {props.note.description}
          </p>
        </div>
      </div>
    </div>
  );
}
