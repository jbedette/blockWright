import { randomLetter, words } from "./lettersWords.js";

//notes
// to get word at appropriate place, put textbox at absolute location, put it under a z level so you cant click it
//TODO
//[x]1. get random letter on headers, attatch buttons to headers, display selected letters
//2. system for selecting squares on board, maybe ecs style with an array of ids
//3. assign point values
//3.5 word dict
//4. more front end styling
//5. win conditions
//6. extend board
//7. rerolls and such
//8. board extension rules
//9. menus
//10. file structure

//sunday
//1
//[x]random letter gen
//[x]apply to headers
//[x]button class on headers
//
const disp = document.getElementById("disp");

class Board {
  //what this does, in order
  //stores board size
  //begins a count to be used later
  //creates a grid of tile elements
  //  based on x and y values, assigns appropriate classes of xHeaders, yHeaders and squares
  //  creates an id string in the form of xlocation:yLocation to be parsed later
  //  pushes a matching object into an array for later use
  //appends these elements to the board
  //attatches click even listeners to xHead and yHead elems that shout the id on click
  constructor(x, y) {
    //store board size
    this.x = x;
    this.y = y;

    //count for gen new wordBlock id's
    this.count = 0;

    //current word being built;
    this.word = "";

    //arrays to store sqr info
    this.sqrArray = [];
    this.xHeads = [];
    this.yHeads = [];
    this.usedHeads = [];

    this.containerId = "boardContainer";
    this.board = document.createElement("div");
    this.board.classList.add("board");

    // Create the grid of squares
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        let square = document.createElement("div");

        //get let & val array, then store
        const getLet = randomLetter();
        const letter = getLet[0];
        const letVal = getLet[1];
        //make an id string and assign
        const id = `${j}:${i}`;
        square.setAttribute("id", id);

        //make everything a squar, add extra class for corner, xHeaders, and yHeaders
        square.classList.add("square");
        //put letter
        if (i === 0 && j === 0) square.classList.add("corner");
        else if (i === 0) {
          square.classList.add("xHead");

          //assign letters to headers
          square.innerHTML = letter;

          //push id,let,letval to xHead
          this.xHeads.push({
            id: id,
            xLoc: j,
            yLoc: i,
            letter: letter,
            value: letVal,
          });
        } else if (j === 0) {
          square.classList.add("yHead");

          //push to yHeads
          this.yHeads.push({
            id: id,
            xLoc: j,
            yLoc: i,
            letter: letter,
            value: letVal,
          });

          //assign letters to headers
          square.innerHTML = letter;
        } else square.classList.add("boardSquare");
        this.board.appendChild(square);
      }
    }

    // Append the board to the container
    const container = document.getElementById(this.containerId);
    container.appendChild(this.board);
    console.log(this.xHeads);

    const xHeadElems = [...document.getElementsByClassName("xHead")];
    // console.log(xHeadElems);
    xHeadElems.forEach((element) => {
      element.addEventListener("click", function (event) {
        //take click id from here
        // console.log(event.target.id);
        headerClick(event.target.id);
      });
    });

    const yHeadElems = [...document.getElementsByClassName("yHead")];
    // console.log(yHeadElems);
    yHeadElems.forEach((element) => {
      element.addEventListener("click", function (event) {
        //take click id from here
        // console.log(event.target.id);
        headerClick(event.target.id);
      });
    });
  }
}

const parseId = (str) => {
  const [x, y] = str.split(":").map(Number);
  return [x, y];
};

const headerClick = (idStr) => {
  const idNums = parseId(idStr);
  let target = null;
  //todo: update used heads to check grid patterns rather than used already
  if (!board.usedHeads.includes(idStr)) {
    board.usedHeads.push(idStr);
    if (idNums[1] === 0) {
      target = board.xHeads[idNums[0] - 1];
      disp.innerHTML = board.word += target.letter;
      console.log(target);
    }
    if (idNums[0] === 0) {
      target = board.yHeads[idNums[1] - 1];
      disp.innerHTML = board.word += target.letter;
      console.log(target);
    }
  }
  check();
};
const check = () => {
  if (wordCheck() && gridCheck()) disp.style.backgroundColor = "green";
};
const wordCheck = () => {
  return words.includes(board.word);
};
//true for testing
const gridCheck = () => {
  return true;
};

//test
//https://www.w3resource.com/javascript-exercises/javascript-math-exercise-40.php
function random_bg_color() {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  const bgColor = "rgb(" + x + "," + y + "," + z + ")";
  return bgColor;
}

//test
const testBtn = document.getElementById("testBtn");
testBtn.addEventListener("click", () => {
  const randRgb = random_bg_color();
  squareChanger("1:1", randRgb, false, true, false, true);
  squareChanger("2:1", randRgb, false, true, true, false);
  squareChanger("1:2", randRgb, true, false, false, true);
  squareChanger("2:2", randRgb, true, false, true, false);
});

//test
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

//call construct
const board = new Board(5, 5); // Creates a board with 5x5 grid of squares
