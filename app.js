document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const displaySquares = document.querySelectorAll(".upcoming-grid div");
    let squares = Array.from(grid.querySelectorAll('div'));
    const width = 10;
    const height = 20;
    let currentPosition = 4;

    //Assign Function to Keycodes
    function control(e) {
        if (e.key === "ArrowRight") {
            moveRight();
        } else if (e.key === "ArrowUp") {
            rotate();
        } else if (e.key === "ArrowLeft") {
            moveLeft();
        } else if (e.key === "ArrowDown") {
            moveDown();
        }
    }

    document.addEventListener("keydown", control);

    //The Tetrominoes
    const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
    ]

    const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    //Randomly select Tetromino
    let random = Math.floor(Math.random()*theTetrominoes.length);
    let currentRotation = 0;
    let current = theTetrominoes[random][currentRotation];
    //TODO: add random color

    //Draw and undraw Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('block');
        });
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('block');
        });
    }

    //Move Tetromino
    function moveDown() {
        undraw();
        currentPosition = currentPosition += width;
        draw();
        //freeze();     
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
        if (!isAtRightEdge) currentPosition += 1;
        if (current.some(index => squares[currentPosition + index].classList.contains("block2"))) {
            currentPosition -= 1;
        }
        draw();
    }

    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if (!isAtLeftEdge) currentPosition -= 1;
        if (current.some(index => squares[currentPosition + index].classList.contains("block2"))) {
            currentPosition += 1;
        }
        draw();
    }

    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];
        draw();
    }

    //Display Next Tetromino
    const displayWidth = 4;
    const displayIndex = 0;
    let nextRandom = 0;

    const smallTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], /* lTetromino */
        [0, displayWidth, displayWidth+1, displayWidth*2+1], /* zTetromino */
        [1, displayWidth, displayWidth+1, displayWidth+2], /* tTetromino */
        [0, 1, displayWidth, displayWidth+1], /* oTetromino */
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] /* iTetromino */
    ]

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove("block");
        });
        smallTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add("block");
        });
    }

});