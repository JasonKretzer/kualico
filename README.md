This file will be a running dialog of this development.   I will mark in the document roughly where I performed commits.

COMMIT #1 HERE

First thoughts:
For fun, I will use ES6 class syntax to see if it makes this easier.  I do worry though that I won't be able to accomplish as much with the new stuff as I will have to look things up.  I used node v8.3.0 to make sure the class stuff would be fully supported.

From what I can tell about the assignment, this exercise is fairly bare bones. This will be a lot of "interface" type code as opposed to "simulation" code.  By that I mean the code will not try to handle anything asynchronously or in a timer type manner -- eg. there is no delay for passenger to get on/off the elevator during which time new requests could come in.

Will use a controller to handle the management of elevator objects.  To help with listening for events, will use an EventEmitter and have the elevators inherit from it.  That way the Elevator can communicate events up to the controller.  The exercise does not really say anything about how the events are to be handled, so will stub those out.

First, will create an object of constant values for reference.  
MIN_FLOOR, MAX_FLOOR, TOTAL_ELEVATORS, FLOORS_BEFORE_MAINTENANCE

MAX_FLOOR was not defined in the spec, so will just specify it as 10.  
TOTAL_ELEVATORS was not defined in the spec, but it was suggested that 10 would be a reasonable max.


POTENTIAL CLASS IDEAS

Class ElevatorController  
=> constructor  
=> assignRequest  
=> getClosestElevator  
=>

Class Elevator  
=> constructor  
=> isMoving  
=> isStopped  
=> stopElevator  
=> openDoor -- check if moving before opening  
=> closeDoor  
=> arrivedAtFloorEvent  
=> openedDoorEvent   
=> closedDoorEvent  
=> isOccupied  
=> getTrips  
=> putIntoMaintenanceMode  

COMMIT #2 HERE

After this commit, I had to re-lookup how to add a new line in markdown. Also, adding a new constant for the number of trips that will cause an elevator to go into maintenance mode (100).

TESTING THOUGHTS
I don't want to fiddle with syntax on mocha for testing as I have not used it in several months and since this does not technically need to run.  I am going to sacrifice that -- even though lack of time is NOT a good reason to not make tests, since this is timed, I am afraid it might take more time to remember the syntax than it would save.

Filled out the constants object and created the ElevatorController.js and Elevator.js files.  Began thinking of OOP way of making private variables as these classes seem to more reflect "structs" from C.  Also, you cannot have any members that are variables in the classes, it all must be functions.

COMMIT #3 HERE

