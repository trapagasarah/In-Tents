import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tripClient from '../clients/tripClient';
import Gear from './Gear';
import checklistItemClient from '../clients/checklistItemClient'


class TripDetails extends Component {
    state = {
        trip: {},
        popupActive: false,
        editTrip: {}
    }

    async componentDidMount() {
        let tripId = this.props.match.params.id
        let trip = await tripClient.get(tripId)
        this.setState({ trip: trip })
    }

    editTrip = (trip) => {
        this.setState({ popupActive: true, editTrip: trip })
    }

    saveTrip = async (event, trip) => {
        event.preventDefault();
        let tripWithoutCampsiteAndChecklist = {
            ...trip,
            campsite: undefined,
            checklist: undefined
        }
        if (trip.id === '') {
            await tripClient.create(tripWithoutCampsiteAndChecklist)
        } else {
            await tripClient.update(tripWithoutCampsiteAndChecklist)
        }
        let tripId = this.props.match.params.id
        let updatedTrip = await tripClient.get(tripId)
        this.setState({ popupActive: false, trip: updatedTrip })
    }

    deleteTrip = async (tripId) => {
        await tripClient.delete(tripId)
    }

    render() {
        return (
            <div>
                <h1>My Trip</h1>
                {this.state.trip.id && <div>
                    <h3>Name: {this.state.trip.name}</h3>
                    <h3>Location: {this.state.trip.campsite.name}</h3>
                    <h3>Number of Campers: {this.state.trip.campers}</h3>
                    <h3>Start-Date: {this.state.trip.start_date}</h3>
                    <h3>End-Date: {this.state.trip.end_date}</h3>
                    <button onClick={() => this.editTrip(this.state.trip)}>Edit</button>
                    <button onClick={() => this.deleteTrip(this.state.trip.id)}>Delete</button>
                    {this.state.popupActive && <EditTripComponent onSave={this.saveTrip} trip={this.state.editTrip} />}
                    <Checklist value={this.state.trip.checklist} />
                    <Gear />
                </div>
                }
            </div>
        )
    }
}

class EditTripComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { trip: props.trip }
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
                <form onSubmit={(event) => this.props.onSave(event, this.state.trip)}>
                    <input type="hidden" name="id" value={this.state.trip.id} onChange={this.onTripChange} />
                    <label>Name</label>
                    <input type="text" name="name" value={this.state.trip.name} onChange={this.onTripChange} />
                    <label>Number of Campers</label>
                    <input type="number" name="campers" value={this.state.trip.campers} onChange={this.onTripChange} />
                    <label>Start-Date</label>
                    <input type="date" name="start_date" value={this.state.trip.start_date} onChange={this.onTripChange} />
                    <label>End-Date</label>
                    <input type="date" name="end_date" value={this.state.trip.end_date} onChange={this.onTripChange} />
                    <button>Save</button>
                </form>
            </div>
        )
    }
}

class Checklist extends Component {
    constructor(props) {
        super(props);
        this.state = { checklist: props.value }
    }

    editChecklist = (checklistItem) => {
        this.setState({ popupActive: true, editChecklist: checklistItem })
    }

    render() {
        return (
            <div>
                <h1>Checklist</h1>
                <ul>
                    {this.state.checklist.map(checklistItem => (
                         <CheckListItem key={checklistItem.id} item={checklistItem} />
                    ))}
                </ul>
            </div>
        )
    }
}

class CheckListItem extends Component {
    constructor(props) {
        super(props)
        console.log(props.item)
        this.state = { checklistItem: props.item }
    }

    async onChecked(checklistItem) {
        let toggledChecklistItem = {
            ...checklistItem,
            is_checked: !checklistItem.is_checked
        }

        this.setState({ checklistItem: toggledChecklistItem })
        await checklistItemClient.update(toggledChecklistItem)
    }


    render() {
        return (<li>
            <input
                type="checkbox"
                name="checklistItem"
                checked={this.state.checklistItem.is_checked}
                onChange={() => this.onChecked(this.state.checklistItem)}
            />
            {this.state.checklistItem.camping_item}
            <button>Edit</button>
        </li>)
    }
}

export default TripDetails