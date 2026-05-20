import React, { createContext, useContext, useState, useRef } from 'react';

const AlertContext = createContext(null);

// Built-in minimalist styles injected via JS to ensure zero dependency requirements
const defaultStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    align-items: 'center',
    justifyContent: 'center',
    zIndex: 99999,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  box: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    maxWidth: '440px',
    width: '90%',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box'
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937'
  },
  message: {
    margin: '0 0 24px 0',
    fontSize: '0.95rem',
    color: '#4b5563',
    lineHeight: '1.5'
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px'
  },
  btn: {
    padding: '10px 18px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s ease',
    minWidth: '85px'
  },
  cancelBtn: {
    backgroundColor: '#f3f4f6',
    color: '#374151'
  },
  confirmBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff'
  },
  loader: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: '#ffffff',
    marginRight: '8px',
    display: 'inline-block'
  }
};

export const AlertProvider = ({ children, defaultOptions = {} }) => {
  const [alertState, setAlertState] = useState({ isOpen: false });
  const [loading, setLoading] = useState(false);
  const resolverRef = useRef(null);

  const baseConfig = {
    title: 'Alert',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    showCancel: true,
    style: {}, // Allows users to pass a custom styling object overrides
    ...defaultOptions
  };

  const show = (options = {}) => {
    setAlertState({
      isOpen: true,
      ...baseConfig,
      ...options,
    });
    setLoading(false);

    return new Promise((resolve) => {
      resolverRef.current = resolve;
    });
  };

  const handleConfirm = async () => {
    if (alertState.onConfirm) {
      setLoading(true);
      try {
        await alertState.onConfirm();
      } catch (error) {
        console.error("react-alert-box action error:", error);
      } finally {
        setLoading(false);
      }
    }
    if (resolverRef.current) resolverRef.current(true);
    setAlertState({ isOpen: false });
  };

  const handleCancel = () => {
    if (resolverRef.current) resolverRef.current(false);
    setAlertState({ isOpen: false });
  };

  // Helper utility to clean merge nested objects for style customization maps
  const mergeStyles = (elementKey) => ({
    ...defaultStyles[elementKey],
    ...(baseConfig.style[elementKey] || {}),
    ...(alertState.style?.[elementKey] || {})
  });

  return (
    <AlertContext.Provider value={{ show }}>
      {children}
      {alertState.isOpen && (
        <div style={mergeStyles('overlay')}>
          <div style={mergeStyles('box')}>
            {alertState.title && <h3 style={mergeStyles('title')}>{alertState.title}</h3>}
            {alertState.message && <p style={mergeStyles('message')}>{alertState.message}</p>}
            
            <div style={mergeStyles('actions')}>
              {alertState.showCancel && (
                <button 
                  style={{ ...mergeStyles('btn'), ...mergeStyles('cancelBtn'), opacity: loading ? 0.6 : 1 }} 
                  onClick={handleCancel}
                  disabled={loading}
                >
                  {alertState.cancelText}
                </button>
              )}
              <button 
                style={{ ...mergeStyles('btn'), ...mergeStyles('confirmBtn'), opacity: loading ? 0.6 : 1 }} 
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading && (
                  <span 
                    style={mergeStyles('loader')} 
                    ref={(el) => {
                      if (el) el.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], { duration: 600, iterations: Infinity });
                    }}
                  />
                )}
                {alertState.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within an AlertProvider');
  return context;
};