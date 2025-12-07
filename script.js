// -------------------------
// script.js — fixed & robust
// -------------------------

// ----- Image lists (unchanged) -----
const oldImages = [
  { src: "oldpics/aardvark.jpg", isOld: true },
  { src: "oldpics/anteater.jpg", isOld: true },
  { src: "oldpics/brown_bear.jpg", isOld: true },
  { src: "oldpics/camel.jpg", isOld: true },
  { src: "oldpics/canary.jpg", isOld: true },
  { src: "oldpics/carp.jpg", isOld: true },
  { src: "oldpics/caterpillarhawkmoth.jpg", isOld: true },
  { src: "oldpics/catfish.jpg", isOld: true },
  { src: "oldpics/chipmunk.jpg", isOld: true },
  { src: "oldpics/cranebug.jpg", isOld: true },
  { src: "oldpics/cricket.jpg", isOld: true },
  { src: "oldpics/elephantafrican.jpg", isOld: true },
  { src: "oldpics/finch.jpg", isOld: true },
  { src: "oldpics/firebug.jpg", isOld: true },
  { src: "oldpics/flea.jpg", isOld: true },
  { src: "oldpics/gerbil.jpg", isOld: true },
  { src: "oldpics/giraffe.jpg", isOld: true },
  { src: "oldpics/goldfish.jpg", isOld: true },
  { src: "oldpics/halibut.jpg", isOld: true },
  { src: "oldpics/herculesbeetle.jpg", isOld: true },
  { src: "oldpics/herring.jpg", isOld: true },
  { src: "oldpics/horse.jpg", isOld: true },
  { src: "oldpics/hyena.jpg", isOld: true },
  { src: "oldpics/leopard.jpg", isOld: true },
  { src: "oldpics/llama.jpg", isOld: true },
  { src: "oldpics/marmot.jpg", isOld: true },
  { src: "oldpics/mouse.jpg", isOld: true },
  { src: "oldpics/ostrich.jpg", isOld: true },
  { src: "oldpics/palmcockatoo.jpg", isOld: true },
  { src: "oldpics/partridge.jpg", isOld: true },
  { src: "oldpics/pelican.jpg", isOld: true },
  { src: "oldpics/perch.jpg", isOld: true },
  { src: "oldpics/pigeon.jpg", isOld: true },
  { src: "oldpics/pike.jpg", isOld: true },
  { src: "oldpics/porcupine.jpg", isOld: true },
  { src: "oldpics/prayingmantis.jpg", isOld: true },
  { src: "oldpics/rabbit.jpg", isOld: true },
  { src: "oldpics/reindeer.jpg", isOld: true },
  { src: "oldpics/salmon.jpg", isOld: true },
  { src: "oldpics/shark.jpg", isOld: true },
  { src: "oldpics/sheep.jpg", isOld: true },
  { src: "oldpics/shrimp.jpg", isOld: true },
  { src: "oldpics/skunk.jpg", isOld: true },
  { src: "oldpics/snail.jpg", isOld: true },
  { src: "oldpics/starfish.jpg", isOld: true },
  { src: "oldpics/tiger.jpg", isOld: true },
  { src: "oldpics/turkey.jpg", isOld: true },
  { src: "oldpics/waterbuffalo.jpg", isOld: true },
];

