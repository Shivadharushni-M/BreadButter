import React from 'react';

function Header() {
  return (
    <header style={{
      textAlign: 'center',
      padding: '2.5rem 0 1.5rem 0',
      background: 'transparent', // made transparent
      boxShadow: 'none', // removed shadow
      marginBottom: '2rem',
      position: 'relative',
      animation: 'fadeIn 1.2s cubic-bezier(.4,0,.2,1)'
    }}>
      <span style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic',
        fontWeight: 900,
        fontSize: '3.2rem',
        color: '#fff',
        letterSpacing: '0.12em',
        textShadow: '0 2px 8px #274690',
        display: 'inline-block',
        borderRadius: 12,
        padding: '0.2em 1.2em',
        background: '#000080', // changed to Navy
        position: 'relative',
        zIndex: 2
      }}>
        BreadButter
        <span style={{
          display: 'block',
          height: 6,
          width: '80%',
          margin: '0.2em auto 0 auto',
          background: '#fffbe6',
          borderRadius: 8,
          animation: 'underlinePop 1.2s cubic-bezier(.4,0,.2,1)'
        }} />
      </span>
      <span style={{
        position: 'absolute',
        top: 18,
        right: 32,
        background: '#fffbe6',
        color: '#E12C2C',
        fontWeight: 700,
        fontFamily: 'Montserrat, sans-serif',
        borderRadius: 8,
        padding: '0.3em 1.2em',
        fontSize: '1rem',
        boxShadow: '0 2px 8px #7ecbff',
        letterSpacing: '0.1em',
        animation: 'popIn 1.2s cubic-bezier(.4,0,.2,1)'
      }}>
        Welcome!
      </span>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes underlinePop {
          0% { width: 0; opacity: 0; }
          60% { width: 60%; opacity: 1; }
          100% { width: 80%; opacity: 1; }
        }
      `}</style>
    </header>
  );
}

export default Header; 