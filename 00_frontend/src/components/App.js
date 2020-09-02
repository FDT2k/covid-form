import React from 'react';
import './App.css';

import {Provider} from 'react-redux';
import {CreateStore} from 'Redux'


import CreateTracker from 'components/CreateTracker'
import GenerateKeyPair from 'components/GenerateKeyPair'

const {store,persistor} = CreateStore();


function App() {
  return (
    <Provider store={store}>

    <div className="App">
      <header className="App-header">
        Covid-Tracker

        <CreateTracker/>
      </header>

    </div>
    </Provider>
  );
}

export default App;
