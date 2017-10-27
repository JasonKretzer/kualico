'use strict';

let Constants = require('./Constants');
let Elevator = require('./Elevator');

class ElevatorController
{
    constructor(min_floor, max_floor, total_elevators, floors_before_maintenance) {
        this._minFloor = min_floor;
        this._maxFloor = max_floor;
        this._totalElevators = total_elevators;
        this._floorsBeforeMaintenance = floors_before_maintenance;
        
        this._Elevators = this.initializeElevators(this._totalElevators);

        this.initializeListeners();
    }

    assignRequest(floor) {
        //this is what would be used to assign to a specific elevator
        let closestElevator = this.getClosestElevator(floor);
        this._Elevators[closestElevator].answerCall(floor);
    }

    getClosestElevator(floor) {
        for(let i=0; i<this._Elevators.length; i++) {
            if(this._Elevators[i].getCurrentFloor() == floor) {
                return i;
            } else {
                //out of time, implement the rest of the logic
            }
        }
    }

    maintainElevators() {
        for(let i=0; i<this._Elevators.length; i++) {
            if(this._Elevators[i].getTrips() >= this._floorsBeforeMaintenance && !this._Elevators[i].isDownForMaintenance()) {
                this._Elevators[i].putIntoMaintenanceMode();
            } else {
                //do something                
            }
        }
    }

    initializeElevators(totalElevators) {
        //create the new Elevator objects here
        let newElevators = [];
        for(let i=0; i<totalElevators; i++) {
            newElevators.push(new Elevator(this._minFloor, this._maxFloor));
        }
        return newElevators;
    }

    initializeListeners() {
        //set up the listeners for all the Elevator object events
        this._Elevators.forEach((elevator) => {
            elevator.on('stopped', () => {
                console.log('elevator stopped');
            });

            elevator.on('doorOpened', () => {
                console.log('elevator door opened');
            });

            elevator.on('doorClosed', () => {
                console.log('elevator door closed');
            });

            elevator.on('arrivedAtFloor', (floor) => {
                console.log('elevator arrived at floor: '+floor);
            });

            elevator.on('floorOutOfRange', () => {
                console.log('requested floor must be between '+this._minFloor+ ' and ' +this._maxFloor);
            });

        });
    }
}

module.exports = ElevatorController;