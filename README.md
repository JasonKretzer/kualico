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
=> getCurrentFloor  
=> goDirectlyToFloor  
=> destinationQueue  
=> answerCall  
=>removeFloorFromDestinations  

COMMIT #2 HERE

After this commit, I had to re-lookup how to add a new line in markdown. Also, adding a new constant for the number of trips that will cause an elevator to go into maintenance mode (100).

TESTING THOUGHTS
I don't want to fiddle with syntax on mocha for testing as I have not used it in several months and since this does not technically need to run.  I am going to sacrifice that -- even though lack of time is NOT a good reason to not make tests, since this is timed, I am afraid it might take more time to remember the syntax than it would save.

Filled out the constants object and created the ElevatorController.js and Elevator.js files.  Began thinking of OOP way of making private variables as these classes seem to more reflect "structs" from C.  Also, you cannot have any members that are variables in the classes, it all must be functions.

COMMIT #3 HERE

ELEVATOR THOUGHTS to keep in mind while coding:
1) To pick people up, the elevator must:  
-- go to the appropriate floor  
-- stop at the appropriate floor  
-- open the door  
-- stay open until all are in (will not be implemented)  
-- close the door  
-- wait for a destination or other command (if people do not give a destination)  

2) Before the elevator can move between floors, the doors must be closed  

3) The elevator must keep a queue of floors that it must stop at, either because it was called there or because the passengers pushed a button.

4) The ElevatorController inserts floors to stop at in an elevator's destination queue.  A destination is added if the ElevatorController chooses the elevator as the best one to handle a call at the destination.

5) The elevator's destination queue must be checked as it travels to each floor.  If the current floor is in the destination queue, the elevator will stop.  It also looks like I can do some recursion in order process this at each floor.

6) The elevator should be able to handle going directly to a floor without intervening stops for emergency purposes.  Not in the spec, but I think it lends itself to this functionality without inconvenience.  

At this point, I am writing too much and coding too little.  I can update the readme in shorter bursts and after the time limit.

--

Unfortunately, the final commit was a few minutes over the time limit -- got wired in and wanted to finish the maintenance check.  

I did not finish #7 in the spec.

I can see some weaknesses already:
--The for loops will always check the first few elevators first for assignments, which means in real life they would be used more and have to have more repairs, etc.  A different selection algorithm would be better.  
--The error checking is lacking on arguments.  I don't do enough to make sure undefineds are addressed

--

Finally, this should run with a simple   
node app.js  