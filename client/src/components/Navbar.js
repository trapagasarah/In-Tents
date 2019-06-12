import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
      return (
        <div>
          <ul className="nav justify-content-center">
            <li className="nav-item"><Link as="a" className="nav-link active" to='/tipsandtricks/'>Tips And Tricks</Link></li>
            <li className="nav-item"><Link as="a" className="nav-link active" to='/trips/'>My Trips</Link></li>
            <li className="nav-item"><Link as="a" className="nav-link active" to='/campsites/'>Find a Campsite</Link></li>
            <li className="nav-item"><Link as="a" className="nav-link active" to='/gear/'>My Gear</Link></li>
          </ul>
        </div>
      )
    }
  }

  export default Navbar