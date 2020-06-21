import React, {Component} from "react";
/* To be used to import settings for the whole app theme */
//import { StyleProvider } from "native-base";

import AppNavigation from './src/components/AppNavigation';

/* Main function contains Navigator defined in components */
export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return <AppNavigation />;
  }
}
