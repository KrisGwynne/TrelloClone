import React,{ Component } from "react";
import './ticket.css';

export default class Ticket extends Component {
    render() {

        // const date = new Date(this.props.ticket.dueDate)

        return (
            <div className='ticket'>
                <h4>
                    {this.props.ticket.title}
                </h4>
                {/* <p>
                    {this.props.ticket.description}
                </p>
                <p>
                    {date.toDateString()}
                </p> */}
            </div>
        );
    }
}