// nmph_mtest_TI — MATLAB-paradigm faithful web version
// Sequence: image 2000ms -> choices (F/J until response) -> confidence (1-5) -> fixation 1000-1500ms -> next

// ---------- CONFIG / IMAGES ----------
const oldImages = [
  { id: "old_01", url: "img/old_01.jpg" },
  { id: "old_02", url: "img/old_02.jpg" },
  { id: "old_03", url: "img/old_03.jpg" }
];

const newImages = [
  { id: "new_01", url: "img/new_01.jpg" },
  { id: "new_02", url: "img/new_02.jpg" },
  { id: "new_03", url: "img/new_03.jpg" }
];

// Timing constants
const IMAGE_DURATION = 2000; // ms
const FIX_MIN = 1000; // ms
const FIX_MAX = 1500; // ms

// ---------- UI refs ----------
const idScreen = document.getElementById("idScreen");
const subjectIdInput = document.getElementById("subjectIdInput");
const startBtn = document.getElementById("startBtn");

const trialArea = document.getElementById("trialArea");
const stimImg = document.getElementById("stimulus");
const fixation = document.getElementById("fixation");
const choicePanel = document.getElementById("choicePanel");
const choiceBtns = Array.from(document.querySelectorAll(".choiceBtn"));
const confidencePanel = document.getElementById("confidencePanel");
const confBtns = Array.from(document.querySelectorAll(".confBtn"));
const progressText = document.getElementById("progressText");
const trialInfo = document.getElementById("trialInfo");
const endArea = document.getElementById("endArea");
const summaryText = document.getElementById("summaryText");
const downloadBtn = document.getElementById("downloadBtn");
const restartBtn = document.getElementById("restartBtn");

// ---------- State ----------
let subjectID = null;
let trials = []; // {img:..., trueLabel: 'old'|'new'}
let currentIndex = 0;
let results = [];

// RT trackers
let t_choice_shown = 0;
let t_choice_made = 0;
let t_conf_shown = 0;
let t_conf_made = 0;

// ---------- Helpers ----------
function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
}
function randFix(){ return FIX_MIN + Math.floor(Math.random()*(FIX_MAX-FIX_MIN+1)); }
function preload(list){
  list.forEach(it=>{
    const i=new Image(); i.src=it.url;
  });
}

// Build trial list (balanced old/new)
function prepareTrials(){
  trials = [];
  oldImages.forEach(i=>trials.push({img:i,trueLabel:"old"}));
  newImages.forEach(i=>trials.push({img:i,trueLabel:"new"}));
  shuffle(trials);
  currentIndex = 0;
  results = [];
  progressText.textContent = `0 / ${trials.length}`;
  preload(trials.map(t=>t.img));
}

// ---------- Start ----------
startBtn.addEventListener("click", ()=>{
  const v = subjectIdInput.value.trim();
  if(!v){ alert("Please enter Subject ID."); return; }
  subjectID = v;
  idScreen.classList.add("hidden");
  trialArea.classList.remove("hidden");
  prepareTrials();
  loadTrial(currentIndex);
});

// ---------- Trial flow ----------
function loadTrial(idx){
  if(idx >= trials.length){ finishExp(); return; }
  const t = trials[idx];
  progressText.textContent = `${idx+1} / ${trials.length}`;
  trialInfo.textContent = `Trial ${idx+1} of ${trials.length}`;

  // Reset UI
  fixation.classList.add("hidden");
  choicePanel.classList.add("hidden");
  confidencePanel.classList.add("hidden");
  stimImg.style.display = "block";
  stimImg.src = t.img.url;

  // Show image for fixed duration
  setTimeout(()=>{
    // hide image and show choices
    stimImg.style.display = "none";
    showChoices();
  }, IMAGE_DURATION);
}

function showChoices(){
  choicePanel.classList.remove("hidden");
  t_choice_shown = performance.now();
  // focus first choice for accessibility
  choiceBtns[0].focus();
}

// choice handling (click)
choiceBtns.forEach(btn=>{
  btn.addEventListener("click", ()=> {
    const sel = btn.dataset.value; // 'new' or 'old'
    recordChoice(sel);
  });
});

