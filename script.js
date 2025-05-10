const questions = [
  { text: "What are the avg delivery costs on each route?", category: "Descriptive" },
  { text: "Do delivery times vary significantly during peak & off-peak hours?", category: "Descriptive" },
  { text: "What were the number of deliveries on each route last month?", category: "Descriptive" },
  { text: "Apart from distance, what factors seem to increase delivery times?", category: "Descriptive" },

  { text: "Why did delivery times increase last Friday across multiple routes?", category: "Diagnostic" },
  { text: "What led to a spike in delivery costs during the holiday week?", category: "Diagnostic" },
  { text: "Why are some vehicles consistently underperforming on delivery?", category: "Diagnostic" },
  { text: "What are the reasons for increased fuel consumption on some routes?", category: "Diagnostic" },

  { text: "How will accidents or road blocks affect next week's delivery times?", category: "Predictive" },
  { text: "How many delivery will be required next week, based on expected sale?", category: "Predictive" },
  { text: "What might be the expected delivery time for each route?", category: "Predictive" },
  { text: "What will traffic be like in the next week?", category: "Predictive" },

  { text: "What are the best routes to minimize time & cost?", category: "Prescriptive" },
  { text: "What adjustments should be made to tomorrow's schedule?", category: "Prescriptive" },
  { text: "What incentives may ensure better performance at peak hours?", category: "Prescriptive" },
  { text: "Can a new warehouse in the fast-growing suburb be justified?", category: "Prescriptive" },
];

let used = new Set();
let draggedItem = null;
let placedCount = 0;

function getRandomQuestion() {
  if (used.size === questions.length) {
    document.getElementById("questionLabel").innerText = "";
    document.getElementById("questionLabel").setAttribute("draggable", "false");
    return;
  }

  let idx;
  do {
    idx = Math.floor(Math.random() * questions.length);
  } while (used.has(idx));

  used.add(idx);
  const q = questions[idx];
  const label = document.getElementById("questionLabel");
  label.innerText = q.text;
  label.setAttribute("data-category", q.category);
  label.setAttribute("draggable", "true");
  label.ondragstart = drag;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  draggedItem = ev.target;
}

function drop(ev) {
  ev.preventDefault();
  if (!draggedItem) return;

  const dropZone = ev.currentTarget.querySelector(".drop-zone");
  const expectedCategory = ev.currentTarget.getAttribute("data-category");
  const actualCategory = draggedItem.getAttribute("data-category");

  const placed = document.createElement("div");
  placed.innerText = draggedItem.innerText;
  placed.className = "draggable";
  placed.setAttribute("data-category", actualCategory);
  dropZone.appendChild(placed);

  placedCount++;
  if (placedCount === 16) {
    document.getElementById("submitBtn").disabled = false;
  }

  draggedItem.innerText = "";
  draggedItem.setAttribute("draggable", "false");
  getRandomQuestion();
}

function calculateScore() {
  let correct = 0;
  const dropZones = document.querySelectorAll(".category");

  dropZones.forEach(zone => {
    const expectedCategory = zone.getAttribute("data-category");
    const items = zone.querySelectorAll(".drop-zone .draggable");
    items.forEach(item => {
      const actualCategory = item.getAttribute("data-category");
      if (expectedCategory === actualCategory) correct++;
    });
  });

  document.getElementById("scoreDisplay").innerText = `Score: ${correct} / 16`;
}

getRandomQuestion();
