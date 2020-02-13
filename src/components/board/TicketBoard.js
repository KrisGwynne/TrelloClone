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

    render() {
        const numLists = this.state.lists? this.state.lists.length : 0
        const listArray = [];

        for (let i = 0; i < numLists; i++) {
            const list = this.state.lists[i];
            listArray.push(<TicketList list={list} title={list.list} />)
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

