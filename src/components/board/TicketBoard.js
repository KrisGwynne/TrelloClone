import React,{ Component } from "react";
import Ticket from '../ticket/Ticket';

export default class TicketBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tickets: null,
        }
    }

    componentDidMount(props){
        fetch('http://localhost:9000/FindTickets')
          .then(res => res.text())
          .then(res => {
            this.setState({tickets: JSON.parse(res)})
        })
    }

    render() {

        const numTickets = this.state.tickets? this.state.tickets.length : 0
        const ticketArray = [];

        for (let i = 0; i < numTickets; i++) {
            const ticket = this.state.tickets[i];
            ticketArray.push(<Ticket ticket={ticket} />)
        }

        return this.state.tickets? (
            <div>
                {ticketArray}
            </div>
        ) : (
            <div>
                LOADING
            </div>
        );
    }
}

