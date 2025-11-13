import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center'
    }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{
          fontSize: '8rem',
          fontWeight: 'bold',
          color: 'var(--brand-yellow)',
          lineHeight: 1,
          marginBottom: 'var(--space-lg)'
        }}>
          404
        </div>
        
        <h1 style={{
          fontSize: '2.5rem',
          color: 'var(--text)',
          marginBottom: 'var(--space-md)'
        }}>
          Página no encontrada
        </h1>
        
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-light)',
          marginBottom: 'var(--space-xl)',
          lineHeight: 1.6
        }}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        
        <div style={{
          display: 'flex',
          gap: 'var(--space-md)',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            to="/"
            className="btn btn--primary"
            style={{ minWidth: '180px' }}
          >
             Volver al inicio
          </Link>
          
          <Link
            to="/cv"
            className="btn btn--secondary"
            style={{ minWidth: '180px' }}
          >
             Ver CV clásico
          </Link>
        </div>
        
        <div style={{
          marginTop: 'var(--space-xl)',
          padding: 'var(--space-lg)',
          background: 'var(--surface)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)'
        }}>
          <p style={{ 
            color: 'var(--text-light)',
            marginBottom: 'var(--space-md)'
          }}>
             <strong>Tip:</strong> Prueba buscar "programador" en la home para descubrir algo especial
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;