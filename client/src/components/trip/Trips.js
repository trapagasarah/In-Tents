import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tripClient from '../../clients/tripClient';

const MyTripsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Anonymous Pro', monospace;
    

    

        h1{
            font-size: 3em;
            color: rgb(148, 72, 26);
            font-weight: 700;
        }
        
        

        .trip-name{
            text-decoration: none;
            color: rgb(98, 104, 52);
            font-weight: 700;
            font-size: 1.5em;
            text-align: left;
            
        }

        .delete-button{
           
           justify-self: right;
             
        }

        button {
            background-color: rgb(148, 72, 26);
            border: 1px solid white;
            width: 4em;
            height: 1.5em;
            margin-top: .5em;
            margin-right: .5em;
            margin-left: .5em;
            padding: 0;
        }

        button:hover {
            color: white;
            background-color:  rgb(118, 124, 61); 
            border: 1px solid rgb(148, 72, 26);
        }

        .tripsContaianer {  
            display: grid;
            grid-template-columns: 2fr 1fr;
            grid-column-gap: 2em; 
            grid-row-gap: 1em;
            margin-bottom: 1em;
            
            
        }

        .my-trips{
            background-color: rgba(255, 255, 255, .7);
            padding:  1em;
            margin-top: 8em;
            border-radius: .6em;
        }

        .plan-a-trip{
            width: 10em;
        }

        
    `


class Trips extends Component {
    state = {
        trips: [],
    }

    async componentDidMount() {
        let trips = await tripClient.getAll()
        this.setState({ trips: trips })
    }

    deleteTrip = async (tripId) => {
        await tripClient.delete(tripId)
        let trips = await tripClient.getAll()
        this.setState({ trips: trips })
    }


    render() {
        return (
            <MyTripsWrapper>
                <div className="my-trips">
                <h1>My Trips</h1>
                
                <div className='tripsContaianer'>
                    {this.state.trips.map(trip => (
                        <React.Fragment key={trip.id}>
                            <Link class="trip-name" to={`/trips/${trip.id}`}>{trip.name}</Link>
                            <button class="btn btn-primary delete-button" onClick={() => this.deleteTrip(trip.id)}>Delete</button>
                        </React.Fragment>
                    ))}
                </div>
                
                <Link to={`/newtrip/`}> <button class="btn btn-primary  plan-a-trip">Plan A Trip</button> </Link>
                </div>
            </MyTripsWrapper>
        )
    }
}

export default Trips