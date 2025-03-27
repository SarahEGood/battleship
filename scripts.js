import { Ship, Gameboard, Player } from './gameObjects.js';

let p1 = new Player('human');
let cpu = new Player('cpu');

const gridContainer1 = document.getElementById('grid-container-1');
for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');
        cell.id = `1-cell-${row}-${col}`;
        gridContainer1.appendChild(cell);
    }
}
const gridContainer2 = document.getElementById('grid-container-2');
for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');
        cell.id = `2-cell-${row}-${col}`;
        gridContainer2.appendChild(cell);
    }
}