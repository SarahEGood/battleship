import { Ship, Gameboard, Player } from './gameObjects.js';

let p1 = new Player('human');
let cpu = new Player('cpu');

function updateCpuBoard() {
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.getElementById(`2-cell-${row}-${col}`);
            if (!cell.classList.contains('attacked')) {
                if (p1.gameBoard.board[row][col] !== 0) {  // Attack happened here
                    cell.classList.add('attacked');
                    const hitShip = p1.gameBoard.checkHit(row, col);
                    if (hitShip) {
                        cell.innerHTML = 'X'; // Mark the hit with "X"
                    }
                }
                const missct = p1.gameBoard.misses.toString();
                const missUpdate = document.getElementById('p2-miss');
                missUpdate.innerHTML = "CPU misses: " + missct;
            }
        }
    }
};

const gridContainer1 = document.getElementById('grid-container-1');
for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');
        cell.id = `1-cell-${row}-${col}`;
        cell.addEventListener('click', function handleClick(event) {
            let selectedBox = event.target;
            if (!selectedBox.classList.contains('attacked')) {
                cpu.gameBoard.receiveAttack(row, col);
                selectedBox.classList.add('attacked');
                if (cpu.gameBoard.checkHit(row, col)) {
                    selectedBox.innerHTML = 'X';
                }
                const missct = cpu.gameBoard.misses.toString();
                const missUpdate = document.getElementById('p1-miss');
                missUpdate.innerHTML = "P1 misses: " + missct;
                cpuTurn();
            }
        })
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

let turn = 1;

function cpuTurn() {
    console.log(cpu); // Check if cpu is an instance of Player
    console.log(cpu.cpuAttack);
    cpu.cpuTurn(p1);  // CPU attacks human player
    updateCpuBoard(); // Update the CPU's attack grid
}