import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import campsiteClient from '../../clients/campsiteClient'

const CampsiteDetailsWrapper = styled.div`
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

    .details{
        
        background-color: rgba(255, 255, 255, .7); 
        padding:  2em;
        border-radius: .6em;
        position: fixed;
        margin-top: 16em;
    }
    
  

    button {
        background-color: rgb(148, 72, 26);
        border: 1px solid white;
        width: 10em;
        height: 1.5em;
        margin: .5em;
        padding: 0;
    }

    button:hover {
        color: white;
        background-color:  rgb(118, 124, 61); 
        border: 1px solid rgb(148, 72, 26);
    }
    `

class CampsiteDetails extends Component {
    state = {
        campsite: {},
    }

    async componentDidMount() {
        let campsiteId = this.props.match.params.id
        let campsite = await campsiteClient.get(campsiteId)
        this.setState({ campsite: campsite })
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <CampsiteDetailsWrapper>
                <div class="details">
                    <h1>Campsite Details</h1>
                    {this.state.campsite.id && <div>
                        <h3>Name: {this.state.campsite.name}</h3>
                        <h3>Location: {this.state.campsite.location} </h3>
                        <h3>Notes: {this.state.campsite.description} </h3>
                        <button className="btn btn-primary" onClick={() => this.props.history.goBack()}>Back</button>
                        <Link to={`/newtrip?campsite=${this.state.campsite.id}`}><button className="btn btn-primary">Plan a Trip</button></Link>
                    </div>}
                </div>
            </CampsiteDetailsWrapper>
        )
    }
}

export default CampsiteDetails