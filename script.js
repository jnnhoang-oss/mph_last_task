<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Memory Test</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <main class="container">
    <!-- Anticipation Screen -->
    <section id="anticipationScreen" class="screen active">
      <h1>Memory Test</h1>
      <p>Have you anticipated that there will be a memory test today about the images you saw yesterday?</p>
      <div class="btn-row">
        <button id="antYes">Yes</button>
        <button id="antNo">No</button>
      </div>
      <button id="startBtn" class="start">Start Test</button>
    </section>

    <!-- Image Screen -->
    <section id="imageScreen" class="screen">
      <div id="imgStage" class="img-stage">Image will appear</div>
    </section>

    <!-- Response Screen -->
    <section id="responseScreen" class="screen">
      <h2>Was the image NEW or OLD?</h2>
      <p>Press <strong>F</strong> for NEW or <strong>J</strong> for OLD</p>
    </section>

    <!-- Confidence Screen -->
    <section id="confidenceScreen" class="screen">
      <h2>Confidence</h2>
      <p>Rate confidence (1–5)</p>
    </section>

    <!-- End Screen -->
    <section id="endScreen" class="screen">
      <h2>Test Complete</h2>
      <button id="downloadCSV">Download CSV</button>
      <button id="restartBtn">Restart</button>
    </section>
  </main>

  <script src="script.js"></script>
</body>
</html>
