/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from "react"
import {name as appName} from './app.json';

/* Redux */

import {createStore} from "redux"
import {Provider} from "react-redux"
import rootReducer from "./src/Status_Management/redux/reducers";

const store = createStore(rootReducer);
function Lifestyle () {
  return(
    <Provider store={store}>
    <App />
</Provider>
  )
}
AppRegistry.registerComponent(appName, () => Lifestyle);
