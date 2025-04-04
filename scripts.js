import { Ship, Gameboard, Player } from './gameObjects.js';

let cellEventHandlers = [];
let p1 = new Player('human');
let cpu = new Player('cpu');

let p1_status = p1.gameBoard.checkSunk();
let cpu_status = cpu.gameBoard.checkSunk();

function handleCellClick(event, row, col) {
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
        cpu_status = cpu.gameBoard.checkSunk();
        if (cpu_status) {
            gameOver(cpu);
        }
        cpuTurn();
    }
}

function generateBoard1() {
    let gridContainer1 = document.getElementById('grid-container-1');
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-item');
            cell.id = `1-cell-${row}-${col}`;

            const handleClick = function(event) {
                handleCellClick(event, row, col);
            }
            cell.addEventListener('click', handleClick);
            cellEventHandlers.push({ cell, handleClick });

            gridContainer1.appendChild(cell);
        }
    }
}

function generateBoard2() {
    let gridContainer2 = document.getElementById('grid-container-2');
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-item');
            cell.id = `2-cell-${row}-${col}`;
            gridContainer2.appendChild(cell);
        }
    }
}

function clearBoards() {
    const grid1 = document.getElementById('grid-container-1');
    const grid2 = document.getElementById('grid-container-2');
    const messageDiv = document.getElementById('gameover');
    grid1.innerHTML = '';
    grid2.innerHTML = '';
    messageDiv.innerHTML = '';
}

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
                p1_status = p1.gameBoard.checkSunk();
                if (p1_status) {
                    gameOver(p1);
                }
            }
        }
    }
};

function gameOver(player) {
    const gameOverDiv = document.getElementById('gameover');
    const startoverBtn = document.createElement('button');

    let gameOverMessage = "";
    if (player.control == "human") {
        gameOverMessage = "Sorry, you lose! :(";
    } else {
        gameOverMessage = "You win! :)";
    }

    const playercontainer = document.getElementById('grid-container-1');
    const clickablebuttons = playercontainer.getElementsByClassName('grid-item');

    cellEventHandlers.forEach(({ cell, handleClick }) => {
        cell.removeEventListener('click', handleClick);
    });

    const gameOverMessageHTML = document.createElement('h1');
    gameOverMessageHTML.innerHTML = gameOverMessage;
    startoverBtn.innerHTML = "startover";
    startoverBtn.addEventListener('click', function startOver() {
        clearBoards();
        generateBoard1();
        generateBoard2();
        p1 = new Player('human');
        cpu = new Player('cpu');
        p1_status = p1.gameBoard.checkSunk();
        cpu_status = cpu.gameBoard.checkSunk();
    })

    gameOverDiv.appendChild(gameOverMessageHTML);
    gameOverDiv.appendChild(startoverBtn);
}

generateBoard1();
generateBoard2();

function cpuTurn() {
    console.log(cpu); // Check if cpu is an instance of Player
    console.log(cpu.cpuAttack);
    cpu.cpuTurn(p1);  // CPU attacks human player
    updateCpuBoard(); // Update the CPU's attack grid
}