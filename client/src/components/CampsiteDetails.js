import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import campsiteClient from '../clients/campsiteClient'

class CampsiteDetails extends Component{
    state = {
        campsite: {},
    }

    async componentDidMount(){
        let campsiteId = this.props.match.params.id
        let campsite = await campsiteClient.get(campsiteId)
        this.setState({campsite: campsite})
        }

    render(){
        return(
            <div>
                <h1>Campsite Details</h1>
                {this.state.campsite.id && <div>
                    <h3>Name: {this.state.campsite.name}</h3>
                    <h3>Location: {this.state.campsite.location} </h3>
                    <h3>Description: {this.state.campsite.description} </h3>
                </div>}
            </div>
        )
    }
}

export default CampsiteDetails