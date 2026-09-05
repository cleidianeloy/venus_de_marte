import Project from "../components/projects/Project"
import React, { useRef, useState } from "react";

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);

    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    // 1. Criamos um estado para saber se o usuário REALMENTE arrastou
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        setIsDown(true);
        setIsDragging(false); // Reseta a flag a cada clique novo
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseLeaveOrUp = () => {
        setIsDown(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDown || !containerRef.current) return;

        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;

        // 2. Se moveu mais do que 5 pixels, assumimos que é um ARRASTE, e não um clique
        if (Math.abs(x - startX) > 5) {
            setIsDragging(true);
        }

        e.preventDefault();
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const projects = [
        {
            name: "Live Sections",
            image: "https://res.cloudinary.com/qzrlaax1/image/upload/f_auto,q_auto,w_400/v1783722872/14_De_Novembro_-_2_dx9bzh.jpg",
            description: [
                "Representando a vertente musical do projeto, o EP “Rockstar Live Sections”, com 6 faixas originais, registra a performance ao vivo da banda em estúdio.",
                "Após a publicação de dois singles, o projeto está em processo de finalização com previsão de lançamento da obra completa em junho de 2026"
            ]
        },
        {
            name: "Poesia SLAM",
            image: "https://res.cloudinary.com/qzrlaax1/image/upload/f_auto,q_auto,w_400/v1783722876/IMG_3200_ubo9ae.jpg",
            description: [
                "Uma parcela dos poemas registrados no livro foram escritos e apresentados na cena das batalhas de poesia Slam em Santa Catarina durante os anos de 2023 a 2025.",
                "Com temas de estética, sobrevivência, amor e fracasso queer na arte periférica, Vênus marcou presença no Slam estadual nos anos de 2024 e 2025.",
                "O projeto transmídia “Rockstar” ainda conta com registros de performances de poesia falada em vídeo."
            ]
        },
        {
            name: "ROCKSTAR",
            image: "https://res.cloudinary.com/qzrlaax1/image/upload/f_auto,q_auto,w_400/v1783722874/Adesivos_-_3_c0ctfr.jpg",
            description: [
                "Formada em Produção Multimídia pelo IFSC em 2025, apresentou como conclusão de curso uma pesquisa de prática artístisca sobre as interseções entre o conceito de transmídia (Jenkins) e a arte queer (Preciado/Butler).",
                " O resultado é uma tríade de obras artísticas que se complementam narrativamente: um filme de curta metragem, um livro de poemas e um EP no formato Live Sessions."
            ]
        },
        {
            name: "Literatura Marginal",
            image: "https://res.cloudinary.com/qzrlaax1/image/upload/f_auto,q_auto,w_400/v1783722872/PNG_-_Rockstar_Zine_-_1_r5mbpx.png",
            description: [
                "A vertente literária do projeto é um livro de poemas ilustrado, e representa as confissões íntimas de uma artista “fracassada”.",
                "Com um estilo zine/revista traz um vocabulário pop com sessões especiais como um “tutorial para poetas” e uma “entrevista com a alma de Kurt Cobain”.Com humor e sensibilidade revela a farsa por trás da idolatria de ícones da industria cultural.O livro ainda está em processo de edição e sem data oficial para lançamento."
            ]
        },
        {
            name: "Vênus de marte e a Tanatose",
            image: "https://res.cloudinary.com/qzrlaax1/image/upload/f_auto,q_auto,w_400/v1783722873/Adesivos_-_1_cglwdq.jpg",
            description: [
                "Um pouco sociedade dos poetas mortos, um pouco coletivo anarcopunk, a banda caótica e não binária Tanatose acrescenta um tempero swingado à lírica de Vênus",
                "O show da banda traz um repertório visceral e contemporâneo, que mistura sonoridades do Rock, Rap, MPB e Manguebeat, para fazer dançar, vibrar e refletir.",
                "Desde 2024 acompanhando Vênus, a Tanatose se apresentou em diversos eventos culturais públicos e privados"
            ]
        }
    ]

    const [openProject, setOpenProject] = useState("");

    return (
        <section id="projects" data-name="Projetos">
            <div className="container">
                <div className="row">
                    <div 
                        className={`col col-12 ${isDown ? 'grabbing' : ''}`}
                        ref={containerRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeaveOrUp}
                        onMouseUp={handleMouseLeaveOrUp}
                        onMouseMove={handleMouseMove}
                        style={{ userSelect: 'none' }} // Impede seleção acidental de textos
                    >
                        {projects.map((project, index) => {
                            const id: string = `project-${index}`;
                            const isCurrentProject = id === openProject;

                            const openProjectAction = (): void => {
                                if (!isCurrentProject && !isDragging) {
                                    setOpenProject(id);

                                    // Espera o React aplicar a renderização do projeto aberto para centralizar corretamente
                                    requestAnimationFrame(() => {
                                        const element = containerRef.current?.querySelector(`.open`);
                                        if (element) {
                                            element.scrollIntoView({
                                                behavior: "smooth",
                                                inline: "center",
                                                block: "nearest"
                                            });
                                        }
                                    });
                                }
                            };

                            const closeProject = (): void => {
                                setOpenProject("");
                            };

                            return (
                                <Project
                                    key={id}
                                    project={project}
                                    isCurrentProject={isCurrentProject}
                                    openProjectAction={openProjectAction}
                                    closeProject={closeProject}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}