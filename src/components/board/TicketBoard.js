import React,{ Component } from "react";
import TicketList from '../list/TicketList';
import './ticketBoard.css';
import CreateList from "../createList/CreateList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
                const lists = JSON.parse(res);

                for (let i = 0; i < lists.length; i++) {
                    const list = lists[i];
                    lists.splice(i,1);
                    lists.splice(list.index,0,list)
                }

                this.setState({lists: lists})
        })
    }

    createList(listName) {
        fetch('http://localhost:9000/NewList',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                list: listName,
                index: this.state.lists.length
            })
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

    updateDatabase(lists) {
        fetch('http://localhost:9000/UpdateLists',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({lists: lists})
        })
        .then(res => this.getLists())
        .catch(err => console.log(err))
    }

    onDragEnd(result) {
        const { source, destination, type} = result;
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
            ) {
                return;
        }

        let lists = this.state.lists;

        if (type === 'column') {
            const list = lists[source.index];
            list.index = destination.index;
            lists.splice(source.index,1);
            lists.splice(destination.index,0,list)
        }

        //Need to move an entry
        

        //First copy the ticket
        if (type === 'task') {
            console.log('here')
            let ticket;
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
        }

        console.log(lists.slice())
        this.setState({
            lists: lists,
        })

        this.updateDatabase(lists);

    }

    render() {
        const numLists = this.state.lists? this.state.lists.length : 0
        const listArray = [];

        for (let i = 0; i < numLists; i++) {
            const list = this.state.lists[i];
            listArray.push(<TicketList 
                                key= {list._id}
                                index={i}
                                list={list}
                                title={list.list}
                                createTicket={x => this.createTicket(x)}
                                deleteList={(list) => this.deleteList(list)}
                                deleteTicket={(title,ticket) => this.deleteTicket(title,ticket)}
                            />)
        }

        return this.state.lists? (
            <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId={'12ef4'} direction='horizontal' type='column'>
                    {(provided) => (
                        <div className='ticket-board'
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {listArray}
                            {provided.placeholder}
                            <CreateList createList={x => this.createList(x)} />
                        </div>
                    )}
                    </Droppable>
            </DragDropContext>
        ) : (
            <div>
                LOADING
            </div>
        );
    }
}

