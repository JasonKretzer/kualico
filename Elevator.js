'use strict';

let Constants = require('./Constants');
let events = require('events');
let util = require('util');


class Elevator 
{
    constructor(min_floor, max_floor) {
        this._minFloor = min_floor;
        this._maxFloor = max_floor;
        this._moving = false;
        this._doorOpen = false;
        this._occupied = false;
        this._maintenanceMode = false;
        this._numberOfTrips = 0;
        this._currentFloor = 1;
        this._destinationQueue = [];
    }

    isMoving() {
        return this._moving;
    }

    isStopped() {
        return !this._moving;
    }

    stopElevator() {
        this._moving = false;
        this.emit('stopped');
    }
    
    openDoor() {
        if(this.isMoving()) {
            this.stopElevator();
        }
        this._doorOpen = true;
        this.emit('doorOpened');
    }

    isDoorOpen() {
        return this._doorOpen;
    }

    isDoorClosed() {
        return !this._doorOpen;
    }

    closeDoor() {
        this._doorOpen = false;
        this.emit('doorClosed');
    }
    
    //this will go directly to any floor without checking to stop
    goDirectlyToFloor(floor,isEmergency) {
        if(!this.checkFloor(floor)) {
            return false;
        }
        if(this.isDoorOpen()) {
            this.closeDoor();
        }
        if(this._currentFloor < floor) {
            this._currentFloor++;
            this.goDirectlyToFloor(floor, false);
        } else if(this._currentFloor > floor) {
            this._currentFloor--;
            this.goDirectlyToFloor(floor, false);
        } else {
            //arrived at floor
            if(isEmergency) {
                this.emit('arrivedAtFloor', (floor));
            }
            return true;
        }
    }

    //removes the floor from the destination queue
    removeFloorFromDestinations(floor) {
        if(this._destinationQueue.includes(floor)) {
            this._destinationQueue.splice(this._destinationQueue.indexOf(floor),1);
        }
        this._numberOfTrips++;
    }

    //going to a floor with checking the destination queue in between floors
    gotoFloor(floor) {
        if(!this.checkFloor(floor)) {
            return false;
        }
        if(this._currentFloor < floor) {
            this.goDirectlyToFloor(this._currentFloor+1,false);
            this.gotoFloor(floor);
        } else if(this._currentFloor > floor) {
            this.goDirectlyToFloor(this._currentFloor-1,false);
            this.gotoFloor(floor);
        } else {
            this.emit('arrivedAtFloor', (floor));
            return true;
        }
    }

    checkFloor(floor) {
        if(floor < this._minFloor || floor > this._maxFloor) {
            this.emit('floorOutOfRange');
            return false;
        }
        return true;
    }
    answerCall(floor) {
        if(!this._destinationQueue.includes(floor)) {
            this._destinationQueue.push(floor);
        }        
        this.gotoFloor(floor);
        this.stopElevator();
        this.openDoor();
        //wait for a few seconds -- not implemented
        this.closeDoor();
        this.removeFloorFromDestinations(this._currentFloor);
    }
}

util.inherits(Elevator, events.EventEmitter);
module.exports = Elevator;