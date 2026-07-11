
import {
  useMemo,
  type CSSProperties,
} from 'react';


// permite custom properties (--foo) no style do React
type CSSVarProperties = CSSProperties & Record<`--${string}`, string>;


export default function Header(props:{progress:number}) {

  const {progress} = props;

  const styleVars: CSSVarProperties = useMemo(() => {
    return {
      '--progress': `${progress}`,
    };
  }, [progress]);

    return (
    <header id="menu"  style={styleVars}>
        <h1>
            <a href="#home">
                <img src="https://res.cloudinary.com/qzrlaax1/image/upload/v1783724257/venus_de_marte_o4qlaa.svg" alt="Vênus de Marte" />
                <i>{"-||- 0 >>"}</i>
            </a>
        </h1>
        <nav>
            <ul>
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