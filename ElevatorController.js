'use strict';

let Constants = require('./Constants');
let Elevator = require('./Elevator');

class ElevatorController
{
    constructor(min_floor, max_floor, total_elevators, floors_before_maintenance) {
        this._minFloor = min_floor;
        this._maxFloor = max_floor;
        this._totalElevators = total_elevators;
        this._floors_before_maintenance;
        
        this._Elevators = this.initializeElevators(this._totalElevators);

        this.initializeListeners();
    }

    assignRequest(floor) {
        
    }

    getClosestElevator(floor) {

    }

    initializeElevators(totalElevators) {
        //create the new Elevator objects here
    }

    initializeListeners() {
        //set up the listeners for all the Elevator object events
    }
}

module.exports = ElevatorController;
let e = new Elevator();
e.on('doorOpen', () => console.log("door was opened"));

e.answerCall(5);
console.log(e._currentFloor);
e.answerCall(2);
console.log(e._currentFloor);
e.answerCall(6);
console.log(e._currentFloor);
console.log(e._numberOfTrips);