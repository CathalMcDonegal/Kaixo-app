const lessons = {
  1: {
    title: "Kaixo!",
    subtitle: "Salutacions, presentacions i comiat",
    objective: "Avui aprendràs a saludar, preguntar com està algú, presentar-te i acomiadar-te.",
    intro: {
      title: "Una situació real",
      dialogue: [
        ["Ane", "Kaixo! Egun on!"],
        ["Jon", "Kaixo! Egun on! Zer moduz?"],
        ["Ane", "Oso ondo, eskerrik asko. Eta zu?"],
        ["Jon", "Ni ere oso ondo. Ni Jon naiz. Eta zu?"],
        ["Ane", "Ni Ane naiz. Laster arte!"],
        ["Jon", "Agur! Ikusi arte!"]
      ],
      phrases: [
        ["Kaixo!", "Hola!"], ["Egun on!", "Bon dia!"],
        ["Arratsalde on!", "Bona tarda!"], ["Gabon!", "Bona nit!"],
        ["Zer moduz?", "Com estàs? / Com va?"], ["Oso ondo.", "Molt bé."],
        ["Eskerrik asko.", "Moltes gràcies."], ["Eta zu?", "I tu?"],
        ["Ni Jon naiz.", "Jo soc en Jon."], ["Agur!", "Adéu!"],
        ["Laster arte!", "Fins aviat!"], ["Ikusi arte!", "Fins després / Fins que ens tornem a veure!"]
      ],
      grammar: "Per presentar-te pots dir «Ni + nom + naiz»: Ni Ane naiz. Per preguntar el nom: «Zu nor zara?». «Zer moduz?» serveix per preguntar com està algú."
    },
    questions: [
      ["Arribes al matí a una botiga. Què diries primer?", ["Egun on!", "Agur!", "Gabon!"], "Egun on!"],
      ["Algú et diu «Zer moduz?». Quina resposta és natural?", ["Oso ondo, eskerrik asko.", "Agur, mesedez.", "Gabon, ez."], "Oso ondo, eskerrik asko."],
      ["Completa: «Ni Jon ___».", ["naiz", "zara", "da"], "naiz"],
      ["Com diries «I tu?»", ["Eta zu?", "Zu nor?", "Agur zu?"], "Eta zu?"],
      ["Algú et pregunta «Zu nor zara?». Què contestes?", ["Ni Ane naiz.", "Oso ondo.", "Egun on."], "Ni Ane naiz."],
      ["És de nit i arribes a casa d'algú. Què pots dir?", ["Gabon!", "Egun on!", "Arratsalde on!"], "Gabon!"],
      ["Què vol dir «Eskerrik asko»?", ["Moltes gràcies", "Fins aviat", "Com estàs?"], "Moltes gràcies"],
      ["Vols acomiadar-te i dir «Fins aviat!».", ["Laster arte!", "Zer moduz?", "Ni naiz!"], "Laster arte!"],
      ["Quina opció és un comiat?", ["Ikusi arte!", "Egun on!", "Zer moduz?"], "Ikusi arte!"],
      ["Ordena mentalment: presentació correcta.", ["Ni Ane naiz.", "Ane ni zara.", "Naiz Ane zu."], "Ni Ane naiz."],
      ["Un amic et diu «Kaixo!». Què pots respondre?", ["Kaixo!", "Gabon!", "Agur!"], "Kaixo!"],
      ["Quina expressió pots utilitzar després de dir «Oso ondo» per preguntar per l'altra persona?", ["Eta zu?", "Agur!", "Egun on!"], "Eta zu?"],
      ["Completa el diàleg: «Kaixo! — ___! Zer moduz?»", ["Kaixo", "Agur", "Gabon"], "Kaixo"],
      ["Quina frase et permet presentar-te directament?", ["Ni Jon naiz.", "Zer moduz?", "Laster arte!"], "Ni Jon naiz."]
    ]
  },
  2: {
    title: "Ni… naiz",
    subtitle: "Presentar-se i donar informació personal",
    objective: "Aprèn a dir qui ets, com et dius i d'on ets.",
    intro: {
      title: "Ara ja pots iniciar una conversa",
      dialogue: [
        ["Maialen", "Kaixo! Zu nor zara?"],
        ["Iker", "Ni Iker naiz. Eta zu?"],
        ["Maialen", "Ni Maialen naiz. Nongoa zara?"],
        ["Iker", "Bartzelonakoa naiz. Eta zu?"],
        ["Maialen", "Bilbokoa naiz. Ongi etorri!"]
      ],
      phrases: [
        ["Zu nor zara?", "Qui ets?"], ["Ni … naiz.", "Jo soc …"],
        ["Nire izena … da.", "Em dic …"], ["Nongoa zara?", "D'on ets?"],
        ["…-koa naiz.", "Soc de …"], ["Eta zu?", "I tu?"],
        ["Ongi etorri!", "Benvingut/da!"]
      ],
      grammar: "«Ni» és jo i «zu» és tu. Amb «naiz» pots dir «soc»: Ni Jon naiz. Per dir d'on ets, pots utilitzar «-koa»: Bartzelonakoa naiz."
    },
    questions: [
      ["Què vol dir «Zu nor zara?»", ["Qui ets?", "D'on ets?", "Com estàs?"], "Qui ets?"],
      ["Completa: «Ni Ane ___».", ["naiz", "zara", "da"], "naiz"],
      ["Com diries «Em dic Jon»?", ["Nire izena Jon da.", "Jon zara.", "Jon agur da."], "Nire izena Jon da."],
      ["Què vol dir «Nongoa zara?»", ["D'on ets?", "Qui ets?", "Com estàs?"], "D'on ets?"],
      ["Completa: «Bartzelonakoa ___».", ["naiz", "zara", "gara"], "naiz"],
      ["Si ets de Bilbao, quina resposta encaixa?", ["Bilbokoa naiz.", "Bilbokoa zara.", "Bilbo nor naiz."], "Bilbokoa naiz."],
      ["Quina frase significa «I tu?»", ["Eta zu?", "Zu nor zara?", "Nongoa zara?"], "Eta zu?"],
      ["Algú et diu «Ongi etorri!». Què està fent?", ["Et dona la benvinguda", "S'acomiada", "Et pregunta el nom"], "Et dona la benvinguda"],
      ["Quina frase és una presentació correcta?", ["Ni Marta naiz.", "Marta zara ni.", "Naiz zu Marta."], "Ni Marta naiz."]
    ]
  },
  3: {
    title: "Bai / Ez",
    subtitle: "Afirmar, negar i reaccionar",
    objective: "Aprèn a respondre afirmativament o negativament i a dir que no ho saps.",
    intro: {
      title: "Parlar sense complicar-te",
      dialogue: [
        ["A", "Euskalduna zara?"], ["B", "Bai."],
        ["A", "Bartzelonakoa zara?"], ["B", "Ez. Bilbokoa naiz."],
        ["A", "Badakizu euskaraz?"], ["B", "Ez dakit."]
      ],
      phrases: [
        ["Bai.", "Sí."], ["Ez.", "No."], ["Bai, eskerrik asko.", "Sí, gràcies."],
        ["Ez, eskerrik asko.", "No, gràcies."], ["Ados.", "D'acord."],
        ["Ez dakit.", "No ho sé."], ["Badakit.", "Ho sé."]
      ],
      grammar: "En una resposta curta, «Bai» afirma i «Ez» nega. «Ez dakit» vol dir «No ho sé»."
    },
    questions: [
      ["Què vol dir «Bai»?", ["Sí", "No", "No ho sé"], "Sí"],
      ["Què vol dir «Ez»?", ["Sí", "No", "D'acord"], "No"],
      ["Com diries «No ho sé»?", ["Ez dakit", "Bai dakit", "Agur dakit"], "Ez dakit"],
      ["Algú et pregunta una cosa i no en coneixes la resposta. Què dius?", ["Ez dakit.", "Bai.", "Agur."], "Ez dakit."],
      ["Quina resposta significa «D'acord»?", ["Ados.", "Ez.", "Gabon."], "Ados."],
      ["Com pots rebutjar educadament una oferta?", ["Ez, eskerrik asko.", "Ez dakit, agur.", "Bai, agur."], "Ez, eskerrik asko."],
      ["«Bai, eskerrik asko» significa…", ["Sí, gràcies", "No, gràcies", "No ho sé"], "Sí, gràcies"]
    ]
  },
  4: {
    title: "Cortesia bàsica",
    subtitle: "Expressions que faràs servir cada dia",
    objective: "Aprèn a donar les gràcies, demanar alguna cosa, disculpar-te i respondre amb educació.",
    intro: {
      title: "Petites paraules, grans diferències",
      dialogue: [
        ["A", "Barkatu. Ogia, mesedez."], ["B", "Bai, noski."],
        ["A", "Eskerrik asko!"], ["B", "Ez horregatik."],
        ["A", "Mila esker."], ["B", "Ez horregatik!"]
      ],
      phrases: [
        ["Eskerrik asko.", "Gràcies."], ["Mila esker.", "Moltes gràcies."],
        ["Mesedez.", "Si us plau."], ["Barkatu.", "Perdó / Disculpa."],
        ["Ez horregatik.", "De res."], ["Ongi etorri!", "Benvingut/da!"]
      ],
      grammar: "«Mesedez» acompanya sovint una petició. «Barkatu» serveix per disculpar-te o cridar l'atenció d'algú amb educació."
    },
    questions: [
      ["Com diries «Gràcies»?", ["Eskerrik asko", "Mesedez", "Barkatu"], "Eskerrik asko"],
      ["Què vol dir «Mesedez»?", ["Si us plau", "Perdó", "Benvingut"], "Si us plau"],
      ["Què vol dir «Barkatu»?", ["Perdó / Disculpa", "Gràcies", "Adéu"], "Perdó / Disculpa"],
      ["Algú t'ajuda. Què dius?", ["Eskerrik asko.", "Mesedez.", "Barkatu."], "Eskerrik asko."],
      ["Vols demanar pa amb educació. Què afegeixes a la petició?", ["Mesedez.", "Agur.", "Bai."], "Mesedez."],
      ["Algú et diu «Eskerrik asko». Quina resposta encaixa?", ["Ez horregatik.", "Barkatu.", "Gabon."], "Ez horregatik."],
      ["«Mila esker» expressa…", ["Agraïment", "Negació", "Comiat"], "Agraïment"]
    ]
  },
  5: {
    title: "Repàs!",
    subtitle: "Mini-joc: sobreviu a la primera conversa",
    objective: "Combina el que has après per resoldre una conversa quotidiana.",
    intro: {
      title: "Missió",
      dialogue: [
        ["Situació", "Entres en un bar i vols saludar."], ["Tu", "Kaixo! Egun on!"],
        ["Situació", "La persona et pregunta com estàs."], ["Tu", "Oso ondo, eskerrik asko. Eta zu?"],
        ["Situació", "Et pregunta qui ets."], ["Tu", "Ni … naiz. Laster arte!"]
      ],
      phrases: [
        ["Kaixo!", "Hola!"], ["Egun on!", "Bon dia!"], ["Zer moduz?", "Com estàs?"],
        ["Oso ondo.", "Molt bé."], ["Eta zu?", "I tu?"], ["Ni … naiz.", "Jo soc …"],
        ["Eskerrik asko.", "Gràcies."], ["Mesedez.", "Si us plau."],
        ["Barkatu.", "Perdó."], ["Agur!", "Adéu!"], ["Laster arte!", "Fins aviat!"]
      ],
      grammar: "Ara no busquem traduir paraules aïllades: l'objectiu és escollir l'expressió adequada segons la situació."
    },
    questions: [
      ["Arribes al matí a un lloc. Quina és una bona entrada?", ["Kaixo! Egun on!", "Agur! Gabon!", "Mesedez!"], "Kaixo! Egun on!"],
      ["Et pregunten «Zer moduz?»", ["Oso ondo, eskerrik asko.", "Ni Jon naiz.", "Laster arte."], "Oso ondo, eskerrik asko."],
      ["Vols saber qui és l'altra persona.", ["Zu nor zara?", "Nongoa zara?", "Zer moduz?"], "Zu nor zara?"],
      ["Vols presentar-te.", ["Ni Ane naiz.", "Eta zu?", "Agur!"], "Ni Ane naiz."],
      ["Vols demanar alguna cosa amb educació.", ["Mesedez.", "Bai.", "Agur."], "Mesedez."],
      ["Has interromput algú i vols disculpar-te.", ["Barkatu.", "Eskerrik asko.", "Gabon."], "Barkatu."],
      ["Algú t'ajuda.", ["Eskerrik asko.", "Ez dakit.", "Agur."], "Eskerrik asko."],
      ["Et diuen «Eskerrik asko».", ["Ez horregatik.", "Mesedez.", "Barkatu."], "Ez horregatik."],
      ["Te'n vas i vols dir «Fins aviat».", ["Laster arte!", "Egun on!", "Zer moduz?"], "Laster arte!"],
      ["Quina opció és un comiat?", ["Ikusi arte!", "Zu nor zara?", "Oso ondo."], "Ikusi arte!"],
      ["No coneixes la resposta a una pregunta.", ["Ez dakit.", "Bai, eskerrik asko.", "Agur."], "Ez dakit."],
      ["Quina frase tanca millor una primera conversa?", ["Laster arte!", "Zu nor zara?", "Mesedez."], "Laster arte!"]
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
function introHtml(intro) {
  if (!intro) return "";
  return `<section class="lesson-card intro-card">
    <span class="intro-label">SITUACIÓ REAL</span>
    <h2>${intro.title}</h2>
    <div class="dialogue">${intro.dialogue.map(([who,text]) => `<div><b>${who}</b><span>${text}</span></div>`).join("")}</div>
    <h3>🧠 Expressions que has de reconèixer</h3>
    <div class="phrase-list">${intro.phrases.map(([eu,ca]) => `<div><b>${eu}</b><span>${ca}</span></div>`).join("")}</div>
    <div class="grammar"><b>💡 Petit truc</b><p>${intro.grammar}</p></div>
  </section>`;
}
function render() {
  const l = lessons[cur.id], q = l.questions[cur.i];
  const pct = Math.round((cur.i / l.questions.length) * 100);
  lesson.innerHTML = `<button class="back" id="backLesson">← Tornar</button>
    <div class="lesson-head"><small>A1 · Lliçó ${cur.id}/28</small><span>⭐ ${cur.score}</span></div>
    <div class="progress"><i style="width:${pct}%"></i></div>
    ${cur.i === 0 ? introHtml(l.intro) : ""}
    <section class="lesson-card question"><small>${l.subtitle}</small><div class="word">${l.title}</div>
      <p class="objective">${l.objective}</p><div class="question-number">Pregunta ${cur.i + 1} de ${l.questions.length}</div>
      <h2>${q[0]}</h2><div class="answers" id="answers"></div><div class="feedback" id="feedback" aria-live="polite"></div>
    </section>`;
  $("backLesson").addEventListener("click", goHome);
  q[1].forEach(option => {
    const btn = document.createElement("button");
    btn.className = "answer"; btn.textContent = option;
    btn.addEventListener("click", () => answer(btn, option));
    $("answers").appendChild(btn);
  });
}
function answer(btn, value) {
  if (cur.answered) return;
  cur.answered = true;
  const q = lessons[cur.id].questions[cur.i], feedback = $("feedback");
  const buttons = document.querySelectorAll(".answer");
  buttons.forEach(b => b.disabled = true);
  if (value === q[2]) {
    btn.classList.add("correct"); cur.score += 10;
    feedback.textContent = "Oso ondo! +10 ⭐"; feedback.className = "feedback good";
  } else {
    btn.classList.add("wrong");
    buttons.forEach(b => { if (b.textContent === q[2]) b.classList.add("correct"); });
    feedback.textContent = `La resposta correcta és «${q[2]}».`;
    feedback.className = "feedback bad";
  }
  setTimeout(() => {
    cur.i++; cur.answered = false;
    if (cur.i < lessons[cur.id].questions.length) { render(); window.scrollTo({top:0,behavior:"smooth"}); }
    else finish();
  }, 900);
}
function finish() {
  const id = cur.id;
  if (!state.done.includes(id)) { state.done.push(id); state.points += cur.score; }
  const today = new Date().toISOString().slice(0,10);
  if (state.last !== today) { state.streak++; state.last = today; }
  save();
  lesson.innerHTML = `<section class="lesson-card result"><div class="big">🎉</div><h2>Oso ondo!</h2>
    <p>Lliçó completada</p><h3>+${cur.score} punts ⭐</h3>
    <p>🔥 Ratxa: ${state.streak} ${state.streak === 1 ? "dia" : "dies"}</p>
    <p class="result-note">Ja pots saludar, presentar-te i acomiadar-te en euskera.</p>
    <button class="primary" id="continueHome">Continuar</button></section>`;
  $("continueHome").addEventListener("click", goHome);
}
function goHome() {
  lesson.classList.add("hidden"); home.classList.remove("hidden"); updateHome();
  window.scrollTo({top:0,behavior:"smooth"});
}
updateHome();
