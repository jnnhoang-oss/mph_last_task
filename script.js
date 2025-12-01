/* paradigm:
  image shown 2000ms -> choices (until response) -> confidence (until confirm) -> fixation 1000-1500ms -> next trial
  includes subject ID, CSV download, choice and confidence RTs
*/

// ---------- CONFIG: put your images here ----------
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

// ---------- UI refs ----------
const idScreen = document.getElementById("idScreen");
const subjectIdInput = document.getElementById("subjectIdInput");
const startBtn = document.getElementById("startBtn");
const previewBtn = document.getElementById("previewBtn");

const trialArea = document.getElementById("trialArea");
const stimImg = document.getElementById("stimulus");
const fixation = document.getElementById("fixation");
const choicePanel = document.getElementById("choicePanel");
const choiceButtons = Array.from(document.querySelectorAll(".resp"));
const confidencePanel = document.getElementById("confidencePanel");
const confSlider = document.getElementById("confidence");
const confLabel = document.getElementById("confLabel");
const confirmBtn = document.getElementById("confirmBtn");

const progressText = document.getElementById("progressText");
const trialInfo = document.getElementById("trialInfo");
const endArea = document.getElementById("endArea");
const summaryText = document.getElementById("summaryText");
const downloadBtn = document.getElementById("downloadBtn");
const restartBtn = document.getElementById("restartBtn");

// ---------- Variables ----------
let subjectID = null;
let trials = []; // {img, trueLabel}
let currentIndex = 0;
let results = [];

const IMAGE_DURATION = 2000; // ms
const FIX_MIN = 1000; // ms
const FIX_MAX = 1500; // ms

// RT tracking
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

// ---------- Build trials ----------
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

// ---------- UI flow ----------
startBtn.addEventListener("click", ()=>{
  const v = subjectIdInput.value.trim();
  if(!v){ alert("Please enter Subject ID."); return; }
  subjectID = v;
  idScreen.classList.add("hidden");
  trialArea.classList.remove("hidden");
  prepareTrials();
  loadTrial(currentIndex);
});

previewBtn.addEventListener("click", ()=> {
  // quick preview of all images in a new window (optional)
  const urls = [...oldImages,...newImages].map(i=>i.url);
  const win = window.open("", "_blank");
  win.document.write("<h3>Image preview</h3>");
  urls.forEach(u=> win.document.write(`<img src="${u}" style="max-width:400px;display:block;margin:8px 0;">`));
});

// Load a trial: show image for IMAGE_DURATION then choices
function loadTrial(index){
  if(index >= trials.length){ finishExp(); return; }
  const t = trials[index];
  progressText.textContent = `${index+1} / ${trials.length}`;
  trialInfo.textContent = `Trial ${index+1} of ${trials.length}`;

  // reset UI
  stimImg.style.display = "block";
  stimImg.src = t.img.url;
  fixation.classList.add("hidden");
  choicePanel.classList.add("hidden");
  confidencePanel.classList.add("hidden");
  choiceButtons.forEach(b=>b.classList.remove("active"));

  // show image for fixed duration
  setTimeout(()=>{
    // hide image
    stimImg.style.display = "none";
    // show choices and start choice timer
    showChoices();
  }, IMAGE_DURATION);
}

function showChoices(){
  choicePanel.classList.remove("hidden");
  t_choice_shown = performance.now();
  // focus first button for accessibility
  choiceButtons[0].focus();
}

choiceButtons.forEach(btn=>{
  btn.addEventListener("click", ()=> {
    // record choice RT
    t_choice_made = performance.now();
    const rt_choice = Math.round(t_choice_made - t_choice_shown);

    // mark active
    choiceButtons.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    // store partial data (we will add confidence later)
    const sel = btn.dataset.value;
    const trialRec = {
      subjectID,
      trialIndex: currentIndex+1,
      imgId: trials[currentIndex].img.id || trials[currentIndex].img.url,
      imgURL: trials[currentIndex].img.url,
      trueLabel: trials[currentIndex].trueLabel,
      response: sel,
      rt_choice_ms: rt_choice,
      ts_choice: new Date().toISOString()
    };
    // put it temporarily in results as last entry (will update with confidence)
    results.push(trialRec);

    // hide choices, show confidence
    choicePanel.classList.add("hidden");
    showConfidence();
  });
});

function showConfidence(){
  confidencePanel.classList.remove("hidden");
  t_conf_shown = performance.now();
  confSlider.value = 50;
  confLabel.textContent = 50;
  confSlider.focus();
}

confSlider.addEventListener("input", ()=> {
  confLabel.textContent = confSlider.value;
});

confirmBtn.addEventListener("click", submitConfidence);

// keyboard: 1-4 for choices; Enter confirms in confidence
document.addEventListener("keydown", (e)=>{
  // don't intercept when id screen visible
  if(!subjectID) return;
  // if choices visible allow 1-4
  if(!choicePanel.classList.contains("hidden") && ["1","2","3","4"].includes(e.key)){
    const idx = Number(e.key)-1;
    const btn = choiceButtons[idx];
    if(btn) btn.click();
  }
  // if confidence visible Enter confirms
  if(!confidencePanel.classList.contains("hidden") && e.key === "Enter"){
    e.preventDefault();
    submitConfidence();
  }
});

// confirm confidence and proceed to fixation -> next trial
function submitConfidence(){
  if(confidencePanel.classList.contains("hidden")) return;
  t_conf_made = performance.now();
  const rt_conf = Math.round(t_conf_made - t_conf_shown);
  const confVal = confSlider.value;

  // update last results entry
  const last = results[results.length-1];
  last.conf = confVal;
  last.rt_conf_ms = rt_conf;
  last.ts_conf = new Date().toISOString();

  // advance trial index
  currentIndex++;

  // hide confidence and show fixation
  confidencePanel.classList.add("hidden");
  showFixationThenNext();
}

function showFixationThenNext(){
  fixation.classList.remove("hidden");
  fixation.style.fontSize = "48px";
  fixation.style.lineHeight = "1";
  fixation.textContent = "+";
  // random pause between FIX_MIN and FIX_MAX
  const wait = randFix();
  setTimeout(()=>{
    fixation.classList.add("hidden");
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
  const header = ["subjectID","trialIndex","imgId","imgURL","trueLabel","response","conf","rt_choice_ms","rt_conf_ms","ts_choice","ts_conf"];
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

// Initial preload of images in the lists (optional)
preload([...oldImages, ...newImages]);
