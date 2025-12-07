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

//shuffle
const allImages = [...oldImages, ...newImages];
shuffle(allImages);

//set all 96 images as trial
const trials = allImages;

function shuffle(a){
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

//1-1.5 iti
function randomITI(){
  return 1000 + Math.random() * 500;
}


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
const debugLog = document.getElementById('debugLog');

//for csv
let state = {
  subj: null,
  q1_anticipation: null,
  q2_thinking: null,
  trialIndex: 0,
  results: [],
  typicalityIndex: 0,
  typicalityResults: [],
  experimentStartTime: null
};

let instructionsKeyHandler = null;

function showScreen(name){
  for(const k in screens) screens[k].classList.remove('active');
  screens[name].classList.add('active');

  if(instructionsKeyHandler){
    window.removeEventListener('keydown', instructionsKeyHandler);
    instructionsKeyHandler = null;
  }

  if(name === 'instructions'){
    setTimeout(() => {
      instructionsKeyHandler = (e) => {
        if(e.key === 'Enter'){
          window.removeEventListener('keydown', instructionsKeyHandler);
          instructionsKeyHandler = null;
          showScreen('memoryInstructions');
        }
      };
      window.addEventListener('keydown', instructionsKeyHandler);
    }, 100);
  }

  if(name === 'memoryInstructions'){
    setTimeout(() => {
      instructionsKeyHandler = (e) => {
        if(e.key === 'Enter'){
          window.removeEventListener('keydown', instructionsKeyHandler);
          instructionsKeyHandler = null;
          goToQuestion1();
        }
      };
      window.addEventListener('keydown', instructionsKeyHandler);
    }, 100);
  }

  if(name === 'ready'){
    setTimeout(() => {
      instructionsKeyHandler = (e) => {
        if(e.key === 'Enter'){
          window.removeEventListener('keydown', instructionsKeyHandler);
          instructionsKeyHandler = null;
          startMemoryTest();
        }
      };
      window.addEventListener('keydown', instructionsKeyHandler);
    }, 100);
  }

  if(name === 'rest'){
    progressIndicator.textContent = `Rest Break`;
  } else if(name === 'typicalityInstructions' || name === 'typicality') {
    progressIndicator.textContent = `Phase 2: Typicality Rating`;
  } else if(name === 'end') {
    progressIndicator.textContent = "Completed";
  } else {
    progressIndicator.textContent = "";
  }
}


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

//instruction
function goToQuestion1(){
  handleQuestion1();
}

//pre-test question1
const q1Scale = document.getElementById('q1Scale');

function handleQuestion1(){
  showScreen('question1');
  
  function handleKeyQ1(e){
    if(['1','2','3','4','5'].includes(e.key)){
      q1Scale.querySelectorAll('.rating-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      const selected = q1Scale.querySelector(`[data-value="${e.key}"]`);
      if(selected) selected.classList.add('selected');
      
      state.q1_anticipation = e.key;
      
      window.removeEventListener('keydown', handleKeyQ1);
      setTimeout(() => {
        handleQuestion2();
      }, 300);
    }
  }
  
  window.addEventListener('keydown', handleKeyQ1);
}

//pre-test question2
const q2Scale = document.getElementById('q2Scale');

function handleQuestion2(){
  showScreen('question2');
  
  function handleKeyQ2(e){
    if(['1','2','3','4','5'].includes(e.key)){
      q2Scale.querySelectorAll('.rating-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      const selected = q2Scale.querySelector(`[data-value="${e.key}"]`);
      if(selected) selected.classList.add('selected');
      
      state.q2_thinking = e.key;
      
      window.removeEventListener('keydown', handleKeyQ2);
      setTimeout(() => {
        showScreen('ready');
      }, 300);
    }
  }
  
  window.addEventListener('keydown', handleKeyQ2);
}

/***********************
 * Ready Screen
 ***********************/
async function startMemoryTest(){
  await preloadAll(trials.map(t => t.src));
  state.trialIndex = 0;
  state.results = [];
  state.experimentStartTime = Date.now();
  showTrial();
}

/***********************
 * Preload images
 ***********************/
function preloadAll(urls){
  return Promise.all(
    urls.map(u => new Promise(res => {
      const img = new Image();
      img.onload = res;
      img.onerror = () => {
        console.warn(`Failed to load: ${u}`);
        res();
      };
      img.src = u;
    }))
  );
}

/***********************
 * Trial flow
 ***********************/
async function showTrial(){
  console.log("showTrial called, trialIndex:", state.trialIndex); // DEBUG
  
  if(state.trialIndex >= trials.length){
    console.log("All trials complete"); // DEBUG
    showTypicalityInstructions();
    return;
  }

  if(state.trialIndex > 0 && state.trialIndex % 48 === 0){
    console.log("Rest break"); // DEBUG
    await showRestBreak();
  }

  const t = trials[state.trialIndex];
  const trialStartTime = Date.now();

  console.log("Showing image"); // DEBUG
  showScreen('image');
  await displayImage(t.src, 2000);

  console.log("Getting choice"); // DEBUG
  const choice = await getChoiceResponse();

  console.log("Getting confidence"); // DEBUG
  const conf = await getConfidenceResponse();

  const isCorrect = (t.isOld && choice.resp === 'old') || (!t.isOld && choice.resp === 'new');

  console.log("Showing feedback"); // DEBUG
  await showFeedback(isCorrect);

  console.log("Calculating ITI"); // DEBUG
  const iti = randomITI();
  console.log("ITI value:", iti); // DEBUG

  console.log("Recording data"); // DEBUG
  state.results.push({
    subj: state.subj,
    q1_anticipated_test: state.q1_anticipation,
    q2_thinking_about_images: state.q2_thinking,
    trial: state.trialIndex + 1,
    image: t.src.split('/').pop(), //csv
    imageType: t.isOld ? 'old' : 'new', // also csv
    response: choice.resp,
    responseRT: Math.round(choice.rt),
    confidence: conf.rating,
    confidenceRT: Math.round(conf.rt),
    correct: isCorrect,
    ITI: Math.round(iti),
    timestamp: new Date().toISOString()
  });


  if(debugLog) {
    debugLog.textContent = JSON.stringify(state.results.slice(-5), null, 2);
  }

  state.trialIndex++;
  console.log("Trial index incremented to:", state.trialIndex); // DEBUG

  console.log("Waiting for ITI:", iti); // DEBUG
  // Show blank screen during ITI
  imgStage.innerHTML = "";
  showScreen('image');
  await wait(iti);

  console.log("Calling next trial"); // DEBUG
  showTrial();
}

function displayImage(src, ms){
  return new Promise(resolve => {
    imgStage.innerHTML = "";
    const img = document.createElement("img");
    img.src = src;
    imgStage.appendChild(img);
    
    setTimeout(() => {
      imgStage.innerHTML = "<div class='muted'>[Image removed]</div>";
      resolve();
    }, ms);
  });
}

function getChoiceResponse(){
  return new Promise(resolve => {
    showScreen('choice');
    const start = performance.now();

    function handleKey(e){
      const k = e.key.toLowerCase();
      if(k === 'f') done('new', 'f');
      if(k === 'j') done('old', 'j');
    }

    function done(resp, key){
      window.removeEventListener('keydown', handleKey);
      resolve({ resp, key, rt: performance.now() - start });
    }

    window.addEventListener('keydown', handleKey);
  });
}

function getConfidenceResponse(){
  return new Promise(resolve => {
    showScreen('confidence');
    const start = performance.now();

    function handleKey(e){
      if(['1','2','3','4','5'].includes(e.key)){
        done(e.key, e.key);
      }
    }

    function done(rating, key){
      window.removeEventListener('keydown', handleKey);
      resolve({ rating, key, rt: performance.now() - start });
    }

    window.addEventListener('keydown', handleKey);
  });
}

function showFeedback(isCorrect){
  return new Promise(resolve => {
    showScreen('feedback');
    const feedbackText = document.getElementById('feedbackText');
    
    if(isCorrect){
      feedbackText.textContent = "Correct!";
      feedbackText.style.color = "#10b981";
    } else {
      feedbackText.textContent = "Incorrect!";
      feedbackText.style.color = "#ef4444";
    }
    
    setTimeout(() => {
      resolve();
    }, 1500);
  });
}

/***********************
 * Typicality Phase
 ***********************/
function showTypicalityInstructions(){
  showScreen('typicalityInstructions');
}

document.getElementById('startTypicalityBtn').onclick = async () => {
  const shuffledOldImages = [...oldImages];
  shuffle(shuffledOldImages);
  state.oldImagesShuffled = shuffledOldImages;
  state.typicalityIndex = 0;
  state.typicalityResults = [];
  
  showTypicalityTrial();
};

async function showTypicalityTrial(){
  if(state.typicalityIndex >= state.oldImagesShuffled.length){
    autoDownloadResults();
    showScreen('end');
    return;
  }

  const img = state.oldImagesShuffled[state.typicalityIndex];
  const trialStartTime = Date.now();
  
  showScreen('typicality');
  const typImg = document.getElementById('typicalityImage');
  typImg.src = img.src;
  typImg.style.display = 'block';
  
  document.getElementById('typicalityScale').style.display = 'none';
  document.getElementById('typicalityQuestion').style.display = 'none';
  document.getElementById('typicalityLabels').style.display = 'none';
  
  await wait(2000);
  
  typImg.style.display = 'none';
  document.getElementById('typicalityScale').style.display = 'flex';
  document.getElementById('typicalityQuestion').style.display = 'block';
  document.getElementById('typicalityLabels').style.display = 'flex';
  
  const rating = await getTypicalityRating();
  
  //empty screen
  document.getElementById('typicalityScale').style.display = 'none';
  document.getElementById('typicalityQuestion').style.display = 'none';
  document.getElementById('typicalityLabels').style.display = 'none';
  
  //iti
  const iti = randomITI();
  
  state.typicalityResults.push({
    subj: state.subj,
    trial: state.typicalityIndex + 1,
    image: img.src.split('/').pop(), //csv
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
    const scale = document.getElementById('typicalityScale');
    
    scale.querySelectorAll('.rating-option').forEach(opt => {
      opt.classList.remove('selected');
    });
    
    function handleKey(e){
      if(['1','2','3','4','5','6','7'].includes(e.key)){
        done(e.key, e.key);
      }
    }
    
    function done(rating, key){
      scale.querySelectorAll('.rating-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      const selectedOpt = scale.querySelector(`[data-value="${rating}"]`);
      if(selectedOpt) selectedOpt.classList.add('selected');
      
      setTimeout(() => {
        window.removeEventListener('keydown', handleKey);
        resolve({ rating, key, rt: performance.now() - start });
      }, 200);
    }
    
    window.addEventListener('keydown', handleKey);
  });
}

function showRestBreak(){
  return new Promise(resolve => {
    showScreen('rest');
    const restDuration = 20;
    let remaining = restDuration;
    
    const restText = document.getElementById('restText');
    const restTimer = document.getElementById('restTimer');
    
    restText.textContent = 'Take a break!';
    restTimer.textContent = `Time remaining: ${remaining} seconds`;
    
    const interval = setInterval(() => {
      remaining--;
      restTimer.textContent = `Time remaining: ${remaining} seconds`;
      
      if(remaining <= 0){
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

function wait(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

//download csv
function toCSV(arr){
  if(arr.length === 0) return "";
  const keys = Object.keys(arr[0]);
  const header = keys.join(",");
  const rows = arr.map(obj => keys.map(k => {
    const val = obj[k];
    if(val === null || val === undefined) return "";
    return JSON.stringify(String(val));
  }).join(","));
  return [header, ...rows].join("\n");
}

function autoDownloadResults(){
  const createdAt = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  
  //mem test csv
  let csv1 = `created_at,${createdAt}\n\n`;
  csv1 += toCSV(state.results);
  
  const blob1 = new Blob([csv1], {type:'text/csv'});
  const link1 = document.createElement('a');
  link1.href = URL.createObjectURL(blob1);
  link1.download = `${state.subj}_memory_test.csv`;
  link1.click();
  
  //pause before downloading typicality csv
  setTimeout(() => {
    let csv2 = `created_at,${createdAt}\n\n`;
    csv2 += toCSV(state.typicalityResults);
    
    const blob2 = new Blob([csv2], {type:'text/csv'});
    const link2 = document.createElement('a');
    link2.href = URL.createObjectURL(blob2);
    link2.download = `${state.subj}_typicality_rating.csv`;
    link2.click();
  }, 500);
}
