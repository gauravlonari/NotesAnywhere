import React from "react";
import Notes from "../notes/Notes";
import AddNote from "../notes/AddNote";

export default function Homepage() {
    
  return (
    <div className="mt-4">
      <AddNote/>
      <Notes/>
    </div>
  );
}
