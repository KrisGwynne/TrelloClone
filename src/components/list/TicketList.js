import React, { Component } from "react";
import Ticket from '../ticket/Ticket';
import CreateTicket from '../createTicket/CreateTicket';
import './ticketList.css';

export default class TicketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        const tickets = this.props.list.tickets;
        const ticketArray = [];

        for (const ticket in tickets) {
            ticketArray.push(<Ticket ticket={tickets[ticket]} />)
        }

        return (
            <div className='ticketList'>
                <h2>{this.props.title}</h2>
                {ticketArray}
                <CreateTicket list={this.props.title} createTicket={this.props.createTicket}/>
            </div>
        );
    }
}

