import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import campsiteClient from '../../clients/campsiteClient';
import tripClient from '../../clients/tripClient';
import  queryString  from 'query-string'

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
            <div>
                {this.state.newTripId ? <Redirect to={`/trips/${this.state.newTripId}`} />
                    : <div>
                        <h1>Plan A Trip</h1>
                        <form onSubmit={this.createTrip}>
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
                            <button>Save</button>
                            <Link to={`/campsites/`}><button>Find A Campsite</button></Link>
                        </form>
                    </div>}
            </div>
        )
    }
}

export default NewTrip