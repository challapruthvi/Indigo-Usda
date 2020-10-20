import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import {Navbar, Nav} from 'react-bootstrap';
import routes from './routes.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="info" variant="dark">
          <Navbar.Brand href="/dashboard">Indigo</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
            <Nav.Link href="/UsStates">US States</Nav.Link>
            <Nav.Link href="/Countywise">County</Nav.Link>
          </Nav>
        </Navbar>
      </header>
      <section>
        {routes}
      </section>
    </div>
  );
}

export default App;
