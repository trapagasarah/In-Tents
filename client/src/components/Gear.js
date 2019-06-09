import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import gearClient from '../util';

class Gear extends Component {
    state = {
        gear: [],
        popupActive: false,
        editGearItem: {}

    }

    async componentDidMount() {
        let gear = await gearClient.getAll()
        this.setState({ gear: gear })
    }

    editGearItem = (singleGear) => {
        this.setState({ popupActive: true, editGearItem: singleGear })
    }

    saveGearItem = (event) => {
        event.preventDefault();
        this.setState({ popupActive: false })
    }

    render() {
        return (
            <div>
                <h1>Gear</h1>
                <ul>
                    {this.state.gear.map(singleGear => (
                        <li key={singleGear.id}>
                            {singleGear.name}
                            <button onClick={() => this.editGearItem(singleGear)}>Edit</button>
                        </li>
                    ))}
                </ul>
                {this.state.popupActive && <EditGearComponent onSave={this.saveGearItem} gearItem={this.state.editGearItem} />}
            </div>
        )
    }
}

class EditGearComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { gearItem: props.gearItem }
    }

    onGearItemChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            gearItem: {
                ...prevState.gearItem,
                [name]: value
            }
        }))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.onSave}>
                    <input type="hidden" name="id" value={this.state.gearItem.id} onChange={this.onGearItemChange}/>
                    <label>Name</label>
                    <input type="text" name="name" value={this.state.gearItem.name} onChange={this.onGearItemChange} />
                    <label>Description</label>
                    <input type="text" name="description" value={this.state.gearItem.description} onChange={this.onGearItemChange} />
                    <label>Quantity</label>
                    <input type="number" name="quantity" value={this.state.gearItem.quantity} onChange={this.onGearItemChange} />
                    <button>Save</button>
                </form>
            </div>
        )
    }
}
export default Gear