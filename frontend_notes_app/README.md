# Ocean Notes (React)

A lightweight notes app with a modern "Ocean Professional" theme. Create, edit, delete, and search notes. Notes persist locally via `localStorage`.

## Quick start

- npm start
- Open http://localhost:3000

No backend is required. Notes are stored in the browser.

## Features

- Create, edit, delete notes with an accessible modal editor
- Search notes in real time (title/content)
- Local persistence via localStorage
- Responsive layout, keyboard-friendly interactions
- Ocean Professional theme: primary #2563EB, accent #F59E0B, error #EF4444, subtle gradients, rounded corners, shadows, transitions

## Environment variables (optional, not required to run)

These are placeholders for future backend/Supabase integration:

- REACT_APP_SUPABASE_URL
- REACT_APP_SUPABASE_KEY
- REACT_APP_API_BASE
- REACT_APP_BACKEND_URL
- REACT_APP_FRONTEND_URL
- REACT_APP_WS_URL
- REACT_APP_NODE_ENV
- REACT_APP_NEXT_TELEMETRY_DISABLED
- REACT_APP_ENABLE_SOURCE_MAPS
- REACT_APP_PORT
- REACT_APP_TRUST_PROXY
- REACT_APP_LOG_LEVEL
- REACT_APP_HEALTHCHECK_PATH
- REACT_APP_FEATURE_FLAGS
- REACT_APP_EXPERIMENTS_ENABLED

If provided, they will not affect current functionality.

## Project structure

- src/components: Header, NoteCard, NoteEditor, ConfirmDialog, NoteList
- src/pages: NotesPage (state and flows)
- src/state: useLocalStorage hook
- src/index.css, src/App.css: Theme and component styles

## Accessibility

- Semantic roles and labels on lists, dialogs, and buttons
- Escape key closes dialogs
- Focus management on opening dialogs
