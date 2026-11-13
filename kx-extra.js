/* Kaixo · kx-extra.js
   Afegeix a Kaixo (sense tocar les lliçons):
   1) Repàs espaiat ("Repàs d'avui"): paraules noves + repàs just abans d'oblidar-les
   2) Exercicis nous: escriure la paraula, escoltar, ordenar frases i completar buits
   3) Diccionari ampliat amb tot el vocabulari de les lliçons
   Contingut i codi propis. Inspirat només en mecàniques generals (repetició espaiada, exercicis curts). */
(function () {
  "use strict";
  if (typeof LS === "undefined" || typeof go !== "function" || typeof st === "undefined" || typeof t !== "function") return;

  /* ---------- utilitats ---------- */
  const tx = a => t(a);
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const app = () => document.getElementById("app");
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  const back = () => `<button class="back" onclick="go('home')">← ${tx(N.home)}</button>`;
  const L = {
    rev: ["Repàs d'avui", "Repaso de hoy", "Today's review", "Révision du jour"],
    revd: ["Repetició espaiada: cada paraula torna just abans d'oblidar-la.", "Repetición espaciada: cada palabra vuelve justo antes de olvidarla.", "Spaced repetition: each word comes back just before you forget it.", "Répétition espacée : chaque mot revient juste avant que tu l'oublies."],
    revs: ["Paraules noves i repàs, en una tanda curta", "Palabras nuevas y repaso, en una tanda corta", "New words and review in a short session", "Mots nouveaux et révision en une courte série"],
    due: ["per repassar", "para repasar", "to review", "à réviser"],
    newc: ["noves", "nuevas", "new", "nouveaux"],
    mast: ["apreses", "aprendidas", "learned", "apprises"],
    lrn: ["paraules en procés d'aprenentatge", "palabras en proceso de aprendizaje", "words still being learned", "mots en cours d'apprentissage"],
    start: ["Començar", "Empezar", "Start", "Commencer"],
    none: ["Avui no queda res per repassar. Torna demà!", "Hoy no queda nada por repasar. ¡Vuelve mañana!", "Nothing left to review today. Come back tomorrow!", "Rien à réviser aujourd'hui. Reviens demain !"],
    extra: ["Practicar igualment", "Practicar igualmente", "Practise anyway", "S'entraîner quand même"],
    newt: ["Paraules noves", "Palabras nuevas", "New words", "Mots nouveaux"],
    newd: ["Mira-les, escolta-les i després te les preguntaré.", "Míralas, escúchalas y luego te las preguntaré.", "Look at them, listen, and then I'll quiz you.", "Regarde-les, écoute-les, puis je te les demanderai."],
    got: ["Entesos, practiquem", "Entendido, practiquemos", "Got it, let's practise", "Compris, on s'entraîne"],
    q1: ["Què vol dir?", "¿Qué significa?", "What does it mean?", "Que veut dire ce mot ?"],
    qlis: ["Escolta i tria el significat", "Escucha y elige el significado", "Listen and pick the meaning", "Écoute et choisis le sens"],
    qrev: ["Com es diu en euskera?", "¿Cómo se dice en euskera?", "How do you say it in Basque?", "Comment dit-on en basque ?"],
    qtype: ["Escriu-ho en euskera", "Escríbelo en euskera", "Write it in Basque", "Écris-le en basque"],
    check: ["Comprova", "Comprueba", "Check", "Vérifier"],
    done: ["Tanda acabada!", "¡Tanda terminada!", "Session complete!", "Série terminée !"],
    more: ["Una altra tanda", "Otra tanda", "Another round", "Une autre série"],
    phr: ["Frases", "Frases", "Sentences", "Phrases"],
    phrd: ["Ordena les paraules i completa els buits", "Ordena las palabras y completa los huecos", "Put words in order and fill the gaps", "Remets les mots dans l'ordre et complète les trous"],
    qord: ["Ordena la frase en euskera", "Ordena la frase en euskera", "Put the Basque sentence in order", "Remets la phrase basque dans l'ordre"],
    qfill: ["Completa el buit", "Completa el hueco", "Fill the gap", "Complète le trou"],
    sents: ["frases", "frases", "sentences", "phrases"],
    okk: ["Correcte!", "¡Correcto!", "Correct!", "Correct !"],
    nxt: ["Següent", "Siguiente", "Next", "Suivant"]
  };

  /* ---------- vocabulari (de totes les lliçons) ---------- */
  const ALL = [], byEu = new Map();
  LS.forEach((l, li) => (l.v || []).forEach(v => {
    if (!v || !v[0] || !v[1]) return;
    const k = String(v[0]).toLowerCase();
    if (!byEu.has(k)) { const o = { eu: v[0], tr: v[1], li }; byEu.set(k, o); ALL.push(o); }
  }));

  /* Diccionari ampliat: afegeix tot el vocabulari de les lliçons al cercador */
  try {
    const have = new Set(DICT.map(d => String(d[0]).toLowerCase()));
    ALL.forEach(o => { const k = o.eu.toLowerCase(); if (!have.has(k)) { have.add(k); DICT.push([o.eu, o.tr]); } });
  } catch (e) {}

  /* ---------- repetició espaiada ---------- */
  const KEY = "kx-srs2", DAY = 864e5, STEPS = [0, 1, 3, 7, 14, 30, 60], NEW_PER_DAY = 5, SESSION = 15;
  let S = {};
  try { S = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { S = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const today = () => { const d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); };
  const words = () => Object.keys(S).filter(k => k[0] !== "_" && byEu.has(k));

  function seed() { // les paraules de lliçons ja fetes entren al repàs repartides en 10 dies
    let c = 0, ch = false; const now = Date.now();
    (st.dn || []).forEach(li => {
      const l = LS[li]; if (!l) return;
      (l.v || []).forEach(v => { const k = String(v[0]).toLowerCase(); if (!S[k] && byEu.has(k)) { S[k] = { l: 1, d: now + (c++ % 10) * DAY, n: 0 }; ch = true; } });
    });
    if (ch) save();
  }
  const dueKeys = () => { const now = Date.now(); return words().filter(k => S[k].d <= now).sort((a, b) => S[a].d - S[b].d); };
  const newLeft = () => Math.max(0, NEW_PER_DAY - (S._n && S._n.day === today() ? S._n.c : 0));
  const nextNew = n => ALL.filter(o => !S[o.eu.toLowerCase()]).slice(0, n);

  let Q = null;
  function startSession(extra) {
    seed();
    let q = dueKeys().slice(0, SESSION), news = [];
    if (!extra) news = nextNew(newLeft());
    if (extra && !q.length) q = words().sort((a, b) => S[a].d - S[b].d).slice(0, 10);
    Q = { news, queue: shuffle(q), i: 0, ok: 0, tot: 0, xp: 0, retry: {}, locked: false, ex: null };
    if (news.length) intro();
    else if (!Q.queue.length) srsHome();
    else next();
  }
  function intro() {
    app().innerHTML = back() + `<h2 class="vt">🌱 ${tx(L.newt)}</h2><p class="mut">${tx(L.newd)}</p>` +
      Q.news.map(o => `<div class="pc" style="text-align:left">${im(o.eu, true)}<div class="eu big2">${esc(o.eu)} ${sp(o.eu)}</div><div>${esc(tx(o.tr))}</div></div>`).join("") +
      `<button class="pri" onclick="KX.go()">${tx(L.got)}</button>`;
  }
  function beginAfterIntro() {
    const now = Date.now();
    if (!S._n || S._n.day !== today()) S._n = { day: today(), c: 0 };
    Q.news.forEach(o => { const k = o.eu.toLowerCase(); if (!S[k]) { S[k] = { l: 0, d: now, n: 0 }; S._n.c++; } });
    save();
    Q.queue = Q.news.map(o => o.eu.toLowerCase()).concat(Q.queue);
    next();
  }
  function distract(o, field, n) {
    const mine = field === "tr" ? norm(tx(o.tr)) : norm(o.eu), seen = new Set([mine]), out = [];
    for (const x of shuffle(ALL)) {
      if (x === o) continue;
      const key = field === "tr" ? norm(tx(x.tr)) : norm(x.eu);
      if (!key || seen.has(key)) continue;
      seen.add(key); out.push(x); if (out.length >= n) break;
    }
    return out;
  }
  function next() {
    Q.queue = Q.queue.filter(k => byEu.has(k));
    if (Q.i >= Q.queue.length) return finish();
    const k = Q.queue[Q.i], o = byEu.get(k), lv = (S[k] && S[k].l) || 0;
    let type = lv <= 0 ? "choose" : lv === 1 ? (canSay(o.eu) && Math.random() < .5 ? "listen" : "rev") : lv === 2 ? "rev" : "type";
    Q.locked = false;
    const opts = type === "type" ? [] : shuffle([o].concat(distract(o, type === "rev" ? "eu" : "tr", 3)));
    Q.ex = { type, k, o, opts };
    const pct = Math.round(Q.i / Q.queue.length * 100);
    let body = "";
    if (type === "choose") body = `<div class="pc">${im(o.eu, true)}<span class="eu big2">${esc(o.eu)}</span> ${sp(o.eu)}</div><p class="mut" style="text-align:center">${tx(L.q1)}</p>` + optsHtml(opts.map(x => tx(x.tr)));
    else if (type === "listen") body = `<div class="pc"><button class="say big3" onclick="say('${o.eu.replace(/'/g, "\\'")}')">🔊</button></div><p class="mut" style="text-align:center">${tx(L.qlis)}</p>` + optsHtml(opts.map(x => tx(x.tr)));
    else if (type === "rev") body = `<div class="pc">${im(o.eu, true)}<div class="big2">${esc(tx(o.tr))}</div></div><p class="mut" style="text-align:center">${tx(L.qrev)}</p>` + optsHtml(opts.map(x => x.eu));
    else {
      const hint = o.eu.split("").map(c => c === " " ? "\u00a0" : "_").join(" ");
      body = `<div class="pc">${im(o.eu, true)}<div class="big2">${esc(tx(o.tr))}</div></div><p class="mut" style="text-align:center">${tx(L.qtype)}</p><input id="kxin" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" onkeydown="if(event.key==='Enter')KX.chk()"><p class="sm" style="letter-spacing:2px">${hint}</p><button class="pri" onclick="KX.chk()">${tx(L.check)}</button>`;
    }
    app().innerHTML = back() + `<div class="bar"><i style="width:${pct}%"></i></div>` + body + `<div id="kxfb"></div>`;
    if (type === "listen") setTimeout(() => { try { say(o.eu); } catch (e) {} }, 250);
    if (type === "type") setTimeout(() => { const i = document.getElementById("kxin"); if (i) i.focus(); }, 100);
  }
  const optsHtml = arr => `<div id="kxo">` + arr.map((x, i) => `<button class="opt" onclick="KX.pick(${i})">${esc(x)}</button>`).join("") + `</div>`;
  function pick(i) {
    if (!Q || Q.locked) return; Q.locked = true;
    const e = Q.ex, c = e.opts.indexOf(e.o), box = document.getElementById("kxo");
    if (box && box.children[c]) box.children[c].classList.add("ok");
    if (i !== c && box && box.children[i]) box.children[i].classList.add("bad");
    grade(i === c);
  }
  function chk() {
    if (!Q || Q.locked) return;
    const inp = document.getElementById("kxin"); if (!inp) return;
    const v = norm(inp.value); if (!v) return;
    Q.locked = true;
    const trN = norm(tx(Q.ex.o.tr));
    grade(ALL.some(x => norm(tx(x.tr)) === trN && norm(x.eu) === v));
  }
  function grade(ok) {
    const e = Q.ex, k = e.k, s = S[k] || (S[k] = { l: 0, d: 0, n: 0 }), now = Date.now();
    Q.tot++;
    if (ok) {
      Q.ok++;
      if (Q.retry[k]) { s.l = 0; s.d = now + DAY; } // encertada després d'errar: tornarà demà
      else { s.l = Math.min(6, (s.l || 0) + 1); s.d = now + STEPS[s.l] * DAY; s.n = (s.n || 0) + 1; }
      const g = e.type === "type" ? 8 : 5; Q.xp += g; st.p += g; sv();
    } else {
      s.l = 0; s.d = now + 6e5; s.w = (s.w || 0) + 1;
      if (!Q.retry[k]) { Q.retry[k] = 1; Q.queue.push(k); }
    }
    save();
    document.getElementById("kxfb").innerHTML = `<div class="pc"><b>${ok ? "✅ " + tx(L.okk) : "❌"}</b><div class="eu big2">${esc(e.o.eu)} ${sp(e.o.eu)}</div><div class="sm">${esc(tx(e.o.tr))}</div></div><button class="pri" onclick="KX.nx()">${tx(L.nxt)}</button>`;
  }
  function finish() {
    const more = dueKeys().length > 0 || newLeft() > 0;
    app().innerHTML = back() + `<div class="soon" style="border-style:solid"><h2>🏆 ${tx(L.done)}</h2><div class="big2">${Q.ok}/${Q.tot}</div><p>+${Q.xp} ⭐</p></div>` +
      (more ? `<button class="pri" onclick="KX.start(0)">${tx(L.more)}</button>` : "") + `<button class="pri" style="background:var(--card);color:var(--red);border:2px solid var(--red)" onclick="go('home')">${tx(N.home)}</button>`;
  }
  function srsHome() {
    cur = "srs"; seed();
    const due = dueKeys().length, nw = Math.min(newLeft(), ALL.filter(o => !S[o.eu.toLowerCase()]).length);
    const ks = words(), lrn = ks.filter(k => S[k].l < 4).length, mas = ks.length - lrn;
    app().innerHTML = back() + `<h2 class="vt">🧠 ${tx(L.rev)}</h2><p class="mut">${tx(L.revd)}</p>` +
      `<div class="stats"><div class="st">⏰<b>${Math.min(due, SESSION)}</b><small>${tx(L.due)}</small></div><div class="st">🌱<b>${nw}</b><small>${tx(L.newc)}</small></div><div class="st">🟢<b>${mas}</b><small>${tx(L.mast)}</small></div></div>` +
      (due + nw > 0 ? `<button class="pri" onclick="KX.start(0)">${tx(L.start)}</button>` : `<div class="soon">${tx(L.none)}</div>` + (ks.length ? `<button class="pri" onclick="KX.start(1)">${tx(L.extra)}</button>` : "")) +
      `<p class="sm">${lrn} ${tx(L.lrn)}</p>`;
  }

  /* ---------- frases: ordenar i completar ---------- */
  const RANK = { A1: 1, A2: 2, B1: 3, B2: 4 }, lvOf = i => i < 40 ? "A1" : i < 80 ? "A2" : i < 120 ? "B1" : "B2";
  const SENT = [], seenS = new Set();
  const addS = (eu, tr, lv) => {
    if (!eu || !tr) return; const clean = String(eu).replace(/[«»]/g, "").replace(/\s+/g, " ").trim(), k = norm(clean);
    if (!k || seenS.has(k) || clean.split(" ").length < 3 || clean.split(" ").length > 11) return;
    seenS.add(k); SENT.push({ eu: clean, tr, lv: lv || "A1" });
  };
  try { if (typeof STORIES !== "undefined") STORIES.forEach(s => (s.l || []).forEach(l => addS(l[0], l[1], s.lv))); } catch (e) {}
  LS.forEach((l, i) => (l.c || []).forEach(c => { if (c && c.b) addS(c.b[0], c.b[1], lvOf(i)); }));
  const clean1 = w => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
  const curLv = () => { let nx = LS.findIndex((l, i) => !(st.dn || []).includes(i)); if (nx < 0) nx = LS.length - 1; return lvOf(nx); };
  const phrPool = () => { const r = RANK[curLv()] || 1, p = SENT.filter(s => (RANK[s.lv] || 1) <= r); return p.length >= 4 ? p : SENT; };

  let P = null;
  function phrHome() {
    cur = "phr";
    app().innerHTML = back() + `<h2 class="vt">🧩 ${tx(L.phr)}</h2><p class="mut">${tx(L.phrd)}</p>` +
      (SENT.length >= 4 ? `<button class="pri" onclick="KX.pstart()">${tx(L.start)}</button>` : "") + `<p class="sm">${phrPool().length} ${tx(L.sents)} · ${curLv()}</p>`;
  }
  function pstart() { P = { q: shuffle(phrPool()).slice(0, 10), i: 0, ok: 0, xp: 0, locked: false, ex: null }; pnext(); }
  function pnext() {
    if (P.i >= P.q.length) {
      app().innerHTML = back() + `<div class="soon" style="border-style:solid"><h2>🏆 ${tx(L.done)}</h2><div class="big2">${P.ok}/${P.q.length}</div><p>+${P.xp} ⭐</p></div><button class="pri" onclick="KX.pstart()">${tx(L.more)}</button>`;
      return;
    }
    const s = P.q[P.i]; P.locked = false;
    let ex = null;
    if (Math.random() < .5) ex = mkFill(s);
    P.ex = ex || mkOrder(s);
    pdraw();
  }
  function mkOrder(s) {
    const tk = s.eu.split(" ");
    let sh = shuffle(tk.map((w, i) => i));
    for (let n = 0; n < 5 && sh.every((v, i) => v === i) && tk.length > 1; n++) sh = shuffle(sh);
    return { type: "order", s, tk, bank: sh, ans: [] };
  }
  function mkFill(s) {
    const tk = s.eu.split(" "), cand = tk.map((w, i) => [clean1(w), i]).filter(([w]) => w.length >= 3);
    if (!cand.length) return null;
    const [tw, idx] = cand[Math.floor(Math.random() * cand.length)], seen = new Set([norm(tw)]), pool = [];
    shuffle(SENT).forEach(x => x.eu.split(" ").forEach(w => { const c = clean1(w), n = norm(c); if (c.length >= 3 && Math.abs(c.length - tw.length) <= 2 && !seen.has(n)) { seen.add(n); pool.push(c); } }));
    if (pool.length < 3) return null;
    const opts = shuffle([tw].concat(pool.slice(0, 3)));
    const shown = tk.slice(); shown[idx] = tk[idx].replace(tw, "_____");
    return { type: "fill", s, tw, opts, shown: shown.join(" ") };
  }
  function pdraw() {
    const e = P.ex, head = back() + `<div class="bar"><i style="width:${Math.round(P.i / P.q.length * 100)}%"></i></div>`;
    if (e.type === "order") {
      app().innerHTML = head + `<p class="mut" style="text-align:center">${tx(L.qord)}</p><div class="pc"><div class="big2" style="font-size:20px">${esc(tx(e.s.tr))}</div></div>` +
        `<div class="pc" style="min-height:64px;text-align:left">${e.ans.map(i => `<button class="l on" style="margin:3px" onclick="KX.prem(${i})">${esc(e.tk[i])}</button>`).join("")}</div>` +
        `<div style="margin:8px 0">${e.bank.map(i => e.ans.includes(i) ? "" : `<button class="l" style="margin:3px" onclick="KX.padd(${i})">${esc(e.tk[i])}</button>`).join("")}</div>` +
        `<button class="pri" onclick="KX.pchk()">${tx(L.check)}</button><div id="kxfb"></div>`;
    } else {
      app().innerHTML = head + `<p class="mut" style="text-align:center">${tx(L.qfill)}</p><div class="pc"><div class="eu big2" style="font-size:22px">${esc(e.shown)}</div><div class="sm">${esc(tx(e.s.tr))}</div></div>` +
        `<div id="kxo">${e.opts.map((w, i) => `<button class="opt" onclick="KX.pfill(${i})">${esc(w)}</button>`).join("")}</div><div id="kxfb"></div>`;
    }
  }
  function pdone(ok) {
    const e = P.ex; P.locked = true;
    if (ok) { P.ok++; P.xp += 5; st.p += 5; sv(); }
    const fb = document.getElementById("kxfb");
    if (fb) fb.innerHTML = `<div class="pc"><b>${ok ? "✅ " + tx(L.okk) : "❌"}</b><div class="eu big2" style="font-size:20px">${esc(e.s.eu)} ${sp(e.s.eu)}</div><div class="sm">${esc(tx(e.s.tr))}</div></div><button class="pri" onclick="KX.pnx()">${tx(L.nxt)}</button>`;
  }

  /* ---------- API per als botons ---------- */
  window.KX = {
    start: x => startSession(!!x), go: beginAfterIntro, pick, chk, nx: () => { Q.i++; next(); },
    pstart, pnx: () => { P.i++; pnext(); },
    padd: i => { if (P.locked) return; P.ex.ans.push(i); pdraw(); },
    prem: i => { if (P.locked) return; P.ex.ans = P.ex.ans.filter(x => x !== i); pdraw(); },
    pchk: () => {
      if (P.locked) return; const e = P.ex; if (!e.ans.length) return;
      pdraw(); // manté l'estat; després marca el resultat
      pdone(norm(e.ans.map(i => e.tk[i]).join(" ")) === norm(e.s.eu));
    },
    pfill: i => {
      if (P.locked) return; const e = P.ex, c = e.opts.indexOf(e.tw), box = document.getElementById("kxo");
      if (box && box.children[c]) box.children[c].classList.add("ok");
      if (i !== c && box && box.children[i]) box.children[i].classList.add("bad");
      pdone(i === c);
    }
  };

  /* ---------- integració amb la pantalla d'inici ---------- */
  const _go = window.go;
  window.go = function (v) {
    if (v === "srs") return srsHome();
    if (v === "phr") return phrHome();
    const r = _go.apply(this, arguments);
    if (v === "home") decorate();
    return r;
  };
  function decorate() {
    if (cur !== "home") return;
    const a = app(), cta = a && a.querySelector(".cta");
    if (!cta || a.querySelector("#kxsrs")) return;
    seed();
    const due = Math.min(dueKeys().length, SESSION), nw = Math.min(newLeft(), ALL.filter(o => !S[o.eu.toLowerCase()]).length);
    const sec = document.createElement("section");
    sec.className = "cta"; sec.id = "kxsrs"; sec.style.background = "var(--grn)";
    sec.innerHTML = `<small>🧠 ${tx(L.rev)}</small><h2>${due} ${tx(L.due)} · ${nw} ${tx(L.newc)}</h2><p>${tx(L.revs)}</p><button class="go" style="color:var(--grn)" onclick="go('srs')">${tx(L.start)}</button>`;
    cta.after(sec);
    const grid = a.querySelector(".grid");
    if (grid && SENT.length >= 4) {
      const b = document.createElement("button");
      b.className = "tile"; b.setAttribute("onclick", "go('phr')"); b.innerHTML = `<span>🧩</span>${tx(L.phr)}`;
      grid.appendChild(b);
    }
  }
  if (cur === "home") decorate();
})();
