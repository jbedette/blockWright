//notes
// to get word at appropriate place, put textbox at absolute location, put it under a z level so you cant click it
class Board {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.count = 0;
    this.containerId = "boardContainer";
    this.board = document.createElement("div");
    this.board.classList.add("board");

    // Create the grid of squares
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        let square = document.createElement("div");
        //make everything a squar, add extra class for corner, xHeaders, and yHeaders
        square.classList.add("square");
        if (i === 0 && j === 0) square.classList.add("corner");
        else if (i === 0) square.classList.add("xHead");
        else if (j === 0) square.classList.add("yHead");
        else square.classList.add("boardSquare");
        square.setAttribute("id", `${i}.${j}`);
        this.board.appendChild(square);
      }
    }

    // Append the board to the container
    const container = document.getElementById(this.containerId);
    container.appendChild(this.board);
  }
}

const idParser = (idString) => {
  return [idString[0], idString[1]];
};
//https://www.w3resource.com/javascript-exercises/javascript-math-exercise-40.php
function random_bg_color() {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  const bgColor = "rgb(" + x + "," + y + "," + z + ")";
  return bgColor;
}

const testBtn = document.getElementById("testBtn");
testBtn.addEventListener("click", () => {
  const randRgb = random_bg_color();
  squareChanger("1.1", randRgb, false, true, false, true);
  squareChanger("1.2", randRgb, false, true, true, false);
  squareChanger("2.1", randRgb, true, false, false, true);
  squareChanger("2.2", randRgb, true, false, true, false);
  // const testA = document.getElementById("11");
  // const testB = document.getElementById("12");
  // testA.classList.add("selected");
  // testB.classList.add("selected");
});

const squareChanger = (sqrId, bgColor, borderT, borderB, borderL, borderR) => {
  const sqr = document.getElementById(sqrId);
  sqr.style.backgroundColor = bgColor;
  if (borderR === true) {
    sqr.style.borderRight = bgColor;
    sqr.style.borderStyle = "solid";
  }
  if (borderB === true) {
    sqr.style.borderBottom = bgColor;
    sqr.style.borderStyle = "solid";
  }
  if (borderL === true) {
    sqr.style.borderLeft = bgColor;
    sqr.style.borderStyle = "solid";
  }
  if (borderT === true) {
    sqr.style.borderTop = bgColor;
    sqr.style.borderStyle = "solid";
  }
};

const board = new Board(5, 5); // Creates a board with 5x5 grid of squares
