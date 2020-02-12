import React,{ Component } from "react";
import './createTicket.css';

export default class CreateTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        if (this.state.title  === '') {
            console.log('title cannot be blank')
        }else if (this.state.description === '') {
            console.log('description cannot be blank')
        } else {
            console.log('submitted')
        }

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
                    <input 
                        type='submit'
                        value='Submit'
                    />
                </form>
            </div>
        );
    }
}