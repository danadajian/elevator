import {floorHandler} from "./floorHandler";

const setFloor = jest.fn();
const setNextFloors = jest.fn();

describe('floorHandler', () => {
    describe('higher floor case', () => {
        let result: any;
        beforeEach(() => {
            result = floorHandler(3, [6], setFloor, setNextFloors);
        })

        it('should go toward next floor', () => {
            expect(setFloor).toHaveBeenCalledWith(4)
        });
    })

    describe('lower floor case', () => {
        let result: any;
        beforeEach(() => {
            result = floorHandler(6, [3], setFloor, setNextFloors);
        })

        it('should go toward next floor', () => {
            expect(setFloor).toHaveBeenCalledWith(5)
        });
    })

    describe('equal floor case', () => {
        let result: any;
        beforeEach(() => {
            result = floorHandler(5, [5], setFloor, setNextFloors);
        })

        it('should be no next floors', () => {
            expect(setNextFloors).toHaveBeenCalledWith([])
        });
    })

    describe('equal floor case multiple next floors', () => {
        let result: any;
        beforeEach(() => {
            result = floorHandler(5, [9, 5, 2], setFloor, setNextFloors);
        })

        it('should remove current floor', () => {
            expect(setNextFloors).toHaveBeenCalledWith([9, 2])
        });
    })

    describe('no next floors', () => {
        let result: any;
        beforeEach(() => {
            result = floorHandler(5, [], setFloor, setNextFloors);
        })

        it('should do nothing', () => {
            expect(setFloor).not.toHaveBeenCalled();
            expect(setNextFloors).not.toHaveBeenCalled();
        });
    })

    afterEach(() => {
        jest.clearAllMocks();
    })
})