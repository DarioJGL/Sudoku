function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para generar un Sudoku aleatorio para el tamaño dado
function generateRandomSudoku(size) {
    const sudokuGrid = [];

    // Llenar el SudokuGrid con ceros
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(0);
        }
        sudokuGrid.push(row);
    }

    // Generar números aleatorios para las celdas iniciales
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (getRandomNumber(1, 4) === 1) { // Probabilidad de 1/4 para que una celda sea inicial
                let randomNumber;
                do {
                    randomNumber = getRandomNumber(1, size);
                } while (!isValidNumber(sudokuGrid, i, j, randomNumber));
                sudokuGrid[i][j] = randomNumber;
            }
        }
    }

    return sudokuGrid;
}

// Función para verificar si un número es válido en la posición dada
function isValidNumber(grid, row, col, num) {
    // Verificar la fila
    for (let i = 0; i < grid.length; i++) {
        if (grid[row][i] === num) {
            return false;
        }
    }

    // Verificar la columna
    for (let i = 0; i < grid.length; i++) {
        if (grid[i][col] === num) {
            return false;
        }
    }

    // Verificar el cuadro 3x3
    const boxSize = Math.sqrt(grid.length);
    const boxRow = Math.floor(row / boxSize) * boxSize;
    const boxCol = Math.floor(col / boxSize) * boxSize;
    for (let i = boxRow; i < boxRow + boxSize; i++) {
        for (let j = boxCol; j < boxCol + boxSize; j++) {
            if (grid[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}

function drawSudokuBoard(size) {
    const sudokuBoard = document.getElementById("sudoku-board");

    // Limpiar el tablero antes de dibujar
    sudokuBoard.innerHTML = "";

    // Establecer el tamaño del tablero
    sudokuBoard.style.gridTemplateColumns = `repeat(${size}, 30px)`;
    sudokuBoard.style.gridTemplateRows = `repeat(${size}, 30px)`;

    // Recorrer la matriz y agregar celdas al tablero
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.className = "cell border-cell";

            // Crear un input solo para las celdas vacías (0)
            if (sudokuGrid[i][j] === 0) {
                const input = document.createElement("input");
                input.type = "number";
                input.min = "1";
                input.max = size;
                input.addEventListener("input", () => {
                    sudokuGrid[i][j] = parseInt(input.value);
                });
                cell.appendChild(input);
            } else {
                // Mostrar el valor inicial en las celdas iniciales (no editables)
                cell.textContent = sudokuGrid[i][j];
                cell.classList.add("initial");
            }

            sudokuBoard.appendChild(cell);
        }
    }
}

// Función para comprobar si el Sudoku es válido
function checkSudoku() {
    // verifica si no hay números repetidos en filas, columnas y cuadros
    for (let i = 0; i < sudokuGrid.length; i++) {
        for (let j = 0; j < sudokuGrid.length; j++) {
            const num = sudokuGrid[i][j];
            if (num !== 0) {
                if (!isValidNumber(sudokuGrid, i, j, num)) {
                    alert("El Sudoku no es válido");
                    return;
                }
            }
        }
    }

    alert("El Sudoku es válido");
}

// Obtener los botones de dificultad
const difficultyButtons = document.querySelectorAll(".difficulty-button");

// Agregar evento a cada botón de dificultad
difficultyButtons.forEach(button => {
    button.addEventListener("click", () => {
        const size = parseInt(button.dataset.size);
        sudokuGrid = generateRandomSudoku(size);
        drawSudokuBoard(size);
    });
});

// Llamar a la función para dibujar el tablero al cargar la página
let sudokuGrid = generateRandomSudoku(9);
drawSudokuBoard(9);

// Agregar evento al botón de comprobar
const checkButton = document.getElementById("check-button");
checkButton.addEventListener("click", checkSudoku);






