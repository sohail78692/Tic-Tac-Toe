// DOM Elements
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const changeModeButton = document.getElementById('changeModeButton');
const modeSelection = document.getElementById('modeSelection');
const difficultySelection = document.getElementById('difficultySelection');
const scoreboard = document.getElementById('scoreboard');
const gameInfo = document.getElementById('gameInfo');
const gameControls = document.getElementById('gameControls');
const gameModeInfo = document.getElementById('gameModeInfo');
const player2Label = document.getElementById('player2Label');
const themeButtons = document.querySelectorAll('.theme-btn');

// Score Elements
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreDraw = document.getElementById('scoreDraw');

// Game Variables
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameMode = null; // 'pvp' or 'pvc'
let difficulty = null; // 'easy', 'medium', 'hard', 'impossible'
let scores = {
    X: 0,
    O: 0,
    draw: 0
};

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Mode Selection
document.getElementById('pvpMode').addEventListener('click', () => {
    gameMode = 'pvp';
    startGame();
});

document.getElementById('pvcMode').addEventListener('click', () => {
    gameMode = 'pvc';
    showDifficultySelection();
});

// Difficulty Selection
document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        difficulty = e.target.getAttribute('data-difficulty');
        startGame();
    });
});

function showDifficultySelection() {
    modeSelection.classList.add('hidden');
    difficultySelection.classList.remove('hidden');
}

function startGame() {
    modeSelection.classList.add('hidden');
    difficultySelection.classList.add('hidden');
    board.classList.remove('hidden');
    gameInfo.classList.remove('hidden');
    scoreboard.classList.remove('hidden');
    gameControls.classList.remove('hidden');

    if (gameMode === 'pvc') {
        player2Label.textContent = `AI (${difficulty})`;
        gameModeInfo.textContent = `Playing against AI - ${difficulty} mode`;
    } else {
        player2Label.textContent = 'Player O';
        gameModeInfo.textContent = 'Player vs Player mode';
    }

    resetGame();
}

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (gameState[index] !== '' || !gameActive) {
        return;
    }

    // Player move
    updateCell(cell, index);
    playSound('move');

    if (!checkResult()) {
        // AI move if in PvC mode and it's O's turn
        if (gameMode === 'pvc' && currentPlayer === 'O' && gameActive) {
            gameActive = false; // Prevent player from clicking during AI turn
            board.classList.add('ai-thinking');

            setTimeout(() => {
                makeAIMove();
                board.classList.remove('ai-thinking');
                gameActive = true;
                checkResult();
            }, 500); // AI thinks for 500ms
        }
    }
}

function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase(), 'placed');
}

function makeAIMove() {
    let move;

    switch(difficulty) {
        case 'easy':
            move = getRandomMove();
            break;
        case 'medium':
            move = Math.random() < 0.5 ? getBestMove() : getRandomMove();
            break;
        case 'hard':
            move = Math.random() < 0.8 ? getBestMove() : getRandomMove();
            break;
        case 'impossible':
            move = getBestMove();
            break;
        default:
            move = getRandomMove();
    }

    const cell = cells[move];
    updateCell(cell, move);
    playSound('move');
}

function getRandomMove() {
    const availableMoves = [];
    gameState.forEach((cell, index) => {
        if (cell === '') availableMoves.push(index);
    });
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function getBestMove() {
    // Minimax algorithm for unbeatable AI
    let bestScore = -Infinity;
    let bestMove = 0;

    for (let i = 0; i < 9; i++) {
        if (gameState[i] === '') {
            gameState[i] = 'O';
            let score = minimax(gameState, 0, false);
            gameState[i] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

function minimax(state, depth, isMaximizing) {
    const winner = checkWinner(state);

    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (winner === 'draw') return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (state[i] === '') {
                state[i] = 'O';
                let score = minimax(state, depth + 1, false);
                state[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (state[i] === '') {
                state[i] = 'X';
                let score = minimax(state, depth + 1, true);
                state[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner(state) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (state[a] !== '' && state[a] === state[b] && state[b] === state[c]) {
            return state[a];
        }
    }

    if (!state.includes('')) {
        return 'draw';
    }

    return null;
}

function checkResult() {
    let roundWon = false;
    let winningCombination = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            winningCombination = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        const winnerName = gameMode === 'pvc' && currentPlayer === 'O' ? 'AI' : `Player ${currentPlayer}`;
        status.textContent = `${winnerName} wins!`;
        gameActive = false;
        highlightWinningCells(winningCombination);
        updateScore(currentPlayer);
        playSound('win');
        return true;
    }

    if (!gameState.includes('')) {
        status.textContent = "It's a draw!";
        gameActive = false;
        updateScore('draw');
        playSound('draw');
        return true;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const playerName = gameMode === 'pvc' && currentPlayer === 'O' ? 'AI' : `Player ${currentPlayer}`;
    status.textContent = `${playerName}'s turn`;
    return false;
}

function highlightWinningCells(combination) {
    combination.forEach(index => {
        cells[index].classList.add('winning');
    });
}

function updateScore(winner) {
    if (winner === 'draw') {
        scores.draw++;
        scoreDraw.textContent = scores.draw;
    } else {
        scores[winner]++;
        if (winner === 'X') {
            scoreX.textContent = scores.X;
        } else {
            scoreO.textContent = scores.O;
        }
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning', 'placed');
    });

    board.classList.remove('ai-thinking');
}

function changeMode() {
    // Reset everything
    gameMode = null;
    difficulty = null;
    scores = { X: 0, O: 0, draw: 0 };
    scoreX.textContent = '0';
    scoreO.textContent = '0';
    scoreDraw.textContent = '0';

    // Hide game elements
    board.classList.add('hidden');
    gameInfo.classList.add('hidden');
    scoreboard.classList.add('hidden');
    gameControls.classList.add('hidden');
    difficultySelection.classList.add('hidden');

    // Show mode selection
    modeSelection.classList.remove('hidden');

    resetGame();
}

// Sound Effects (using Web Audio API)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch(type) {
        case 'move':
            oscillator.frequency.value = 300;
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'win':
            oscillator.frequency.value = 523.25; // C5
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);

            // Second note
            setTimeout(() => {
                const osc2 = audioContext.createOscillator();
                const gain2 = audioContext.createGain();
                osc2.connect(gain2);
                gain2.connect(audioContext.destination);
                osc2.frequency.value = 659.25; // E5
                gain2.gain.setValueAtTime(0.2, audioContext.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                osc2.start(audioContext.currentTime);
                osc2.stop(audioContext.currentTime + 0.3);
            }, 150);
            break;
        case 'draw':
            oscillator.frequency.value = 200;
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
    }
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('tic-tac-toe-theme') || 'purple';
    setTheme(savedTheme);
}

function setTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('tic-tac-toe-theme', themeName);

    // Update active state on theme buttons
    themeButtons.forEach(btn => {
        if (btn.getAttribute('data-theme') === themeName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Theme Button Event Listeners
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        setTheme(theme);
        playSound('move');
    });
});

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
changeModeButton.addEventListener('click', changeMode);

// Initialize theme on page load
initializeTheme();
