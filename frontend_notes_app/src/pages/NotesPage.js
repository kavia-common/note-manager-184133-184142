import React, { useCallback, useEffect, useMemo, useState } from 'react';
import NoteList from '../components/NoteList';
import NoteEditor from '../components/NoteEditor';
import ConfirmDialog from '../components/ConfirmDialog';
import { useLocalStorage } from '../state/useLocalStorage';

const STORAGE_KEY = 'ocean-notes:v1';

/**
 * PUBLIC_INTERFACE
 * NotesPage - Main page handling notes state, search/filter, create/edit/delete flows.
 * Notes are persisted to localStorage. Supabase env vars are read but not required.
 */
function NotesPage() {
  const [notes, setNotes] = useLocalStorage(STORAGE_KEY, []);
  const [query, setQuery] = useState('');
  const [activeNote, setActiveNote] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Optional env placeholders for future Supabase integration
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || '';
  // eslint-disable-next-line no-unused-vars
  const envInfo = { supabaseConfigured: Boolean(supabaseUrl && supabaseKey) };

  // Derived filtered notes
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(n =>
      (n.title || '').toLowerCase().includes(q) ||
      (n.content || '').toLowerCase().includes(q)
    );
  }, [notes, query]);

  const handleCreate = useCallback(() => {
    setActiveNote({ id: null, title: '', content: '' });
    setIsEditorOpen(true);
  }, []);

  const handleEdit = useCallback((note) => {
    setActiveNote(note);
    setIsEditorOpen(true);
  }, []);

  const handleSave = useCallback((draft) => {
    setNotes(prev => {
      // new
      if (!draft.id) {
        const now = new Date().toISOString();
        const created = { ...draft, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
        return [created, ...prev];
      }
      // update
      return prev.map(n => n.id === draft.id ? { ...n, ...draft, updatedAt: new Date().toISOString() } : n);
    });
    setIsEditorOpen(false);
    setActiveNote(null);
  }, [setNotes]);

  const requestDelete = useCallback((id) => setConfirmDeleteId(id), []);
  const cancelDelete = useCallback(() => setConfirmDeleteId(null), []);
  const confirmDelete = useCallback(() => {
    if (!confirmDeleteId) return;
    setNotes(prev => prev.filter(n => n.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  }, [confirmDeleteId, setNotes]);

  // Seed with a welcome note only on first load if empty
  useEffect(() => {
    if (notes.length === 0) {
      setNotes([{
        id: crypto.randomUUID(),
        title: 'Welcome to Ocean Notes',
        content: 'Create, search, edit, and delete your notes. Your notes persist in your browser.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <section aria-labelledby="notes-heading" className="notes-section">
      <div className="notes-toolbar">
        <div style={{ flex: 1, position: 'relative', maxWidth: 560 }}>
          <span className="search-icon" aria-hidden="true" style={{ left: 14 }}>🔎</span>
          <input
            className="input"
            type="search"
            placeholder="Search notes by title or content..."
            aria-label="Search notes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: 38 }}
          />
        </div>
        <button className="btn" onClick={handleCreate} aria-haspopup="dialog" aria-controls="note-editor">
          ➕ New Note
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="container notes-empty" role="status" aria-live="polite">
          No notes yet. Click “New Note” to create one.
        </div>
      ) : (
        <NoteList notes={filtered} onEdit={handleEdit} onDelete={requestDelete} />
      )}

      <NoteEditor
        open={isEditorOpen}
        note={activeNote}
        onClose={() => { setIsEditorOpen(false); setActiveNote(null); }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={Boolean(confirmDeleteId)}
        title="Delete note?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        tone="danger"
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </section>
  );
}

export default NotesPage;