const newImages = [
  { src: "newpic/alligator.jpg", isOld: false },
  { src: "newpic/angelfish.jpg", isOld: false },
  { src: "newpic/ant.jpg", isOld: false },
  { src: "newpic/armadillo.jpg", isOld: false },
  { src: "newpic/assassinbug.jpg", isOld: false },
  { src: "newpic/baboon.jpg", isOld: false },
  { src: "newpic/badger.jpg", isOld: false },
  { src: "newpic/baldeagle.jpg", isOld: false },
  { src: "newpic/bat.jpg", isOld: false },
  { src: "newpic/beaver.jpg", isOld: false },
  { src: "newpic/bluejay.jpg", isOld: false },
  { src: "newpic/boar.jpg", isOld: false },
  { src: "newpic/bull.jpg", isOld: false },
  { src: "newpic/butterfly.jpg", isOld: false },
  { src: "newpic/cardinal.jpg", isOld: false },
  { src: "newpic/caribou.jpg", isOld: false },
  { src: "newpic/cat.jpg", isOld: false },
  { src: "newpic/caterpillarpeacockmoth.jpg", isOld: false },
  { src: "newpic/cedarwaxwing.jpg", isOld: false },
  { src: "newpic/chameleon.jpg", isOld: false },
  { src: "newpic/cheetah.jpg", isOld: false },
  { src: "newpic/chimpanzee.jpg", isOld: false },
  { src: "newpic/clownfish.jpg", isOld: false },
  { src: "newpic/cobra.jpg", isOld: false },
  { src: "newpic/cockroach.jpg", isOld: false },
  { src: "newpic/cougar.jpg", isOld: false },
  { src: "newpic/cow.jpg", isOld: false },
  { src: "newpic/crab.jpg", isOld: false },
  { src: "newpic/crow.jpg", isOld: false },
  { src: "newpic/dolphin.jpg", isOld: false },
  { src: "newpic/dragonfly.jpg", isOld: false },
  { src: "newpic/dramaderry.jpg", isOld: false },
  { src: "newpic/duck.jpg", isOld: false },
  { src: "newpic/eagle.jpg", isOld: false },
  { src: "newpic/fennec.jpg", isOld: false },
  { src: "newpic/flamingo.jpg", isOld: false },
  { src: "newpic/gecko.jpg", isOld: false },
  { src: "newpic/gorilla.jpg", isOld: false },
  { src: "newpic/hummingbird.jpg", isOld: false },
  { src: "newpic/mahimahi.jpg", isOld: false },
  { src: "newpic/mink.jpg", isOld: false },
  { src: "newpic/mole.jpg", isOld: false },
  { src: "newpic/quail.jpg", isOld: false },
  { src: "newpic/racoon.jpg", isOld: false },
  { src: "newpic/rhino.jpg", isOld: false },
  { src: "newpic/seal.jpg", isOld: false },
  { src: "newpic/snapper.jpg", isOld: false },
  { src: "newpic/zebra.jpg", isOld: false },
];

// ----- Build trials and shuffle -----
const allImages = [...oldImages, ...newImages];
shuffle(allImages);
const trials = allImages.slice(); // array of trial objects (src + isOld)

function shuffle(a){
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

// ----- ITI function (1.0 - 1.5 s) -----
function randomITI(){
  return 1000 + Math.random() * 500;
}

// ----- DOM references -----
const screens = {
  id: document.getElementById('idScreen'),
  instructions: document.getElementById('instructionsScreen'),
  memoryInstructions: document.getElementById('memoryInstructionsScreen'),
  question1: document.getElementById('question1Screen'),
  question2: document.getElementById('question2Screen'),
  ready: document.getElementById('readyScreen'),
  image: document.getElementById('imageScreen'),
  choice: document.getElementById('choiceScreen'),
  confidence: document.getElementById('confidenceScreen'),
  feedback: document.getElementById('feedbackScreen'),
  rest: document.getElementById('restScreen'),
  typicalityInstructions: document.getElementById('typicalityInstructionsScreen'),
  typicality: document.getElementById('typicalityScreen'),
  end: document.getElementById('endScreen'),
};

const subidInput = document.getElementById('subid');
const progressIndicator = document.getElementById('progressIndicator');
const imgStage = document.getElementById('imgStage');
const debugLog = document.getElementById('debugLog') || null;
const startTypicalityBtn = document.getElementById('startTypicalityBtn');

// ----- State -----
const state = {
  subj: null,
  q1_anticipation: null,
  q2_thinking: null,
  trialIndex: 0,
  results: [],
  typicalityIndex: 0,
  typicalityResults: [],
  experimentStartTime: null,
  oldImagesShuffled: []
};

// ----- helper: safe show screen and update progress -----
function showScreen(name){
  Object.values(screens).forEach(s => s && s.classList.remove('active'));
  const screenEl = screens[name];
  if(screenEl) screenEl.classList.add('active');

  // update progress indicator
  if(name === 'image' || name === 'choice' || name === 'confidence' || name === 'feedback'){
    progressIndicator.textContent = `Trial ${Math.min(state.trialIndex + 1, trials.length)} / ${trials.length}`;
  } else if(name === 'rest'){
    progressIndicator.textContent = 'Rest Break';
  } else if(name === 'typicality' || name === 'typicalityInstructions'){
    progressIndicator.textContent = 'Phase 2: Typicality Rating';
  } else if(name === 'end'){
    progressIndicator.textContent = 'Completed';
  } else {
    progressIndicator.textContent = '';
  }
}

// ----- ID input Enter handler -----
subidInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    const id = subidInput.value.trim();
    if(!id){
      alert("Please enter a Participant ID");
      return;
    }
    state.subj = id;
    showScreen('instructions');
  }
});

