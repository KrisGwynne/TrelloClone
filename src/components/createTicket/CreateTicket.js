import React,{ Component } from "react";
import DatePicker from "react-datepicker";
import './createTicket.css';
import "react-datepicker/dist/react-datepicker.css";
import plus from '../../plus.svg';

export default class CreateTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            list: this.props.list,
            isShown: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let name,value;
        if (e.type) {
            const target = e.target;
            name = target.name;
            value = target.value;
        } else {
            value = e;
            name = 'date'
        }

        this.setState({
            [name]: value,
        })

    }

    handleSubmit(e) {
        e.preventDefault()

        if (this.state.title  === '') {
            console.log('title cannot be blank')
        } else {
            console.log('submitted')
            this.createTicket();
        }
    }

    createTicket() {
        const ticket = {
            title: this.state.title,
            list: this.props.list
        }
        this.props.createTicket(ticket)
        this.setState({
            title: '',
        })
    }

    render() {
        return this.state.isShown? (
            <div className='createTicket' onBlur={x => this.setState({isShown: false})}>
                <form 
                    onSubmit={this.handleSubmit} 
                    
                    >
                    <input
                        name='title'
                        className='title-input'
                        type='text'
                        value={this.state.title}
                        onChange={this.handleChange}
                        placeholder='Add another ticket!'
                        autoComplete='off'
                        autoFocus
                        />
                    <br />
                    {/* <input 
                        type='submit'
                        value='Add Ticket'
                    /> */}
                </form>
            </div>
        ) : (
            <div>
                <a className='create-ticket-link'
                    
                    onClick={x =>this.setState({isShown: true})}>
                        <img src={plus}/>
                        <p>Add another Ticket</p>
                </a>
            </div>
        );
    }
}

{/* <br />
<label>
    Description: 
    <input
        name='description'
        type='text'
        value={this.state.description}
        onChange={this.handleChange} />
</label>
<br />
<label>
    Due Date: 
    <DatePicker
        name='date'
        selected={this.state.date}
        onChange={this.handleChange} />
</label>
<br /> */}