import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import tripClient from '../../clients/tripClient';
import StyledGear from '../gear/StyledGear';
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

    label{
        color: rgb(98, 104, 52);
        font-weight: 700;
        font-size: 1em;
        text-align: left;
    }

    button {
        background-color: rgb(148, 72, 26);
        border: 1px solid white;
        width: 4em;
        height: 1.5em;
        margin: .5em;
        padding: 0;
    }

    button:hover {
        color: white;
        background-color:  rgb(118, 124, 61); 
        border: 1px solid rgb(148, 72, 26);
    }


    .my-trip-details{
        background-color: rgba(255, 255, 255, .7); 
        padding:  2em;
        border-radius: .6em;
        margin-top: 6em;
        width: 75em;
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
        grid-template-columns: .1fr .1fr .4fr .1fr .05fr .15fr .15fr;
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
        width: 4em;
        
    }

    #checklist-add-button{
        grid-column-start: 1;
        grid-column-end: 8;
        margin: 1em 0;
        width: 12em;
    }


    .gear {
        grid-column-start: 3;
        grid-column-end:  span 2;
        /* background-color: rgba(255, 255, 255, .4);
        width: 35em; */
    }

    .campsite-location{
        color: rgb(148, 72, 26);
        text-decoration: none;
    }

    .campsite-location:hover{
        color: rgb(92, 162, 200);
    }
`
class TripDetails extends Component {
    state = {
        trip: {},
        popupActive: false,
        editTrip: {},
        redirect: false,
        campsite: null
    }

    async componentDidMount() {
        await this.refreshPage()
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

    refreshPage = async () => {
        let tripId = this.props.match.params.id
        let trip = await tripClient.get(tripId)
        let campsite = await campsiteClient.get(trip.campsite)
        
        console.log(trip)
        this.setState({ trip: trip, campsite: campsite, checklist: trip.checklist })
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
                            <h3>Location: <Link className="campsite-location" to={`/campsites/${this.state.trip.campsite}`}>{this.state.campsite.name}</Link></h3>
                            <h3>Number of Campers: {this.state.trip.campers}</h3>
                            <h3>Start-Date: {this.state.trip.start_date}</h3>
                            <h3>End-Date: {this.state.trip.end_date}</h3>
                            <button className="btn btn-primary" onClick={() => this.editTrip(this.state.trip)}>Edit</button>
                            <button className="btn btn-primary" onClick={() => this.deleteTrip(this.state.trip.id)}>Delete</button>
                            {this.state.popupActive && <EditTripComponent onSave={this.saveTrip} trip={this.state.editTrip} />}
                        </div>
                        <Checklist value={this.state.checklist} 
                            onChecklistItemRemove={this.refreshPage} 
                            onChecklistItemAdded={this.refreshPage}
                            tripId={this.state.trip.id} />
                        <div className="gear">
                            <StyledGear />
                        </div>
                    </div>
                    }
                </div>
            </MyTripWrapper>
        )
    }
}



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
        await checklistItemClient.create(this.state.newChecklistItem)
        this.setState(({popupActive: false}))
        this.props.onChecklistItemAdded()
    }

    removeChecklistItem = async (checklistId) => {
        await checklistItemClient.delete(checklistId)
        this.props.onChecklistItemRemove()
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
                    {this.props.value.map(checklistItem => (
                        <CheckListItem key={checklistItem.id} item={checklistItem} onRemove={this.removeChecklistItem} />
                    ))}


                    <button id="checklist-add-button" className="btn btn-primary" onClick={() => this.setState({ popupActive: true })}>Add Checklist Item</button>

                    {this.state.popupActive &&
                        <React.Fragment>
                            <div />
                            <label>Item </label><input type="text" name="camping_item" value={this.state.newChecklistItem.camping_item} onChange={this.onNewChecklistItemChange} />
                            <label>Quantity</label><input type="number" name="quantity" value={this.state.newChecklistItem.quantity} onChange={this.onNewChecklistItemChange} />
                            <button className="btn btn-primary" onClick={this.addChecklistItem}>Save</button>
                            <div />
                        </React.Fragment>
                    }
                </div>
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
                        <button className="btn btn-primary" onClick={this.saveChecklist}>Save</button>
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
                        <button className="btn btn-primary" onClick={() => this.editChecklist(this.state.checklistItem)}>Edit</button>
                        <button className="btn btn-primary" onClick={() => this.props.onRemove(this.state.checklistItem.id)}>Delete</button>
                    </React.Fragment>

                }
            </React.Fragment>

        )
    }
}


export default TripDetails