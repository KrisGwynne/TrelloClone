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

    deleteList() {
        this.props.deleteList(this.props.title);
    }

    deleteTicket(ticket) {
        this.props.deleteTicket(this.props.title,ticket);
    }

    render() {
        const tickets = this.props.list.tickets;
        const ticketArray = [];

        for (const ticket in tickets) {
            ticketArray.push(<Ticket
                                key={tickets[ticket] + ticket}
                                ticket={tickets[ticket]}
                                deleteTicket={x => this.deleteTicket(x)} 
                            />)
        }

        return (
            <div className='ticketList'>
                <h2>{this.props.title}</h2>
                <a className='close-list' href='#' onClick={x => this.deleteList()}></a>
                <div className='ticket-container'>
                {ticketArray}
                </div>
                <CreateTicket list={this.props.title} createTicket={this.props.createTicket}/>
            </div>
        );
    }
}

