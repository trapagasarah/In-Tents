import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tripClient from '../clients/tripClient';
import Gear from './Gear';
import checklistItemClient from '../clients/checklistItemClient'
import campsiteClient from '../clients/campsiteClient';


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
                    <Checklist value={this.state.trip.checklist} tripId={this.state.trip.id}/>
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
        this.state = {
            checklist: props.value,
            popupActive: false,
            newChecklistItem: {camping_item: '', quantity: 1, is_checked: false, trip: props.tripId}
        }
    }
    addChecklistItem = async (event) => {
        event.preventDefault()
        console.log(this.state.newChecklistItem)
        let newItem = await checklistItemClient.create(this.state.newChecklistItem)
        this.setState(prevState => ({checklist: [...prevState.checklist, newItem], popupActive: false}))
        
    }

    onNewChecklistItemChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            newChecklistItem: {
                ...prevState.newChecklistItem,
                [name]: value
            }
        }))
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
                <button onClick={() => this.setState({popupActive: true})}>Add Checklist Item</button>
                {this.state.popupActive &&
                        <form onSubmit={this.addChecklistItem}>
                            <input type="text" name="camping_item" value={this.state.newChecklistItem.camping_item} onChange={this.onNewChecklistItemChange} />
                            <button>Save</button>
                        </form>
                    }
            </div>
        )
    }
}

class CheckListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checklistItem: props.item,
            popupActive: false,
            editChecklist: {}
        }
    }

    async onChecked(checklistItem) {
        let toggledChecklistItem = {
            ...checklistItem,
            is_checked: !checklistItem.is_checked
        }

        this.setState({ checklistItem: toggledChecklistItem })
        await checklistItemClient.update(toggledChecklistItem)
    }

    editChecklist = (checklistItem) => {
        this.setState({ popupActive: true, checklistItem: checklistItem })
    }

    saveChecklist = async (event) => {
        event.preventDefault();
        let checklistItem = this.state.checklistItem
        await checklistItemClient.update(checklistItem)
        this.setState({ checklistItem: checklistItem, popupActive: false })
    }

    deleteCampsite = async (checklistId) => {
        await checklistItemClient.delete(checklistId)
        let checklist = await checklistItemClient.getAll()
        this.setState({ checklistItem: checklist })
    }

    onChecklistItemChange = (event) => {
        event.preventDefault()
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            checklistItem: {
                ...prevState.checklistItem,
                [name]: value
            }
        }))
    }
    render() {
        return (
            <div>
                <li>
                    <input
                        type="checkbox"
                        name="checklistItem"
                        checked={this.state.checklistItem.is_checked}
                        onChange={() => this.onChecked(this.state.checklistItem)}
                    />
                    {this.state.checklistItem.camping_item}
                    <button onClick={() => this.editChecklist(this.state.checklistItem)}>Edit</button>
                    {this.state.popupActive &&
                        <form onSubmit={this.saveChecklist}>
                            <input type="hidden" name="id" value={this.state.checklistItem.id} />
                            <input type="text" name="camping_item" value={this.state.checklistItem.camping_item} onChange={this.onChecklistItemChange} />
                            <button>Save</button>
                        </form>
                    }
                </li>
            </div >
        )
    }
}


export default TripDetails