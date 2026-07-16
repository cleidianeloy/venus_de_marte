import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
    useEffect,
    useMemo,
    useState,
    type CSSProperties,
} from 'react';


// permite custom properties (--foo) no style do React
type CSSVarProperties = CSSProperties & Record<`--${string}`, string>;


export default function Header(props: { progress: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Define o estado inicial
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const { progress } = props;

    const styleVars: CSSVarProperties = useMemo(() => {
        return {
            '--progress': `${progress}`,
        };
    }, [progress]);

    return (
        <header id="menu" style={styleVars}>
            <h1>
                <a href="#home">
                    <img src="https://res.cloudinary.com/qzrlaax1/image/upload/v1783724257/venus_de_marte_o4qlaa.svg" alt="Vênus de Marte" />
                    <i>{"-||- 0 >>"}</i>
                </a>
            </h1>
            <nav>
                <button
                    type="button"
                    onClick={toggleMenu}
                    className="menu-toggle-btn"
                    aria-expanded={isMobile ? isOpen : undefined}
                    aria-controls={isMobile ? "main-menu" : undefined}
                    aria-label={isMobile ? (isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação") : undefined}>
                    <FontAwesomeIcon icon={isOpen ? faXmark : faBars} aria-hidden="true" />
                </button>
                <ul id="main-menu"
                    className={`nav-links ${isOpen && isMobile ? 'is-open' : ''}`}
                    aria-hidden={isMobile ? !isOpen : undefined}>
                    <li>
                        <a href="#about">
                            Sobre
                        </a>
                    </li>
                    <li>
                        <a href="#projects">
                            Projetos
                        </a>
                    </li>
                    <li>
                        <a href="#agenda">
                            Agenda
                        </a>
                    </li>
                    <li>
                        <a href="#contact">
                            Contato
                        </a>
                    </li>
                </ul>
            </nav>

        </header>)
}