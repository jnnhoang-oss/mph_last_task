// Core structure
const anticipationScreen = document.getElementById("anticipationScreen");
const imageScreen = document.getElementById("imageScreen");
const responseScreen = document.getElementById("responseScreen");
const confidenceScreen = document.getElementById("confidenceScreen");
const endScreen = document.getElementById("endScreen");

const imgStage = document.getElementById("imgStage");

let responses = [];
let trialIndex = 0;
let itiDuration = 0;

// Placeholder image list
const images = ["img1.jpg", "img2.jpg", "img3.jpg"]; // replace with your image paths

// Buttons
const antYes = document.getElementById("antYes");
const antNo = document.getElementById("antNo");
let anticipationAnswer = null;

antYes.onclick = () => (anticipationAnswer = "Yes");
antNo.onclick = () => (anticipationAnswer = "No");

document.getElementById("startBtn").onclick = () => {
  if (!anticipationAnswer) return;
  anticipationScreen.classList.remove("active");
  runTrial();
};

function runTrial() {
  if (trialIndex >= images.length) {
    endExperiment();
    return;
  }

  // Fix ITI between 1–1.5s
  itiDuration = 1000 + Math.random() * 500;

  // blank ITI
  setTimeout(() => showImage(), itiDuration);
}

function showImage() {
  imageScreen.classList.add("active");
  imgStage.textContent = "";
  imgStage.style.backgroundImage = `url(${images[trialIndex]})`;
  imgStage.style.backgroundSize = "contain";
  imgStage.style.backgroundRepeat = "no-repeat";
  imgStage.style.backgroundPosition = "center";

  setTimeout(() => {
    imageScreen.classList.remove("active");
    startResponse();
  }, 2000); // 2s image
}

let currentResponse = null;

function startResponse() {
  currentResponse = { iti: itiDuration, image: images[trialIndex] };
  responseScreen.classList.add("active");

  document.onkeydown = (e) => {
    if (e.key.toLowerCase() === "f") {
      currentResponse.choice = "New";
      responseScreen.classList.remove("active");
      askConfidence();
    }
    if (e.key.toLowerCase() === "j") {
      currentResponse.choice = "Old";
      responseScreen.classList.remove("active");
      askConfidence();
    }
  };
}

function askConfidence() {
  confidenceScreen.classList.add("active");

  document.onkeydown = (e) => {
    if (["1", "2", "3", "4", "5"].includes(e.key)) {
      currentResponse.confidence = e.key;
      responses.push(currentResponse);
      confidenceScreen.classList.remove("active");
      trialIndex++;
      runTrial();
    }
  };
}

function endExperiment() {
  endScreen.classList.add("active");

  document.getElementById("downloadCSV").onclick = () => {
    let csv = "image,choice,confidence,iti\n";
    responses.forEach(r => {
      csv += `${r.image},${r.choice},${r.confidence},${r.iti}` + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "memory_test.csv";
    a.click();
  };

  document.getElementById("restartBtn").onclick = () => {
    location.reload();
  };
}
