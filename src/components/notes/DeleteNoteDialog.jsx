import React, { useContext } from "react";
import { useRef } from "react";
import nContext from "../../context/notes/NoteContext";

export default function DeleteNoteDialog(props) {
  const noteContext = useContext(nContext);
  const closeModalButton=useRef();
  return (
    <div
      className="modal fade "
      id="deleteNoteDialog"
      tabIndex="-1"
      aria-labelledby="deleteNoteDialogLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog  modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="deleteNoteDialogLabel">
              Do you want to delete this note?
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">

              <div className="card my-1">
                <div className="card-body">
                  <h5 className="card-title">
                    <p>{props.note.title}</p>
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {props.note.tag}
                  </h6>
                  <p className="card-text">{props.note.description}</p>
                </div>
              </div>
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
              onClick={() => {
                noteContext.deleteNote(props.note._id);
                closeModalButton.current.click();
              }}
            >
              Delete Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
