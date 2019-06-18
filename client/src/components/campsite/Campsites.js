import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import campsiteClient from '../../clients/campsiteClient';
import GoogleMapReact from 'google-map-react';
import placesClient from '../../clients/placesClient';

const CampsiteListWrapper = styled.div`
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
        ul{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            }
        li{
            display: flex;
            font-size: 2em;
            font-weight: 700;
            
        }

        label{
            font-size: 1.5em;
            font-weight: 700;
            margin-top: 4em;
            /* margin-bottom: 1em; */
            margin-left: 1em;
            color: rgb(219, 126, 69);
            font-weight: 700;
        }
        
        .campsite-names{
            text-decoration: none;
            color: rgb(98, 104, 52);
            font-weight: 700;
            font-size: 1.5em;
            text-align: left;
        }

        .campsite-names:hover{
            color: rgb(219, 126, 69);

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

    form{
        margin-bottom: 1em;
    }

    .add-campsite{
        width: 10em;
        margin-bottom: 1em;
    }

    .new-campsite-form{
        margin-bottom: .75em;
        background-color:  rgb(118, 124, 61);
        
    }

    .new-campsite-form:hover{
        background-color: rgb(148, 72, 26);
        color: white;
        border: 1px solid rgb(144, 178, 93);
        
    }
    
    .find-a-campsite{
        display: flex;
        justify-content: space-evenly;
        margin: 0;
        margin-bottom: 3em;
        background-color:  rgba(255, 255, 255, .7);
        border-radius: .6em;
                 
    }

    .nearby-campistes{
        /* width: 10em; */
        margin: 0;
    }

    .campsite-buttons{
        width: 20em;
        font-size: 1.1em;
        line-height: 1em;
        font-weight: 700;
        margin-left: 3em;
        background: none;
        color: rgb(118, 124, 61);
        border: none;
        padding: 0!important;
        cursor: pointer;
        text-align: left;


        
    }

    .campsite-buttons:hover{
        border: none;
        background: none;
        color: rgb(219, 126, 69);
    }

    .campsites-container {
        display: grid;
        grid-template-columns: 1fr auto auto;
    }

    .my-campsites{
        background-color: rgba(255, 255, 255, .7);
        padding:  1em;
        margin-top: 4em;
        border-radius: .6em;
    }

    
    
    
   

        
`

class Campsites extends Component {
    state = {
        campsites: [],
        popupActive: false,
        editCampsite: {},
        redirectToCampsite: null
    }

    async componentDidMount() {
        let campsites = await campsiteClient.getAll()
        this.setState({ campsites: campsites })
    }

    editCampsite = (campsite) => {
        this.setState({ popupActive: true, editCampsite: campsite })
    }

    saveCampsite = async (event, campsite) => {
        event.preventDefault();
        let redirectCampsite
        if (campsite.id === '') {
            redirectCampsite = await campsiteClient.create(campsite)
        } else {
            redirectCampsite = await campsiteClient.update(campsite)
        }
        let campsites = await campsiteClient.getAll()
        this.setState({ popupActive: false, campsites: campsites, redirectToCampsite: redirectCampsite.id })
    }

    deleteCampsite = async (campsiteId) => {
        await campsiteClient.delete(campsiteId)
        let campsites = await campsiteClient.getAll()
        this.setState({ campsites: campsites })
    }




    render() {
        return (
            <CampsiteListWrapper>
                {this.state.redirectToCampsite && <Redirect to={`/campsites/${this.state.redirectToCampsite}`} />}
                <div class="my-campsites">
                    <h1>Bookmarked Campsites</h1>
                    <div className='campsites-container'>
                        {this.state.campsites.map(singleCampsite => (
                            <React.Fragment key={singleCampsite.id}>
                                <Link class="campsite-names" to={`/campsites/${singleCampsite.id}`}>{singleCampsite.name}</Link>
                                <a href="#edit-campsite-form"><button class="btn btn-primary" onClick={() => this.editCampsite(singleCampsite)}>Edit</button></a>
                                <button class="btn btn-primary" onClick={() => this.deleteCampsite(singleCampsite.id)}>Delete</button>
                            </React.Fragment>
                        ))}
                    </div>

                    <a href="#edit-campsite-form"><button className="btn btn-primary add-campsite" href="#map-viewer" onClick={() => this.editCampsite({ id: '', name: '', description: '', location: '', campsite_type: '' })}>Add a Campsite</button></a>
                </div>
                {this.state.popupActive && <EditCampsiteComponent onSave={this.saveCampsite} campsite={this.state.editCampsite} />}
            </CampsiteListWrapper>
        )
    }
}

class EditCampsiteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { campsite: props.campsite }
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

    onPlaceSelect = (place) => {
        this.setState(prevState => ({
            campsite: {
                ...prevState.campsite,
                name: place.name,
                location: place.formatted_address
            }
        }))
    }



    render() {
        return (
            <div id="edit-campsite-form" >
                <form onSubmit={(event) => this.props.onSave(event, this.state.campsite)}>
                    <input type="hidden" name="id" value={this.state.campsite.id} onChange={this.onCampsiteChange} />
                    <label>Campsite:</label>
                    <input type="text" name="name" value={this.state.campsite.name} onChange={this.onCampsiteChange} />
                    <label>Location:</label>
                    <input type="text" name="location" value={this.state.campsite.location} onChange={this.onCampsiteChange} />
                    <label>Notes:</label>
                    <input type="text" name="description" value={this.state.campsite.description} onChange={this.onCampsiteChange} />
                    <button className="btn btn-primary new-campsite-form">Save</button>
                </form>
                <MapViewer onSelect={this.onPlaceSelect} />
            </div >
        )
    }
}



const initialLocation = { lat: 40, lng: -100 }

class MapViewer extends Component {
    state = {
        places: []
    }

    async componentDidMount() {
        let places = await placesClient.findPlacesNear(initialLocation)
        this.setState({ places: places })
    }
    onMapClick = async (event) => {
        console.log(event)
        let places = await placesClient.findPlacesNear({ lat: event.lat, lng: event.lng })
        console.log(places)
        this.setState({ places: places })
    }

    render() {
        return (
            <div class="find-a-campsite" style={{ height: '45em', width: '70em' }}>

                <GoogleMapReact
                    onClick={this.onMapClick}
                    bootstrapURLKeys={{ key: process.env.REACT_APP_IN_TENTS_GOOGLE_TOKEN }}
                    defaultCenter={initialLocation}
                    defaultZoom={4}>
                </GoogleMapReact>

                <div>
                    {this.state.places.map(place => (
                        <div class="nearby-campsites" key={place.place_id}>
                            <a href="#edit-campsite-form"><button class="campsite-buttons" key={place.id} onClick={() => this.props.onSelect(place)}>{place.name}</button></a>
                        </div>))
                    }
                </div>


            </div>)
    }
}

export default Campsites