// ----- Pre-test Q1 handler -----
function handleQuestion1(){
  showScreen('question1');

  function onKey(e){
    if(['1','2','3','4','5'].includes(e.key)){
      state.q1_anticipation = e.key;
      document.querySelectorAll('#q1Scale .rating-option').forEach(o => o.classList.remove('selected'));
      const sel = document.querySelector(`#q1Scale .rating-option[data-value="${e.key}"]`);
      if(sel) sel.classList.add('selected');
      window.removeEventListener('keydown', onKey);
      setTimeout(handleQuestion2, 300);
    }
  }
  window.addEventListener('keydown', onKey);
}

// ----- Pre-test Q2 handler -----
function handleQuestion2(){
  showScreen('question2');

  function onKey(e){
    if(['1','2','3','4','5'].includes(e.key)){
      state.q2_thinking = e.key;
      document.querySelectorAll('#q2Scale .rating-option').forEach(o => o.classList.remove('selected'));
      const sel = document.querySelector(`#q2Scale .rating-option[data-value="${e.key}"]`);
      if(sel) sel.classList.add('selected');
      window.removeEventListener('keydown', onKey);
      setTimeout(() => showScreen('ready'), 300);
    }
  }
  window.addEventListener('keydown', onKey);
}

// ----- Keyboard-driven navigation for instructions & ready -----
(function setupInstructionNavigation(){
  function onKey(e){
    // when on instructions screen, Enter -> memoryInstructions
    if(screens.instructions.classList.contains('active') && e.key === 'Enter'){
      window.removeEventListener('keydown', onKey);
      showScreen('memoryInstructions');
      // attach new listener for memoryInstructions -> question1
      function onKey2(ev){
        if(ev.key === 'Enter'){
          window.removeEventListener('keydown', onKey2);
          handleQuestion1();
        }
      }
      window.addEventListener('keydown', onKey2);
    }
  }
  window.addEventListener('keydown', onKey);
})();

// ----- Start memory test (preloads images) -----
async function startMemoryTest(){
  // preload all trial images
  try {
    await preloadAll(trials.map(t => t.src));
  } catch(e){
    console.warn("Preload error:", e);
  }

  state.trialIndex = 0;
  state.results = [];
  state.experimentStartTime = Date.now();
  showTrial();
}

// ----- Preload helper -----
function preloadAll(urls){
  return Promise.all(urls.map(url => {
    return new Promise(res => {
      const img = new Image();
      img.onload = () => res(true);
      img.onerror = () => {
        console.warn("Image failed to load:", url);
        res(false);
      };
      img.src = url;
    });
  }));
}

