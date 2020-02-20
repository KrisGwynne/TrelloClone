import React,{ Component } from "react";
import TicketList from '../list/TicketList';
import './ticketBoard.css';
import CreateList from "../createList/CreateList";
import { DragDropContext } from "react-beautiful-dnd";

export default class TicketBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lists: null,
        }
        this.onDragEnd = this.onDragEnd.bind(this);
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
            .then(res => this.getLists())
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
            id: ticket.id
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

    onDragEnd(result) {
        const { source, destination, draggableId} = result;
        // console.log(result)
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
            ) {
                return;
        }

        //Need to move an entry
        

        //First copy the ticket
        let ticket;
        let sourceList;
        let destList;
        let lists = this.state.lists;
        for (const lst in this.state.lists) {
            if (this.state.lists[lst]._id === source.droppableId){
                ticket = lists[lst].tickets[source.index]
                lists[lst].tickets.splice(source.index,1)
                console.log(ticket)
            }
        }
        for (const lst in this.state.lists) {
            if (this.state.lists[lst]._id === destination.droppableId){
                lists[lst].tickets.splice(destination.index,0,ticket);
            }
        }

        this.setState({
            lists: lists,
        })
        
        // //Then delete the ticket at particular index
        // this.deleteTicket(sourceList.list,ticket)

        // //Insert ticket at specific place
        // const obj = {
        //     sourceList: sourceList.list,
        //     destList: destList.list,
        //     index: destination.index,
        //     ticket: ticket
        // }
        // fetch('http://localhost:9000/InsertTicket',{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=UTF-8',
        //     },
        //     body: JSON.stringify(obj)
        // })
        // .then(res => this.getLists())
        // .catch(err => console.log(err))

    }

    render() {
        const numLists = this.state.lists? this.state.lists.length : 0
        const listArray = [];

        for (let i = 0; i < numLists; i++) {
            const list = this.state.lists[i];
            listArray.push(<TicketList 
                                key= {i}
                                list={list}
                                title={list.list}
                                createTicket={x => this.createTicket(x)}
                                deleteList={(list) => this.deleteList(list)}
                                deleteTicket={(title,ticket) => this.deleteTicket(title,ticket)}
                            />)
        }

        return this.state.lists? (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className='ticket-board'>
                    {listArray}
                    <CreateList createList={x => this.createList(x)} />
                </div>
            </DragDropContext>
        ) : (
            <div>
                LOADING
            </div>
        );
    }
}

