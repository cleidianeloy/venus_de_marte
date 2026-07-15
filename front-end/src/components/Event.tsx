import type { EventInterface } from "../pages/Agenda";

interface Props {
    currentEvent: EventInterface;
}

export default function Event({currentEvent}: Props) {
    const {date, description, learnMore, name} = currentEvent;
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).split('/').reverse().join('-');
    };
    return (
        <div className="event-container">
            <div className="informations">
                <div className="data-name">
                    <time dateTime={formatDate(date)}>
                        <span className="day">{String(date.getDate()).padStart(2, '0')}</span>
                        <span className="month">{date.toLocaleDateString('pt-BR', { month: 'long' })}</span>
                        <span className="event-name">{name}</span>
                    </time>
                </div>
                <p className="description">
                    {description}
                </p>
            </div>
            <div className="learn-more">
                <a href={learnMore}>Saiba Mais</a>
            </div>
        </div>
    )
}