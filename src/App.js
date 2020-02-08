import React from 'react';
import logo from './logo.svg';
import './App.css';
import Ticket from './components/ticket/Ticket';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Ticket></Ticket>
      </header>
    </div>
  );
}

export default App;
