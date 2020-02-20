import React,{ Component } from "react";
import './ticket.css';
import { Draggable } from 'react-beautiful-dnd';
import deleteSVG from '../../delete.svg';

export default function Ticket(props) {

    return (
        <Draggable draggableId={props.ticket.id.toString()} index={parseInt(props.index)}>
            {(provided) => (
            <div className='ticket'
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                <p>
                    {props.ticket.title}
                </p>
                <a href='#' onClick={x => deleteTicket(props)}><img src={deleteSVG} /></a>
            </div>
            )}
        </Draggable>
    );
}

function deleteTicket(props) {
    props.deleteTicket(props.ticket)
}