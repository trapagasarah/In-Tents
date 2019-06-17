import React, {Component} from 'react'
import styled from 'styled-components'

const EditTripWrapper = styled.div`
    form {
        display: grid;
        grid-gap: .5em;
        justify-self: center;
        grid-template-columns: 3fr 3fr;
    }

    form label {
        justify-self: end; 
    }

    form button {
        grid-column-start: 1;
        grid-column-end:  3;
        justify-self: center; 
    }
`
class EditTripComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { trip: props.trip }
    }

    onTripChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            trip: {
                ...prevState.trip,
                [name]: value
            }
        }))
    }

    render() {
        return (
            <EditTripWrapper>
                <form onSubmit={(event) => this.props.onSave(event, this.state.trip)}>
                    {/* <input type="hidden" name="id" value={this.state.trip.id} onChange={this.onTripChange} /> */}

                    <label htmlFor="trip-name-input">Name:</label>
                    <input id="trip-name-input" type="text" name="name" value={this.state.trip.name} onChange={this.onTripChange} />

                    <label htmlFor="trip-campers-input">Number of Campers:</label>
                    <input id="trip-campers-input" type="number" name="campers" value={this.state.trip.campers} onChange={this.onTripChange} />

                    <label htmlFor="trip-start-date-inupt">Start-Date:</label>
                    <input id="trip-start-date-inupt" type="date" name="start_date" value={this.state.trip.start_date} onChange={this.onTripChange} />

                    <label htmlFor="trip-end-date-input">End-Date: </label>
                    <input id="trip-end-date-input" type="date" name="end_date" value={this.state.trip.end_date} onChange={this.onTripChange} />
                    <button>Save</button>
                </form>
            </EditTripWrapper>
        )
    }
}

export default EditTripComponent