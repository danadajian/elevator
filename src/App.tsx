import React, {useEffect, useState} from 'react';
import elevatorOpen from './elevator-open.jpg';
import elevatorClosed from './elevator-closed.jpg';
import './App.css';
import {MS_PER_FLOOR, NUMBER_OF_FLOORS} from "./constants";
import * as _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {floorHandler} from "./handlers/floorHandler";

function App() {

    let [floor, setFloor] = useState(1);
    const initialFloorsState: number[] = [];
    let [nextFloors, setNextFloors] = useState(initialFloorsState);

    useEffect(() => {
        const floorLoop = setTimeout(() => floorHandler(floor, nextFloors, setFloor, setNextFloors), MS_PER_FLOOR);
        return () => clearTimeout(floorLoop);
    });

    const nextFloorHandler = (nextFloor: number) => {
        setNextFloors(nextFloors.concat(nextFloor));
    }

    const floorButtons =
        <ButtonGroup>
            {_.range(NUMBER_OF_FLOORS).map(num => <Button key={num + 1}
                                                          variant="outline-info"
                                                          active={nextFloors.includes(num + 1)}
                                                          onClick={() => nextFloorHandler(num + 1)}>{num + 1}</Button>)}
        </ButtonGroup>;

    const elevatorImage = nextFloors.includes(floor) ? elevatorOpen : elevatorClosed;

    return (
        <div className="App">
            <header className="App-header">
                <h1>Elevator</h1>
                <section className="Request-elevator">
                    <h3>Request Elevator to Floor:</h3>
                    {floorButtons}
                </section>
                <h3 className="Floor">{floor}</h3>
                <img src={elevatorImage} alt="elevator"/>
                {nextFloors.includes(floor) && <h4>You have reached your requested floor!</h4>}
            </header>
        </div>
    );
}

export default App;
