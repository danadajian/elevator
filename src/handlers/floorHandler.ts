export const floorHandler = (floor: number, nextFloors: number[], setFloor: (floor: number) => void, setNextFloors: (nextFloors: number[]) => void) => {
    if (nextFloors.includes(floor)) {
        const newNextFloors = [...nextFloors];
        newNextFloors.splice(newNextFloors.indexOf(floor), 1);
        setNextFloors(newNextFloors);
    } else if (floor < nextFloors[0])
        setFloor(floor + 1)
    else if (floor > nextFloors[0])
        setFloor(floor - 1)
}