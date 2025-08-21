export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: 'var(--bg-color)',
        border: '1px solid var(--border-color)',
        borderRadius: 12,
        padding: 24,
        maxWidth: 500,
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        animation: 'slideIn 0.3s ease-out',
        position: 'relative'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginBottom: 16,
          position: 'sticky',
          top: 0,
          background: 'var(--bg-color)',
          padding: '8px 0'
        }}>
          <button 
            onClick={onClose}
            style={{ 
              background: 'var(--card-bg)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18, 
              cursor: 'pointer',
              color: 'var(--text-color)',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--border-color)'
              e.target.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'var(--card-bg)'
              e.target.style.transform = 'scale(1)'
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(-20px) scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
