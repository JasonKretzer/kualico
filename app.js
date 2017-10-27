let ElevatorController = require('./ElevatorController');
let Constants = require('./Constants');

let controller = new ElevatorController(
    Constants.MIN_FLOOR,
    Constants.MAX_FLOOR,
    Constants.TOTAL_ELEVATORS,
    Constants.FLOORS_BEFORE_MAINTENANCE
);

