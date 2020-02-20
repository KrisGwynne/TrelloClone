import React, { Component } from "react";
import Ticket from '../ticket/Ticket';
import CreateTicket from '../createTicket/CreateTicket';
import { Droppable } from 'react-beautiful-dnd';
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
                                key={tickets[ticket].id}
                                ticket={tickets[ticket]}
                                deleteTicket={x => this.deleteTicket(x)} 
                                index={ticket}
                            />)
        }

        return (
                <div className='ticketList'>
                    <h2>{this.props.title}</h2>
                    <a className='close-list' href='#' onClick={x => this.deleteList()}></a>
                        <Droppable droppableId={this.props.list._id}>
                            {(provided) => (
                                <div className='ticket-container'
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {ticketArray}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    <CreateTicket list={this.props.title} createTicket={this.props.createTicket}/>
                </div>
        );
    }
}