// keyboard choice handling: F (new), J (old) — accept uppercase/lowercase
document.addEventListener("keydown", (e)=>{
  if(!subjectID) return; // not started
  // If choice panel visible
  if(!choicePanel.classList.contains("hidden")){
    if(e.key.toLowerCase() === 'f'){ recordChoice('new'); }
    if(e.key.toLowerCase() === 'j'){ recordChoice('old'); }
  }
  // Confidence keys 1-5
  if(!confidencePanel.classList.contains("hidden")){
    if(['1','2','3','4','5'].includes(e.key)){
      recordConfidence(e.key);
    }
    // Enter confirms after clicking; allow Enter to continue (if last click set a value)
    if(e.key === 'Enter'){
      // If a conf button has active attr, treat it as confirmation
      const active = confBtns.find(b=>b.dataset.active === "true");
      if(active) {
        // already recorded and advanced, ignore
      } else {
        // do nothing unless a conf recorded by click; user should press 1-5
      }
    }
  }
});

// record choice (single)
function recordChoice(sel){
  // don't double-record if choicePanel hidden
  if(choicePanel.classList.contains("hidden")) return;
  t_choice_made = performance.now();
  const rt_choice = Math.round(t_choice_made - t_choice_shown);

  // Determine accuracy
  const t = trials[currentIndex];
  const acc = ((t.trueLabel === sel) ? 1 : 0);

  // Save partial result (will add confidence later)
  const rec = {
    subjectID,
    trialIndex: currentIndex + 1,
    imgId: t.img.id || t.img.url,
    imgURL: t.img.url,
    trueLabel: t.trueLabel,
    response: sel,
    acc,
    rt_choice_ms: rt_choice,
    ts_choice: new Date().toISOString()
  };
  results.push(rec);

  // hide choices, show confidence
  choicePanel.classList.add("hidden");
  showConfidence();
}

function showConfidence(){
  confidencePanel.classList.remove("hidden");
  t_conf_shown = performance.now();
  // clear any active marker on buttons
  confBtns.forEach(b => { b.removeAttribute('data-active'); b.classList.remove('active'); });
  confBtns[0].focus();
}

// confidence click handlers
confBtns.forEach(btn=>{
  btn.addEventListener("click", () => {
    const val = btn.dataset.value;
    recordConfidence(val);
  });
});

function recordConfidence(val){
  // don't double-record
  if(confidencePanel.classList.contains("hidden")) return;
  t_conf_made = performance.now();
  const rt_conf = Math.round(t_conf_made - t_conf_shown);

  // update last result entry
  const last = results[results.length - 1];
  if(!last){
    console.warn("No prior choice recorded for confidence — ignoring.");
    return;
  }
  last.conf = Number(val);
  last.rt_conf_ms = rt_conf;
  last.ts_conf = new Date().toISOString();

  // optionally mark active UI
  confBtns.forEach(b => { b.removeAttribute('data-active'); b.classList.remove('active'); });
  const clicked = confBtns.find(b=>b.dataset.value === String(val));
  if(clicked){ clicked.setAttribute('data-active', 'true'); clicked.classList.add('active'); }

  // proceed to fixation then next trial
  // small delay to allow user to see their selection (50ms)
  setTimeout(()=> {
    confidencePanel.classList.add('hidden');
    showFixationThenNext();
  }, 50);
}

function showFixationThenNext(){
  fixation.classList.remove("hidden");
  const wait = randFix();
  setTimeout(()=>{
    fixation.classList.add("hidden");
    currentIndex++;
    loadTrial(currentIndex);
  }, wait);
}

function finishExp(){
  trialArea.classList.add("hidden");
  endArea.classList.remove("hidden");
  summaryText.textContent = `Completed ${results.length} trials. Subject: ${subjectID}`;
}

// CSV download
downloadBtn.addEventListener("click", ()=>{
  if(results.length === 0){ alert("No results to download."); return; }
  const header = ["subjectID","trialIndex","imgId","imgURL","trueLabel","response","acc","rt_choice_ms","rt_conf_ms","ts_choice","ts_conf"];
  const csvRows = [header.join(",")];
  results.forEach(r=>{
    const row = header.map(h=>{
      let v = r[h] ?? "";
      v = String(v).replace(/"/g,'""');
      if(v.includes(",")||v.includes('"')||v.includes("\n")) return `"${v}"`;
      return v;
    }).join(",");
    csvRows.push(row);
  });
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `nmph_mtest_TI_${subjectID || "sub"}.csv`;
  a.click();
  URL.revokeObjectURL(url);
});

// restart
restartBtn.addEventListener("click", ()=>{
  endArea.classList.add("hidden");
  idScreen.classList.remove("hidden");
  subjectIdInput.value = subjectID || "";
});

// initial preload
preload([...oldImages, ...newImages]);
