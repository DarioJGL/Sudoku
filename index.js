// Nivel Fácil
let easySudokuGrid = [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
];

// Nivel Medio
let mediumSudokuGrid = [
    [1, 0, 0, 0, 0, 7, 0, 9, 0],
    [0, 3, 0, 0, 2, 0, 0, 0, 8],
    [0, 0, 9, 6, 0, 0, 5, 0, 0],
    [0, 0, 5, 3, 0, 0, 9, 0, 0],
    [0, 1, 0, 0, 8, 0, 0, 0, 2],
    [6, 0, 0, 0, 0, 4, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 4, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 7, 0, 0, 0, 3, 0, 0]
];

// Nivel Difícil
let hardSudokuGrid = [
    [0, 0, 4, 0, 0, 0, 0, 5, 6],
    [0, 5, 0, 0, 6, 2, 0, 0, 1],
    [0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 7, 0, 0, 0, 0, 0],
    [9, 0, 0, 0, 0, 0, 8, 1, 0],
    [0, 4, 0, 0, 1, 5, 0, 0, 2],
    [0, 0, 8, 0, 7, 6, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0, 7],
    [0, 6, 0, 3, 0, 0, 0, 0, 0]
];

let currentLevel = 0; // 0: easy, 1: medium, 2: hard


function drawSudokuBoard() {
    const sudokuBoard = document.getElementById("sudoku-board");
    sudokuBoard.innerHTML = "";
    sudokuBoard.style.gridTemplateColumns = `repeat(9, 30px)`;
    sudokuBoard.style.gridTemplateRows = `repeat(9, 30px)`;
    let grid;
    switch (currentLevel) {
        case 0:
            grid = easySudokuGrid;
            break;
        case 1:
            grid = mediumSudokuGrid;
            break;
        case 2:
            grid = hardSudokuGrid;
            break;
        default:
            grid = easySudokuGrid;
    }

    // Recorrer la matriz y agregar celdas al tablero
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const cell = document.createElement("div");
            cell.className = "cell border-cell";
            if (grid[i][j] === 0) {
                const input = document.createElement("input");
                input.type = "number";
                input.min = "1";
                input.max = "9";
                input.addEventListener("input", () => {
                    grid[i][j] = parseInt(input.value);
                });
                cell.appendChild(input);
            } else {
                cell.textContent = grid[i][j];
                cell.classList.add("initial");
            }
            sudokuBoard.appendChild(cell);
        }
    }
}
function checkSudoku() {
    let grid;
    switch (currentLevel) {
        case 0:
            grid = easySudokuGrid;
            break;
        case 1:
            grid = mediumSudokuGrid;
            break;
        case 2:
            grid = hardSudokuGrid;
            break;
        default:
            grid = easySudokuGrid;
    }

    const isValid = validateSudoku(grid);

    const resultCard = document.createElement("div");
    resultCard.className = "card";

    const resultMessage = document.createElement("p");
    resultMessage.className = "result-message";



    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.appendChild(resultCard);

    document.body.appendChild(overlay);
    resultCard.appendChild(resultMessage);
    if (isValid) {
        resultMessage.textContent = "¡El sudoku es correcto!";
        const nextButton = document.createElement("button");
        nextButton.className = "next-button";
        nextButton.textContent = "Siguiente";
        nextButton.addEventListener("click", () => {
            currentLevel = (currentLevel + 1) % 3;
            drawSudokuBoard();
            document.body.removeChild(overlay);
        });
        resultCard.appendChild(nextButton);
    } else {
        resultMessage.textContent = "El sudoku es incorrecto.";
        const closeButton = document.createElement("button");
        closeButton.className = "close-button";
        closeButton.textContent = "Cerrar";
        closeButton.addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
        resultCard.appendChild(closeButton);
    }


}



function validateSudoku(grid) {
    return validateRows(grid) && validateColumns(grid) && validateBlocks(grid);
}

function validateRows(grid) {
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        const rowSet = new Set(row);

        if (rowSet.size !== row.length || rowSet.has(0)) {
            return false;
        }
    }

    return true;
}

function validateColumns(grid) {
    for (let i = 0; i < grid[0].length; i++) {
        const column = [];

        for (let j = 0; j < grid.length; j++) {
            column.push(grid[j][i]);
        }

        const columnSet = new Set(column);

        if (columnSet.size !== column.length || columnSet.has(0)) {
            return false;
        }
    }

    return true;
}

function validateBlocks(grid) {
    for (let blockRow = 0; blockRow < 3; blockRow++) {
        for (let blockCol = 0; blockCol < 3; blockCol++) {
            const block = [];

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    block.push(grid[blockRow * 3 + i][blockCol * 3 + j]);
                }
            }

            const blockSet = new Set(block);

            if (blockSet.size !== block.length || blockSet.has(0)) {
                return false;
            }
        }
    }

    return true;
}

drawSudokuBoard();

const checkButton = document.getElementById("check-button");
checkButton.addEventListener("click", checkSudoku);
