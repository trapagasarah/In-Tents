import React, { Component } from 'react';
import styled from 'styled-components';
import gearClient from '../clients/gearClient';

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

    saveGearItem = async (event, gearItem) => {
        event.preventDefault();
        if(gearItem.id === ''){
            await gearClient.create(gearItem)
        } else {
            await gearClient.update(gearItem)
        }
        let gear =  await gearClient.getAll()
        this.setState({ popupActive: false, gear: gear })
    }

    deleteGearItem =  async (gearId) => {
        await gearClient.delete(gearId)
        let gear =  await gearClient.getAll()
        this.setState({gear: gear })
        
    }

    render() {
        return (
            <div>
                <h1>Gear</h1>
                <ul>
                    {this.state.gear.map(singleGear => (
                        <li key={singleGear.id}>
                            {singleGear.name}: {singleGear.description} 
                            Quantity: {singleGear.quantity}
                            <button onClick={() => this.editGearItem(singleGear)}>Edit</button>
                            <button onClick={() => this.deleteGearItem(singleGear.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <button onClick={() => this.editGearItem({id:'', name: '', description: '', quantity: 1})}>Add Gear</button>
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
                <form onSubmit={(event) => this.props.onSave(event, this.state.gearItem)}>
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