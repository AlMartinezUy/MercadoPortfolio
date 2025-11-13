import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__container">
          <div className="footer__section">
            <h3 className="footer__title">MercadoPortfolio</h3>
            <p className="footer__text">
              Una plataforma innovadora donde convergen el e-commerce y el talento. 
              Descubre productos únicos y conoce al desarrollador detrás de esta experiencia.
            </p>
          </div>
          
          <div className="footer__section">
            <h3 className="footer__title">Enlaces Útiles</h3>
            <p className="footer__text">
              <a 
                href={import.meta.env.VITE_CV_URL || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer__link"
              >
                Descargar CV
              </a>
            </p>
            <p className="footer__text">
              <a 
                href={import.meta.env.VITE_GITHUB_URL || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer__link"
              >
                GitHub Profile
              </a>
            </p>
          </div>
          
          <div className="footer__section">
            <h3 className="footer__title">Contacto</h3>
            <p className="footer__text">
              ¿Interesado en colaborar? 
            </p>
            <p className="footer__text">
              <a 
                href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || ''}?subject=Contacto desde MercadoPortfolio`}
                className="footer__link"
              >
                Enviar email
              </a>
            </p>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>© 2025 MercadoPortfolio. Desarrollado con React y mucho ☕</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;