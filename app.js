const lessons = {
  1: {
    title: "Kaixo!",
    subtitle: "Salutacions i comiat",
    objective: "Aprèn les salutacions bàsiques en euskera.",
    questions: [
      ["Què vol dir «Kaixo»?", ["Hola", "Adéu", "Gràcies"], "Hola"],
      ["Com diries «Adéu»?", ["Kaixo", "Agur", "Mesedez"], "Agur"],
      ["Quina expressió vol dir «Bon dia»?", ["Egun on", "Gabon", "Laster arte"], "Egun on"],
      ["Què vol dir «Eskerrik asko»?", ["Hola", "Gràcies", "Fins aviat"], "Gràcies"],
      ["Completa: «___ arte!»", ["Ikusi", "Bai", "Ez"], "Ikusi"]
    ]
  },
  2: {
    title: "Ni… naiz",
    subtitle: "Presentar-se",
    objective: "Aprèn a presentar-te en euskera.",
    questions: [
      ["Què vol dir «Ni»?", ["Jo", "Tu", "Ell"], "Jo"],
      ["Què vol dir «Zu»?", ["Jo", "Tu", "Nosaltres"], "Tu"],
      ["Completa: «Ni Jon ___»", ["naiz", "zara", "da"], "naiz"]
    ]
  },
  3: {
    title: "Bai / Ez",
    subtitle: "Afirmar i negar",
    objective: "Aprèn a dir sí i no.",
    questions: [
      ["Què vol dir «Bai»?", ["Sí", "No", "No ho sé"], "Sí"],
      ["Què vol dir «Ez»?", ["Sí", "No", "D'acord"], "No"],
      ["Com diries «No ho sé»?", ["Ados", "Ez dakit", "Bai"], "Ez dakit"]
    ]
  },
  4: {
    title: "Cortesia bàsica",
    subtitle: "Paraules per al dia a dia",
    objective: "Aprèn expressions bàsiques de cortesia.",
    questions: [
      ["Com diries «Gràcies»?", ["Mesedez", "Eskerrik asko", "Barkatu"], "Eskerrik asko"],
      ["Què vol dir «Mesedez»?", ["Si us plau", "Perdó", "Benvingut"], "Si us plau"],
      ["Què vol dir «Barkatu»?", ["Perdó", "Gràcies", "Adéu"], "Perdó"]
    ]
  },
  5: {
    title: "Repàs!",
    subtitle: "Mini-joc",
    objective: "Repassem el que ja saps.",
    questions: [
      ["Arribes a un lloc. Què pots dir?", ["Kaixo", "Agur", "Barkatu"], "Kaixo"],
      ["Te'n vas. Què pots dir?", ["Egun on", "Agur", "Mesedez"], "Agur"],
      ["Algú t'ajuda. Què dius?", ["Eskerrik asko", "Ez", "Gabon"], "Eskerrik asko"],
      ["Com dius «Si us plau»?", ["Barkatu", "Mesedez", "Agur"], "Mesedez"]
    ]
  }
};

let state = JSON.parse(localStorage.getItem("kaixoState") || '{"points":0,"done":[],"streak":0,"last":""}');
let cur = null;

const $ = id => document.getElementById(id);
const home = $("home");
const lesson = $("lesson");

function save() {
  localStorage.setItem("kaixoState", JSON.stringify(state));
  updateHome();
}

function updateHome() {
  $("points").textContent = state.points;
  $("done").textContent = state.done.length;
  $("streak").textContent = state.streak;
}

function openLesson(id) {
  if (!lessons[id]) return;
  cur = { id, i: 0, score: 0, answered: false };
  home.classList.add("hidden");
  lesson.classList.remove("hidden");
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function render() {
  const l = lessons[cur.id];
  const q = l.questions[cur.i];
  const pct = Math.round((cur.i / l.questions.length) * 100);

  lesson.innerHTML = `
    <button class="back" id="backLesson">← Tornar</button>
    <div class="lesson-head">
      <small>A1 · Lliçó ${cur.id}/28</small>
      <span>⭐ ${cur.score}</span>
    </div>
    <div class="progress"><i style="width:${pct}%"></i></div>
    <section class="lesson-card question">
      <small>${l.subtitle}</small>
      <div class="word">${l.title}</div>
      <p class="objective">${l.objective}</p>
      <div class="question-number">Pregunta ${cur.i + 1} de ${l.questions.length}</div>
      <h2>${q[0]}</h2>
      <div class="answers" id="answers"></div>
      <div class="feedback" id="feedback" aria-live="polite"></div>
    </section>`;

  $("backLesson").addEventListener("click", goHome);

  const answers = $("answers");
  q[1].forEach(option => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = option;
    btn.addEventListener("click", () => answer(btn, option));
    answers.appendChild(btn);
  });
}

function answer(btn, value) {
  if (cur.answered) return;

  cur.answered = true;
  const q = lessons[cur.id].questions[cur.i];
  const feedback = $("feedback");
  const buttons = document.querySelectorAll(".answer");

  buttons.forEach(b => b.disabled = true);

  if (value === q[2]) {
    btn.classList.add("correct");
    cur.score += 10;
    feedback.textContent = "Oso ondo! +10 ⭐";
    feedback.className = "feedback good";
  } else {
    btn.classList.add("wrong");
    buttons.forEach(b => {
      if (b.textContent === q[2]) b.classList.add("correct");
    });
    feedback.textContent = `La resposta correcta és «${q[2]}».`;
    feedback.className = "feedback bad";
  }

  setTimeout(() => {
    cur.i++;
    cur.answered = false;
    if (cur.i < lessons[cur.id].questions.length) {
      render();
    } else {
      finish();
    }
  }, 900);
}

function finish() {
  const id = cur.id;

  if (!state.done.includes(id)) {
    state.done.push(id);
    state.points += cur.score;
  }

  const today = new Date().toISOString().slice(0, 10);
  if (state.last !== today) {
    state.streak++;
    state.last = today;
  }

  save();

  lesson.innerHTML = `
    <section class="lesson-card result">
      <div class="big">🎉</div>
      <h2>Oso ondo!</h2>
      <p>Lliçó completada</p>
      <h3>+${cur.score} punts ⭐</h3>
      <p>🔥 Ratxa: ${state.streak} ${state.streak === 1 ? "dia" : "dies"}</p>
      <button class="primary" id="continueHome">Continuar</button>
    </section>`;

  $("continueHome").addEventListener("click", goHome);
}

function goHome() {
  lesson.classList.add("hidden");
  home.classList.remove("hidden");
  updateHome();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

updateHome();
