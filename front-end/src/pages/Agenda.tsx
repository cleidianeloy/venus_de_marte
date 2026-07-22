import Event from "../components/Event";
export interface EventInterface {
    date: Date;
    description: string,
    learnMore: string,
    name: string
}
export default function Agenda() {
    const events: EventInterface[] =  [ 
        {
                date: new Date(2026, 7, 16), 
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mattis nulla ac volutpat laoreet. ", 
                learnMore: "",
                name: "gruve-se" 
        }
    ].filter(event => {
            const eventDate = new Date(event.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            eventDate.setHours(0, 0, 0, 0);

            return eventDate >= today;
    }) || []; 
    return (
        <section id="agenda" data-name="Agenda">
            <div className="container">
                <div className="row">
                    <div className="col col-md-6">
                        {events.length === 0 ? (
                    <p className="no-events-message">Nenhum evento futuro agendado no momento.</p>
                        ) : (
                        events.map((event, index) => (
                            <Event 
                            key={index}
                            currentEvent={event}
                            />
                        ))
                    )}
                    </div>
                </div>
            </div>
        </section>
    )
}