// ----- Trial flow ----- 
async function showTrial(){
  // finished?
  if(state.trialIndex >= trials.length){
    // proceed to typicality
    showTypicalityInstructions();
    return;
  }

  // rest break every 48 trials (after 48th, 96th etc.)
  if(state.trialIndex > 0 && state.trialIndex % 48 === 0){
    await showRestBreak();
  }

  const t = trials[state.trialIndex];

  // display image (with ITI before)
  const itiBefore = randomITI();
  // show blank fixation
  imgStage.innerHTML = "<div class='muted' style='font-size: 2rem;'>+</div>";
  showScreen('image');
  await wait(itiBefore);

  // show image for 2000 ms
  await displayImage(t.src, 2000);

  // get choice (F/J)
  const choice = await getChoiceResponse();

  // get confidence (1-5)
  const conf = await getConfidenceResponse();

  // determine correctness
  const isCorrect = (t.isOld && choice.resp === 'old') || (!t.isOld && choice.resp === 'new');

  // show feedback (1.5 s)
  await showFeedback(isCorrect);

  // compute ITI after trial (1.0 - 1.5 s)
  const itiAfter = randomITI();

  // record data
  state.results.push({
    subj: state.subj,
    q1_anticipated_test: state.q1_anticipation,
    q2_thinking_about_images: state.q2_thinking,
    trial: state.trialIndex + 1,
    image: t.src.split('/').pop(),
    imageType: t.isOld ? 'old' : 'new',
    response: choice.resp,
    responseRT: Math.round(choice.rt),
    confidence: conf.rating,
    confidenceRT: Math.round(conf.rt),
    correct: isCorrect,
    ITI_before_ms: Math.round(itiBefore),
    ITI_after_ms: Math.round(itiAfter),
    timestamp: new Date().toISOString()
  });

  if(debugLog) debugLog.textContent = JSON.stringify(state.results.slice(-5), null, 2);

  state.trialIndex++;
  // blank screen for ITI after
  imgStage.innerHTML = "";
  showScreen('image');
  await wait(itiAfter);

  // next trial
  showTrial();
}

function displayImage(src, ms){
  return new Promise(resolve => {
    imgStage.innerHTML = "";
    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";
    imgStage.appendChild(img);
    setTimeout(() => {
      // remove image visually
      imgStage.innerHTML = "<div class='muted'>[Image removed]</div>";
      resolve();
    }, ms);
  });
}

// ----- collect choice (F/J) -----
function getChoiceResponse(){
  return new Promise(resolve => {
    showScreen('choice');
    const start = performance.now();

    function onKey(e){
      const k = e.key.toLowerCase();
      if(k === 'f' || k === 'j'){
        window.removeEventListener('keydown', onKey);
        const resp = (k === 'f') ? 'new' : 'old';
        resolve({ resp, key: k, rt: performance.now() - start });
      }
    }

    // ensure no other handlers interfere
    window.addEventListener('keydown', onKey);
  });
}

// ----- collect confidence (1-5) -----
function getConfidenceResponse(){
  return new Promise(resolve => {
    showScreen('confidence');
    const start = performance.now();

    function onKey(e){
      if(['1','2','3','4','5'].includes(e.key)){
        window.removeEventListener('keydown', onKey);
        resolve({ rating: e.key, key: e.key, rt: performance.now() - start });
      }
    }

    window.addEventListener('keydown', onKey);
  });
}

// ----- feedback ----- 
function showFeedback(isCorrect){
  return new Promise(resolve => {
    showScreen('feedback');
    const feedbackText = document.getElementById('feedbackText');
    if(!feedbackText) return setTimeout(resolve, 1500);

    if(isCorrect){
      feedbackText.textContent = "Correct!";
      feedbackText.style.color = "#10b981"; // green
    } else {
      feedbackText.textContent = "Incorrect!";
      feedbackText.style.color = "#ef4444"; // red
    }

    setTimeout(() => resolve(), 1500);
  });
}

