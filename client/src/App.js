import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import './App.css';

class App extends Component {
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
