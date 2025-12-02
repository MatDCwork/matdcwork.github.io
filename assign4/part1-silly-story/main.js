// Name: Matthew Cagulada | File: main.js | Date: November 30, 2025

// rubric: storyText + three arrays (insertX, insertY, insertZ)
const storyText =
  "It was 94 fahrenheit outside, so :insertX: went for a walk. When they got to :insertY:, they stared in horror for a few moments, then :insertZ:. Bob saw the whole thing, but was not surprised — :insertX: weighs 300lb, and it was a hot day.";

const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const insertY = ["the soup kitchen", "Disneyland", "the White House"];
const insertZ = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and crawled away"
];

const customName = document.getElementById("customname");
const randomize  = document.querySelector(".randomize");
const story      = document.querySelector(".story");
const ukRadio    = document.getElementById("uk");

// helper to pick a random array value
function randomValueFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function result() {
  // rubric: create newStory set to storyText
  let newStory = storyText;

  // rubric: xItem, yItem, zItem from arrays via randomValueFromArray()
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  // rubric: replace all placeholders
  newStory = newStory
    .replaceAll(":insertX:", xItem)
    .replace(":insertY:", yItem)
    .replace(":insertZ:", zItem);

  // rubric: custom name replaces Bob
  const name = customName.value.trim();
  if (name !== "") newStory = newStory.replaceAll("Bob", name);

  // rubric: if UK selected, convert 300lb -> stones and 94F -> C
  if (ukRadio.checked) {
    const stones = Math.round(300 / 14);                 // 300 lb to stones
    const celsius = Math.round((94 - 32) * 5 / 9);       // F to C
    newStory = newStory
      .replace("300lb", `${stones} stones`)
      .replace("94 fahrenheit", `${celsius} centigrade`);
  }

  // rubric: set story.textContent to the modified string
  story.textContent = newStory;
  story.style.visibility = "visible";
}

// rubric: event handler on button
randomize.addEventListener("click", result);
