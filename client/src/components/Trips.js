import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tripClient from '../clients/tripClient';

class Trips extends Component {
    state = {
        trips:[],
    }

    async componentDidMount(){
        let trips = await tripClient.getAll()
        this.setState({trips: trips})
    }

    deleteTrip =  async (tripId) => {
        await tripClient.delete(tripId)
        let trips = await tripClient.getAll()
        this.setState({trips: trips})
    }


    render (){
        return(
            <div>
                <h1>My Trips</h1>
                <ul>        
                    {this.state.trips.map(trip  => (
                        <li key={trip.id}>
                            <Link to={`/trips/${trip.id}`}>{trip.name}</Link>
                            <button onClick={() => this.deleteTrip(trip.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <Link to={`/newtrip/`}> <button>Plan A Trip</button> </Link>
            </div>
        )
    }
}

export default Trips