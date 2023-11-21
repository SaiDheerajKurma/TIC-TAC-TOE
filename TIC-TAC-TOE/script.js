document.addEventListener('DOMContentLoaded', () => {
  const gameScreen = document.querySelector('.game-screen');
  const resultScreen = document.querySelector('.result-screen');
  const cells = document.querySelectorAll('.cell');
  const status = document.querySelector('.status');
  const restartBtn = document.querySelector('.restart-btn');
  const newGameBtn = document.querySelector('.new-game-btn');
  const resultMessage = document.querySelector('.result-message');

  let currentPlayer = 'X';
  let gameActive = true;
  let gameState = ['', '', '', '', '', '', '', '', ''];

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

  const handleCellClick = (e) => {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-cell'));

    if (gameState[cellIndex] !== '' || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkWin();
    checkDraw();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  };

  const checkWin = () => {
    winningConditions.forEach((condition) => {
      const [a, b, c] = condition;

      if (
        gameState[a] !== '' &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        gameActive = false;
        resultMessage.textContent = `Player ${gameState[a]} wins!`;
        resultScreen.classList.add('active');
      }
    });
  };

  const checkDraw = () => {
    if (!gameState.includes('') && gameActive) {
      gameActive = false;
      resultMessage.textContent = 'It\'s a draw!';
      resultScreen.classList.add('active');
    }
  };

  const restartGame = () => {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
      cell.textContent = '';
    });
    resultScreen.classList.remove('active');
  };

  const startNewGame = () => {
    gameScreen.style.display = 'flex';
    resultScreen.classList.remove('active');
    restartGame();
  };

  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  restartBtn.addEventListener('click', restartGame);
  newGameBtn.addEventListener('click', startNewGame);
});
