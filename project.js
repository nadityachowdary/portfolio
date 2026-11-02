(function () {
  "use strict";

  const projects = window.PROJECTS || [];
  const params = new URLSearchParams(window.location.search);
  const project = projects.find((item) => item.id === params.get("id")) || projects[0];
  if (!project) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

  document.title = `${project.title} | Nallamothu Aditya Chowdary`;
  const crumb = $("#crumb");
  if (crumb) crumb.textContent = project.title;

  const hero = $("#detail-hero");
  hero.innerHTML = `
    <p class="eyebrow">${escapeHtml(project.category)}</p>
    <h1>${escapeHtml(project.title)}</h1>
    <p class="detail-tagline">${escapeHtml(project.tagline)}</p>
    <p class="detail-summary">${escapeHtml(project.summary)}</p>
    <ul class="tags">${project.tech.map((tech) => `<li>${escapeHtml(tech)}</li>`).join("")}</ul>
  `;

  const aside = $("#detail-aside");
  aside.innerHTML = `
    <div class="aside-card">
      <h3>At a glance</h3>
      <ul class="fact-list">
        ${project.metrics.map((metric) => `<li><span class="fact-label">${escapeHtml(metric.label)}</span><span class="fact-value">${escapeHtml(metric.value)}</span></li>`).join("")}
      </ul>
    </div>
    <div class="aside-card">
      <h3>Stack</h3>
      <ul class="tags">${project.tech.map((tech) => `<li>${escapeHtml(tech)}</li>`).join("")}</ul>
    </div>
    <div class="aside-card">
      <h3>Links</h3>
      <div class="aside-links">
        <a href="https://github.com/nadityachowdary" target="_blank" rel="noopener">GitHub profile <span>&#8599;</span></a>
        <a href="index.html#projects">All projects <span>&#8594;</span></a>
        <a href="index.html#contact">Start a conversation <span>&#8594;</span></a>
      </div>
    </div>
  `;

  const content = $("#detail-content");
  content.innerHTML = `
    <section class="content-section">
      <h2>Overview</h2>
      ${project.overview.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    </section>
    <section class="content-section">
      <h2>The challenge</h2>
      <ul class="challenge-list">
        ${project.challenge.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
    <section class="content-section">
      <h2>How it works</h2>
      <div class="step-timeline">
        ${project.steps.map((step, index) => `
          <div class="step">
            <span class="step-num">${String(index + 1).padStart(2, "0")}</span>
            <div class="step-body">
              <h3>${escapeHtml(step.title)}</h3>
              <p>${escapeHtml(step.text)}</p>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
    <section class="content-section" id="live-demo">
      <div class="demo-shell">
        <div class="demo-head">
          <span class="demo-live">Live demo</span>
          <h2>${escapeHtml(project.demoTitle)}</h2>
          <p>${escapeHtml(project.demoDescription)}</p>
        </div>
        <div class="demo-body" id="demo-body"></div>
      </div>
    </section>
    <section class="content-section">
      <h2>Highlights</h2>
      <div class="highlight-grid">
        ${project.highlights.map((item) => `
          <div class="highlight-card">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.text)}</p>
          </div>
        `).join("")}
      </div>
    </section>
  `;

  const index = projects.indexOf(project);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  $("#project-pager").innerHTML = `
    <a class="pager-link" href="project.html?id=${previous.id}">
      <span>&#8592; Previous project</span>
      <strong>${escapeHtml(previous.title)}</strong>
    </a>
    <a class="pager-link is-next" href="project.html?id=${next.id}">
      <span>Next project &#8594;</span>
      <strong>${escapeHtml(next.title)}</strong>
    </a>
  `;

  const demos = {
    caption: demoCaption,
    drowsiness: demoDrowsiness,
    sales: demoSales,
    etl: demoEtl,
    heart: demoHeart,
    jobs: demoJobs,
    lead: demoLead,
    crypto: demoCrypto,
    telegram: demoTelegram
  };

  const demoRoot = $("#demo-body");
  if (demos[project.demo]) demos[project.demo](demoRoot);
  else demoRoot.innerHTML = `<p class="demo-note">Interactive demo coming soon.</p>`;

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  function demoCaption(root) {
    const svgUri = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

    const beach = svgUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#1e1b4b"/><stop offset="0.55" stop-color="#9a3412"/><stop offset="1" stop-color="#fbbf24"/>
          </linearGradient>
          <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#c2410c"/><stop offset="0.55" stop-color="#7c2d12"/><stop offset="1" stop-color="#082f49"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#sky)"/>
        <circle cx="278" cy="158" r="46" fill="#fbbf24" opacity="0.18"/>
        <circle cx="278" cy="158" r="34" fill="#fef3c7"/>
        <rect y="185" width="400" height="115" fill="url(#sea)"/>
        <g stroke="#fde68a" stroke-width="2" opacity="0.5" fill="none">
          <path d="M20 210 q30 -8 60 0 t60 0 t60 0 t60 0 t60 0 t60 0"/>
          <path d="M0 236 q30 -8 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0"/>
        </g>
        <g stroke="#0f172a" stroke-width="2" fill="none" opacity="0.7">
          <path d="M110 95 q8 -8 16 0 q8 -8 16 0"/>
          <path d="M152 116 q6 -6 12 0 q6 -6 12 0"/>
        </g>
        <rect y="272" width="400" height="28" fill="#1c1917"/>
      </svg>
    `);

    const city = svgUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#020617"/><stop offset="0.6" stop-color="#1e3a8a"/><stop offset="1" stop-color="#0f172a"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#night)"/>
        <circle cx="316" cy="62" r="22" fill="#e0e7ff" opacity="0.9"/>
        <circle cx="308" cy="56" r="22" fill="#1e3a8a" opacity="0.55"/>
        <g fill="#0b172a">
          <rect x="24" y="160" width="58" height="140"/><rect x="92" y="120" width="48" height="180"/>
          <rect x="150" y="178" width="66" height="122"/><rect x="226" y="138" width="58" height="162"/>
          <rect x="294" y="190" width="82" height="110"/>
        </g>
        <g fill="#fbbf24" opacity="0.85">
          <rect x="36" y="174" width="8" height="8"/><rect x="54" y="174" width="8" height="8"/>
          <rect x="36" y="194" width="8" height="8"/><rect x="54" y="214" width="8" height="8"/>
          <rect x="102" y="136" width="8" height="8"/><rect x="120" y="156" width="8" height="8"/>
          <rect x="102" y="196" width="8" height="8"/><rect x="120" y="226" width="8" height="8"/>
          <rect x="162" y="196" width="8" height="8"/><rect x="186" y="216" width="8" height="8"/>
          <rect x="238" y="154" width="8" height="8"/><rect x="258" y="184" width="8" height="8"/>
          <rect x="238" y="224" width="8" height="8"/><rect x="310" y="206" width="8" height="8"/>
          <rect x="336" y="226" width="8" height="8"/><rect x="356" y="206" width="8" height="8"/>
        </g>
        <rect y="282" width="400" height="18" fill="#020617"/>
        <g stroke="#38bdf8" stroke-width="2" opacity="0.18">
          <path d="M40 288v-40M120 288v-30M210 288v-36M300 288v-26M360 288v-34"/>
        </g>
      </svg>
    `);

    const dog = svgUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="park" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#7dd3fc"/><stop offset="0.55" stop-color="#bae6fd"/><stop offset="1" stop-color="#86efac"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#park)"/>
        <circle cx="72" cy="62" r="26" fill="#fde68a"/>
        <path d="M0 214 q80 -52 170 -18 t230 -8 v112 H0z" fill="#4ade80" opacity="0.65"/>
        <path d="M0 246 q110 -40 210 -6 t190 0 v60 H0z" fill="#22c55e" opacity="0.55"/>
        <g>
          <ellipse cx="196" cy="206" rx="66" ry="36" fill="#b45309"/>
          <rect x="160" y="224" width="14" height="42" rx="6" fill="#92400e"/>
          <rect x="214" y="224" width="14" height="42" rx="6" fill="#92400e"/>
          <circle cx="258" cy="166" r="31" fill="#d97706"/>
          <path d="M236 146 q-14 -20 -2 -30 q14 12 14 26z" fill="#92400e"/>
          <path d="M278 146 q16 -18 4 -30 q-14 12 -14 26z" fill="#92400e"/>
          <ellipse cx="278" cy="178" rx="17" ry="12" fill="#fbbf24"/>
          <circle cx="288" cy="175" r="4" fill="#1c1917"/>
          <circle cx="264" cy="158" r="3.4" fill="#1c1917"/>
          <path d="M120 196 q-22 -24 -38 -10 q14 6 16 22z" fill="#92400e"/>
          <path d="M248 202 q16 14 26 2" stroke="#ef4444" stroke-width="6" fill="none" stroke-linecap="round"/>
        </g>
        <g stroke="#15803d" stroke-width="2" opacity="0.4" fill="none">
          <path d="M40 270 q4 -14 8 0M84 262 q4 -14 8 0M330 268 q4 -14 8 0M356 256 q4 -14 8 0"/>
        </g>
      </svg>
    `);

    const samples = [
      { label: "Beach sunset", src: beach, caption: "A golden sunset over a calm ocean as birds glide across the sky." },
      { label: "City at night", src: city, caption: "A quiet city skyline glowing with lights under a deep blue night sky." },
      { label: "Dog in a park", src: dog, caption: "A brown dog standing on green grass in a sunny park." }
    ];

    root.innerHTML = `
      <div class="demo-split">
        <div class="demo-panel">
          <span class="demo-label">Choose a sample image</span>
          <div class="sample-grid" id="cap-samples">
            ${samples.map((sample, i) => `
              <button class="sample-thumb ${i === 0 ? "is-active" : ""}" type="button" data-index="${i}" aria-label="${sample.label}">
                <img src="${sample.src}" alt="${sample.label}" />
              </button>
            `).join("")}
          </div>
          <div class="caption-preview"><img id="cap-image" src="${samples[0].src}" alt="Selected image" /></div>
          <div class="upload-row">
            <input type="file" id="cap-upload" accept="image/*" aria-label="Upload your own image" />
          </div>
          <p class="demo-note">Samples are embedded SVG scenes. Uploads are analyzed on-device for brightness and color tone to build a heuristic preview caption.</p>
        </div>
        <div class="demo-panel">
          <span class="demo-label">Inference pipeline</span>
          <div class="status-steps" id="cap-steps">
            <div class="status-step">CNN feature extraction</div>
            <div class="status-step">Image embedding</div>
            <div class="status-step">LSTM token decoding</div>
            <div class="status-step">Beam search ranking</div>
          </div>
          <div class="caption-output" id="cap-output"><span class="placeholder">Your generated caption will appear here.</span></div>
          <div class="demo-row demo-mt">
            <button class="demo-btn" id="cap-run" type="button">Generate caption</button>
            <button class="demo-btn demo-btn--ghost" id="cap-reset" type="button">Reset</button>
          </div>
          <div class="caption-meta">
            <span>Confidence <strong id="cap-confidence">&mdash;</strong></span>
            <span>Latency <strong id="cap-latency">&mdash;</strong></span>
          </div>
        </div>
      </div>
      <p class="demo-note"><strong>Simulation:</strong> inference steps are choreographed in the browser to show the architecture. A production deployment would stream the same stages from a trained model server.</p>
    `;

    const sampleButtons = $$("#cap-samples .sample-thumb", root);
    const preview = $("#cap-image", root);
    const steps = $$("#cap-steps .status-step", root);
    const output = $("#cap-output", root);
    const confidence = $("#cap-confidence", root);
    const latency = $("#cap-latency", root);
    const runButton = $("#cap-run", root);
    const resetButton = $("#cap-reset", root);
    const upload = $("#cap-upload", root);

    let selected = 0;
    let customCaption = null;
    let running = false;
    let runId = 0;

    const setStepsIdle = () => steps.forEach((step) => step.className = "status-step");
    const activeCaption = () => customCaption || samples[selected].caption;

    sampleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (running) return;
        selected = Number(button.dataset.index);
        customCaption = null;
        sampleButtons.forEach((item) => item.classList.toggle("is-active", item === button));
        preview.src = samples[selected].src;
        preview.alt = samples[selected].label;
        upload.value = "";
      });
    });

    upload.addEventListener("change", () => {
      const file = upload.files && upload.files[0];
      if (!file || running) return;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = String(reader.result);
        const image = new Image();
        image.onload = () => {
          preview.src = dataUrl;
          preview.alt = "Uploaded image";
          customCaption = captionFromImage(image);
          sampleButtons.forEach((item) => item.classList.remove("is-active"));
        };
        image.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });

    function captionFromImage(image) {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, 32, 32);
      const pixels = context.getImageData(0, 0, 32, 32).data;
      let red = 0;
      let green = 0;
      let blue = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        red += pixels[i];
        green += pixels[i + 1];
        blue += pixels[i + 2];
      }
      const count = pixels.length / 4;
      red /= count;
      green /= count;
      blue /= count;
      const brightness = (red + green + blue) / 765;
      const light = brightness > 0.66 ? "bright" : brightness < 0.34 ? "moody" : "softly lit";
      let tone = "neutral";
      if (red > green && red > blue) tone = "warm golden";
      else if (blue > red && blue > green) tone = "cool blue";
      else if (green > red && green > blue) tone = "natural green";
      else if (red > 140 && blue > 140) tone = "magenta";
      return `A ${light} uploaded image with a ${tone} palette and a clear central subject.`;
    }

    async function runInference() {
      if (running) return;
      running = true;
      const localId = ++runId;
      runButton.disabled = true;
      resetButton.disabled = true;
      setStepsIdle();
      output.innerHTML = `<span class="placeholder">Running inference pipeline&hellip;</span>`;
      confidence.textContent = "\u2014";
      latency.textContent = "\u2014";

      const stageMessages = [
        "Extracting convolutional features",
        "Compressing visual embedding",
        "Decoding token sequence",
        "Ranking beam candidates"
      ];

      for (let i = 0; i < steps.length; i += 1) {
        steps[i].classList.add("is-active");
        await sleep(360 + Math.random() * 180);
        if (localId !== runId) return;
        steps[i].classList.remove("is-active");
        steps[i].classList.add("is-done");
        steps[i].title = stageMessages[i];
      }

      const caption = activeCaption();
      output.innerHTML = "";
      const words = caption.split(" ");
      for (let i = 0; i < words.length; i += 1) {
        if (localId !== runId) return;
        const token = document.createElement("span");
        token.className = "token";
        token.textContent = (i === 0 ? "" : " ") + words[i];
        output.appendChild(token);
        await sleep(70 + Math.random() * 70);
      }

      if (localId !== runId) return;
      confidence.textContent = `${(93 + Math.random() * 4.5).toFixed(1)}%`;
      latency.textContent = `${Math.round(250 + Math.random() * 170)} ms`;
      running = false;
      runButton.disabled = false;
      resetButton.disabled = false;
    }

    runButton.addEventListener("click", runInference);

    resetButton.addEventListener("click", () => {
      runId += 1;
      running = false;
      runButton.disabled = false;
      resetButton.disabled = false;
      setStepsIdle();
      output.innerHTML = `<span class="placeholder">Your generated caption will appear here.</span>`;
      confidence.textContent = "\u2014";
      latency.textContent = "\u2014";
    });
  }

  function demoDrowsiness(root) {
    root.innerHTML = `
      <div class="dms-grid">
        <div class="dms-feed">
          <canvas id="dms-canvas" width="480" height="300" role="img" aria-label="Simulated driver camera feed"></canvas>
          <span class="dms-livebadge">CAM 01 &middot; LIVE</span>
          <div class="dms-alert" id="dms-alert">
            <strong>DROWSINESS ALERT</strong>
            <span>EYES CLOSED &middot; ALARM TRIGGERED</span>
          </div>
        </div>
        <div class="dms-side">
          <div class="gauge">
            <div class="gauge-head"><span>Eye Aspect Ratio</span><strong id="dms-ear-val">0.300</strong></div>
            <div class="gauge-track">
              <div class="gauge-fill" id="dms-ear-fill"></div>
              <span class="gauge-thresh" style="left:48.9%"></span>
            </div>
          </div>
          <div class="gauge">
            <div class="gauge-head"><span>Mouth Aspect Ratio</span><strong id="dms-mar-val">0.200</strong></div>
            <div class="gauge-track">
              <div class="gauge-fill" id="dms-mar-fill"></div>
              <span class="gauge-thresh" style="left:66.7%"></span>
            </div>
          </div>
          <div class="dms-counters">
            <div class="dms-counter" id="dms-closed-wrap"><span>Eye frames</span><strong id="dms-closed">0</strong></div>
            <div class="dms-counter"><span>Yawns</span><strong id="dms-yawns">0</strong></div>
            <div class="dms-counter"><span>Alerts</span><strong id="dms-events">0</strong></div>
          </div>
          <div class="dms-actions">
            <button class="demo-btn" id="dms-start" type="button">Start simulation</button>
            <button class="demo-btn demo-btn--ghost" id="dms-reset" type="button">Reset</button>
          </div>
          <div class="dms-log" id="dms-log"><div>Simulator idle. Press start.</div></div>
        </div>
      </div>
      <p class="demo-note"><strong>Simulated feed:</strong> the face and ratios are synthetic. Thresholds (EAR 0.22, MAR 0.60, 48 frames) mirror the real detector, and the alarm uses the browser audio API.</p>
    `;

    const canvas = $("#dms-canvas", root);
    const context = canvas.getContext("2d");
    const alertBox = $("#dms-alert", root);
    const earValue = $("#dms-ear-val", root);
    const marValue = $("#dms-mar-val", root);
    const earFill = $("#dms-ear-fill", root);
    const marFill = $("#dms-mar-fill", root);
    const closedValue = $("#dms-closed", root);
    const yawnValue = $("#dms-yawns", root);
    const eventsValue = $("#dms-events", root);
    const closedWrap = $("#dms-closed-wrap", root);
    const log = $("#dms-log", root);
    const startButton = $("#dms-start", root);
    const resetButton = $("#dms-reset", root);

    let running = false;
    let timer = null;
    let elapsed = 0;
    let closedFrames = 0;
    let yawnFrames = 0;
    let yawns = 0;
    let events = 0;
    let alertOn = false;
    let audioContext = null;

    function addLog(message, className) {
      const line = document.createElement("div");
      if (className) line.className = className;
      line.textContent = message;
      log.appendChild(line);
      while (log.children.length > 8) log.removeChild(log.firstElementChild);
      log.scrollTop = log.scrollHeight;
    }

    function ensureAudio() {
      if (!audioContext) {
        const AudioCtor = window.AudioContext || window.webkitAudioContext;
        if (AudioCtor) audioContext = new AudioCtor();
      }
      if (audioContext && audioContext.state === "suspended") audioContext.resume();
    }

    function alarmBeep() {
      if (!audioContext) return;
      const now = audioContext.currentTime;
      [0, 0.24, 0.48].forEach((offset) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = "square";
        oscillator.frequency.value = 880;
        gain.gain.setValueAtTime(0.0001, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.11, now + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.16);
        oscillator.connect(gain).connect(audioContext.destination);
        oscillator.start(now + offset);
        oscillator.stop(now + offset + 0.18);
      });
    }

    function drawFeed(ear, mar, time, alert) {
      const width = canvas.width;
      const height = canvas.height;
      const background = context.createLinearGradient(0, 0, 0, height);
      background.addColorStop(0, "#0a1626");
      background.addColorStop(1, "#050b14");
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(56, 189, 248, 0.07)";
      context.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      const centerX = width / 2;
      const faceY = 168;

      context.fillStyle = "#c98a5b";
      context.beginPath();
      context.ellipse(centerX - 84, faceY, 14, 26, 0, 0, Math.PI * 2);
      context.fill();
      context.beginPath();
      context.ellipse(centerX + 84, faceY, 14, 26, 0, 0, Math.PI * 2);
      context.fill();

      const skin = context.createLinearGradient(centerX - 80, faceY - 100, centerX + 80, faceY + 100);
      skin.addColorStop(0, "#e2b184");
      skin.addColorStop(1, "#c98a5b");
      context.fillStyle = skin;
      context.beginPath();
      context.ellipse(centerX, faceY, 84, 104, 0, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = "#2b1a12";
      context.beginPath();
      context.ellipse(centerX, faceY - 78, 86, 46, 0, Math.PI, Math.PI * 2);
      context.fill();

      const openness = clamp((ear - 0.12) / 0.2, 0, 1);
      drawEye(centerX - 36, faceY - 16, openness);
      drawEye(centerX + 36, faceY - 16, openness);

      context.strokeStyle = "#4a2c1a";
      context.lineWidth = 4;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(centerX - 58, faceY - 42);
      context.quadraticCurveTo(centerX - 36, faceY - 52, centerX - 14, faceY - 42);
      context.moveTo(centerX + 14, faceY - 42);
      context.quadraticCurveTo(centerX + 36, faceY - 52, centerX + 58, faceY - 42);
      context.stroke();

      context.strokeStyle = "rgba(122, 68, 38, 0.8)";
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(centerX - 2, faceY - 8);
      context.quadraticCurveTo(centerX - 12, faceY + 24, centerX + 2, faceY + 30);
      context.stroke();

      const mouthOpen = clamp((mar - 0.2) / 0.55, 0.08, 1);
      context.fillStyle = "#5c2630";
      context.beginPath();
      context.ellipse(centerX, faceY + 64, 26, 4 + mouthOpen * 22, 0, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = "rgba(90, 38, 44, 0.9)";
      context.lineWidth = 2;
      context.stroke();

      context.fillStyle = "rgba(226, 241, 255, 0.75)";
      context.font = "11px 'JetBrains Mono', monospace";
      context.fillText(`EAR ${ear.toFixed(3)}  MAR ${mar.toFixed(3)}`, 16, height - 18);
      context.fillStyle = "rgba(148, 163, 184, 0.55)";
      context.fillText("DRIVER MONITORING", width - 156, height - 18);

      const scanY = (time / 10) % height;
      const scan = context.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      scan.addColorStop(0, "rgba(34, 211, 238, 0)");
      scan.addColorStop(0.5, "rgba(34, 211, 238, 0.18)");
      scan.addColorStop(1, "rgba(34, 211, 238, 0)");
      context.fillStyle = scan;
      context.fillRect(0, scanY - 20, width, 40);

      if (alert) {
        context.strokeStyle = "rgba(248, 113, 113, 0.85)";
        context.lineWidth = 4;
        context.strokeRect(2, 2, width - 4, height - 4);
      }

      if (openness < 0.2) {
        context.fillStyle = "rgba(248, 113, 113, 0.12)";
        context.fillRect(0, 0, width, height);
      }
    }

    function drawEye(x, y, openness) {
      if (openness < 0.12) {
        context.strokeStyle = "#6b3d22";
        context.lineWidth = 3;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(x - 20, y);
        context.quadraticCurveTo(x, y + 4, x + 20, y);
        context.stroke();
        return;
      }
      context.fillStyle = "#f4f7fb";
      context.beginPath();
      context.ellipse(x, y, 19, 4 + 11 * openness, 0, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#1d4ed8";
      context.beginPath();
      context.arc(x, y + 1, 5, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#0b1220";
      context.beginPath();
      context.arc(x, y + 1, 2.4, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = "rgba(107, 61, 34, 0.85)";
      context.lineWidth = 2;
      context.beginPath();
      context.ellipse(x, y, 19, 4 + 11 * openness, 0, Math.PI, Math.PI * 2);
      context.stroke();
    }

    function updateReadouts(ear, mar) {
      earValue.textContent = ear.toFixed(3);
      marValue.textContent = mar.toFixed(3);
      earFill.style.width = `${clamp((ear / 0.45) * 100, 0, 100)}%`;
      marFill.style.width = `${clamp((mar / 0.9) * 100, 0, 100)}%`;
      earFill.classList.toggle("is-danger", ear < 0.22);
      marFill.classList.toggle("is-danger", mar > 0.6);
      closedValue.textContent = String(closedFrames);
      yawnValue.textContent = String(yawns);
      eventsValue.textContent = String(events);
      closedWrap.classList.toggle("is-danger", closedFrames > 30);
    }

    function tick() {
      elapsed += 33;
      const cycle = elapsed % 12000;
      let ear = 0.3 + Math.sin(elapsed / 520) * 0.012 + (Math.random() - 0.5) * 0.008;
      let mar = 0.2 + Math.random() * 0.04;

      if (cycle > 2800 && cycle < 3060) ear = 0.155;
      if (cycle > 6600 && cycle < 8700) ear = 0.128 + Math.random() * 0.01;
      if (cycle > 4300 && cycle < 5350) mar = 0.72 + Math.random() * 0.06;

      if (ear < 0.22) closedFrames += 1;
      else closedFrames = 0;

      if (mar > 0.6) yawnFrames += 1;
      else yawnFrames = 0;

      if (yawnFrames === 30) {
        yawns += 1;
        addLog(`[${formatTime(elapsed)}] Yawn detected (MAR ${mar.toFixed(2)})`, "warn");
      }

      const drowsy = closedFrames >= 48;
      if (drowsy && !alertOn) {
        alertOn = true;
        events += 1;
        addLog(`[${formatTime(elapsed)}] Microsleep detected - alarm fired`, "alert");
        alarmBeep();
      } else if (!drowsy && alertOn && ear >= 0.22) {
        alertOn = false;
        addLog(`[${formatTime(elapsed)}] Eyes open - driver recovered`, "ok");
      }

      alertBox.classList.toggle("is-on", alertOn);
      updateReadouts(ear, mar);
      drawFeed(ear, mar, elapsed, alertOn);
    }

    function formatTime(ms) {
      const total = Math.floor(ms / 1000);
      return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
    }

    function stop() {
      running = false;
      if (timer) clearInterval(timer);
      timer = null;
      startButton.textContent = "Resume simulation";
    }

    function reset() {
      stop();
      elapsed = 0;
      closedFrames = 0;
      yawnFrames = 0;
      yawns = 0;
      events = 0;
      alertOn = false;
      startButton.textContent = "Start simulation";
      alertBox.classList.remove("is-on");
      log.innerHTML = "<div>Simulator idle. Press start.</div>";
      updateReadouts(0.3, 0.2);
      drawFeed(0.3, 0.2, 0, false);
    }

    startButton.addEventListener("click", () => {
      if (running) {
        stop();
        return;
      }
      ensureAudio();
      running = true;
      startButton.textContent = "Pause simulation";
      addLog(`[${formatTime(elapsed)}] Camera stream started`, "ok");
      timer = setInterval(tick, 33);
    });

    resetButton.addEventListener("click", reset);

    updateReadouts(0.3, 0.2);
    drawFeed(0.3, 0.2, 0, false);
  }

  function demoSales(root) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const regions = {
      North: [42, 45, 48, 52, 49, 55, 58, 61, 57, 63, 69, 74],
      South: [31, 34, 33, 38, 41, 39, 44, 46, 45, 49, 52, 55],
      East: [26, 28, 31, 30, 34, 36, 35, 38, 41, 40, 44, 47],
      West: [22, 25, 24, 28, 30, 29, 33, 35, 34, 38, 40, 43]
    };
    const margins = { North: 0.26, South: 0.22, East: 0.2, West: 0.18 };
    const mix = [
      { name: "Electronics", share: 0.34 },
      { name: "Fashion", share: 0.27 },
      { name: "Home", share: 0.18 },
      { name: "Beauty", share: 0.12 },
      { name: "Sports", share: 0.09 }
    ];

    root.innerHTML = `
      <div class="seg" id="sales-regions" role="group" aria-label="Filter region">
        <button type="button" data-region="all" class="is-active">All regions</button>
        ${Object.keys(regions).map((name) => `<button type="button" data-region="${name}">${name}</button>`).join("")}
      </div>
      <div class="seg" id="sales-metrics" role="group" aria-label="Choose metric">
        <button type="button" data-metric="revenue" class="is-active">Revenue</button>
        <button type="button" data-metric="profit">Profit</button>
      </div>
      <div class="kpi-grid">
        <div class="kpi"><span>Revenue</span><strong id="sales-revenue">$0k</strong><small id="sales-revenue-delta">&mdash;</small></div>
        <div class="kpi"><span>Profit</span><strong id="sales-profit">$0k</strong><small id="sales-profit-delta">&mdash;</small></div>
        <div class="kpi"><span>Margin</span><strong id="sales-margin">0%</strong><small>blended</small></div>
        <div class="kpi"><span>Orders</span><strong id="sales-orders">0</strong><small>est. at $42 AOV</small></div>
      </div>
      <div class="chart-wrap">
        <div class="chart-head">
          <h3 id="sales-chart-title">Monthly revenue</h3>
          <span id="sales-chart-note">FY snapshot &middot; $ thousands</span>
        </div>
        <div class="chart-bars" id="sales-chart"></div>
      </div>
      <div class="chart-wrap">
        <div class="chart-head"><h3>Category mix</h3><span>share of revenue</span></div>
        <div class="cat-list" id="sales-categories"></div>
      </div>
      <div class="insight-box" id="sales-insight"></div>
      <p class="demo-note"><strong>Embedded sample:</strong> the numbers come from a representative extract of the analytical dataset shipped with the project. The full pipeline runs the same aggregations in SQL.</p>
    `;

    const regionButtons = $$("#sales-regions button", root);
    const metricButtons = $$("#sales-metrics button", root);
    const revenueEl = $("#sales-revenue", root);
    const profitEl = $("#sales-profit", root);
    const marginEl = $("#sales-margin", root);
    const ordersEl = $("#sales-orders", root);
    const revenueDelta = $("#sales-revenue-delta", root);
    const profitDelta = $("#sales-profit-delta", root);
    const chart = $("#sales-chart", root);
    const categoryList = $("#sales-categories", root);
    const chartTitle = $("#sales-chart-title", root);
    const insight = $("#sales-insight", root);

    let activeRegion = "all";
    let activeMetric = "revenue";

    function currentData() {
      if (activeRegion === "all") {
        return months.map((_, index) => Object.values(regions).reduce((sum, series) => sum + series[index], 0));
      }
      return regions[activeRegion].slice();
    }

    function currentMargin() {
      if (activeRegion === "all") {
        const total = Object.values(regions).reduce((sum, series) => sum + series.reduce((a, b) => a + b, 0), 0);
        const weighted = Object.entries(regions).reduce((sum, [name, series]) => sum + series.reduce((a, b) => a + b, 0) * margins[name], 0);
        return weighted / total;
      }
      return margins[activeRegion];
    }

    function currency(value) {
      return `$${Math.round(value)}k`;
    }

    function percentDelta(series) {
      const first = series.slice(0, 6).reduce((a, b) => a + b, 0);
      const second = series.slice(6).reduce((a, b) => a + b, 0);
      return ((second - first) / first) * 100;
    }

    function render() {
      const base = currentData();
      const margin = currentMargin();
      const data = activeMetric === "revenue" ? base : base.map((value) => value * margin);
      const totalRevenue = base.reduce((a, b) => a + b, 0);
      const totalProfit = totalRevenue * margin;
      const totalMetric = data.reduce((a, b) => a + b, 0);
      const orders = Math.round((totalRevenue * 1000) / 42);
      const max = Math.max(...data);

      revenueEl.textContent = currency(totalRevenue);
      profitEl.textContent = currency(totalProfit);
      marginEl.textContent = `${(margin * 100).toFixed(1)}%`;
      ordersEl.textContent = orders.toLocaleString("en-US");

      const revenueGrowth = percentDelta(base);
      const profitGrowth = percentDelta(base.map((value) => value * margin));
      const revenueUp = revenueGrowth >= 0;
      const profitUp = profitGrowth >= 0;
      revenueDelta.textContent = `${revenueUp ? "▲" : "▼"} ${Math.abs(revenueGrowth).toFixed(1)}% H2 vs H1`;
      profitDelta.textContent = `${profitUp ? "▲" : "▼"} ${Math.abs(profitGrowth).toFixed(1)}% H2 vs H1`;
      revenueDelta.classList.toggle("is-down", !revenueUp);
      profitDelta.classList.toggle("is-down", !profitUp);

      chartTitle.textContent = activeMetric === "revenue" ? "Monthly revenue" : "Monthly profit";

      chart.innerHTML = data.map((value, index) => `
        <div class="chart-col" title="${months[index]}: ${currency(value)}">
          <div class="bar-track"><div class="bar" data-height="${Math.max(4, (value / max) * 100)}" style="height:0%"></div></div>
          <span>${months[index]}</span>
        </div>
      `).join("");

      const catMax = mix[0].share;
      categoryList.innerHTML = mix.map((item) => {
        const value = totalMetric * item.share;
        return `
          <div class="cat-row">
            <span>${item.name}</span>
            <div class="cat-track"><div class="cat-fill" data-width="${(item.share / catMax) * 100}"></div></div>
            <strong>${currency(value)}</strong>
          </div>
        `;
      }).join("");

      requestAnimationFrame(() => {
        $$(".bar", chart).forEach((bar) => {
          bar.style.height = `${bar.dataset.height}%`;
        });
        $$(".cat-fill", categoryList).forEach((fill) => {
          fill.style.width = `${fill.dataset.width}%`;
        });
      });

      const bestIndex = data.indexOf(Math.max(...data));
      const bestCategory = mix.reduce((best, item) => (item.share > best.share ? item : best), mix[0]);
      const regionLabel = activeRegion === "all" ? "All regions" : activeRegion;
      insight.innerHTML = `<strong>${regionLabel}</strong> generated ${currency(totalRevenue)} in revenue at a ${(margin * 100).toFixed(1)}% margin. <strong>${months[bestIndex]}</strong> was the strongest month at ${currency(data[bestIndex])}, and <strong>${bestCategory.name}</strong> leads the category mix at ${(bestCategory.share * 100).toFixed(0)}%.`;
    }

    regionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeRegion = button.dataset.region;
        regionButtons.forEach((item) => item.classList.toggle("is-active", item === button));
        render();
      });
    });

    metricButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeMetric = button.dataset.metric;
        metricButtons.forEach((item) => item.classList.toggle("is-active", item === button));
        render();
      });
    });

    render();
  }

  function demoEtl(root) {
    const stages = [
      { name: "Extract", detail: "Read raw CSV" },
      { name: "Validate", detail: "Schema + types" },
      { name: "Transform", detail: "Clean + derive" },
      { name: "Load", detail: "Star schema upsert" }
    ];

    root.innerHTML = `
      <div class="pipeline" id="etl-pipeline">
        ${stages.map((stage, index) => `
          <div class="pipe-stage" data-stage="${index}">
            <div class="pipe-top"><span>${String(index + 1).padStart(2, "0")}</span><em class="pipe-state">idle</em></div>
            <strong>${stage.name}</strong>
            <small>${stage.detail}</small>
          </div>
        `).join("")}
      </div>
      <div class="demo-row">
        <button class="demo-btn" id="etl-run" type="button">Run pipeline</button>
        <button class="demo-btn demo-btn--ghost" id="etl-reset" type="button">Reset</button>
        <span class="demo-note" id="etl-runs" style="margin:0">No runs yet.</span>
      </div>
      <div class="etl-grid demo-mt">
        <pre class="demo-console" id="etl-log"><span class="dim">Pipeline idle. Press run to start an incremental load.</span></pre>
        <div class="etl-side">
          <h4>Warehouse tables</h4>
          <div class="etl-table" id="etl-tables">
            <div class="etl-row"><span>Table</span><span>Rows</span></div>
            <div class="etl-row"><span>fact_sales</span><span>&mdash;</span></div>
            <div class="etl-row"><span>dim_customer</span><span>&mdash;</span></div>
            <div class="etl-row"><span>dim_product</span><span>&mdash;</span></div>
            <div class="etl-row"><span>dim_date</span><span>&mdash;</span></div>
            <div class="etl-row"><span>dim_region</span><span>&mdash;</span></div>
            <div class="etl-row"><span>dim_payment</span><span>&mdash;</span></div>
          </div>
          <h4 style="margin-top:14px">Run summary</h4>
          <div class="etl-summary">
            <div><span>Rows extracted</span><strong id="etl-extracted">0</strong></div>
            <div><span>Rejected</span><strong id="etl-rejected">0</strong></div>
            <div><span>Duplicates</span><strong id="etl-dupes">0</strong></div>
            <div><span>Integrity</span><strong id="etl-integrity">pending</strong></div>
          </div>
        </div>
      </div>
      <p class="demo-note"><strong>Simulation:</strong> counts and timings are representative. The real pipeline writes a row-level audit CSV, a SQLite star schema, and a markdown run report.</p>
    `;

    const stageEls = $$(".pipe-stage", root);
    const log = $("#etl-log", root);
    const runButton = $("#etl-run", root);
    const resetButton = $("#etl-reset", root);
    const runsLabel = $("#etl-runs", root);
    const extractedEl = $("#etl-extracted", root);
    const rejectedEl = $("#etl-rejected", root);
    const dupesEl = $("#etl-dupes", root);
    const integrityEl = $("#etl-integrity", root);
    const tableCounts = {
      fact_sales: 1190,
      dim_customer: 412,
      dim_product: 186,
      dim_date: 365,
      dim_region: 4,
      dim_payment: 5
    };

    let runs = 0;
    let busy = false;

    function appendLog(text, className) {
      const line = document.createElement("span");
      if (className) line.className = className;
      line.textContent = `${text}\n`;
      log.appendChild(line);
      log.scrollTop = log.scrollHeight;
    }

    function setStage(index, state, detail) {
      const element = stageEls[index];
      element.classList.toggle("is-running", state === "running");
      element.classList.toggle("is-done", state === "done");
      const label = $(".pipe-state", element);
      label.textContent = state;
      if (detail) $("small", element).textContent = detail;
    }

    function setTables(active) {
      $$(".etl-row", root).forEach((row) => {
        if (row.children.length !== 2) return;
        const name = row.children[0].textContent;
        if (name === "Table") return;
        row.children[1].textContent = active && tableCounts[name] ? tableCounts[name].toLocaleString("en-US") : "\u2014";
      });
    }

    async function run() {
      if (busy) return;
      busy = true;
      runs += 1;
      runButton.disabled = true;
      resetButton.disabled = true;
      log.innerHTML = "";
      const incremental = runs > 1;
      runsLabel.textContent = `Run #${runs}${incremental ? " (idempotency check)" : ""}`;
      integrityEl.textContent = "pending";

      appendLog(`[00:00.0] run_started mode=${incremental ? "incremental" : "initial"}`, "info");
      setStage(0, "running", "Reading CSV");
      await sleep(560);
      appendLog(incremental ? "[00:00.6] extract: 0 new rows since cursor" : "[00:00.6] extract: 1,240 rows read from raw_orders.csv", "ok");
      setStage(0, "done", incremental ? "0 new rows" : "1,240 rows");
      extractedEl.textContent = incremental ? "0" : "1,240";

      setStage(1, "running", "Checking schema");
      await sleep(520);
      appendLog(incremental ? "[00:01.1] validate: nothing new to validate" : "[00:01.1] validate: 12 malformed rows rejected", incremental ? "dim" : "warn");
      setStage(1, "done", incremental ? "no new rows" : "1,228 valid");
      rejectedEl.textContent = incremental ? "0" : "12";

      setStage(2, "running", "Deduplicating");
      await sleep(600);
      appendLog(incremental ? "[00:01.7] transform: skipped (no rows)" : "[00:01.7] transform: 38 duplicates removed, 24 nulls fixed", incremental ? "dim" : "ok");
      setStage(2, "done", incremental ? "no rows" : "1,190 clean");
      dupesEl.textContent = incremental ? "0" : "38";

      setStage(3, "running", "Upserting star schema");
      await sleep(640);
      if (incremental) {
        appendLog("[00:02.4] load: upsert matched existing keys - no changes", "dim");
        appendLog("[00:02.4] load: fact_sales=1,190 (unchanged)", "dim");
      } else {
        appendLog("[00:02.4] load: fact_sales=1,190 rows", "ok");
        appendLog("[00:02.5] load: 5 dimensions conformed", "ok");
      }
      setStage(3, "done", incremental ? "unchanged" : "star schema");

      await sleep(380);
      appendLog("[00:02.9] integrity: all foreign keys resolved", "ok");
      appendLog("[00:02.9] audit: pipeline_log.csv + pipeline_report.md written", "ok");
      appendLog(`[00:03.0] run_complete status=success rows_loaded=${incremental ? 0 : 1190}`, "info");
      integrityEl.textContent = incremental ? "passed · no-op" : "passed";
      setTables(true);
      busy = false;
      runButton.disabled = false;
      resetButton.disabled = false;
      runButton.textContent = "Run again (test idempotency)";
    }

    function reset() {
      if (busy) return;
      runs = 0;
      runButton.textContent = "Run pipeline";
      runsLabel.textContent = "No runs yet.";
      stageEls.forEach((element) => {
        element.classList.remove("is-running", "is-done");
        $(".pipe-state", element).textContent = "idle";
      });
      log.innerHTML = `<span class="dim">Pipeline idle. Press run to start an incremental load.</span>`;
      extractedEl.textContent = "0";
      rejectedEl.textContent = "0";
      dupesEl.textContent = "0";
      integrityEl.textContent = "pending";
      tableCountsInitial();
    }

    function tableCountsInitial() {
      $$(".etl-row", root).forEach((row) => {
        if (row.children.length !== 2) return;
        if (row.children[0].textContent === "Table") return;
        row.children[1].textContent = "\u2014";
      });
    }

    runButton.addEventListener("click", run);
    resetButton.addEventListener("click", reset);
  }

  function demoHeart(root) {
    root.innerHTML = `
      <div class="heart-grid">
        <div>
          <div class="heart-form" id="heart-form">
            <div class="range-field span-2">
              <label for="heart-age">Age <output id="heart-age-out">52</output></label>
              <input type="range" id="heart-age" min="20" max="80" value="52" />
            </div>
            <div class="demo-field">
              <label for="heart-sex">Sex</label>
              <select id="heart-sex"><option value="male">Male</option><option value="female">Female</option></select>
            </div>
            <div class="demo-field">
              <label for="heart-cp">Chest pain type</label>
              <select id="heart-cp">
                <option value="typical">Typical angina</option>
                <option value="atypical">Atypical angina</option>
                <option value="nonanginal">Non-anginal pain</option>
                <option value="asymptomatic" selected>Asymptomatic</option>
              </select>
            </div>
            <div class="range-field">
              <label for="heart-bp">Resting BP <output id="heart-bp-out">130</output></label>
              <input type="range" id="heart-bp" min="90" max="200" value="130" />
            </div>
            <div class="range-field">
              <label for="heart-chol">Cholesterol <output id="heart-chol-out">240</output></label>
              <input type="range" id="heart-chol" min="120" max="400" value="240" />
            </div>
            <div class="range-field span-2">
              <label for="heart-hr">Max heart rate <output id="heart-hr-out">150</output></label>
              <input type="range" id="heart-hr" min="70" max="200" value="150" />
            </div>
            <label class="toggle-field"><input type="checkbox" id="heart-fbs" /> Fasting blood sugar &gt; 120 mg/dL</label>
            <label class="toggle-field"><input type="checkbox" id="heart-exang" /> Exercise-induced angina</label>
          </div>
          <p class="heart-disclaimer">Educational demonstration only. This calculator uses an illustrative logistic model and is not a medical device or a substitute for clinical judgement.</p>
        </div>
        <div class="risk-panel">
          <div class="risk-ring" id="heart-ring">
            <div class="risk-value"><strong id="heart-score">18%</strong><span>estimated risk</span></div>
          </div>
          <span class="risk-cat" id="heart-category">Low</span>
          <div class="factor-list" id="heart-factors"></div>
        </div>
      </div>
    `;

    const form = $("#heart-form", root);
    const ring = $("#heart-ring", root);
    const score = $("#heart-score", root);
    const category = $("#heart-category", root);
    const factors = $("#heart-factors", root);
    const age = $("#heart-age", root);
    const bp = $("#heart-bp", root);
    const chol = $("#heart-chol", root);
    const hr = $("#heart-hr", root);
    const sex = $("#heart-sex", root);
    const cp = $("#heart-cp", root);
    const fbs = $("#heart-fbs", root);
    const exang = $("#heart-exang", root);

    const cpScores = { typical: 0.2, atypical: 0.5, nonanginal: 0.1, asymptomatic: 0.9 };

    function update() {
      $("#heart-age-out", root).textContent = age.value;
      $("#heart-bp-out", root).textContent = bp.value;
      $("#heart-chol-out", root).textContent = chol.value;
      $("#heart-hr-out", root).textContent = hr.value;

      const contributions = [
        { label: "Age", value: (Number(age.value) - 52) * 0.05 },
        { label: "Cholesterol", value: (Number(chol.value) - 240) * 0.01 },
        { label: "Resting blood pressure", value: (Number(bp.value) - 130) * 0.012 },
        { label: "Max heart rate", value: (150 - Number(hr.value)) * 0.012 },
        { label: "Sex", value: sex.value === "male" ? 0.5 : 0 },
        { label: "Chest pain type", value: cpScores[cp.value] },
        { label: "Fasting blood sugar", value: fbs.checked ? 0.25 : 0 },
        { label: "Exercise angina", value: exang.checked ? 0.9 : 0 }
      ];

      const z = -3 + contributions.reduce((sum, item) => sum + item.value, 0);
      const probability = clamp((1 / (1 + Math.exp(-z))) * 100, 3, 96);
      const rounded = Math.round(probability);
      const level = probability < 20 ? "Low" : probability < 50 ? "Moderate" : "High";
      const color = probability < 20 ? "#34d399" : probability < 50 ? "#fbbf24" : "#f87171";

      score.textContent = `${rounded}%`;
      category.textContent = level;
      category.style.color = color;
      category.style.borderColor = `${color}66`;
      category.style.background = `${color}14`;
      ring.style.setProperty("--p", `${probability}%`);
      ring.style.setProperty("--risk-color", color);

      factors.innerHTML = contributions
        .slice()
        .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
        .slice(0, 4)
        .map((item) => {
          const positive = item.value >= 0;
          return `<div class="factor"><span>${item.label}</span><b class="${positive ? "up" : "down"}">${positive ? "▲ increases" : "▼ lowers"}</b></div>`;
        })
        .join("");
    }

    form.addEventListener("input", update);
    update();
  }

  function demoJobs(root) {
    const jobs = [
      { title: "Machine Learning Engineer (Remote)", company: "HireLogic", source: "RemoteOK", tags: ["python", "pytorch", "mlops", "remote"], posted: 3, salary: "$90k - $130k" },
      { title: "Computer Vision Engineer", company: "VisionForge", source: "We Work Remotely", tags: ["opencv", "python", "deep learning", "mediapipe"], posted: 6, salary: "$85k - $120k" },
      { title: "AI Training Specialist (RLHF)", company: "Outlier", source: "Outlier", tags: ["ai training", "rlhf", "python", "evaluation"], posted: 1, salary: "$35/hr" },
      { title: "Data Analyst - Remote", company: "Northstar Retail", source: "Remotive", tags: ["sql", "pandas", "tableau", "analytics"], posted: 8, salary: "$60k - $80k" },
      { title: "Data Engineer, Analytics Platform", company: "Streamline", source: "Wellfound", tags: ["python", "etl", "sql", "warehouse"], posted: 12, salary: "$95k - $125k" },
      { title: "Prompt Engineer - AI Products", company: "Lumen Labs", source: "RemoteOK", tags: ["llm", "prompting", "python", "evaluation"], posted: 5, salary: "$70k - $100k" },
      { title: "AI Evaluation Specialist", company: "Surge AI", source: "Surge AI", tags: ["ai training", "data quality", "reasoning"], posted: 2, salary: "$30/hr" },
      { title: "Junior Data Scientist", company: "Bright Metrics", source: "Remotive", tags: ["python", "scikit-learn", "pandas", "statistics"], posted: 16, salary: "$55k - $72k" },
      { title: "Automation Engineer (Python)", company: "FlowWorks", source: "Jobspresso", tags: ["python", "apis", "automation", "fastapi"], posted: 9, salary: "$70k - $95k" }
    ];

    root.innerHTML = `
      <div class="demo-field">
        <label for="jobs-query">Keyword filter</label>
        <input type="text" id="jobs-query" placeholder="e.g. python, computer vision, data" autocomplete="off" />
      </div>
      <div class="demo-row">
        <button class="demo-btn" id="jobs-scan" type="button">Scan now</button>
        <span class="demo-note" id="jobs-status" style="margin:0">Ready. Listings below are from the demo pool.</span>
      </div>
      <div class="scan-stats demo-mt">
        <div><strong id="jobs-scanned">0</strong> listings scanned</div>
        <div><strong id="jobs-matched">0</strong> matches</div>
        <div><strong id="jobs-dupes">0</strong> duplicates removed</div>
      </div>
      <div class="job-list" id="jobs-list"></div>
      <p class="demo-note"><strong>Simulation:</strong> the real agent pulls live feeds, stores seen listings in SQLite, and pushes the best matches to Telegram and email.</p>
    `;

    const query = $("#jobs-query", root);
    const scanButton = $("#jobs-scan", root);
    const status = $("#jobs-status", root);
    const list = $("#jobs-list", root);
    const scannedEl = $("#jobs-scanned", root);
    const matchedEl = $("#jobs-matched", root);
    const dupesEl = $("#jobs-dupes", root);

    function score(job, terms) {
      const haystack = `${job.title} ${job.tags.join(" ")}`.toLowerCase();
      const hits = terms.filter((term) => haystack.includes(term)).length;
      const recency = Math.max(0, 14 - job.posted);
      if (!terms.length) return Math.min(97, 58 + recency * 2);
      return Math.min(98, 52 + hits * 14 + recency);
    }

    function filtered() {
      const terms = query.value.toLowerCase().split(/\s+/).filter(Boolean);
      return jobs
        .map((job) => ({ ...job, match: score(job, terms) }))
        .sort((a, b) => b.match - a.match);
    }

    function render(animate) {
      const results = filtered();
      matchedEl.textContent = String(results.length);
      if (!results.length) {
        list.innerHTML = `<div class="job-empty">No matches for that keyword. Try "python", "data", or "ai".</div>`;
        return;
      }
      list.innerHTML = results.map((job, index) => `
        <div class="job-item" style="${animate ? `animation: bubbleIn 0.3s ease ${index * 45}ms both;` : ""}">
          <div class="job-head">
            <h4>${escapeHtml(job.title)}</h4>
            <span class="job-score">${job.match}% match</span>
          </div>
          <div class="job-meta"><span>${escapeHtml(job.company)}</span><span>${escapeHtml(job.source)}</span><span>${job.posted}h ago</span><span>${escapeHtml(job.salary)}</span></div>
          <div class="job-tags">${job.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
      `).join("");
    }

    let busy = false;

    async function scan() {
      if (busy) return;
      busy = true;
      scanButton.disabled = true;
      list.innerHTML = `<div class="job-empty">Scanning sources&hellip;</div>`;
      status.textContent = "Fetching RemoteOK, Remotive, WWR, Wellfound, Outlier, Surge AI\u2026";
      scannedEl.textContent = "0";
      const steps = [4, 9, 14, 21, 28, 33, 38, 42];
      for (const count of steps) {
        scannedEl.textContent = String(count);
        await sleep(140);
      }
      const results = filtered();
      const dupes = 3;
      dupesEl.textContent = String(dupes);
      matchedEl.textContent = String(results.length);
      scannedEl.textContent = "42";
      status.textContent = `Scan complete. ${results.length} matches kept, ${dupes} duplicates removed.`;
      render(true);
      busy = false;
      scanButton.disabled = false;
    }

    query.addEventListener("input", () => render(false));
    scanButton.addEventListener("click", scan);

    render(false);
    matchedEl.textContent = String(filtered().length);
    dupesEl.textContent = "0";
  }

  function demoLead(root) {
    root.innerHTML = `
      <div class="lead-grid">
        <div>
          <div class="demo-field">
            <label for="lead-name">Lead name</label>
            <input type="text" id="lead-name" value="Priya" autocomplete="off" />
          </div>
          <div class="demo-field">
            <label for="lead-company">Business</label>
            <input type="text" id="lead-company" value="Bright Dental" autocomplete="off" />
          </div>
          <div class="demo-field">
            <label for="lead-service">Interested in</label>
            <select id="lead-service">
              <option>Website chat automation</option>
              <option>Appointment reminders</option>
              <option>Lead follow-up sequences</option>
            </select>
          </div>
          <div class="demo-field">
            <label for="lead-tone">Tone</label>
            <select id="lead-tone"><option>Warm</option><option>Concise</option><option>Professional</option></select>
          </div>
          <div class="demo-row">
            <button class="demo-btn" id="lead-generate" type="button">Generate reply</button>
            <button class="demo-btn demo-btn--ghost" id="lead-send" type="button" disabled>Send via Gmail</button>
          </div>
          <div class="lead-status" id="lead-status"></div>
        </div>
        <div>
          <span class="demo-label">AI draft</span>
          <div class="reply-box" id="lead-reply"><span class="placeholder">Generate a reply to see the personalized draft stream in here.</span></div>
          <div class="lead-log">
            <h4>Send log</h4>
            <table class="lead-table">
              <thead><tr><th>Name</th><th>Business</th><th>Status</th><th>Time</th></tr></thead>
              <tbody id="lead-log-body"><tr><td colspan="4" class="lead-empty">No messages sent yet.</td></tr></tbody>
            </table>
          </div>
        </div>
      </div>
      <p class="demo-note"><strong>Simulation:</strong> the real bot calls Gemini for the draft and Gmail SMTP for delivery. Nothing is emailed from this page.</p>
    `;

    const name = $("#lead-name", root);
    const company = $("#lead-company", root);
    const service = $("#lead-service", root);
    const tone = $("#lead-tone", root);
    const generate = $("#lead-generate", root);
    const send = $("#lead-send", root);
    const status = $("#lead-status", root);
    const reply = $("#lead-reply", root);
    const logBody = $("#lead-log-body", root);

    let currentReply = "";
    let generated = false;
    let streaming = false;
    let streamId = 0;

    function compose() {
      const leadName = name.value.trim() || "there";
      const business = company.value.trim() || "the team";
      const interest = service.value;
      const opener = {
        Warm: `Hi ${leadName},\n\nThank you so much for reaching out to ${business}! I'm really glad you asked about ${interest.toLowerCase()}.`,
        Concise: `Hi ${leadName},\n\nThanks for contacting ${business} about ${interest.toLowerCase()}.`,
        Professional: `Dear ${leadName},\n\nThank you for your inquiry to ${business} regarding ${interest.toLowerCase()}.`
      }[tone.value];
      const body = {
        "Website chat automation": "We can have a friendly assistant reply to new website inquiries within seconds, capture the details, and hand the warm conversation to your team - so no lead waits until the next morning.",
        "Appointment reminders": "We can automate appointment confirmations and reminders, reduce no-shows, and give your front desk time back for the patients in front of them.",
        "Lead follow-up sequences": "We can send timely, personalized follow-ups to every new inquiry and keep a clear record of who replied, who booked, and who needs a call."
      }[service.value];
      return `${opener}\n\n${body}\n\nWould you be open to a quick 15-minute call this week? I can show you exactly how it would work for ${business}.\n\nBest regards,\nThe ${business} team`;
    }

    generate.addEventListener("click", async () => {
      if (streaming) return;
      streaming = true;
      generated = false;
      send.disabled = true;
      generate.disabled = true;
      status.textContent = "Drafting with Gemini\u2026";
      reply.innerHTML = "";
      const text = compose();
      currentReply = text;
      const localId = ++streamId;
      const words = text.split(" ");
      for (let i = 0; i < words.length; i += 1) {
        if (localId !== streamId) return;
        reply.textContent += (i === 0 ? "" : " ") + words[i];
        await sleep(22 + Math.random() * 26);
      }
      if (localId !== streamId) return;
      generated = true;
      streaming = false;
      generate.disabled = false;
      send.disabled = false;
      status.textContent = "Draft ready.";
    });

    send.addEventListener("click", () => {
      if (!generated) return;
      status.textContent = "Sending via Gmail SMTP\u2026";
      send.disabled = true;
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      if ($(".lead-empty", logBody)) $(".lead-empty", logBody).parentElement.remove();
      const row = document.createElement("tr");
      [name.value.trim() || "Lead", company.value.trim() || "Business", "sent", time].forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });
      logBody.prepend(row);
      status.textContent = "Reply sent and lead logged to CSV.";
      send.textContent = "Send via Gmail";
      setTimeout(() => {
        send.disabled = false;
        send.textContent = "Send via Gmail";
      }, 900);
    });

    [name, company, service, tone].forEach((field) => {
      field.addEventListener("input", () => {
        generated = false;
        send.disabled = true;
        status.textContent = "";
      });
    });
  }

  function demoCrypto(root) {
    root.innerHTML = `
      <div class="crypto-grid">
        <div>
          <span class="demo-label">Endpoint</span>
          <div class="endpoint-code"><span class="method">GET</span> <span class="path">/price?symbol=BTCUSDT</span></div>
          <div class="demo-field">
            <label for="crypto-symbol">Trading pair</label>
            <input type="text" id="crypto-symbol" value="BTCUSDT" autocomplete="off" spellcheck="false" />
          </div>
          <div class="seg" id="crypto-symbols">
            <button type="button" data-symbol="BTCUSDT" class="is-active">BTC</button>
            <button type="button" data-symbol="ETHUSDT">ETH</button>
            <button type="button" data-symbol="SOLUSDT">SOL</button>
            <button type="button" data-symbol="BNBUSDT">BNB</button>
          </div>
          <div class="demo-row">
            <button class="demo-btn" id="crypto-send" type="button">Send request</button>
            <button class="demo-btn demo-btn--ghost" id="crypto-scan" type="button">Scan 4 markets</button>
          </div>
          <div class="status-line demo-mt" id="crypto-status"><span class="dot-ok"></span><span>Ready. Requests go to the public Binance API.</span></div>
          <pre class="crypto-response" id="crypto-response"><span class="dim">// response will appear here</span></pre>
        </div>
        <div>
          <span class="demo-label">Market snapshot</span>
          <div class="price-table" id="crypto-table">
            <div class="price-row"><strong>BTCUSDT</strong><span>&mdash;</span><span>&mdash;</span></div>
            <div class="price-row"><strong>ETHUSDT</strong><span>&mdash;</span><span>&mdash;</span></div>
            <div class="price-row"><strong>SOLUSDT</strong><span>&mdash;</span><span>&mdash;</span></div>
            <div class="price-row"><strong>BNBUSDT</strong><span>&mdash;</span><span>&mdash;</span></div>
          </div>
          <p class="demo-note">If Binance is unreachable from your region or blocked by CORS, the demo falls back to a clearly labelled simulated quote.</p>
        </div>
      </div>
      <p class="demo-note"><strong>Live-ish demo:</strong> a real FastAPI server would also validate symbols, apply timeouts, and cache responses. This page calls Binance directly from the browser.</p>
    `;

    const symbolInput = $("#crypto-symbol", root);
    const sendButton = $("#crypto-send", root);
    const scanButton = $("#crypto-scan", root);
    const status = $("#crypto-status", root);
    const response = $("#crypto-response", root);
    const table = $("#crypto-table", root);
    const chips = $$("#crypto-symbols button", root);

    const fallbackPrices = { BTCUSDT: 67420.18, ETHUSDT: 3528.44, SOLUSDT: 152.67, BNBUSDT: 598.23 };

    function setStatus(kind, message) {
      const dot = kind === "busy" ? "dot-busy" : kind === "error" ? "dot-err" : "dot-ok";
      status.innerHTML = `<span class="${dot}"></span><span>${escapeHtml(message)}</span>`;
    }

    async function fetchTicker(symbol) {
      const started = performance.now();
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 7000);
      try {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${encodeURIComponent(symbol)}`, { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return {
          live: true,
          latency: Math.round(performance.now() - started),
          data: {
            symbol: data.symbol,
            price: Number(data.lastPrice),
            changePercent: Number(data.priceChangePercent),
            high: Number(data.highPrice),
            low: Number(data.lowPrice),
            volume: Number(data.volume)
          }
        };
      } catch (error) {
        clearTimeout(timeout);
        const base = fallbackPrices[symbol] || 100;
        const jitter = (Math.random() - 0.5) * base * 0.01;
        return {
          live: false,
          latency: Math.round(performance.now() - started),
          data: {
            symbol,
            price: Number((base + jitter).toFixed(2)),
            changePercent: Number(((Math.random() - 0.45) * 5).toFixed(2)),
            high: Number((base * 1.02).toFixed(2)),
            low: Number((base * 0.98).toFixed(2)),
            volume: Math.round(10000 + Math.random() * 90000)
          }
        };
      }
    }

    function showResponse(result, symbol) {
      const payload = JSON.stringify(result.data, null, 2);
      response.textContent = result.live
        ? payload
        : `// simulated fallback\n${payload}`;
      setStatus(result.live ? "ok" : "error", result.live ? `200 OK \u00b7 ${result.latency} ms \u00b7 live Binance data` : `Network unavailable \u00b7 ${result.latency} ms \u00b7 simulated ${symbol} quote`);
    }

    async function request() {
      const symbol = symbolInput.value.trim().toUpperCase();
      if (!symbol) return;
      sendButton.disabled = true;
      scanButton.disabled = true;
      setStatus("busy", `GET /price?symbol=${symbol}\u2026`);
      response.textContent = "// requesting\u2026";
      const result = await fetchTicker(symbol);
      showResponse(result, symbol);
      sendButton.disabled = false;
      scanButton.disabled = false;
    }

    async function scan() {
      sendButton.disabled = true;
      scanButton.disabled = true;
      setStatus("busy", "Scanning BTC, ETH, SOL, BNB\u2026");
      const symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT"];
      const results = await Promise.all(symbols.map((symbol) => fetchTicker(symbol)));
      table.innerHTML = results.map((result) => {
        const data = result.data;
        const up = data.changePercent >= 0;
        return `
          <div class="price-row">
            <strong>${escapeHtml(data.symbol)}</strong>
            <span>$${data.price.toLocaleString("en-US", { maximumFractionDigits: 2 })}</span>
            <span class="${up ? "chg-up" : "chg-down"}">${up ? "+" : ""}${data.changePercent.toFixed(2)}%</span>
          </div>
        `;
      }).join("");
      const anyLive = results.some((result) => result.live);
      setStatus(anyLive ? "ok" : "error", anyLive ? "Market scan complete \u00b7 live Binance data" : "Market scan complete \u00b7 simulated fallback");
      sendButton.disabled = false;
      scanButton.disabled = false;
    }

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        symbolInput.value = chip.dataset.symbol;
        chips.forEach((item) => item.classList.toggle("is-active", item === chip));
      });
    });

    sendButton.addEventListener("click", request);
    scanButton.addEventListener("click", scan);
  }

  function demoTelegram(root) {
    root.innerHTML = `
      <div class="tg-grid">
        <div>
          <div class="demo-field">
            <label for="tg-task">Workflow module</label>
            <select id="tg-task">
              <option value="reply">Auto-reply to new message</option>
              <option value="broadcast">Broadcast to subscribers</option>
              <option value="digest">Channel digest</option>
            </select>
          </div>
          <div class="demo-field">
            <label for="tg-message">Message</label>
            <textarea id="tg-message" rows="4">Thanks for reaching out! Our team will reply within 24 hours.</textarea>
          </div>
          <div class="demo-row">
            <button class="demo-btn" id="tg-run" type="button">Run workflow</button>
            <button class="demo-btn demo-btn--ghost" id="tg-reset" type="button">Reset</button>
          </div>
          <div class="demo-console demo-mt" id="tg-log"><span class="dim">Workflow idle. Select a module and press run.</span></div>
        </div>
        <div>
          <div class="phone">
            <div class="phone-top">
              <span class="phone-avatar">AC</span>
              <div><strong>Automation Sandbox</strong><span>online</span></div>
            </div>
            <div class="chat" id="tg-chat"><div class="chat-empty">Run a workflow to preview the message flow.</div></div>
          </div>
        </div>
      </div>
      <p class="demo-note"><strong>Simulation:</strong> no Telegram account is contacted. The real toolkit loads a persisted Telethon session and runs the same task modules with pacing and error handling.</p>
    `;

    const task = $("#tg-task", root);
    const message = $("#tg-message", root);
    const runButton = $("#tg-run", root);
    const resetButton = $("#tg-reset", root);
    const chat = $("#tg-chat", root);
    const log = $("#tg-log", root);
    const defaults = {
      reply: "Thanks for reaching out! Our team will reply within 24 hours.",
      broadcast: "New this week: we just launched automated appointment reminders. Reply INFO to learn more.",
      digest: "Weekly digest: 18 new conversations, 6 appointments booked, average response time 42 seconds."
    };
    let busy = false;

    function logLine(text, className) {
      const line = document.createElement("span");
      if (className) line.className = className;
      line.textContent = `${text}\n`;
      log.appendChild(line);
      log.scrollTop = log.scrollHeight;
    }

    function bubble(text, direction) {
      const empty = $(".chat-empty", chat);
      if (empty) empty.remove();
      const element = document.createElement("div");
      element.className = `bubble bubble--${direction}`;
      element.textContent = text;
      chat.appendChild(element);
      chat.scrollTop = chat.scrollHeight;
    }

    task.addEventListener("change", () => {
      message.value = defaults[task.value];
    });

    async function run() {
      if (busy) return;
      busy = true;
      runButton.disabled = true;
      resetButton.disabled = true;
      log.innerHTML = "";
      chat.innerHTML = "";
      const text = message.value.trim() || defaults[task.value];
      logLine("[00:00.0] loading environment configuration", "dim");
      await sleep(380);
      logLine("[00:00.4] session restored - connected", "ok");
      await sleep(320);

      if (task.value === "reply") {
        bubble("Hi! Do you have any appointments available this week?", "in");
        await sleep(520);
        bubble(text, "out");
        logLine("[00:01.2] incoming message matched trigger", "info");
        await sleep(360);
        logLine("[00:01.6] auto-reply delivered", "ok");
      } else if (task.value === "broadcast") {
        logLine("[00:00.8] task: broadcast to 3 subscribers", "info");
        for (let i = 1; i <= 3; i += 1) {
          bubble(text, "out");
          await sleep(380);
          logLine(`[00:${(1 + i * 0.4).toFixed(1)}] delivered ${i}/3`, "ok");
        }
      } else {
        bubble(text, "out");
        logLine("[00:00.8] collecting channel posts", "info");
        await sleep(420);
        logLine("[00:01.2] 12 posts summarized into digest", "ok");
        await sleep(320);
        bubble("Digest compiled and published.", "in");
        logLine("[00:01.6] digest published", "ok");
      }

      await sleep(300);
      logLine("[done] workflow finished without errors", "info");
      busy = false;
      runButton.disabled = false;
      resetButton.disabled = false;
    }

    function reset() {
      if (busy) return;
      log.innerHTML = `<span class="dim">Workflow idle. Select a module and press run.</span>`;
      chat.innerHTML = `<div class="chat-empty">Run a workflow to preview the message flow.</div>`;
    }

    runButton.addEventListener("click", run);
    resetButton.addEventListener("click", reset);
  }
})();
