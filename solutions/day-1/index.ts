import { readFileSync } from "fs";

const text: string = readFileSync("inputs/day-1-2.txt", "utf-8");

const arrayText = text.split("\n");

function getIndexOfFirstDigit (element: string): number {
  let index = 0;
  let foundIndex = -1;
  while (foundIndex === -1 && index < element.length) {
    if (!Number.isNaN(parseInt(element.at(index)!, 10))) {
      foundIndex = index;
    }

    index++;
  }

  return foundIndex;
}

function getTheFirstDigitAsString (element: string): string {
  const index = getIndexOfFirstDigit(element);
  return element.at(index)!;
}

function getTheLastDigitAsString (element: string): string {
  const reversedElement = element.split("").reverse().join("");
  const index = getIndexOfFirstDigit(reversedElement);
  return reversedElement.at(index)!;
}

const sum = arrayText.map(
  element => {
    const firstDigit = getTheFirstDigitAsString(element);
    const lastDigit = getTheLastDigitAsString(element);

    console.log(`${firstDigit}${lastDigit}`, parseInt(`${firstDigit}${lastDigit}`, 10));
    return parseInt(`${firstDigit}${lastDigit}`, 10);
  },
).reduce((acc, cur) => {
  return acc + cur;
});

console.log("Answer part 1:", sum);
