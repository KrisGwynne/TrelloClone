import React,{ Component } from "react";
import DatePicker from "react-datepicker";
import './createTicket.css';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            date: new Date(),
            list: this.props.list,
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
        } else if (this.state.description === '') {
            console.log('description cannot be blank')
        } else {
            console.log('submitted')
            const ticket = {
                title: this.state.title,
                description: this.state.description,
                dueDate: this.state.date,
                list: this.props.list
            }
            this.submitTicket(ticket)
        }
    }

    submitTicket(ticket) {
        fetch('http://localhost:9000/NewTicket',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(ticket)
        })
        .then(console.log('success'))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='createTicket'>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title: 
                        <input
                            name='title'
                            type='text'
                            value={this.state.value}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Description: 
                        <input
                            name='description'
                            type='text'
                            value={this.state.value}
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
                    <br />
                    <input 
                        type='submit'
                        value='Submit'
                    />
                </form>
            </div>
        );
    }
}