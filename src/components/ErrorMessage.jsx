import React from 'react';
import '../styles/ErrorMessage.css'

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  onRetry, 
  type = 'error' // error, warning, info
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="#FEF3C7"/>
            <path d="M24 14v12m0 4h.01" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'info':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="#DBEAFE"/>
            <path d="M24 22v10m0-14h.01" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      default:
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="#FEE2E2"/>
            <path d="M24 14v12m0 4h.01" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Information';
      default:
        return 'Error';
    }
  };

  return (
    <div className={`error-message ${type}`}>
      {getIcon()}
      <h3>{getTitle()}</h3>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary btn-retry">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M8 3a5 5 0 104.546 2.914.5.5 0 00-.908-.417A4 4 0 118 4v1H4.5a.5.5 0 000 1h4a.5.5 0 00.5-.5v-4a.5.5 0 00-1 0v1z"/>
          </svg>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;