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
        this.misses = 0;
    }

    placeShip(ship) {
        let coordinates = this.getValidPlacement(ship);
        this.ships.push(ship);
        this.shipCoords.push(coordinates);
    }

    getValidPlacement(ship) {
        let placeRow = 0;
        let placeCol = 0;
        let is_vert = Math.round(this.verticalFunc()); // Random vertical or horizontal placement
        let coordinates = [];
        let sum = 1;
    
        // Keep trying until we find a valid placement
        while (sum > 0) {
            coordinates = [];
            is_vert = Math.round(this.verticalFunc()); // Randomly decide vertical or horizontal
    
            if (is_vert == 0) { // Horizontal placement
                placeRow = Math.floor(this.randomFunction() * this.y); // Random row
                placeCol = Math.floor(this.randomFunction() * (this.x - ship.length)); // Random column, ensuring enough space for ship length
    
                sum = 0;
                // Generate coordinates for the ship and check if each is valid
                for (let i = 0; i < ship.length; i++) {
                    const coord = [placeRow, placeCol + i];
                    if (this.isValidCoord(coord)) {
                        coordinates.push(coord); // Only add valid coordinates
                    } else {
                        sum += 1; // If any coordinate is invalid, break the loop
                        break;
                    }
                }
            } else { // Vertical placement
                placeRow = Math.floor(this.randomFunction() * (this.y - ship.length)); // Random row, ensuring enough space for ship length
                placeCol = Math.floor(this.randomFunction() * this.x); // Random column
    
                sum = 0;
                // Generate coordinates for the ship and check if each is valid
                for (let i = 0; i < ship.length; i++) {
                    const coord = [placeRow + i, placeCol];
                    if (this.isValidCoord(coord)) {
                        coordinates.push(coord); // Only add valid coordinates
                    } else {
                        sum += 1; // If any coordinate is invalid, break the loop
                        break;
                    }
                }
            }
    
            // If sum > 0, the ship overlaps, so we retry
            if (sum > 0) {
                coordinates = [];
            }
        }
        return coordinates; // Return the valid coordinates for placement
    }

    // Match list of coordinates to existing ship coordinates
    isValidCoordinates(coordinateList) {
        for (let i=0; i<coordinateList.length; i++) {
            if (!this.isValidCoord(coordinateList[i])) return false;
        }
        return true;
    };

    // For matching one coordinate to existing ship coordinates
    isValidCoord(coordinates) {
        const [row, col] = coordinates;
        if (row <= 0 || row > this.y || col <= 0 || col > this.x) {
            return false; // If coordinates are outside of the board, they are invalid
        }
        // Now check if this coordinate is already occupied by another ship
        for (let i = 0; i < this.shipCoords.length; i++) {
            for (let j = 0; j < this.shipCoords[i].length; j++) {
                const [existingRow, existingCol] = this.shipCoords[i][j];
                if (existingRow === row && existingCol === col) {
                    return false; // Overlapping with an existing ship
                }
            }
        }
        return true;
    }

    receiveAttack(x,y) {
        // when receiving an attack that is not a duplicate, iterate through ship coordinates
        // If a ship's coordinates are hit, update the ship object with a new hit counter.
        if (this.isDupAttack(x,y)) return;
        else {
            this.board[x][y] = 1;
            const hitShip = this.checkHit(x,y);
            if (hitShip) {
                hitShip.hit();
                if (this.checkSunk()) {
                    console.log("All ships have been sunk!")
                }
            } else this.misses += 1;
        }
        
    }

    isDupAttack(x, y) {
        return this.board[x][y] !== 0;
    }

    checkHit(x, y) {
        for (let i = 0; i < this.ships.length; i++) {
            for (let j = 0; j < this.shipCoords[i].length; j++) {
                const [ship_x, ship_y] = this.shipCoords[i][j];
                if (x == ship_x && y == ship_y) {
                    return this.ships[i]; // Found the ship
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
    constructor(control='control') {
        this.control = control;
        this.gameBoard = new Gameboard();
        const shiplengths = [5, 4, 3, 3, 2];
        let ship;
        for (let i = 0; i<shiplengths.length; i++) {
            ship = new Ship(shiplengths[i]);
            this.gameBoard.placeShip(ship);
        }
    }
    
    cpuTurn(otherplayer) {
        const attack = this.cpuAttack(otherplayer);
        otherplayer.gameBoard.receiveAttack(attack[0], attack[1]);
    }

    cpuAttack(otherplayer) {
        let checkval = false;
        let x_attack;
        let y_attack;
        while (!checkval) {
            x_attack = Math.floor(Math.random()*this.gameBoard.x);
            y_attack = Math.floor(Math.random()*this.gameBoard.y);
            checkval = this.checkValidAttack(x_attack, y_attack, otherplayer);
        }
        return [x_attack, y_attack];
    }

    checkValidAttack(x, y, otherPlayer) {
        return otherPlayer.gameBoard.board[x][y] === 0; // Allow attacks on ship cells too
    }
}

export { Player, Gameboard, Ship };