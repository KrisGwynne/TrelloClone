import React,{ Component } from "react";
import TicketList from '../list/TicketList';

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

    render() {

        const numLists = this.state.lists? this.state.lists.length : 0
        const listArray = [];

        for (let i = 0; i < numLists; i++) {
            const list = this.state.lists[i];
            listArray.push(<TicketList list={list} />)
        }

        return this.state.tickets? (
            <div>
                {listArray}
            </div>
        ) : (
            <div>
                LOADING
            </div>
        );
    }
}

