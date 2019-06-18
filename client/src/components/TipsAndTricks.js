import React, { Component } from 'react';
import styled from 'styled-components';

const TipsAndTricksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Anonymous Pro', monospace;
    

        .tips-and-tricks-container{
            /* display: flex;
            flex-direction: column; */
            background-color: rgba(255, 255, 255, .7);
            padding:  1em;
            margin-top: 4em;
            border-radius: .6em;
            width: 50em;
        }
    

        h1{
            font-size: 3em;
            color: rgb(148, 72, 26);
            font-weight: 700;
        }
        ol{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: left;
            }
        li{
            font-size: 1em;
            font-weight: 700;
            color: rgb(98, 104, 52);
            font-weight: 700;
            font-size: 1.5em;
            text-align: left;
        }

        
    `

class TipsAndTricks extends Component{
    render(){
        return(
            <TipsAndTricksWrapper>
                <div className="tips-and-tricks-container">
                <h1>Tips and Tricks</h1>
                    <ol>
                        <li>Warm your sleeping bag with a Nalgene filled with warm water</li>
                        <li>Line your pack with a heavy-duty garbage bag to keep things dry</li>
                        <li>Keep one pair of your socks safe, you will be thankful later for clean, dry socks!!</li>
                        <li>Bring your spices in sealed straws or tick tac containers</li>
                        <li>Store your scrambled eggs in a bottle to save yourself the mess of cracking and potentially breaking your eggs</li>
                    </ol>
                    </div>
            </TipsAndTricksWrapper>
        )
    }
}

export default TipsAndTricks