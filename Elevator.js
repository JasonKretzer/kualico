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
    
}

util.inherits(Elevator, events.EventEmitter);
module.exports = Elevator;