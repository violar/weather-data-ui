import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import Weather from './Weather';
import { appReducer } from '../reducers/AppReducer'
import thunk from "redux-thunk";

const store = createStore(appReducer, applyMiddleware(thunk));

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Weather />
      </Provider>
    )
  }

}

export default App;