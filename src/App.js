import React, { Component } from 'react';
import './App.css';
import TicketBoard from './components/board/TicketBoard';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>To-Do Tickets</h1>
        <header className="App-header">
        </header>
        <TicketBoard />
      </div>
    )
  }
}

export default App;
