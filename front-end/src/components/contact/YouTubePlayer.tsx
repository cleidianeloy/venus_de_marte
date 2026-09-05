interface Props {
    title: string,
    src: string
}
export default function YouTubePlayer({ title, src }: Props) {

    return (
        <iframe loading="lazy"
            width="100%"
            height="auto"
            style={{ aspectRatio: "16/9" }}
            src={src}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

    )
}