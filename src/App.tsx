import React, {useEffect, useState} from 'react';
import elevatorOpen from './elevator-open.jpg';
import elevatorClosed from './elevator-closed.jpg';
import './App.css';
import {NUMBER_OF_FLOORS} from "./constants";
import * as _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function App() {
    const generateNextFloor = (currentFloor: number) => {
        let nextFloor = currentFloor;
        while (nextFloor === currentFloor)
            nextFloor = Math.floor(Math.random() * NUMBER_OF_FLOORS) + 1;
        return nextFloor;
    }

    let [floor, setFloor] = useState(1);
    let [nextFloor, setNextFloor] = useState(generateNextFloor(floor));

    const floorHandler = () => {
        if (floor === nextFloor)
            setNextFloor(generateNextFloor(floor))
        else if (floor < nextFloor)
            setFloor(floor + 1)
        else
            setFloor(floor - 1)
    }

    useEffect(() => {
        const floorLoop = setTimeout(() => floorHandler(), 1000);
        return () => clearTimeout(floorLoop)
    });

    const floorButtons =
        <ButtonGroup>
        {_.range(NUMBER_OF_FLOORS).map(num => <Button variant="outline-info"
                                                      active={nextFloor === num + 1}
                                                      onClick={() => setNextFloor(num + 1)}>{num + 1}</Button>)}
        </ButtonGroup>;
    const elevator = floor === nextFloor ? elevatorOpen : elevatorClosed;

    return (
        <div className="App">
            <header className="App-header">
                <h1>Elevator</h1>
                <div className="Request-elevator">
                    <h3>Request Elevator to Floor:</h3>
                    {floorButtons}
                </div>
                <h3 className="Floor">{floor}</h3>
                <img src={elevator} alt="elevator"/>
            </header>
        </div>
    );
}

export default App;
