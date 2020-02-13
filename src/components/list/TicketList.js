import React from "react";
import Ticket from '../ticket/Ticket';
import './ticketList.css';

export default function TicketList(props) {

    const tickets = props.list.tickets;
    const ticketArray = [];

    for (const ticket in tickets) {
        ticketArray.push(<Ticket ticket={tickets[ticket]} />)
    }

    return (
        <div className='ticketList'>
            <h2>{props.title}</h2>
            {ticketArray}
        </div>
    );
}

