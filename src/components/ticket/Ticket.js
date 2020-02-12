import React,{ Component } from "react";
import './ticket.css';

export default class Ticket extends Component {
    render() {
        return (
            <div className='ticket'>
                <h2>
                    {this.props.ticket.title}
                </h2>
                <p>
                    {this.props.ticket.description}
                </p>
            </div>
        );
    }
}