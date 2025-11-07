import React from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteCard - Displays a single note with title, content excerpt, date, and actions.
 */
function NoteCard({ note, onEdit, onDelete }) {
  const excerpt = (note.content || '').slice(0, 160) + ((note.content || '').length > 160 ? '…' : '');
  const updated = note.updatedAt ? new Date(note.updatedAt).toLocaleString() : '';

  return (
    <article
      role="listitem"
      className="container"
      style={{
        gridColumn: 'span 12',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 18, letterSpacing: '-0.01em' }}>{note.title || 'Untitled note'}</h3>
      <p style={{ margin: 0, color: 'var(--muted)' }}>{excerpt || <em>No content</em>}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
        <span style={{ color: 'var(--muted)', fontSize: 12 }}>Updated {updated}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" onClick={onEdit} aria-label={`Edit ${note.title || 'note'}`}>
            ✏️ Edit
          </button>
          <button className="btn btn-danger" onClick={onDelete} aria-label={`Delete ${note.title || 'note'}`}>
            🗑️ Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;
