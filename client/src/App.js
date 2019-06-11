import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import Gear from './components/Gear';
import Campsites from './components/Campsites';
import Trips from './components/Trips';
import TripDetails from "./components/TripDetails";

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">

                    <div>
                        <h1>In-Tents</h1>
                    </div>

                    <Switch>
                        <Route exact path="/gear" component={Gear} />
                        <Route exact path="/campsites" component={Campsites} />
                        <Route exact path="/trips" component={Trips} />
                        <Route path="/trips/:id" component={TripDetails}/>

                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
