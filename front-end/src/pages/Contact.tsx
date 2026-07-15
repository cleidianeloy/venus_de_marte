import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTiktok, faInstagram, faWhatsapp} from '@fortawesome/free-brands-svg-icons';
export default function Contact() {
    return (
        <section id="contact" >
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-md-6">
                        <div className="contact-container">
                            <ul className="social-media">
                                <li>
                                    <a href="https://www.tiktok.com/@venusdemartemusic">
                                        <FontAwesomeIcon icon={faTiktok} />
                                    </a>
                                 
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/venusdemartemusic/">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://whatsa.me/5548991653210/?t=Olá gostaria de saber mais sobre seu trabalho">
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
                                <div className='message input-container'>
                                    <label htmlFor="contact-message">Mensagem</label>   
                                    <textarea id="contact-message" name="message" rows={5} cols={50} placeholder="Sua mensagem"></textarea>
                                </div>
                                <div className='submit'>
                                    <button type='submit'>Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col col-12 col-md-6">

                        <div className="spotify">
                            <iframe data-testid="embed-iframe" style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/track/0lyTTkN5KDrdFlABPQE0Os?utm_source=generator&si=38bf0c7c4846451d" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                        </div>
                        <div className="youtube">
                            <iframe width="100%" height="auto" style={{ aspectRatio: "16/9" }} src="https://www.youtube.com/embed/y0biY0LrWA4" title="rockstar.doc (curta metragem)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}