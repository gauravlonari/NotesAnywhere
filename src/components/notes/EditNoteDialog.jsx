import React, { useContext, useState } from "react";
import { useRef } from "react";
import { TextField } from "@mui/material";
import nContext from "../../context/notes/NoteContext";
import { useEffect } from "react";

export default function EditNoteDialog(props) {
  const noteContext = useContext(nContext);
  const closeModalButton = useRef();

  const [updatedData, setUpdatedData] = useState({title:"",description:"",tag:""});
  
  
  const addNoteForm = useRef(null);
  const [titleError, setTitleError] = useState({ error: false, errorText: "" });
  const [descriptionError, setDescriptionError] = useState({
    error: false,
    errorText: "",
  });
  
  const handleUpdateForm = () => {
    const note = {_id:props.note._id}
    note.title = updatedData.title;
    note.description = updatedData.description;
    note.tag = updatedData.tag;
    let error = false; 
      
      if (note.title === "" || note.title.length < 5) {
        setTitleError({
          error: true,
          errorText: "Title must be at least 5 characters long",
        });
        error = true;
      } else {  
        setTitleError({ error: false, errorText: "" });
      }

      if (note.description === "") {
        setDescriptionError({
          error: true,
          errorText: "Description cannot be empty",
        });
        error = true;
      } else {
        setDescriptionError({ error: false, errorText: "" });
      }
      
      if (error) return;
      
      if (noteContext.updateNote(note)) {
        closeModalButton.current.click();
      }
    };
    
    useEffect(()=>{ if(props.note.title){ setUpdatedData({title:props.note.title,description:props.note.description,tag:props.note.tag});setTitleError({error:false,errorText:""});setDescriptionError({error:false,errorText:""});}},[props.note])
    const handleOnChange=(e)=>{setUpdatedData({...updatedData, [e.target.name.slice(1)] : e.target.value})}
  return (
    <div
      className="modal fade "
      id="editNoteDialog"
      tabIndex="-1"
      aria-labelledby="editNoteDialogLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog  modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editNoteDialogLabel">
              Edit Note
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ></button>
          </div>
          <div className="modal-body">
            
            <form
              action=""
              ref={addNoteForm}
              onSubmit={(e) => {
                e.preventDefault();
              }}
              >
                  <TextField
                    className="mb-2"
                    type="text"
                    label="Note Title"
                    variant="outlined"
                    name="etitle"
                    title="Note Title"
                    placeholder="Enter note title here"
                    size="small"
                    value={updatedData.title}
                    onChange={handleOnChange}
                    error={titleError.error}
                    helperText={titleError.errorText}
                    fullWidth
                    required
                    />
                  <TextField
                    className="mb-2"
                    type="text"
                    label="Tag"
                    variant="outlined"
                    name="etag"
                    title="Note Tag"
                    value={updatedData.tag}
                    placeholder="Note tag"
                    size="small"
                    fullWidth
                    onChange={handleOnChange}
                    />
                  <TextField
                    type="text"
                    label="Note Description"
                    variant="outlined"
                    name="edescription"
                    title="Note Body"
                    placeholder="Enter note body here"
                    size="small"
                    value={updatedData.description}
                    error={descriptionError.error}
                    helperText={descriptionError.errorText}
                    fullWidth
                    required
                    multiline
                    minRows={3}
                    onChange={handleOnChange}
                    />
            </form>

          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={closeModalButton}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleUpdateForm}
            >
              Update Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
