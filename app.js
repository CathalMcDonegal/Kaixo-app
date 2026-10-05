const lessons={1:{title:"Kaixo!",subtitle:"Salutacions i comiat",questions:[
["Què vol dir «Kaixo»?",["Hola","Adéu","Gràcies"],"Hola"],
["Com diries «Adéu»?",["Kaixo","Agur","Mesedez"],"Agur"],
["Quina expressió vol dir «Bon dia»?",["Egun on","Gabon","Laster arte"],"Egun on"],
["Què vol dir «Eskerrik asko»?",["Hola","Gràcies","Fins aviat"],"Gràcies"],
["Completa: «___ arte!»",["Ikusi","Bai","Ez"],"Ikusi"]]},
2:{title:"Ni… naiz",subtitle:"Presentar-se",questions:[
["Què vol dir «Ni»?",["Jo","Tu","Ell"],"Jo"],
["Què vol dir «Zu»?",["Jo","Tu","Nosaltres"],"Tu"],
["Completa: «Ni Jon ___»",["naiz","zara","da"],"naiz"]]},
3:{title:"Bai / Ez",subtitle:"Afirmar i negar",questions:[
["Què vol dir «Bai»?",["Sí","No","No ho sé"],"Sí"],
["Què vol dir «Ez»?",["Sí","No","D'acord"],"No"],
["Com diries «No ho sé»?",["Ados","Ez dakit","Bai"],"Ez dakit"]]},
4:{title:"Cortesia bàsica",subtitle:"Paraules per al dia a dia",questions:[
["Com diries «Gràcies»?",["Mesedez","Eskerrik asko","Barkatu"],"Eskerrik asko"],
["Què vol dir «Mesedez»?",["Si us plau","Perdó","Benvingut"],"Si us plau"],
["Què vol dir «Barkatu»?",["Perdó","Gràcies","Adéu"],"Perdó"]]}};
let state=JSON.parse(localStorage.getItem("kaixoState")||'{"points":0,"done":[],"streak":0,"last":""}'),cur=null;
function save(){localStorage.setItem("kaixoState",JSON.stringify(state));updateHome()}
function updateHome(){points.textContent=state.points;done.textContent=state.done.length;streak.textContent=state.streak}
function openLesson(id){cur={id,i:0,score:0,answered:false};home.classList.add("hidden");lesson.classList.remove("hidden");render()}
function render(){let l=lessons[cur.id],q=l.questions[cur.i],pct=cur.i/l.questions.length*100;lesson.innerHTML='<button class="back" onclick="goHome()">← Tornar</button><div class="progress"><i style="width:'+pct+'%"></i></div><section class="lesson-card question"><small>Lliçó '+cur.id+' · '+l.subtitle+'</small><div class="word">'+l.title+'</div><p>'+q[0]+'</p><div class="answers">'+q[1].map(o=>'<button class="answer" onclick="answer(this,''+o.replaceAll("'","\\'")+'')">'+o+'</button>').join("")+'</div><div class="feedback" id="feedback"></div></section>'}
function answer(btn,v){if(cur.answered)return;cur.answered=true;let q=lessons[cur.id].questions[cur.i];if(v===q[2]){btn.classList.add("correct");cur.score+=10;feedback.textContent="Correcte! +10 ⭐"}else{btn.classList.add("wrong");feedback.textContent="La resposta era «"+q[2]+"»."}setTimeout(()=>{cur.i++;cur.answered=false;cur.i<lessons[cur.id].questions.length?render():finish()},700)}
function finish(){let id=cur.id;if(!state.done.includes(id))state.done.push(id);state.points+=cur.score;let d=new Date().toISOString().slice(0,10);if(state.last!==d){state.streak++;state.last=d}save();lesson.innerHTML='<section class="lesson-card result"><div class="big">🎉</div><h2>Lliçó completada!</h2><p>'+lessons[id].title+'</p><h3>+'+cur.score+' punts ⭐</h3><p>Progrés guardat al dispositiu.</p><button class="primary" onclick="goHome()">Continuar</button></section>'}
function goHome(){lesson.classList.add("hidden");home.classList.remove("hidden");updateHome()}updateHome();