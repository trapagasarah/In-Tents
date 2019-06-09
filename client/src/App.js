import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import './App.css';
import {getAllGear} from './util'

class App extends Component {
  state = {
    gear: [],

  }

  async componentDidMount(){
    let gear = await getAllGear()
    this.setState({gear: gear})
  }
  render() {
      return (
          <Router>
              <div className="App">

                  <div>
                      <h1>In-Tents</h1>
                      
                  </div>

                  <Switch>
                    <Route />
                    <Route />
                  </Switch>
              </div>
          </Router>
      );
  }
}

export default App;
