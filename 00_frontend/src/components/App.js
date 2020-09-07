import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import { CreateStore } from 'Redux'

import { Link, Route } from "wouter";
import CreateTracker from 'components/CreateTracker'
import RegisterForm from 'components/RegisterForm'

const { store, persistor } = CreateStore();


function App() {
  return (
    <Provider store={store}>

      <div className="App">
        <header className="App-header">
          Covid-Tracker
           <Route path="/tracker/:tracker_id"> 
           {(params) => <RegisterForm tracker_id={params.tracker_id} />}
          </Route>
          <Route > <CreateTracker /></Route>

        </header>

      </div>
    </Provider>
  );
}

export default App;
