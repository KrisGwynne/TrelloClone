import React,{ Component } from "react";
import DatePicker from "react-datepicker";
import './createTicket.css';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            // description: '',
            // date: new Date(),
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
        } else {
            console.log('submitted')
            const ticket = {
                title: this.state.title,
                list: this.props.list
            }
            this.props.createTicket(ticket)
            this.setState({
                title: '',
                description: '',
                date: new Date(),
            })
        }
    }

    render() {
        return (
            <div className='createTicket'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name='title'
                        type='text'
                        value={this.state.title}
                        onChange={this.handleChange} />
                    <input 
                        type='submit'
                        value='Submit'
                    />
                </form>
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