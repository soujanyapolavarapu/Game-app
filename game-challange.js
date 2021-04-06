"use strict";
const randomSentenceButton = document.getElementById("randomSentence");
const typerA = document.getElementById("typer_a");
const typerB = document.getElementById("typer_b");
const sentence = document.getElementById("sentence");
const startA = document.getElementById("start-a");
const startB = document.getElementById("start-b");
const aTimer = document.getElementById("a-timer");
const bTimer = document.getElementById("b-timer");

const senteces = [
  "Everything happens for me, not to me.",
  "You’re never too important to be nice to people.",
  "Never regret anything that made you smile.",
  "When there is no desire, all things are at peace.",
  "What you really value is what you miss, not what you have.",
  "Aspire to inspire before we expire.",
  "The greatest effort is not concerned with results.",
  "Problems are not stop signs, they are guidelines.",
  "You always admire what you really don't understand.",
  "Little things console us because little things afflict us.",
];

function getRandomSentence() {
  let randomNumber = Math.floor(Math.random() * 10);
  let randomSentence = senteces[randomNumber];
  sentence.textContent = randomSentence;
  typerA.setAttribute("placeholder", randomSentence);
  typerB.setAttribute("placeholder", randomSentence);
  return randomSentence;
}
let randomSentence = getRandomSentence();
let matching = false;
let timer1;
let timer2;
function matchSentence(param) {
  let x = param.value;
  return x === randomSentence ? (matching = true) : false;
}

function addTimerA(typer) {
  timer1 = 0;
  let aInterval = setInterval(() => {
    timer1 = timer1 + 1;
    typer.innerHTML = `${timer1}`;
    if (matching) {
      clearInterval(aInterval);
      gameEnds();
      matching = false;
    }
  }, 1000);
}

function addTimerB(typer) {
  timer2 = 0;
  let aInterval = setInterval(() => {
    timer2 = timer2 + 1;
    typer.innerHTML = `${timer2}`;
    if (matching) {
      clearInterval(aInterval);
      gameEnds();
      matching = false;
    }
  }, 1000);
}

function gameEnds() {
  if (timer1 < timer2) {
    timer2= timer2-timer1;
    sentence.textContent = `The winner is A-typer with ${timer1} seconds`;
    document.querySelector("#sentence").insertAdjacentHTML(
      "beforeend",
      `
   <p class="the-winner"> B-typer lost with ${timer2} seconds</p>
  <img class="winner-img" src="giphy.webp"  alt="The winner"/>`
    );
    sentence.style.color = "green";
    document.querySelector(".typers").style.display = "none";
    document.querySelector(".enter").style.display = "none";
  } else if (timer1 > timer2) {
    timer1= timer1- timer2;
    sentence.textContent = `The winner is B-typer with ${timer2} seconds`;
    document.querySelector("#sentence").insertAdjacentHTML(
      "beforeend",
      `
     <p class="the-winner"> A-typer lost with ${timer1} seconds</p>
    <img class="winner-img" src="giphy.webp"  alt="The winner"/>`
    );
    document.querySelector(".typers").style.display = "none";
    sentence.style.color = "green";
    document.querySelector(".enter").style.display = "none";
  } else if (timer1 === timer2) {
    sentence.textContent = `It's a Tie you both typed during ${timer1} seconds`;
    sentence.style.color = "green";
    document.querySelector(".enter").style.display = "none";
  }
}
startA.addEventListener("click", () => {
  addTimerA(aTimer);
  startA.disabled = "disabled";
});
startB.addEventListener("click", () => {
  addTimerB(bTimer);
  startB.disabled = "disabled";
});