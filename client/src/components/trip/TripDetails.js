import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import tripClient from '../../clients/tripClient';
import Gear from '../gear/Gear';
import EditTripComponent from './EditTripComponent'
import checklistItemClient from '../../clients/checklistItemClient';
import campsiteClient from '../../clients/campsiteClient';

const MyTripWrapper = styled.div`
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

    h3{
        color: rgb(98, 104, 52);
        font-weight: 700;
        font-size: 1.5em;
    }

    .my-trip-details{
        background-color: rgba(255, 255, 255, .7); 
        padding:  2em;
        border-radius: .6em;
        margin-top: 6em;
    }

    .trip-grid{
        display: grid;
        grid-gap: 4em;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .trip-info{
        grid-column-start: 2;
        grid-column-end:  span 2;
        margin: 2em;
    }

    .checklist {
        grid-column-start: 1;
        grid-column-end:  span 2;
    }

    .checklist-grid {
        display:grid;
        grid-template-columns: .1fr .25fr 1fr .4fr .1fr .4fr .4fr;
        justify-items: start;
    }

    .checklist-grid button {
        justify-self: center;
        align-self: start;
    }

    .checklist-grid input[type='checkbox'] {
        margin-top: .2em;
    }

    .checklist-grid input[type='text'] {
        width: 8em;
    }

    .checklist-grid input[type='number'] {
        width: 2em;
    }

    #checklist-add-button{
        grid-column-start: 1;
        grid-column-end: 8;
    }


    .gear {
        grid-column-start: 3;
        grid-column-end:  span 2;
    }
`
class Checklist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checklist: props.value,
            popupActive: false,
            newChecklistItem: { camping_item: '', quantity: 1, is_checked: false, trip: props.tripId }
        }
    }

    addChecklistItem = async (event) => {
        event.preventDefault()
        console.log(this.state.newChecklistItem)
        let newItem = await checklistItemClient.create(this.state.newChecklistItem)
        this.setState(prevState => ({ checklist: [...prevState.checklist, newItem], popupActive: false }))
    }

    removeChecklistItem = async (checklistId) => {
        await checklistItemClient.delete(checklistId)
        let checklist = await checklistItemClient.getAll()
        this.setState({ checklist: checklist })
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
            <div className="checklist">
                <h1>Checklist</h1>
                <div className="checklist-grid">
                    {this.state.checklist.map(checklistItem => (
                        <CheckListItem key={checklistItem.id} item={checklistItem} onRemove={this.removeChecklistItem} />
                    ))}


                    <button id="checklist-add-button" onClick={() => this.setState({ popupActive: true })}>Add Checklist Item</button>
                
                    {this.state.popupActive &&
                        <React.Fragment>
                            <div />
                            <label>Item </label><input type="text" name="camping_item" value={this.state.newChecklistItem.camping_item} onChange={this.onNewChecklistItemChange} />
                            <label>Quantity</label><input type="number" name="quantity" value={this.state.newChecklistItem.quantity} onChange={this.onNewChecklistItemChange} />
                            <button onClick={this.addChecklistItem}>Save</button>
                            <div />
                        </React.Fragment>
                    }
                </div>  
            </div>
        )
    }
}

class TripDetails extends Component {
    state = {
        trip: {},
        popupActive: false,
        editTrip: {},
        redirect: false,
        campsite: null
    }

    async componentDidMount() {
        let tripId = this.props.match.params.id
        let trip = await tripClient.get(tripId)
        let campsite = await campsiteClient.get(trip.campsite)

        this.setState({ trip: trip, campsite: campsite })

    }

    editTrip = (trip) => {
        this.setState({ popupActive: true, editTrip: trip })
    }

    saveTrip = async (event, trip) => {
        event.preventDefault();
        let tripWithoutChecklist = {
            ...trip,
            checklist: undefined
        }
        console.log(tripWithoutChecklist)
        if (trip.id === '') {
            await tripClient.create(tripWithoutChecklist)
        } else {
            await tripClient.update(tripWithoutChecklist)
        }
        let tripId = this.props.match.params.id
        let updatedTrip = await tripClient.get(tripId)
        this.setState({ popupActive: false, trip: updatedTrip })
    }

    deleteTrip = async (tripId) => {
        await tripClient.delete(tripId)
        this.setState({ redirect: true })
    }

    render() {
        return (
            <MyTripWrapper>
                <div className="my-trip-details">
                    {this.state.redirect && <Redirect to='/trips' />}
                    <h1>My Trip</h1>
                    {this.state.trip.id && <div className="trip-grid">
                        <div className="trip-info">
                            <h3>Name: {this.state.trip.name}</h3>
                            <h3>Location: <Link to={`/campsites/${this.state.trip.campsite}`}>{this.state.campsite.name}</Link></h3>
                            <h3>Number of Campers: {this.state.trip.campers}</h3>
                            <h3>Start-Date: {this.state.trip.start_date}</h3>
                            <h3>End-Date: {this.state.trip.end_date}</h3>
                            <button onClick={() => this.editTrip(this.state.trip)}>Edit</button>
                            <button onClick={() => this.deleteTrip(this.state.trip.id)}>Delete</button>
                            {this.state.popupActive && <EditTripComponent onSave={this.saveTrip} trip={this.state.editTrip} />}
                        </div>
                        <Checklist value={this.state.trip.checklist} tripId={this.state.trip.id} />
                        <Gear />
                    </div>
                    }
                </div>
            </MyTripWrapper>
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
            <React.Fragment>

                {this.state.popupActive ?
                    <React.Fragment>
                        <div />
                        <label>Item: </label>
                        <input type="text" name="camping_item" value={this.state.checklistItem.camping_item} onChange={this.onChecklistItemChange} />
                        <label>Quantity: </label>
                        <input type="number" name="quantity" value={this.state.checklistItem.quantity} onChange={this.onChecklistItemChange} />
                        <button onClick={this.saveChecklist}>Save</button>
                        <div />
                    </React.Fragment>
                    : <React.Fragment>
                        <input
                            type="checkbox"
                            name="checklistItem"
                            checked={this.state.checklistItem.is_checked}
                            onChange={() => this.onChecked(this.state.checklistItem)}
                        />
                        <label>Item: </label>{this.state.checklistItem.camping_item}
                        <label>Quantity: </label>{this.state.checklistItem.quantity}
                        <button onClick={() => this.editChecklist(this.state.checklistItem)}>Edit</button>
                        <button onClick={() => this.props.onRemove(this.state.checklistItem.id)}>Delete</button>
                    </React.Fragment>

                }
            </React.Fragment>

        )
    }
}


export default TripDetails