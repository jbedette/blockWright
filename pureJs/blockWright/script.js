import { randomLetter, words } from "./lettersWords.js";

//John Bedette, August 2023

const disp = document.getElementById("disp");

//what this board constructor does, in order
//stores board size
//begins a count to be used later
//creates a grid of tile elements
//  based on x and y values, assigns appropriate classes of xHeaders, yHeaders and squares
//  creates an id string in the form of xlocation:yLocation to be parsed later
//  pushes a matching object into an array for later use
//appends these elements to the board
//attatches click even listeners to xHead and yHead elems that shout the id on click
class Board {
  constructor(x, y) {
    //store board size
    this.x = x;
    this.y = y;

    //count for gen new wordBlock id's
    this.count = 0;

    //current word being built;
    this.word = [];

    //arrays to store sqr info
    this.blockBuildArray = [[], []];
    this.blockArray = [];
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
    //console.log(this.xHeads);

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
//takes an id string, returns an array where id strings for x and y are [0] and [1]
const parseId = (str) => {
  const [x, y] = str.split(":").map(Number);
  return [x, y];
};

//takes in idstring from click event
//checks if head has been used
//todo:if not, cuts off letters from previous used head from object array
//pushes an id and letter tuple to an array called word stored in board
//calls check() which checks if
//  the word is valid
//  the word is allowed on grid
const headerClick = (idStr) => {
  const idNums = parseId(idStr);
  let target = null;
  //todo: update used heads to check grid patterns rather than used already
  if (!board.usedHeads.includes(idStr)) {
    board.usedHeads.push(idStr);
    if (idNums[1] === 0) {
      target = board.xHeads[idNums[0] - 1];

      board.word.push({
        id: idStr,
        letter: target.letter,
        x: idNums[0],
        y: idNums[1],
      });
      disp.innerHTML = makeWord();
      // console.log(target);
    }
    if (idNums[0] === 0) {
      target = board.yHeads[idNums[1] - 1];
      board.word.push({
        id: idStr,
        letter: target.letter,
        x: idNums[0],
        y: idNums[1],
      });
      disp.innerHTML = makeWord();
      // console.log(target);
    }
  }
  dispStyler();
  blockHighlight();
};
//takes word array
//for each letter moves relevant x or y item to buildBlock array
//then concatenates those x's and y's into strings to compare against
//existing square elements, when it finds a correct element
//it highlights it in yellow
//todo: change yellow highlight to yellow shade-over
const blockHighlight = () => {
  const boardSqrs = [...document.getElementsByClassName("square")];
  board.word.forEach((e) => {
    if (e.x != 0 && !board.blockBuildArray[0].includes(e.x)) {
      board.blockBuildArray[0].push(e.x);
    }
    if (e.y != 0 && !board.blockBuildArray[1].includes(e.y)) {
      board.blockBuildArray[1].push(e.y);
    }
  });
  boardSqrs.forEach((e) => {
    const id = parseId(e.id);
    if (
      board.blockBuildArray[0].includes(id[0]) &&
      board.blockBuildArray[1].includes(id[1])
    ) {
      e.classList.add("highlighted");
    }
  });
};

//reads word object array and spits out a string of what exists
const makeWord = () => {
  let out = "";
  board.word.forEach((e) => {
    out += e.letter;
  });
  return out;
};
//if word legal word and is legal on grid
//meant to contain gridCheck also,
//but gridCheck isn't needed everywhere wordcheck is,
//not great
const check = () => {
  return wordCheck();
};

//if check is true turn disp green
const dispStyler = () => {
  if (check()) disp.style.backgroundColor = "green";
  else disp.style.backgroundColor = "white";
};
//checks against master word list
const wordCheck = () => {
  return words.includes(makeWord());
};

//checks word validity on grid
//
const gridCheck = () => {
  let valid = true;
  //if x and y haven't been selected, don't check
  if (
    board.blockBuildArray[0].length != 0 &&
    board.blockBuildArray[1].length != 0 &&
    board.blockArray.length != 0
  ) {
    //fill and array with with what has been selected
    console.log(board.blockBuildArray);
    const sqrArr = [];
    board.blockBuildArray[0].forEach((i) => {
      board.blockBuildArray[1].forEach((j) => {
        sqrArr.push(`${i}:${j}`);
      });
    });
    console.log(sqrArr);
    //if no blocks have been made, skip
    if (board.blockArray.length != 0) {
      //if any blocks include one of the selected
      board.blockArray.forEach((i) => {
        sqrArr.forEach((j) => {
          console.group("gridcheck");
          console.log("blockArrVal", i.sqrs);
          console.log("sqrArrVal", j);
          console.log("includes", i.sqrs.includes(j));
          console.groupEnd();
          if (i.sqrs.includes(j)) {
            valid = false;
          }
        });
      });
    }
  }
  return valid;
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

//clears word you are building
//must reset various arrays to empty
const clrBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
  clear();
});

//clears out all in-progress arrays and displays
const clear = () => {
  document.getElementById("disp").innerHTML = "";
  board.word = [];
  board.blockBuildArray[0] = [];
  board.blockBuildArray[1] = [];
  board.usedHeads = [];
  const sqrs = [...document.getElementsByClassName("boardSquare")];
  sqrs.forEach((e) => {
    e.classList.remove("highlighted");
  });
};

//checks if word is legal,
//clears displays and in-progress word arrays,
// places word block on board and stores block in board
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", () => {
  if (gridCheck() && wordCheck()) {
    board.count++;
    let block = { id: board.count, word: "", sqrs: [], color: "" };
    block.color = random_bg_color();

    let word = "";
    board.word.forEach((e) => {
      word += e.letter;
    });
    block.word = word;

    board.blockBuildArray[0].forEach((i) => {
      board.blockBuildArray[1].forEach((j) => {
        block.sqrs.push(`${i}:${j}`);
      });
    });

    board.blockArray.push(block);
    block.sqrs.forEach((e) => {
      const sqr = document.getElementById(e);
      sqr.style.backgroundColor = block.color;
      sqr.classList.add(`block${block.id}`);
      sqr.classList.add("clearBlock");
      sqr.innerHTML = block.word;
    });
    clear();
  } else {
    //set disp color to indicate problem
    disp.style.backgroundColor = "red";
  }
});

//Square color change, border change to be used in future
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
// //test
// const testBtn = document.getElementById("testBtn");
// testBtn.addEventListener("click", () => {
//   const randRgb = random_bg_color();
//   squareChanger("1:1", randRgb, false, true, false, true);
//   squareChanger("2:1", randRgb, false, true, true, false);
//   squareChanger("1:2", randRgb, true, false, false, true);
//   squareChanger("2:2", randRgb, true, false, true, false);
// });

//call construct
const board = new Board(5, 5); // Creates a board with 5x5 grid of squares
