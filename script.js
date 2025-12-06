// -----------------------
// Surprise Memory Test JS
// -----------------------

let trials = [];          // all recorded trials
let currentIndex = 0;     // which trial we’re on
let currentImage = null;  // active image stimulus

// -----------------------
// Elements
// -----------------------
const idScreen = document.getElementById("idScreen");
const imageScreen = document.getElementById("imageScreen");
const choiceScreen = document.getElementById("choiceScreen");
const confidenceScreen = document.getElementById("confidenceScreen");
const endScreen = document.getElementById("endScreen");

const imgStage = document.getElementById("imgStage");
const progressIndicator = document.getElementById("progressIndicator");

const startBtn = document.getElementById("startBtn");
const downloadCSV = document.getElementById("downloadCSV");
const downloadJSON = document.getElementById("downloadJSON");
const restartBtn = document.getElementById("restartBtn");

// Example stimuli — replace with your real list
// Must match your folder and naming
const stimuli = [
  { filename: "img1.jpg", old: 1 },
  { filename: "img2.jpg", old: 0 },
  { filename: "img3.jpg", old: 1 },
  { filename: "img4.jpg", old: 0 }
];

// -----------------------
// Utility
// -----------------------
function show(screen) {
  [idScreen, imageScreen, choiceScreen, confidenceScreen, endScreen].forEach(s =>
    s.classList.remove("active")
  );
  screen.classList.add("active");
}

function loadImage(file) {
  return `<img src="images/${file}" class="stim-img"/>`;
}

// -----------------------
// Trial flow
// -----------------------
startBtn.addEventListener("click", () => {
  if (!document.getElementById("subid").value.trim()) {
