import React, { Component } from "react";
import styled from 'styled-components'

const HomeWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35em;
    font-family: 'Anonymous Pro', monospace;
    


    h1{
        color: rgb(148, 72, 26);
        background-color: rgba(179, 226, 251, .6);
        border-radius: .2em; 
        font-size: 3em;
        font-weight: 700;
        position: fixed;
        
    }
`

class Home extends Component{
    render(){
        return(
            <HomeWrapper>
                <h1>In-Tents Camping</h1>
            </HomeWrapper>
        )
    }
}

export default Home
