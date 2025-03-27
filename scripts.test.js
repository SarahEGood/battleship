import { describe } from '@jest/globals';
import { Ship, Gameboard, Player } from './scripts.js'; // Using named imports

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

    test('Place ship')
});