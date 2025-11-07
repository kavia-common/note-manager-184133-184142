import React, { useEffect, useRef } from 'react';

/**
 * PUBLIC_INTERFACE
 * ConfirmDialog - Simple confirm/cancel modal used for delete.
 */
function ConfirmDialog({ open, title = 'Are you sure?', description, confirmLabel = 'Confirm', tone = 'primary', onCancel, onConfirm }) {
  const dialogRef = useRef(null);
  const confirmBtn = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => confirmBtn.current?.focus(), 0);
  }, [open]);

  if (!open) return null;

  const btnClass = tone === 'danger' ? 'btn btn-danger' : 'btn';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      ref={dialogRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(17,24,39,0.45)',
        display: 'grid',
        placeItems: 'center',
        padding: 16,
        zIndex: 110,
      }}
      onMouseDown={(e) => {
        if (e.target === dialogRef.current) onCancel?.();
      }}
    >
      <div className="container" style={{ width: '100%', maxWidth: 420, padding: 16 }}>
        <h3 id="confirm-title" style={{ marginTop: 0 }}>{title}</h3>
        {description ? <p style={{ color: 'var(--muted)' }}>{description}</p> : null}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button ref={confirmBtn} className={btnClass} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
