import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tripClient from '../clients/tripClient';

const MyTripsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Anonymous Pro', monospace;
    height: 35em;
    
    h1{
        margin-top: 1em;
        font-size: 3em;
        color: rgb(148, 72, 26);
        font-weight: 700;
    }

    ul{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        }

     li{
        display: flex;
        font-size: 1.5em;
        font-weight: 700;   
        }

        .trip-name{
            text-decoration: none;
            color: rgb(56, 59, 28);
        }

        .delete-button{
           padding: .5em;
           line-height: .6em;
             
        }

        .tripsContaianer {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 2em; 
            grid-row-gap: 1em;
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
                <h1>My Trips</h1>
                {/* <ul>         */}
                <div className='tripsContaianer'>
                    {this.state.trips.map(trip => (
                        <React.Fragment key={trip.id}>
                            <Link class="trip-name" to={`/trips/${trip.id}`}>{trip.name}</Link>
                            <button class="btn btn-primary delete-button" onClick={() => this.deleteTrip(trip.id)}>Delete</button>
                        </React.Fragment>
                    ))}
                </div>
                {/* </ul> */}
                <Link to={`/newtrip/`}> <button>Plan A Trip</button> </Link>
            </MyTripsWrapper>
        )
    }
}

export default Trips