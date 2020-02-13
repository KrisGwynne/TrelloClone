import React,{ Component } from "react";
import TicketList from '../list/TicketList';
import './ticketBoard.css';
import CreateList from "../createList/CreateList";

export default class TicketBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lists: null,
        }
    }

    componentDidMount(props){
        this.getLists();
    }


    getLists() {
        fetch('http://localhost:9000/FindLists')
            .then(res => res.text())
            .then(res => {
                this.setState({lists: JSON.parse(res)})
        })
    }

    createList(listName) {
        fetch('http://localhost:9000/NewList',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({list: listName})
        })
            .then(this.getLists())
            .catch(err => console.log(err))
    }

    createTicket(ticket) {
        fetch('http://localhost:9000/NewTicket',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(ticket)
        })
        .then(res => this.getLists())
        .catch(err => console.log(err))
    }
    
    deleteList(list) {
        fetch('http://localhost:9000/DeleteList',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({list: list})
        })
        .then(res => this.getLists())
        .catch(err => console.log(err))
    }

    deleteTicket(list, ticket) {
        const obj = {
            list: list,
            title: ticket.title
        }
        fetch('http://localhost:9000/DeleteTicket',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(obj)
        })
        .then(res => this.getLists())
        .catch(err => console.log(err))
    }

    render() {
        const numLists = this.state.lists? this.state.lists.length : 0
        const listArray = [];

        for (let i = 0; i < numLists; i++) {
            const list = this.state.lists[i];
            listArray.push(<TicketList 
                                key= {list + i}
                                list={list}
                                title={list.list}
                                createTicket={x => this.createTicket(x)}
                                deleteList={(list) => this.deleteList(list)}
                                deleteTicket={(title,ticket) => this.deleteTicket(title,ticket)}
                            />)
        }

        return this.state.lists? (
            <div className='ticket-board'>
                {listArray}
                <CreateList createList={x => this.createList(x)} />
            </div>
        ) : (
            <div>
                LOADING
            </div>
        );
    }
}

