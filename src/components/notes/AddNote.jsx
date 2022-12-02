import React from "react";
import { TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ncontext from "../../context/notes/NoteContext";
import { useContext, useState } from "react";
import { useRef } from "react";

export default function AddNote() {
  const addNoteForm = useRef(null);
  const { addNote } = useContext(ncontext);
  const [titleError, setTitleError] = useState({ error: false, errorText: "" });
  const [descriptionError, setDescriptionError] = useState({
    error: false,
    errorText: "",
  });

  const handleAddForm = (event) => {
    const note = {};
    note.title = addNoteForm.current.title.value;
    note.description = addNoteForm.current.description.value;
    let error = false;
    if (addNoteForm.current.tag.value !== "")
      note.tag = addNoteForm.current.tag.value;

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

    if (addNote(note)) {
      addNoteForm.current.reset();
    }
  };
  return (
    <div>
      <div className="border-bottom pb-2">
        <h4 className="mb-3">Add a Note</h4>
        <form
          action=""
          ref={addNoteForm}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="row align-items-center mb-2">
            <div className="col-md-6    ">
              <TextField
                className="mb-2"
                type="text"
                label="Note Title"
                variant="outlined"
                name="title"
                title="Note Title"
                placeholder="Enter note title here"
                size="small"
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
                name="tag"
                title="Note Tag"
                placeholder="Note tag"
                size="small"
                fullWidth
              />
            </div>
            <div className="col-md-6">
              <TextField
                type="text"
                label="Note Description"
                variant="outlined"
                name="description"
                title="Note Body"
                placeholder="Enter note body here"
                size="small"
                error={descriptionError.error}
                helperText={descriptionError.errorText}
                fullWidth
                required
                multiline
                minRows={3}
              />
            </div>
          </div>
          <div className="">
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<AddIcon />}
              type="submit"
              onClick={handleAddForm}
            >
              Add Note
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
