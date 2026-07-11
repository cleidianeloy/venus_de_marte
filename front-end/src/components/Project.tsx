interface Project{
    name: string,
    image: string,
    description: string[]  
}
export default function Project(props: {project: Project}) {
    const {project} = props;
    const {name, image, description} = project;
    return ( 
        <div className="project">
            <div>
                <div className="wrapper">
                    <img src={image} alt="" />
                    <h3>{name}</h3>
                </div>
                <div className="content">
                    {
                        description.map((paragraph)=>{
                            return (
                                <p>
                                    {paragraph}
                                </p>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}