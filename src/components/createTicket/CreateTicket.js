import React,{ Component } from "react";
import './createTicket.css';

export default class CreateTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blank: null
        }
    }

    render() {
        return (
            <div className='createTicket'>
                <form>
                    <imput type='text'></imput>
                </form>
            </div>
        );
    }
}