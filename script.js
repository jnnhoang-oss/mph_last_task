// ------------------------
// Memory Test with Old/New Images
// ------------------------

// Folders and images
const oldImageFolder = "oldpics/";
const oldImages = [
  "aardvark.jpg","anteater.jpg","brown_bear.jpg","camel.jpg","canary.jpg",
  "carp.jpg","caterpillarhawkmoth.jpg","catfish.jpg","chipmunk.jpg","cranebug.jpg",
  "cricket.jpg","elephantafrican.jpg","finch.jpg","firebug.jpg","flea.jpg",
  "gerbil.jpg","giraffe.jpg","goldfish.jpg","halibut.jpg","herculesbeetle.jpg",
  "herring.jpg","horse.jpg","hyena.jpg","leopard.jpg","llama.jpg","marmot.jpg",
  "mouse.jpg","ostrich.jpg","palmcockatoo.jpg","partridge.jpg","pelican.jpg",
  "perch.jpg","pigeon.jpg","pike.jpg","porcupine.jpg","prayingmantis.jpg",
  "rabbit.jpg","reindeer.jpg","salmon.jpg","shark.jpg","sheep.jpg","shrimp.jpg",
  "skunk.jpg","snail.jpg","starfish.jpg","tiger.jpg","turkey.jpg","waterbuffalo.jpg"
];

const newImageFolder = "newpic/";
const newImages = [
 "alligator.jpg", "angelfish.jpg","ant.jpg","armadillo.jpg","assassinbug.jpg",
  "baboon.jpg","badger.jpg","baldeagle.jpg","bat.jpg","beaver.jpg","bluejay.jpg","boar.jpg",
"bull.jpg","butterfly.jpg","cardinal.jpg","caribou.jpg","cat.jpg","caterpillarpeacockmoth.jpg",
  "cedarwaxwing.jpg","chameleon.jpg","cheetah.jpg","chimpanzee.jpg","clownfish.jpg","cobra.jpg","cockroach.jpg","cougar.jpg","cow.jpg","crab.jpg","crow.jpg","dolphin.jpg",
"dragonfly.jpg","dramaderry.jpg","duck.jpg","eagle.jpg","fennec.jpg","flamingo.jpg","gecko.jpg","gorilla.jpg",
"hummingbird.jpg","mahimahi.jpg","mink.jpg","mole.jpg","quail.jpg","racoon.jpg","rhino.jpg","seal.jpg","snapper.jpg","zebra.jpg"
];

const totalTrials = oldImages.length + newImages.length;

// Build full trial list
let trials = [];
oldImages.forEach(img => trials.push({img: oldImageFolder + img, old: 1}));
newImages.forEach(img => trials.push({img: newImageFolder + img, old: 0}));

// Shuffle trials
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(trials);

// ------------------------
// Variables
// ------------------------
let trialIndex = 0;
let anticipationAnswer = null;
let responses = [];
let itiDuration = 0;

// ------------------------
// DOM Elements
// ------------------------
const anticipationScreen = document.getElementById("anticipationScreen");
const imageScreen = document.getElementById("imageScreen");
const responseScreen = document.getElementById("responseScreen");
const confidenceScreen = document.getElementById("confidenceScreen");
const endScreen = document.getElementById("endScreen");
const imgStage = document.getElementById("imgStage");

const antYes = document.getElementById("antYes");
const antNo = document.getElementById("antNo");
const startBtn = document.getElementById("startBtn");

// ------------------------
// Event Listeners
// ------------------------
antYes.onclick = () => anticipationAnswer = "Yes";
antNo.onclick = () => anticipationAnswer = "No";

startBtn.onclick = () => {
  if (!anticipationAnswer) {
    alert("Please select Yes or No for anticipation.");
    return;
  }
  anticipationScreen.classList.remove("active");
  runTrial();
};

// ------------------------
// Trial Functions
// ------------------------
function randomITI() {
  return 1000 + Math.random() * 500;
}

function runTrial() {
  if (trialIndex >= trials.length) {
    endExperiment();
    return;
  }

  itiDuration = randomITI();

  // ITI blank before showing image
  imgStage.textContent = "+";
  imageScreen.classList.add("active");

  setTimeout(() => {
    showImage();
  }, itiDuration);
}

function showImage() {
  const t = trials[trialIndex];
  imgStage.style.backgroundImage = `url(${t.img})`;
  imgStage.style.backgroundSize = "contain";
  imgStage.style.backgroundRepeat = "no-repeat";
  imgStage.style.backgroundPosition = "center";

  setTimeout(() => {
    imageScreen.classList.remove("active");
    startResponse();
  }, 2000);
}

function startResponse() {
  const t = trials[trialIndex];
  let currentResponse = { image: t.img, old: t.old, iti: itiDuration };

  responseScreen.classList.add("active");

  document.onkeydown = (e) => {
    if (e.key.toLowerCase() === "f") {
      currentResponse.choice = "New";
      responseScreen.classList.remove("active");
      askConfidence(currentResponse);
    }
    if (e.key.toLowerCase() === "j") {
      currentResponse.choice = "Old";
      responseScreen.classList.remove("active");
      askConfidence(currentResponse);
    }
  };
}

function askConfidence(currentResponse) {
  confidenceScreen.classList.add("active");
  document.onkeydown = (e) => {
    if (["1","2","3","4","5"].includes(e.key)) {
      currentResponse.confidence = e.key;
      responses.push({ ...currentResponse, anticipation: anticipationAnswer });
      confidenceScreen.classList.remove("active");
      trialIndex++;
      runTrial();
    }
  };
}

// ------------------------
// End Experiment
// ------------------------
function endExperiment() {
  endScreen.classList.add("active");

  document.getElementById("downloadCSV").onclick = () => {
    let csv = "image,old,choice,confidence,iti,anticipation\n";
    responses.forEach(r => {
      csv += `${r.image},${r.old},${r.choice},${r.confidence},${r.iti},${r.anticipation}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "memory_test.csv";
    a.click();
  };

  document.getElementById("restartBtn").onclick = () => location.reload();
}
