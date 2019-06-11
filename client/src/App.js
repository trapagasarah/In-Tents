import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import Gear from './components/Gear';
import Campsites from './components/Campsites';
import Trips from './components/Trips';

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">

                    <div>
                        <h1>In-Tents</h1>
                    </div>

                    <Switch>
                        <Route path="/gear" component={Gear} />
                        <Route path="/campsites" component={Campsites} />
                        <Route path="/trips" component={Trips} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
