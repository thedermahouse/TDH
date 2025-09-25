import React from 'react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '0 20px',
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '1rem' }}>
        Thank You!
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: '#555',
        textAlign: 'center',
        maxWidth: '500px',
        marginBottom: '2rem',
      }}>
        We appreciate your interest. We’ll get back to you soon.
      </p>
      <a href="/" style={{ textDecoration: 'none' }}>
        <button style={{
          backgroundColor: '#F76931',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
        }}>
          Return to Homepage
        </button>
      </a>
    </div>
  );
}