import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import React, { Suspense, useState, useEffect } from 'react';

const SpotifyPlayer = React.lazy(() => import('../components/SpotifyPlayer'));
const YouTubePlayer = React.lazy(() => import('../components/YouTubePlayer'));

export default function Contact() {
  const [loadEmbeds, setLoadEmbeds] = useState(false);

  useEffect(() => {
let idleId: number | undefined;
let timerId: number | undefined;

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => setLoadEmbeds(true));
    } else {
      timerId = setTimeout(() => setLoadEmbeds(true), 1500);
    }

    return () => {
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return (
    <section id="contact" data-name="Contato">
      <div className="container">
        <div className="row">
          <div className="col col-12 col-md-6">
            <div className="contact-container">
              <ul className="social-media">
                <li>
                  <a href="https://www.tiktok.com/@venusdemartemusic" aria-label="TikTok">
                    <FontAwesomeIcon icon={faTiktok} />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/venusdemartemusic/" aria-label="Instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
                <li>
                  <a href="https://whatsa.me/5548991653210/?t=Olá gostaria de saber mais sobre seu trabalho" aria-label="WhatsApp">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </a>
                </li>
              </ul>
              <form>
                <div className="name input-container">
                  <label htmlFor="contact-name">Nome</label>
                  <input type="text" id="contact-name" name="contact-name" placeholder="Nome Completo" />
                </div>
                <div className="email input-container">
                  <label htmlFor="contact-email">Email</label>
                  <input type="text" id="contact-email" name="contact-email" placeholder="Seu email" />
                </div>
                <div className="message input-container">
                  <label htmlFor="contact-message">Mensagem</label>
                  <textarea id="contact-message" name="message" rows={5} cols={50} placeholder="Sua mensagem"></textarea>
                </div>
                <div className="submit">
                  <button type="submit">Enviar</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col col-12 col-md-6">
            {loadEmbeds && (
              <Suspense fallback={<div className="player-skeleton">Carregando player...</div>}>
                <div className="spotify">
                  <SpotifyPlayer 
                    title="O figado de buda - Vênus de Marte, Tanatose (Spotify)" 
                    src="https://open.spotify.com/embed/track/0lyTTkN5KDrdFlABPQE0Os?utm_source=generator&si=38bf0c7c4846451d" 
                  />
                </div>

                <div className="youtube">
                  <YouTubePlayer
                    src="https://www.youtube-nocookie.com/embed/y0biY0LrWA4"
                    title="rockstar.doc (curta metragem)" 
                  />
                </div>
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}