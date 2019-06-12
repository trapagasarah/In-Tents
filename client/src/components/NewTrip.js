import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import campsiteClient from '../clients/campsiteClient';
import tripClient from '../clients/tripClient';

class NewTrip extends Component {
    state = {
        trip: [],
    }

    
    createTrip = async (event, newTrip) => {
        event.preventDefault();
        await tripClient.create(newTrip)
        let trip = await tripClient.get(newTrip)
        this.setState({ trip: trip })
    }

    onTripChange = (event) =>{
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
                <h1>Plan A Trip</h1>
                <form onSubmit={(event) => this.props.onSave(event, this.state.trip)}>
                    <input type="hidden" name="id" value={this.state.trip.id} onChange={this.onTripChange} />
                    <label>Name:</label>
                    <input type="text" name="name" value={this.state.trip.name} onChange={this.onTripChange}  />
                    <label>Location:</label>
                    {/* <input type="text" name="name" value={this.state.trip.campsite.name} onChange={this.onTripChange}  /> */}
                    <label>Number of Campers:</label>
                    <input type="number" name="campers" value={this.state.trip.campers} onChange={this.onTripChange}  />
                    <label>Start-Date:</label>
                    <input type="date" name="start_date" value={this.state.trip.start_date} onChange={this.onTripChange}  />
                    <label>End-Date:</label>
                    <input type="date" name="end_date" value={this.state.trip.end_date} onChange={this.onTripChange}  />
                    <button>Save</button>
                </form>
                <h1>Camping Checklist</h1>

            </div>
        )
    }
}

export default NewTrip