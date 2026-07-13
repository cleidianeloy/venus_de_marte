import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface Project {
    name: string;
    image: string;
    description: string[];
}
interface Props {
    project: Project;
    isCurrentProject: boolean;
    openProjectAction: () => void;
    closeProject: () => void;
}
export default function Project({ 
    project, isCurrentProject, openProjectAction, closeProject}: Props) {
    const { name, image, description } = project;

    return (
        <div  className={`project ${isCurrentProject ? 'open' : ''}`} onClick={openProjectAction}>
            <div className="image-title">
                <div className="wrapper">
                    <img src={image} alt="" />
                </div>
                <h3>{name}</h3>
            </div>
            <div className="content">
                {
                    description.map((paragraph, index) => {
                        return (
                            <p key={index}>
                                {paragraph}
                            </p>
                        )
                    })
                }
            </div>
            <button className="close" onClick={closeProject} aria-label='Fechar'>
                <FontAwesomeIcon icon={faXmark} />
            </button>          
        </div>
    )
}