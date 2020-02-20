import React,{ Component } from "react";
import './ticket.css';
import { Draggable } from 'react-beautiful-dnd';

export default function Ticket(props) {

    return (
        <Draggable draggableId={props.ticket.id.toString()} index={parseInt(props.index)}>
            {(provided) => (
            <div className='ticket'
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                <h4>
                    {props.ticket.title}
                </h4>
                <a href='#' onClick={x => deleteTicket(props)}></a>
            </div>
            )}
        </Draggable>
    );
}

function deleteTicket(props) {
    props.deleteTicket(props.ticket)
}