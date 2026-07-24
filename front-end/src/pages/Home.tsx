import { useEffect, useState } from "react"

export default function Home() {
    const images: string[] = [
        "https://res.cloudinary.com/qzrlaax1/image/upload/f_auto,q_auto,w_1500/v1783722876/IMG_1200_tcpv5z.jpg",
        "https://res.cloudinary.com/qzrlaax1/image/upload/f_auto,q_auto,w_1500/v1783722875/IMG_1197_zl8vgz.jpg",
        "https://res.cloudinary.com/qzrlaax1/image/upload/f_auto,q_auto,w_1500/v1783383438/IMG_1890_lesbir.jpg"
    ]
    
    const [currentBg, setCurrentBg] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % images.length);
        }, 4000); 
        return () => clearInterval(timer);
    }, []); 

    return (
        <section id="home">
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`bg-layer ${index === currentBg ? "active" : ""}`}
                    style={{ backgroundImage: `url(${img})` }}
                />
            ))}
        </section>
    )
}