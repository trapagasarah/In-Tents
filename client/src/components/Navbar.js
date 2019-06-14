import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavbarWrapper = styled.div`
  font-family: 'Anonymous Pro', monospace;
    margin: 2em 0;
    font-size: 1em;
    display: grid;

      ul {
          display: flex;
          text-decoration: none;
          justify-content: center;
          align-items: space-evenly;
          align-content: space-evenly;
          width: 100vw;
        }

    a {
          text-decoration: none;
          display: flex;
          justify-content: space-evenly;
          width: 12em;
          color: rgb(187, 200, 147); 
          font-size: 1.5em; 
          font-weight: 700;
    }
    a:hover {
      color: white;
    }
`


class Navbar extends Component {
    render() {
      return (
        <NavbarWrapper>
          <ul className="nav justify-content-center">
            <li className="nav-item"><Link as="a" className="nav-link active" to='/tipsandtricks/'>Tips And Tricks</Link></li>
            <li className="nav-item"><Link as="a" className="nav-link active" to='/trips/'>My Trips</Link></li>
            <li className="nav-item"><Link as="a" className="nav-link active" to='/campsites/'>Find a Campsite</Link></li>
            <li className="nav-item"><Link as="a" className="nav-link active" to='/gear/'>My Gear</Link></li>
            <li className="nav-item"><Link as="a" className="nav-link active" to='/newtrip/'>Plan a Trip</Link></li>
          </ul>
        </NavbarWrapper>
      )
    }
  }

  export default Navbar