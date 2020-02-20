import React, { Component } from 'react';

export default class CreateList extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createList(this.state.value);
        this.setState({
            value: '',
        })
    }


    render() {
        return (
            <div className='ticketList'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder='Add another list!'
                        autoComplete='off'/>
                    <input type='submit' value='submit' />
                </form>
            </div>
        );
    }
}