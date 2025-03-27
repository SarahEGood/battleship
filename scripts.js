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
    constructor(x = 10, y = 10, randomFunction = Math.random, verticalFunc = Math.random) {
        // Board varibale to record hits
        this.board = Array.from({ length: y }, () => new Array(x).fill(0));
        // Store length/width for convenience
        this.x = x;
        this.y = y;
        this.ships = [];
        this.shipCoords = [];
        this.randomFunction = randomFunction;
        this.verticalFunc = verticalFunc;
    }

    placeShip(ship) {
        let coordinates = this.getValidPlacement(ship);
        this.ships.push(ship);
        this.shipCoords.push(coordinates);
    }

    getValidPlacement(ship) {
        // Find coordinates to place ship
        // Break loop if an section of coordinates is found.

        // Instantiate these variables to write to in if/else statement
        let placeRow = 0;
        let placeCol = 0;
        let is_vert = Math.round(this.verticalFunc());
        let coordinates = [];
        let sum = 1;
        while (sum > 0) {
            // if 1, ship is placed vertically, else horizontally, in grid
            is_vert = Math.round(this.verticalFunc());
            coordinates = [];
            if (is_vert == 0) {
                placeRow = Math.floor(this.randomFunction()*this.y) || 0;
                placeCol = Math.floor(this.randomFunction()*(this.x-(ship.length-1))) || 0;
                sum = 0;
                for (let i=0; i<ship.length; i++) {
                    sum += this.board[placeRow+i][placeCol];
                    coordinates.push([placeRow+i, placeCol]);
                }
            } else {
                placeCol = Math.floor(this.randomFunction()*(this.x-(ship.length-1))) || 0;
                placeRow = Math.floor(this.randomFunction()*this.y) || 0;
                sum = 0
                for (let i = 0; i<ship.length; i++) {
                    coordinates.push([placeRow, placeCol+i]);
                    sum += this.board[placeRow][placeCol+i];
                }
            }
            if (!this.isValidCoordinates(coordinates)) {
                sum = 0;
            }
        }
        return coordinates
    };

    // Match list of coordinates to existing ship coordinates
    isValidCoordinates(coordinateList) {
        for (let i=0; i<coordinateList.length; i++) {
            if (!this.isValidCoord(coordinateList[i])) return false;
        }
        return true;
    };

    // For matching one coordinate to existing ship coordinates
    isValidCoord(coordinates) {
        for (let i = 0; i<this.shipCoords.length; i++) {
            for (let j=0; j<this.shipCoords[i].length; j++) {
                if (this.shipCoords[i][j] === coordinates) return false;
            }
        }
        return true;
    };

    receiveAttack(x,y) {
        // when receiving an attack that is not a duplicate, iterate through ship coordinates
        // If a ship's coordinates are hit, update the ship object with a new hit counter.
        if (this.isDupAttack(x,y)) return;
        this.board[x][y] = 1;
        const hitShip = this.checkHit(x,y);
        if (hitShip) {
            hitShip.hit();
            if (this.checkSunk()) {
                console.log("All ships have been sunk!")
            }
        }
        
    }

    isDupAttack(x, y) {
        return this.board[x][y] !== 0;
    }

    checkHit(x, y) {
        for (let i = 0; i < this.ships.length; i++) {
            for (let j=0; j< this.shipCoords.length; j++) {
                const ship_x = this.shipCoords[i][j][0];
                const ship_y = this.shipCoords[i][j][1];
                if (x == ship_x && y == ship_y) {
                    return this.ships[i];
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