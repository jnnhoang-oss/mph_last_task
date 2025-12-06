// -------------------------------------------------------
// Surprise Memory Test Script (with ITI recording)
// -------------------------------------------------------

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

// -----------------------------------------------
// Example stimuli — replace with your actual list
// -----------------------------------------------
const stimuli = [
  { filename: "img1.jpg", old: 1 },
  { filename: "img2.jpg", old: 0 },
];

let currentIndex = 0;
let trials = [];
let currentImage = null;
let oldNewResponse = null;
let itiDuration = null;

// -------------------------------------------------------
// Utility: show/hide screens
// -------------------------------------------------------
function show(screen) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

// -------------------------------------------------------
function loadImage(file) {
  return `<img src="images/${file}" class="stim-img"/>`;
}

// -------------------------------------------------------
// Start test
// -------------------------------------------------------
startBtn.addEventListener("click", () => {
  const id = document.getElementById("subid").value.trim();
  if (id === "") {
    alert("Please enter participant ID.");
    return;
  }

  currentIndex = 0;
  trials = [];
  beginTrial();
});

// -------------------------------------------------------
// Begin trial
// -------------------------------------------------------
function beginTrial() {
  if (currentIndex >= stimuli.length) {
    finishTest();
    return;
  }

  // random ITI between 1.0 and 1.5 sec
  itiDuration = 1000 + Math.random() * 500;

  progressIndicator.textContent = `Trial ${currentIndex + 1} / ${stimuli.length}`;

  currentImage = stimuli[currentIndex];
  oldNewResponse = null;

  imgStage.innerHTML = loadImage(currentImage.filename);
  show(imageScreen);

  // Show image for 2 sec → then NEW/OLD prompt
  setTimeout(() => {
    imgStage.innerHTML = "";
    show(choiceScreen);
  }, 2000);
}

// -------------------------------------------------------
// Key responses
// -------------------------------------------------------
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  // NEW / OLD
  if (choiceScreen.classList.contains("active")) {
    if (key === "f") {
      oldNewResponse = "F";
      show(confidenceScreen);
    }
    if (key === "j") {
      oldNewResponse = "J";
      show(confidenceScreen);
    }
    return;
  }

  // Confidence 1–5
  if (confidenceScreen.classList.contains("active")) {
    if (["1", "2", "3", "4", "5"].includes(key)) {
      storeTrial(Number(key));
    }
  }
});

// -------------------------------------------------------
// Store trial + ITI pause
// -------------------------------------------------------
function storeTrial(conf) {
  trials.push({
    participant: document.getElementById("subid").value.trim(),
    filename: currentImage.filename,
    actual_old: currentImage.old,
    response_oldnew: oldNewResponse,
    confidence: conf,
    iti_ms: Math.round(itiDuration)                 // <-- SAVE ITI HERE
  });

  // Wait for ITI then show next trial
  setTimeout(() => {
    currentIndex++;
    beginTrial();
  }, itiDuration);
}

// -------------------------------------------------------
function finishTest() {
  show(endScreen);
  progressIndicator.textContent = "Complete";
}

// -------------------------------------------------------
downloadCSV.addEventListener("click", () => {
  let csv = "participant,filename,actual_old,response_oldnew,confidence,iti_ms\n";
  trials.forEach(t => {
    csv += `${t.participant},${t.filename},${t.actual_old},${t.response_oldnew},${t.confidence},${t.iti_ms}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "memory_test.csv";
  a.click();
});

// -------------------------------------------------------
downloadJSON.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(trials, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "memory_test.json";
  a.click();
});

// -------------------------------------------------------
restartBtn.addEventListener("click", () => {
  location.reload();
});
