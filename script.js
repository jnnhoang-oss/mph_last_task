// SUBJECT ID
let subjectID = null;

// IMAGE LISTS ------------------------------------
const oldImages = [
  { id: "old_01", url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1400&q=80" },
  { id: "old_02", url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1400&q=80" },
  { id: "old_03", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80" }
];

const newImages = [
  { id: "new_01", url: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1400&q=80" },
  { id: "new_02", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=80" },
  { id: "new_03", url: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?w=1400&q=80" }
];

const totalTrials = oldImages.length + newImages.length;

// UI elements -------------------------------------
const idScreen = document.getElementById("idScreen");
const subjectIdInput = document.getElementById("subjectIdInput");
const startBtn = document.getElementById("startBtn");
const headerBlock = document.getElementById("headerBlock");
const trialArea = document.getElementById("trialArea");
const endArea = document.getElementById("endArea");

const stimImg = document.getElementById("stimulus");
const responseButtons = Array.from(document.querySelectorAll(".resp"));
const confidencePanel = document.getElementById("confidencePanel");
const confSlider = document.getElementById("confidence");
const confLabel = document.getElementById("confLabel");
const confirmBtn = document.getElementById("confirmBtn");
const trialInfo = document.getElementById("trialInfo");
const progressText = document.getElementById("progressText");
const summaryText = document.getElementById("summaryText");
const downloadBtn = document.getElementById("downloadBtn");
const restartBtn = document.getElementById("restartBtn");

// experiment variables -----------------------------
let trials = [];
let currentIndex = 0;
let selectedResponse = null;
let results = [];

// START BUTTON ------------------------------------
startBtn.addEventListener("click", () => {
  const val = subjectIdInput.value.trim();
  if(val === ""){
    alert("Please enter a valid Subject ID.");
    return;
  }
  subjectID = val;

  idScreen.classList.add("hidden");
  headerBlock.classList.remove("hidden");
  trialArea.classList.remove("hidden");

  initTrials();
});

// TRIAL SETUP -------------------------------------
function initTrials(){
  trials = [];
  oldImages.forEach(i => trials.push({ img: i, trueLabel: "old" }));
  newImages.forEach(i => trials.push({ img: i, trueLabel: "new" }));

  // Shuffle
  for(let i = trials.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [trials[i], trials[j]] = [trials[j], trials[i]];
  }

  currentIndex = 0;
  results = [];
  updateProgress();
  loadTrial(currentIndex);
}

function updateProgress(){
  progressText.textContent = `${currentIndex + (currentIndex < trials.length ? 1 : 0)} / ${totalTrials}`;
}

function loadTrial(index){
  if(index >= trials.length){
    finishExp();
    return;
  }

  selectedResponse = null;
  responseButtons.forEach(b => b.classList.remove("active"));
  confidencePanel.classList.add("hidden");
  confSlider.value = 50;
  confLabel.textContent = 50;

  const t = trials[index];
  stimImg.src = t.img.url;
  t.startTime = performance.now();

  trialInfo.textContent = `Trial ${index + 1} of ${trials.length}.`;
  updateProgress();
}

// RESPONSE SELECTION --------------------------------
responseButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    responseButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedResponse = btn.dataset.value;
    confidencePanel.classList.remove("hidden");
  });
});

confSlider.addEventListener("input", () => {
  confLabel.textContent = confSlider.value;
});

confirmBtn.addEventListener("click", submitResponse);

document.addEventListener("keydown", (e) => {
  if(!trialArea.classList.contains("hidden")){
    if(["1","2","3","4"].includes(e.key)){
      const idx = Number(e.key) - 1;
      responseButtons[idx].click();
    }
    if(e.key === "Enter" && !confidencePanel.classList.contains("hidden")){
      submitResponse();
    }
  }
});

// SUBMIT TRIAL -------------------------------------
function submitResponse(){
  if(selectedResponse === null){
    alert("Choose a response first.");
    return;
  }

  const t = trials[currentIndex];
  const rt = Math.round(performance.now() - t.startTime);

  results.push({
    subjectID: subjectID,
    trialIndex: currentIndex + 1,
    imgId: t.img.id,
    imgURL: t.img.url,
    trueLabel: t.trueLabel,
    response: selectedResponse,
    confidence: confSlider.value,
    rt_ms: rt,
    timestamp: new Date().toISOString()
  });

  currentIndex++;
  if(currentIndex < trials.length){
    loadTrial(currentIndex);
  } else {
    finishExp();
  }
}

// END SCREEN ---------------------------------------
function finishExp(){
  trialArea.classList.add("hidden");
  endArea.classList.remove("hidden");

  const n = results.length;
  summaryText.textContent = `Completed ${n} trials. Subject ID: ${subjectID}.`;
}

// CSV ----------------------------------------------
downloadBtn.addEventListener("click", () => {
  const header = Object.keys(results[0]);
  const csv = [
    header.join(","),
    ...results.map(r => header.map(h => `"${String(r[h]).replace(/"/g,'""')}"`).join(","))
  ].join("\n");

  const blob = new Blob([csv], {type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `nmph_mtest_TI_${subjectID}.csv`;
  a.click();
  URL.revokeObjectURL(url);
});

// RESTART -------------------------------------------
restartBtn.addEventListener("click", () => {
  endArea.classList.add("hidden");
  headerBlock.classList.remove("hidden");
  trialArea.classList.remove("hidden");
  initTrials();
});
