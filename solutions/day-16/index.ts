import console from "console";
import { readFileSync } from "fs";

const text: string = readFileSync("inputs/day-16-1.txt", "utf-8");
const arrayText = text.split("");
const matrix: Array<Array<string>> = [];

function displayMatrix () {
  console.log(matrix.map(e => e.join(" ")));
}

const beamCharacters = ["<", ">", "^", "v"];
const beamToTheRight = ">";
const beamToTheLeft = "<";
const beamToTheTop = "^";
const beamToTheBottom = "v";

let rootIndex = 0;
for (const char of arrayText) {
  if (char === "\r") {
    continue;
  }

  if (char === "\n") {
    rootIndex++;
  } else {
    if (!matrix[rootIndex]) {
      matrix[rootIndex] = [];
    }

    if (char === "\\") {
      matrix[rootIndex].push("B");
    } else {
      matrix[rootIndex].push(char);
    }
  }
}

const CLOCK_TICK_COUNT = 10;
let currentTick = 0;
const coordinatesToUpdate: Array<string> = [];

// First tick, the beam enters by the top left corner and go to the right
matrix[0][0] = ">";

while (currentTick < CLOCK_TICK_COUNT) {
  console.log("----", "current clock", currentTick);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (beamCharacters.includes(matrix[i][j])) {
        coordinatesToUpdate.push(`${i}xx${j}`);
      }
    }
  }

  for (const coordinates of coordinatesToUpdate) {
    const x = parseInt(coordinates.split("xx").at(0) as string, 10);
    const y = parseInt(coordinates.split("xx").at(1) as string, 10);

    switch (matrix[x][y]) {
    case beamToTheRight:
      if (matrix[x][y + 1] === "|") {
        if (x - 1 > -1) {
          matrix[x - 1][y + 1] = "^";
        }
        if (x + 1 < matrix[x].length) {
          matrix[x + 1][y + 1] = "v";
        }
      } else if (matrix[x][y + 1] === "/") {
        matrix[x][y + 1] = "^";
      } else {
        matrix[x][y + 1] = ">";
      }
      break;
    case beamToTheLeft:
      matrix[x][y - 1] = "<";
      break;
    case beamToTheTop:
      console.log("case");
      matrix[x][y - 1] = "22";
      break;
    case beamToTheBottom:
      if (matrix[x + 1][y] === "-") {
        matrix[x + 1][y + 1] = ">";
        matrix[x + 1][y - 1] = "<";
      } else {
        matrix[x + 1][y] = "v";
      }
      break;
    }
  }

  displayMatrix();
  currentTick++;
}
