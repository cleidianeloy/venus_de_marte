interface Props{
    title: string,
    src: string
}
export default function SpotifyPlayer({title, src}: Props) {
//src="";
// title=""
    return (
        <iframe loading="lazy" 
        data-testid="embed-iframe" 
        src={src}
        title={title}
        style={{ borderRadius: "12px" }}   
        width="100%" height="152" 
        frameBorder="0" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>

    )
}