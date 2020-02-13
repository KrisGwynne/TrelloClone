import React,{ Component } from "react";
import './ticket.css';

export default class Ticket extends Component {


    deleteTicket() {
        this.props.deleteTicket(this.props.ticket)
    }


    render() {

        return (
            <div className='ticket'>
                <h4>
                    {this.props.ticket.title}
                </h4>
                <button onClick={x => this.deleteTicket()}>Delete Ticket</button>
            </div>
        );
    }
}