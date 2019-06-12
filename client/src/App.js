import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import Gear from './components/Gear';
import Campsites from './components/Campsites';
import Trips from './components/Trips';
import TripDetails from "./components/TripDetails";
import TipsAndTricks from "./components/TipsAndTricks";
import CampsiteDetails from "./components/CampsiteDetails";
import NewTrip from "./components/NewTrip";
import Navbar from "./components/Navbar";

class App extends Component {

    render() {
        return (
            <Router>
                <Navbar parentState={this.state} />
                <div className="App">

                    <div>
                        <h1>In-Tents</h1>
                    </div>

                    <Switch>

                        <Route exact path="/gear" component={Gear} />
                        <Route exact path="/campsites" component={Campsites} />
                        <Route exact path="/trips" component={Trips} />
                        <Route exact path="/tipsandtricks" component={TipsAndTricks} />
                        <Route path="/trips/:id" component={TripDetails} />
                        <Route path="/campsites/:id" component={CampsiteDetails} />
                        <Route path="/newtrip" component={NewTrip} />
                        

                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