// ----- Rest break ----- 
function showRestBreak(){
  return new Promise(resolve => {
    showScreen('rest');
    const restDuration = 20; // seconds
    let remaining = restDuration;
    const restText = document.getElementById('restText');
    const restTimer = document.getElementById('restTimer');
    if(restText) restText.textContent = 'Take a break!';
    if(restTimer) restTimer.textContent = `Time remaining: ${remaining} seconds`;

    const interval = setInterval(() => {
      remaining--;
      if(restTimer) restTimer.textContent = `Time remaining: ${remaining} seconds`;
      if(remaining <= 0){
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

// ----- Typicality phase ----- 
function showTypicalityInstructions(){
  showScreen('typicalityInstructions');
}

// start typicality when button pressed (button present in HTML)
if(startTypicalityBtn){
  startTypicalityBtn.addEventListener('click', async () => {
    // shuffle old images for typicality
    state.oldImagesShuffled = [...oldImages];
    shuffle(state.oldImagesShuffled);
    state.typicalityIndex = 0;
    state.typicalityResults = [];
    await showTypicalityTrial();
  });
}

// typicality trial loop
async function showTypicalityTrial(){
  if(state.typicalityIndex >= state.oldImagesShuffled.length){
    autoDownloadResults();
    showScreen('end');
    return;
  }

  const img = state.oldImagesShuffled[state.typicalityIndex];
  showScreen('typicality');

  const typImg = document.getElementById('typicalityImage');
  const typQuestion = document.getElementById('typicalityQuestion');
  const typScale = document.getElementById('typicalityScale');
  const typLabels = document.getElementById('typicalityLabels');

  if(typImg){
    typImg.src = img.src;
    typImg.style.display = 'block';
  }
  if(typScale) typScale.style.display = 'none';
  if(typQuestion) typQuestion.style.display = 'none';
  if(typLabels) typLabels.style.display = 'none';

  await wait(2000);

  if(typImg) typImg.style.display = 'none';
  if(typScale) typScale.style.display = 'flex';
  if(typQuestion) typQuestion.style.display = 'block';
  if(typLabels) typLabels.style.display = 'flex';

  const rating = await getTypicalityRating();

  // record
  const iti = randomITI();
  state.typicalityResults.push({
    subj: state.subj,
    trial: state.typicalityIndex + 1,
    image: img.src.split('/').pop(),
    typicalityRating: rating.rating,
    typicalityRT: Math.round(rating.rt),
    ITI: Math.round(iti),
    timestamp: new Date().toISOString()
  });

  state.typicalityIndex++;
  await wait(iti);
  showTypicalityTrial();
}

function getTypicalityRating(){
  return new Promise(resolve => {
    const start = performance.now();
    function onKey(e){
      if(['1','2','3','4','5','6','7'].includes(e.key)){
        window.removeEventListener('keydown', onKey);
        resolve({ rating: e.key, key: e.key, rt: performance.now() - start });
      }
    }
    window.addEventListener('keydown', onKey);
  });
}

// ----- utilities ----- 
function wait(ms){
  return new Promise(res => setTimeout(res, ms));
}

// ----- CSV export helpers ----- 
function toCSV(arr){
  if(!arr || arr.length === 0) return "";
  const keys = Object.keys(arr[0]);
  const header = keys.join(",");
  const rows = arr.map(obj => keys.map(k => {
    const val = obj[k];
    if(val === null || val === undefined) return "";
    // escape quotes and commas by wrapping in quotes and escaping existing quotes
    const s = String(val).replace(/"/g, '""');
    return `"${s}"`;
  }).join(","));
  return [header, ...rows].join("\n");
}

function autoDownloadResults(){
  const createdAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

  // memory test CSV
  let csv1 = `created_at,${createdAt}\n\n`;
  csv1 += toCSV(state.results);
  const blob1 = new Blob([csv1], { type:'text/csv' });
  const link1 = document.createElement('a');
  link1.href = URL.createObjectURL(blob1);
  link1.download = `${state.subj}_memory_test.csv`;
  link1.click();

  // typicality CSV (small pause so browser doesn't block)
  setTimeout(() => {
    let csv2 = `created_at,${createdAt}\n\n`;
    csv2 += toCSV(state.typicalityResults);
    const blob2 = new Blob([csv2], { type:'text/csv' });
    const link2 = document.createElement('a');
    link2.href = URL.createObjectURL(blob2);
    link2.download = `${state.subj}_typicality_rating.csv`;
    link2.click();
  }, 500);
}

// ----- startMemoryTest hook (Enter on ready screen) -----
// There is earlier navigation for instructions; we also handle Enter on ready screen:
window.addEventListener('keydown', (e) => {
  if(screens.ready && screens.ready.classList.contains('active') && e.key === 'Enter'){
    startMemoryTest();
  }
});

// Expose startMemoryTest so you can also call it from console if needed
window.startMemoryTest = startMemoryTest;

// -------------------------
// End of script.js
// -------------------------
