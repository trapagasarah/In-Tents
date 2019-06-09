import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import campsiteClient from '../campsiteClient';

class Campsites extends Component {
    state = {
        campsites: [],
    }
    async componentDidMount() {
        let campsites = await campsiteClient.getAll()
        this.setState({ campsites: campsites })
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
                            <button onClick={() => this.deleteCampsite(singleCampsite.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Campsites