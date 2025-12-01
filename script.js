/***********************
 * Customize image trials here
 ***********************/
const trials = [
  { src: "images/img1.jpg", isOld: true },
  { src: "images/img2.jpg", isOld: false },
  { src: "images/img3.jpg", isOld: true },
  // Add your full stimulus list…
];

/* OPTIONAL: Shuffle the trial order */
// shuffle(trials);
function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
}

/***********************
 * DOM elements
 ***********************/
const screens = {
  id: document.getElementById('idScreen'),
  image: document.getElementById('imageScreen'),
  choice: document.getElementById('choiceScreen'),
  confidence: document.getElementById('confidenceScreen'),
  end: document.getElementById('endScreen'),
};

const subidInput = document.getElementById('subid');
const progressIndicator = document.getElementById('progressIndicator');
const imgStage = document.getElementById('imgStage');
const debugLog = document.getElementById('debugLog');

/***********************
 * State
 ***********************/
let state = {
  subj: null,
  anticipation: "",
  trialIndex: 0,
  results: []
};

function showScreen(name){
  for(const k in screens) screens[k].classList.remove('active');
  screens[name].classList.add('active');

  if(name === 'image' || name === 'choice' || name === 'confidence'){
    progressIndicator.textContent = `Trial ${state.trialIndex+1} / ${trials.length}`;
  } else if(name === 'end') {
    progressIndicator.textContent = "Done";
  } else progressIndicator.textContent = "Ready";
}

/***********************
 * Preload images
 ***********************/
function preloadAll(urls){
  return Promise.all(
    urls.map(u => new Promise(res=>{
      const img=new Image();
      img.onload=res;
      img.onerror=res;
      img.src=u;
    }))
  );
}

/***********************
 * Trial flow
 ***********************/
document.getElementById('antYes').onclick = () => state.anticipation = "Yes";
document.getElementById('antNo').onclick = () => state.anticipation = "No";

document.getElementById('startBtn').onclick = async () => {
  const id = subidInput.value.trim();
  if(!id){
    alert("Enter Participant ID");
    return;
  }
  state.subj = id;

  await preloadAll(trials.map(t=>t.src));

  state.trialIndex = 0;
  state.results = [];
  showTrial();
};

async function showTrial(){
  if(state.trialIndex >= trials.length){
    showScreen('end');
    return;
  }

  const t = trials[state.trialIndex];

  showScreen('image');
  await displayImage(t.src, 2000);

  const choice = await getChoiceResponse();
  const conf = await getConfidenceResponse();

  state.results.push({
    subj: state.subj,
    anticipation: state.anticipation,
    trial: state.trialIndex + 1,
    image: t.src,
    isOld: t.isOld ?? "",
    response: choice.resp,
    responseKey: choice.key,
    responseRT: Math.round(choice.rt),
    confidence: conf.rating,
    confidenceKey: conf.key,
    confidenceRT: Math.round(conf.rt),
    timestamp: new Date().toISOString()
  });

  debugLog.textContent = JSON.stringify(state.results, null, 2);

  state.trialIndex++;
  setTimeout(showTrial, 300);
}

function displayImage(src, ms){
  return new Promise(resolve=>{
    imgStage.innerHTML = "";
    const img = document.createElement("img");
    img.src = src;
    imgStage.appendChild(img);
    setTimeout(()=>{
      imgStage.innerHTML = "<div class='muted'>[Image removed]</div>";
      resolve();
    }, ms);
  });
}

function getChoiceResponse(){
  return new Promise(resolve=>{
    showScreen('choice');
    const start = performance.now();

    function handleKey(e){
      const k = e.key.toLowerCase();
      if(k==='f') done('new','f');
      if(k==='j') done('old','j');
    }

    function handleClick(e){
      const c = e.target.closest('.choice');
      if(!c) return;
      if(c.textContent.toLowerCase().includes('new')) done('new','click');
      if(c.textContent.toLowerCase().includes('old')) done('old','click');
    }

    function done(resp,key){
      window.removeEventListener('keydown', handleKey);
      screens.choice.removeEventListener('click', handleClick);
      resolve({ resp, key, rt: performance.now() - start });
    }

    window.addEventListener('keydown', handleKey);
    screens.choice.addEventListener('click', handleClick);
  });
}

function getConfidenceResponse(){
  return new Promise(resolve=>{
    showScreen('confidence');
    const start = performance.now();

    function handleKey(e){
      if(['1','2','3','4','5'].includes(e.key)){
        done(e.key, e.key);
      }
    }

    function handleClick(e){
      const boxes = Array.from(screens.confidence.querySelectorAll('.choice'));
      const idx = boxes.indexOf(e.target.closest('.choice'));
      if(idx >= 0) done(idx+1, 'click'+(idx+1));
    }

    function done(rating,key){
      window.removeEventListener('keydown',handleKey);
      screens.confidence.removeEventListener('click',handleClick);
      resolve({ rating, key, rt: performance.now() - start });
    }

    window.addEventListener('keydown',handleKey);
    screens.confidence.addEventListener('click',handleClick);
  });
}

/***********************
 * Download results
 ***********************/
function toCSV(arr){
  const keys = Object.keys(arr[0]);
  const header = keys.join(",");
  const rows = arr.map(obj => keys.map(k => JSON.stringify(obj[k] ?? "")).join(","));
  return [header, ...rows].join("\n");
}

document.getElementById('downloadCSV').onclick = () => {
  const csv = toCSV(state.results);
  const blob = new Blob([csv], {type:'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${state.subj}_results.csv`;
  a.click();
};

document.getElementById('downloadJSON').onclick = () => {
  const blob = new Blob([JSON.stringify(state.results,null,2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${state.subj}_results.json`;
  a.click();
};

document.getElementById('restartBtn').onclick = () => {
  state.trialIndex = 0;
  state.results = [];
  showScreen('id');
};
