import React, { Suspense, useState, useEffect } from 'react';
import {ContactForm} from '../components/contact/ContactForm';
import {SocialMedia} from '../components/contact/SocialMedia';
const SpotifyPlayer = React.lazy(() => import('../components/contact/SpotifyPlayer'));
const YouTubePlayer = React.lazy(() => import('../components/contact/YouTubePlayer'));

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
              <SocialMedia />
              <ContactForm />
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