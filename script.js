/* ------------------------------
   TRIAL LIST
   (change this to your real images)
------------------------------ */
let trials = [
  {img:"stim1.jpg", old:0},
  {img:"stim2.jpg", old:1},
  {img:"stim3.jpg", old:0},
];

let idx = 0;
let anticipation = null;
let data = [];


/* ------------------------------
   UTILITY: random ITI (1–1.5 s)
------------------------------ */
function randomITI() {
  return 1000 + Math.random()*500;
}


/* ------------------------------
   SCREEN CONTROL
------------------------------ */
function show(id) {
  document.querySelectorAll(".screen")
    .forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}


/* ------------------------------
   ANTICIPATION QUESTION
------------------------------ */
document.getElementById("antYes").onclick = () => anticipation = "Yes";
document.getElementById("antNo").onclick = () => anticipation = "No";


/* ------------------------------
   START BUTTON
------------------------------ */
document.getElementById("startBtn").onclick = () => {
  if (!document.getElementById("subid").value.trim()) {
    alert("Please enter Participant ID.");
    return;
  }
  nextTrial();
};


/* ------------------------------
   TRIAL SEQUENCE
------------------------------ */
function nextTrial() {
  if (idx >= trials.length) {
    show("endScreen");
    document.getElementById("debugLog").textContent =
      JSON.stringify(data, null, 2);
    return;
  }

  let t = trials[idx];
  let holder = document.getElementById("imgHolder");

  holder.innerHTML = `<img src="${t.img}" style="max-width:100%;max-height:100%;">`;
  show("imageScreen");

  // show image for 2 seconds
  setTimeout(() => {
    show("choiceScreen");
    t.choiceStart = performance.now();
  }, 2000);
}


/* ------------------------------
   NEW/OLD RESPONSE
------------------------------ */
document.getElementById("respF").onclick = () => recordChoice("F");
document.getElementById("respJ").onclick = () => recordChoice("J");

function recordChoice(resp) {
  let t = trials[idx];
  t.response = resp;
  t.choiceRT = performance.now() - t.choiceStart;
  show("confidenceScreen");
}


/* ------------------------------
   CONFIDENCE RESPONSE
------------------------------ */
document.querySelectorAll(".confBtn").forEach(btn => {
  btn.onclick = () => {
    let t = trials[idx];
    t.confidence = btn.dataset.value;

    // ITI
    let itiValue = randomITI();

    // Store trial data
    data.push({
      subid: document.getElementById("subid").value,
      anticipation: anticipation,
      img: t.img,
      old: t.old,
      response: t.response,
      confidence: t.confidence,
      choiceRT: t.choiceRT.toFixed(1),
      iti: itiValue.toFixed(1)
    });

    // ITI screen (fixation)
    show("imageScreen");
    document.getElementById("imgHolder").innerHTML =
      "<div class='muted' style='font-size:40px;'>+</div>";

    setTimeout(() => {
      idx++;
      nextTrial();
    }, itiValue);
  };
});


/* ------------------------------
   DOWNLOAD CSV
------------------------------ */
document.getElementById("downloadCSV").onclick = () => {
  let rows = ["subid,anticipation,img,old,response,confidence,choiceRT,iti"];

  data.forEach(r => {
    rows.push(`${r.subid},${r.anticipation},${r.img},${r.old},${r.response},${r.confidence},${r.choiceRT},${r.iti}`);
  });

  let blob = new Blob([rows.join("\n")], {type:"text/csv"});
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "memory_test.csv";
  a.click();
};


/* ------------------------------
   DOWNLOAD JSON
------------------------------ */
document.getElementById("downloadJSON").onclick = () => {
  let blob = new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "memory_test.json";
  a.click();
};


/* ------------------------------
   RESTART
------------------------------ */
document.getElementById("restartBtn").onclick = () => location.reload();
