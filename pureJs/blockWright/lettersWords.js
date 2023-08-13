//letters are duplicated for weighting purposes
// 1 point: E ×12, A ×9, I ×9, O ×8, N ×6, R ×6, T ×6, L ×4, S ×4
// 2 points: D ×4, G ×3, U x4
// 3 points: B ×2, C ×2, M ×2, P ×2
// 4 points: F ×2, H ×2, V ×2, W ×2, Y ×2
// 5 points: K ×1
// 8 points: J ×1, X ×1
// 10 points: Q ×1, Z ×1

//alphabet master list
const alphabetMaster = [
  ["A", 1],
  ["A", 1],
  ["A", 1],
  ["A", 1],
  ["A", 1],
  ["A", 1],
  ["A", 1],
  ["A", 1],
  ["A", 1],
  ["B", 3],
  ["B", 3],
  ["C", 3],
  ["C", 3],
  ["D", 2],
  ["D", 2],
  ["D", 2],
  ["D", 2],
  ["E", 1],
  ["E", 1],
  ["E", 1],
  ["E", 1],
  ["E", 1],
  ["E", 1],
  ["E", 1],
  ["E", 1],
  ["E", 1],
  ["E", 1],
  ["E", 1],
  ["E", 1],
  ["F", 4],
  ["F", 4],
  ["G", 2],
  ["G", 2],
  ["G", 2],
  ["H", 4],
  ["H", 4],
  ["I", 1],
  ["I", 1],
  ["I", 1],
  ["I", 1],
  ["I", 1],
  ["I", 1],
  ["I", 1],
  ["I", 1],
  ["I", 1],
  ["J", 8],
  ["K", 5],
  ["L", 1],
  ["L", 1],
  ["L", 1],
  ["L", 1],
  ["M", 3],
  ["M", 3],
  ["O", 1],
  ["O", 1],
  ["O", 1],
  ["O", 1],
  ["O", 1],
  ["O", 1],
  ["O", 1],
  ["O", 1],
  ["O", 1],
  ["P", 3],
  ["P", 3],
  ["Q", 10],
  ["R", 1],
  ["R", 1],
  ["R", 1],
  ["R", 1],
  ["R", 1],
  ["S", 1],
  ["S", 1],
  ["S", 1],
  ["S", 1],
  ["T", 1],
  ["T", 1],
  ["T", 1],
  ["T", 1],
  ["T", 1],
  ["T", 1],
  ["U", 2],
  ["U", 2],
  ["U", 2],
  ["U", 2],
  ["V", 4],
  ["V", 4],
  ["W", 4],
  ["W", 4],
  ["X", 10],
  ["Y", 4],
  ["Y", 4],
  ["Z", 10],
];
//copy alphabet
//  we want to keep full list just in case
//  but on generation, we want to keep from
//  taking two of a letter that should only exist once
let alphabet = alphabetMaster;

export function randomLetter() {
  //get random letter index
  const index = Math.floor(Math.random() * alphabet.length);
  //copy letter & value
  const letter = alphabet[index];
  //remove copied letter
  alphabet.splice(index, 1);
  //return copied letter
  return letter;
}

export let words = null;
//fetch list of 180,000 words
//dictionary taken from
//https://scrabutility.com/TWL06.txt
fetch("./words.txt")
  .then((response) => response.text())
  .then((data) => {
    // Split the data into an array of items, separated by new lines
    words = data.split("\n");
  })
  .catch((error) => console.log(error));

export const Alphabet = alphabet;
