import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import campsiteClient from '../../clients/campsiteClient';
import tripClient from '../../clients/tripClient';
import queryString from 'query-string'

const PlanATripWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Anonymous Pro', monospace;
    
        .new-trip-grid{
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-items: center;
            align-items: start;
            grid-gap: .2em;
        }

        .plan-a-trip-container{
            background-color: rgba(255, 255, 255, .7);
            padding:  1em;
            margin-top: 10em;
            border-radius: .6em;
            width: 50em;
        }

        .new-trip-grid input[type='text'] {
            margin-top: .2em;
            width: 10em;
        }

        .new-trip-grid select {
            width: 10em;
        }

        .new-trip-grid input[type='number'] {
            width: 4em;
        }

        .new-trip-grid input[type='date'] {
            width: 10em;
        }

        input{
            justify-self: start;
        }
        select{
            justify-self: start;
        }

        h1{
            font-size: 3em;
            color: rgb(148, 72, 26);
            font-weight: 700;
        }

        label{
            justify-self: end;
            color: rgb(98, 104, 52);
            font-weight: 700;
            font-size: 1.5em;
        }
        button{
            margin: .5em;
            background-color: rgb(148, 72, 26);
            border: 1px solid white;
            width: 10em;
            height: 1.5em;
            padding: 0;
        }
        button:hover {
            color: white;
            background-color:  rgb(118, 124, 61); 
            border: 1px solid rgb(148, 72, 26);
        }
    `

class NewTrip extends Component {
    state = {
        trip: {
            name: '',
            campsite: '',
            campers: '',
            start_date: '',
            end_date: ''
        },
        newTripId: null,
        campsites: [],
        selectedCampsite: {},
    }

    async componentDidMount() {
        let query = queryString.parse(this.props.location.search)
        let campsites = await campsiteClient.getAll()

        let initialCampsite = query.campsite || campsites[0].id
        console.log(initialCampsite)
        this.setState(prevState => ({
            campsites: campsites,
            trip: {
                ...prevState.trip,
                campsite: initialCampsite
            },
            selectedCampsite: initialCampsite
        }))
    }

    createTrip = async (event) => {
        event.preventDefault();
        console.log(this.state.trip)
        let trip = await tripClient.create(this.state.trip)
        this.setState({ newTripId: trip.id })
    }

    onTripChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            trip: {
                ...prevState.trip,
                [name]: value
            }
        }))
    }

    render() {
        return (
            <PlanATripWrapper>
                {this.state.newTripId ? <Redirect to={`/trips/${this.state.newTripId}`} />
                    : <div>
                        <div className="plan-a-trip-container">
                        <h1>Plan A Trip</h1>

                        <form onSubmit={this.createTrip}>
                            <div className="new-trip-grid">
                                <label>Name:</label>
                                <input type="text" name="name" value={this.state.trip.name} onChange={this.onTripChange} />
                                <label>Location:</label>
                                <select name="campsite" onChange={this.onTripChange} value={this.state.trip.campsite}>
                                    {this.state.campsites.map(campsite => (
                                        <option key={campsite.id} value={campsite.id} >{campsite.name}</option>
                                    ))}
                                </select>
                                <label>Number of Campers:</label>
                                <input type="number" name="campers" value={this.state.trip.campers} onChange={this.onTripChange} />
                                <label>Start-Date:</label>
                                <input type="date" name="start_date" value={this.state.trip.start_date} onChange={this.onTripChange} />
                                <label>End-Date:</label>
                                <input type="date" name="end_date" value={this.state.trip.end_date} onChange={this.onTripChange} />
                            </div>
                            <button className="btn btn-primary">Save</button>
                            <Link to={`/campsites/`}><button className="btn btn-primary">Find A Campsite</button></Link>
                        </form>
                        </div>
                    </div>}
            </PlanATripWrapper>
        )
    }
}

export default NewTrip