import { describe } from '@jest/globals';
import { Ship, Gameboard, Player } from './gameObjects.js'; // Using named imports

// Ship Tests
describe('Ship tests', () => {
    let ship;
    beforeEach(() => {
        ship = new Ship(3);
    });

    test('Initialize with correct vars', () => {
        expect(ship.length).toBe(3);
        expect(ship.hits).toBe(0);
        expect(ship.sunk).toBe(false);
        expect(ship.isSunk()).toBe(false);
    });

    test('Check hits', () => {
        ship.hit();
        expect(ship.length).toBe(3);
        expect(ship.hits).toBe(1);
        expect(ship.sunk).toBe(false);
        expect(ship.isSunk()).toBe(false);
    });

    test('Ship should sink', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.length).toBe(3);
        expect(ship.hits).toBe(3);
        expect(ship.sunk).toBe(true);
        expect(ship.isSunk()).toBe(true);
    })

});


describe('Gameboard Tests', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test('Initialize board correctly', () => {
        expect(gameboard.x).toBe(10);
        expect(gameboard.y).toBe(10);
        expect(gameboard.ships).toStrictEqual([]);
        expect(gameboard.shipCoords).toStrictEqual([]);
    });
});

describe('Ship Placement vertically', () => {
    let gameboard = new Gameboard(10, 10, () => 0, () => 0);

    test('place ship vertically', () => {
        const ship = new Ship(3);
        gameboard.placeShip(ship);

        const coords = gameboard.shipCoords[0];
        expect(coords).toStrictEqual([[0,0], [1,0], [2,0]]);
    });
});

describe('Ship Placement horizontally', () => {
    let gameboard = new Gameboard(10, 10, () => 0, () => 1);

    test('place ship horizontally', () => {
        const ship = new Ship(3);
        gameboard.placeShip(ship);

        const coords = gameboard.shipCoords[0];
        expect(coords).toStrictEqual([[0,0], [0,1], [0,2]]);
    });

    test('receive an attack (hit)', () => {
        gameboard.receiveAttack(0,0);
        expect(gameboard.board[0][0]).toBe(1);
        expect(gameboard.ships[0].hits).toBe(1);
        expect(gameboard.misses).toBe(0);

        gameboard.receiveAttack(1,1);
        expect(gameboard.board[0][0]).toBe(1);
        expect(gameboard.ships[0].hits).toBe(1);
        expect(gameboard.misses).toBe(1);
    })
})

describe('Instantiate Player', () => {
    let player = new Player('control');
    expect(player.gameBoard.ships.length).toBe(5);
})