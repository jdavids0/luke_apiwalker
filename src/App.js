import './App.css';
import React from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import Card from './components/Card'
import Form from './components/Form'
import Error from './components/Error'

// think of Route as a URL listener, changing URL based on an event
function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Form />
        <Switch>
          <Route exact path='/card/:resource/:id'>
            <Card />
          </Route>
          <Route exact path='/error'>
            <Error />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
