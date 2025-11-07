import React from 'react';
import NoteCard from './NoteCard';
import '../App.css';

/**
 * PUBLIC_INTERFACE
 * NoteList - Renders a responsive grid of NoteCard components.
 */
function NoteList({ notes, onEdit, onDelete }) {
  return (
    <div className="notes-grid" role="list" aria-label="Notes list">
      {notes.map((n) => (
        <NoteCard key={n.id} note={n} onEdit={() => onEdit(n)} onDelete={() => onDelete(n.id)} />
      ))}
    </div>
  );
}

export default NoteList;
