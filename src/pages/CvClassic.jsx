import React from 'react';

const CvClassic = () => {
  return (
    <main style={{ padding: 'var(--space-xl) 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="card" style={{ padding: 'var(--space-2xl)' }}>
          <header style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <h1 style={{ 
              fontSize: '3rem', 
              color: 'var(--brand-blue)', 
              marginBottom: 'var(--space-md)' 
            }}>
              Desarrollador Full Stack
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-light)',
              lineHeight: 1.6 
            }}>
              Versión Clásica del Portfolio
            </p>
          </header>
          
          <section style={{ marginBottom: 'var(--space-xl)' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: 'var(--text)',
              marginBottom: 'var(--space-md)',
              borderBottom: '2px solid var(--brand-yellow)',
              paddingBottom: 'var(--space-sm)'
            }}>
              Sobre Mí
            </h2>
            <p style={{ 
              lineHeight: 1.8, 
              color: 'var(--text-light)',
              marginBottom: 'var(--space-lg)'
            }}>
              Soy un desarrollador apasionado que combina experiencia técnica con una sólida formación
             multidisciplinaria. A través de mis estudios y proyectos personales he adquirido no solo
             conocimientos en programación, sino también en planificación, organización y liderazgo de
             equipos, habilidades que desarrollé durante mi formación en arquitectura y que hoy aplico 
             a la creación de soluciones tecnológicas claras, eficientes y escalables.
             <br /><br />
              Me especializo en construir aplicaciones web completas —desde el frontend hasta el bakend—
             poniendo el foco en la experiencia del usuario, la mantenibilidad del código y la capacidad
             de crecimiento del proyecto. Disfruto aprender, mejorar cada día y enfrentar nuevos desafíos 
             que me permitan seguir creciendo como profesional.
            </p>
          </section>
          
          <section style={{ marginBottom: 'var(--space-xl)' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: 'var(--text)',
              marginBottom: 'var(--space-md)',
              borderBottom: '2px solid var(--brand-yellow)',
              paddingBottom: 'var(--space-sm)'
            }}>
              Stack Tecnológico
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-md)',
              marginBottom: 'var(--space-lg)'
            }}>
              <div>
                <h3 style={{ color: 'var(--brand-blue)', marginBottom: 'var(--space-sm)' }}>
                  Backend
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ padding: 'var(--space-xs) 0', color: 'var(--text-light)' }}>
                     Java
                  </li>
                  <li style={{ padding: 'var(--space-xs) 0', color: 'var(--text-light)' }}>
                     Spring Boot
                  </li>
                  <li style={{ padding: 'var(--space-xs) 0', color: 'var(--text-light)' }}>
                     MySQL
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 style={{ color: 'var(--brand-blue)', marginBottom: 'var(--space-sm)' }}>
                  Frontend
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ padding: 'var(--space-xs) 0', color: 'var(--text-light)' }}>
                     React
                  </li>
                  <li style={{ padding: 'var(--space-xs) 0', color: 'var(--text-light)' }}>
                     JavaScript
                  </li>
                  <li style={{ padding: 'var(--space-xs) 0', color: 'var(--text-light)' }}>
                     CSS3
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: 'var(--text)',
              marginBottom: 'var(--space-md)',
              borderBottom: '2px solid var(--brand-yellow)',
              paddingBottom: 'var(--space-sm)'
            }}>
              Acciones
            </h2>
            
            <div style={{
              display: 'flex',
              gap: 'var(--space-md)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href={import.meta.env.VITE_CV_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                style={{ minWidth: '160px' }}
              >
                 Ver/Descargar CV
              </a>
              
              <a
                href={import.meta.env.VITE_GITHUB_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
                style={{ minWidth: '160px' }}
              >
                 Mi GitHub
              </a>
              
              <a
                href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || ''}?subject=Contacto desde CV Clásico&body=Hola, me interesa conocer más sobre tu trabajo.`}
                className="btn btn--success"
                style={{ minWidth: '160px' }}
              >
                 Contactar
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default CvClassic;