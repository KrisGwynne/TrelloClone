import React from "react";
import Ticket from '../ticket/Ticket';

export default function TicketList(props) {

    const tickets = props.list.tickets;
    const ticketArray = [];

    for (const ticket in tickets) {
        ticketArray.push(<Ticket ticket={ticket} />)
    }

    return (
        <div>
            {ticketArray}
        </div>
    );
}

