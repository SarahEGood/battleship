class Ship {
    // Construct ship based on length, set hits = 0
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    // If all parts of the ship are hit, it is sunk
    isSunk() {
    if (this.hits == this.length) {
        return true;
    } else return false;
    }

    // When a ship is hit, increase the hit counter and check if sunk
    hit() {
        this.hits += 1;
        this.sunk = this.isSunk();

    }
}

class Gameboard {
    constructor(x = 10, y = 10, randomFunction = Math.random) {
        // Board varibale to record hits
        this.board = Array.from({ length: y }, () => new Array(x).fill(0));
        // Store length/width for convenience
        this.x = x;
        this.y = y;
        this.ships = [];
        this.shipCoords = [];
        this.randomFunction = randomFunction;
    }

    placeShip(ship) {
        // Find coordinates to place ship
        // Break loop if an section of coordinates is found.

        // Instantiate these variables to write to in if/else statement
        const placeRow = 0;
        const placeCol = 0;
        const is_vert = Math.round(Math.random());
        const coordinates = [];
        while (sum > 0) {
            // if 1, ship is placed vertically, else horizontally, in grid
            is_vert = Math.round(Math.random());
            coordinates = [];
            if (!is_vert) {
                placeRow = Math.floor(Math.random()*this.y);
                placeCol = Math.floor(Math.random()*(this.x-(ship.length-1)));
                const sliced = this.board[placeRow].slice(placeCol, placeCol+ship.length-1);
                sum = sliced.reduce(add, 0);
                for (let i=0; i<ship.length; i++) {
                    coordinates.push([placeRow, placeCol+i]);
                }
            } else {
                placeCol = Math.floor(Math.random()*(this.x-(ship.length-1)));
                placeRow = Math.floor(Math.random()*this.y);
                sum = 0
                for (let i = 0; i<ship.length; i++) {
                    sum += this.board[placeRow+i][placeCol];
                    coordinates.push([placeRow+i, placeCol]);
                }
            }
        }

        this.ships.push(ship);
        this.shipCoords.push({placeRow, placeCol, is_vert});
    }

    receiveAttack(x,y) {
        // when receiving an attack that is not a duplicate, iterate through ship coordinates
        // If a ship's coordinates are hit, update the ship object with a new hit counter.
        if (this.board[x][y] == 0) {
            this.board[x][y] = 1;
            for (let i = 0; i < this.ships.length; i++) {
                for (let j=0; j< this.shipCoords.length; j++) {
                    const ship_x = this.shipCoords[j][0];
                    const ship_y = this.shipCoords[j][1];
                    if (x == ship_x && y == ship_y) {
                        this.ships[i].hit();
                        if (this.checkSunk()) {
                            console.log("All ships have been sunk!");
                        }
                        // Increment j and i to high levels to terminate loop
                        //  since ship coords should not overlap
                        j = 1000;
                        i = 1000;
                    }
                }
            }
        }
    }

    checkSunk() {
        for (let i=0; i<this.ships.length; i++) {
            if (!this.ships[i].isSunk()) {
                return false;
            }
        }
        return true;
    }

}

class Player {
    constructor(control) {
        this.control = control;
        this.gameBoard = new Gameboard();
    }
}

export { Player, Gameboard, Ship };