import React from 'react';
import '../App.css';

/**
 * PUBLIC_INTERFACE
 * Header - App header with brand, global search (mobile-hidden), and a create button slot (handled in page).
 * This is presentational; interactivity is passed via props when needed.
 */
function Header() {
  return (
    <header className="ocean-header" role="banner">
      <div className="ocean-header-inner">
        <div className="brand" aria-label="Notes brand">
          <div className="brand-logo" aria-hidden="true">🌊</div>
          <div className="brand-title">Ocean Notes</div>
        </div>
        <div className="header-search" aria-hidden="true">
          <span className="search-icon">🔎</span>
          <input
            className="input"
            placeholder="Search your notes..."
            aria-label="Search notes (use search in main toolbar)"
            readOnly
          />
        </div>
        <div className="header-actions">
          <a
            className="btn btn-secondary"
            href="https://reactjs.org"
            target="_blank"
            rel="noreferrer"
            aria-label="Learn React (opens in new tab)"
          >
            Learn React
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
