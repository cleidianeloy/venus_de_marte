import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
    useEffect,
    useMemo,
    useState,
    type CSSProperties,
} from 'react';
import type { SectionInfo } from '../App';

// permite custom properties (--foo) no style do React
type CSSVarProperties = CSSProperties & Record<`--${string}`, string>;

interface Props {
    progress: number,
    activeSection: string,
    sections: SectionInfo[] | []
}
export default function Header({ progress, activeSection, sections }: Props) {
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


    const styleVars: CSSVarProperties = useMemo(() => {
        return {
            '--progress': `${progress}`,
        };
    }, [progress]);

    return (
        <header id="menu" style={styleVars}>
            <h1>
                <a href="#home">
                    <img src="https://res.cloudinary.com/qzrlaax1/image/upload/f_auto,q_auto,w_400/v1783724257/venus_de_marte_o4qlaa.svg" alt="Vênus de Marte" fetchPriority="high"/>
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
                <ul
                    id="main-menu"
                    className={`nav-links ${isOpen && isMobile ? 'is-open' : ''}`}
                    aria-hidden={isMobile ? !isOpen : undefined}
                >
                    {sections
                        .filter((section) => section.name.trim() !== '') // Filtra apenas seções com data-name preenchido
                        .map((section) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className={activeSection === section.id ? "selected" : ""}
                                >
                                    {section.name}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </nav>

        </header>)
}