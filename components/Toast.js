'use client';
import './Toast.css';

export default function Toast({ message, show }) {
  return (
    <div className={`toast-container${show ? ' show' : ''}`} id="toast-notification">
      {message}
    </div>
  );
}
