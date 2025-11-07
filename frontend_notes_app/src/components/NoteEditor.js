import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteEditor - Accessible modal for creating/editing a note with title and content.
 */
function NoteEditor({ open, note, onSave, onClose }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const dialogRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTitle(note?.title || '');
      setContent(note?.content || '');
      setTimeout(() => titleRef.current?.focus(), 0);
    }
  }, [open, note]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && open) onClose?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({ id: note?.id || null, title: title.trim(), content: content.trim() });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="note-editor-title"
      id="note-editor"
      ref={dialogRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(17,24,39,0.45)',
        display: 'grid',
        placeItems: 'center',
        padding: 16,
        zIndex: 100,
      }}
      onMouseDown={(e) => {
        // close when clicking backdrop
        if (e.target === dialogRef.current) onClose?.();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="container"
        style={{
          width: '100%',
          maxWidth: 640,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          background: 'var(--surface)',
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 id="note-editor-title" style={{ margin: 0 }}>
            {note?.id ? 'Edit note' : 'New note'}
          </h2>
          <button type="button" className="btn btn-secondary" onClick={onClose} aria-label="Close editor">
            ✖ Close
          </button>
        </div>
        <label>
          <span style={{ display: 'block', marginBottom: 6, color: 'var(--muted)' }}>Title</span>
          <input
            ref={titleRef}
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            aria-required="false"
          />
        </label>
        <label>
          <span style={{ display: 'block', marginBottom: 6, color: 'var(--muted)' }}>Content</span>
          <textarea
            className="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
          />
        </label>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn" aria-label="Save note">
            💾 Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteEditor;
