import React from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import NotesPage from './pages/NotesPage';

/**
 * PUBLIC_INTERFACE
 * App - Root component that composes the header and main notes page.
 * Keeps the application simple with client-side state; future steps may
 * integrate Supabase using REACT_APP_SUPABASE_URL/KEY (optional).
 */
function App() {
  return (
    <div className="ocean-app">
      <Header />
      <main className="ocean-main">
        <NotesPage />
      </main>
    </div>
  );
}

export default App;
