import React, { Component } from 'react';
import styled from 'styled-components'
import gearClient from '../../clients/gearClient';



const StyledGear = styled.div`
    .gear-grid {
        display: grid;
        grid-template-columns: 1fr .4fr .2fr .2fr;
        justify-items: start;
        align-items: start; 
        grid-gap: .1em;
        /* width: 30em; */
    }

    .edit-gear-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .edit-gear-grid button {
        justify-self: center;
        grid-column-start: 2;
    }

    label{
            color: rgb(98, 104, 52);
            font-weight: 700;
            font-size: 1.1em;
            text-align: left;
    }

    button {
        background-color: rgb(148, 72, 26);
        color: white;
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

    .add-gear{
        width: 6em;
    }
`

class StyledGearComponent extends Component {
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
        if (gearItem.id === '') {
            await gearClient.create(gearItem)
        } else {
            await gearClient.update(gearItem)
        }
        let gear = await gearClient.getAll()
        this.setState({ popupActive: false, gear: gear })
    }

    deleteGearItem = async (gearId) => {
        await gearClient.delete(gearId)
        let gear = await gearClient.getAll()
        this.setState({ gear: gear })

    }

    render() {
        return (
            <StyledGear>
            <div className="gear">
                <div className="gear-container">
                <h1>Gear</h1>
                <div className='gear-grid'>
                    {this.state.gear.map(singleGear => (
                        <React.Fragment key={singleGear.id}>
                            <label>{singleGear.name}: {singleGear.description}</label>
                            <label>Quantity: {singleGear.quantity}</label>
                            <button className="btn btn-primary" onClick={() => this.editGearItem(singleGear)}>Edit</button>
                            <button className="btn btn-primary" onClick={() => this.deleteGearItem(singleGear.id)}>Delete</button>
                        </React.Fragment>
                    ))}
                </div>
                <button className="btn btn-primary add-gear" onClick={() => this.editGearItem({ id: '', name: '', description: '', quantity: 1 })}>Add Gear</button>
                </div>
                {this.state.popupActive && <EditGearComponent onSave={this.saveGearItem} gearItem={this.state.editGearItem} />}
            </div>
            </StyledGear>
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
                <form className="edit-gear-grid" onSubmit={(event) => this.props.onSave(event, this.state.gearItem)}>
                    <input type="hidden" name="id" value={this.state.gearItem.id} onChange={this.onGearItemChange} />
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


export default StyledGearComponent