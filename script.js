// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Initialize variables
    let currentPlayer = "X"; // X starts the game
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
  
    // DOM elements
    const cells = document.querySelectorAll(".cell");
    const gameStatus = document.querySelector(".game--status");
    const restartButton = document.querySelector(".game--restart");
  
    // Function to check if a player has won
    const checkWinner = () => {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          gameActive = false;
          return gameBoard[a];
        }
      }
  
      if (!gameBoard.includes("") && gameActive) {
        gameActive = false;
        return "Draw";
      }
  
      return null;
    };
  
    // Function to handle cell click
    const handleCellClick = (cell, index) => {
      if (gameBoard[index] === "" && gameActive) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer === "X" ? "x" : "o");
  
        const winner = checkWinner();
        if (winner) {
          if (winner === "Draw") {
            gameStatus.textContent = "It's a Draw!";
          } else {
            gameStatus.textContent = `${winner} wins!`;
          }
          gameActive = false;
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          gameStatus.textContent = `Player ${currentPlayer}'s turn`;
        }
      }
    };
  
    // Event listener for cell clicks
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        handleCellClick(cell, index);
      });
    });
  
    // Event listener for restart button click
    restartButton.addEventListener("click", () => {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      gameActive = true;
      currentPlayer = "X";
      cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
      });
      gameStatus.textContent = "Player X's turn";
    });
  });
  