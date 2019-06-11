import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import campsiteClient from '../clients/campsiteClient';

class Campsites extends Component {
    state = {
        campsites: [],
        popupActive: false,
        editCampsite: {}
    }
    
    async componentDidMount() {
        let campsites = await campsiteClient.getAll()
        this.setState({ campsites: campsites })
    }

    editCampsite = (campsite) => {
        this.setState({popupActive: true, editCampsite: campsite})
    }

    saveCampsite = async (event, campsite) => {
        event.preventDefault();
        if(campsite.id === ''){
            await campsiteClient.create(campsite)
        } else {
            await campsiteClient.update(campsite)
        }
        let campsites= await campsiteClient.getAll()
        this.setState({popupActive: false, campsites: campsites})
    }

    deleteCampsite = async (campsiteId) => {
        await campsiteClient.delete(campsiteId)
        let campsites = await campsiteClient.getAll()
        this.setState({ campsites: campsites })
    }

    

    
    render() {
        return (
            <div>
                <h1>Favorite Campsites</h1>
                <ul>
                    {this.state.campsites.map(singleCampsite => (
                        <li key={singleCampsite.id}>
                            {singleCampsite.name}
                            <button onClick={() => this.editCampsite(singleCampsite)}>Edit</button>
                            <button onClick={() => this.deleteCampsite(singleCampsite.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <button onClick={() => this.editCampsite({id: '', name: '', description: '', location: '', campsite_type: ''})}>Add a Campsite</button>
                {this.state.popupActive && <EditCampsiteComponent onSave={this.saveCampsite} campsite={this.state.editCampsite}/>}
            </div>
        )
    }
}

class EditCampsiteComponent extends Component{
    constructor(props){
        super(props);
        this.state = {campsite: props.campsite}
    }

    onCampsiteChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            campsite: {
                ...prevState.campsite,
                [name]: value
            }
        }))
    }

    render (){
        return (
            <div>
                <form onSubmit={(event) => this.props.onSave(event, this.state.campsite)}>
                    <input type="hidden" name="id" value={this.state.campsite.id} onChange={this.onCampsiteChange} />
                    <label>Campsite</label>
                    <input type="text" name="name" value={this.state.campsite.name} onChange={this.onCampsiteChange}/>
                    <label>Location</label>
                    <input type="text" name="location" value={this.state.campsite.location} onChange={this.onCampsiteChange} />
                    <label>Type</label>
                    <input type="text" name="campsite_type" value={this.state.campsite.campsite_type} onChange={this.onCampsiteChange} />
                    <label>Description</label>
                    <input type="text" name="description" value={this.state.campsite.description} onChange={this.onCampsiteChange} />
                    <label>Campsite API Id</label>
                    <input type="text" name="campsiteAPI_id" value={this.state.campsite.campsiteAPI_id} onChange={this.onCampsiteChange} />
                    <button>Save</button>
                </form>
            </div>
        )
    }
}

export default Campsites