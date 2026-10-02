/* WA Games V2 — creator console. The chat is the game board; this app only
   generates games and produces copy-ready WhatsApp messages. */
const $=s=>document.querySelector(s);
const store={
  get k(){return localStorage.getItem('wa.key')||''},
  get model(){return localStorage.getItem('wa.model')||'claude-opus-4-8'},
  get endpoint(){return localStorage.getItem('wa.endpoint')||''},
  get number(){return localStorage.getItem('wa.number')||''},
  games(){try{return JSON.parse(localStorage.getItem('wa.games')||'[]')}catch{return[]}},
  saveGames(g){localStorage.setItem('wa.games',JSON.stringify(g.slice(0,30)))}
};

const MODES={
  pick:'They pick blind numbers, then you reveal the full locked list.',
  random:'One message deals prompts in a random order — no number game.',
  mix:'Pick the exact prompt types you want, then build the list.'
};
const TYPES=[
  ['question','❓ Question'],['photo','📸 Photo'],['voice','🎤 Voice'],
  ['challenge','⚡ Challenge'],['confession','🙊 Confession'],['choice','🔀 Choice'],
  ['rating','⭐ Rating'],['prediction','🔮 Prediction']
];

/* ---- built-in prompt bank (fallback when AI is off), tagged with metadata ---- */
const BANK=[
  {t:'question',i:'chill',text:"What's the first thing you noticed about me?"},
  {t:'question',i:'playful',text:"Yini oyithanda kakhulu ngami? (What do you like most about me?)"},
  {t:'confession',i:'bold',text:"Confess one time you stalked my status 👀"},
  {t:'photo',i:'playful',text:"Send the last photo in your camera roll, no editing"},
  {t:'voice',i:'bold',text:"Voice note: say my name the way you save it on your phone"},
  {t:'challenge',i:'playful',text:"Text me using only emojis for your next reply"},
  {t:'rating',i:'chill',text:"Rate this chat so far out of 10 and say why"},
  {t:'choice',i:'playful',text:"Amapiano or Hip-hop, and who's your top artist?"},
  {t:'prediction',i:'playful',text:"Guess what I'm doing right now — closest wins"},
  {t:'confession',i:'chaos',text:"Ungitshele into oyenzayo ongafuni mina ngiyazi (tell me one thing you do that you don't want me to know)"},
  {t:'question',i:'chill',text:"Early bird or 2am overthinker?"},
  {t:'photo',i:'bold',text:"Selfie right now, current face, no warning"},
  {t:'challenge',i:'chaos',text:"Send a voice note singing your current favourite song"},
  {t:'rating',i:'playful',text:"Rate my dress sense from 1 to 10, be honest"},
  {t:'choice',i:'bold',text:"My place or yours for the first proper hangout?"},
  {t:'prediction',i:'playful',text:"Predict one thing I'll do this weekend"},
  {t:'question',i:'bold',text:"What's a text you typed to me but never sent?"},
  {t:'confession',i:'playful',text:"Confess your most embarrassing autocorrect moment"},
  {t:'voice',i:'chill',text:"Voice note: your laugh, on demand 😂"},
  {t:'question',i:'chaos',text:"If we swapped phones for an hour, what are you deleting first?"},
  {t:'question',i:'chill',text:"Coffee, tea, or neither — and how do you take it?"},
  {t:'choice',i:'playful',text:"Beach day or mountain hike for our first trip?"},
  {t:'confession',i:'playful',text:"Confess a song you'd be embarrassed to admit you love"},
  {t:'rating',i:'bold',text:"Rate my texting game out of 10 and tell me how to level up"},
  {t:'photo',i:'chill',text:"Send a photo of your view right now"},
  {t:'voice',i:'playful',text:"Voice note: say 'sawubona' like you mean it 😄"},
  {t:'challenge',i:'playful',text:"Reply to my next message in a different accent (voice note)"},
  {t:'prediction',i:'bold',text:"Predict where we'll be this time next year"},
  {t:'question',i:'bold',text:"What's the green flag you noticed about me first?"},
  {t:'question',i:'playful',text:"Ubuthini uma ucabanga ngami? (What's the first word you think of with me?)"},
  {t:'choice',i:'chill',text:"Night owl playlist or sunrise playlist — drop one song"},
  {t:'confession',i:'bold',text:"Confess the last thing you screenshotted from our chat"},
  {t:'challenge',i:'chaos',text:"Send a 5-second video of your current mood, no words"},
  {t:'rating',i:'playful',text:"Rate this game idea out of 10, be brutal"},
  {t:'question',i:'chill',text:"What's your comfort meal after a long day?"},
  {t:'photo',i:'playful',text:"Send the oldest selfie on your phone 😭"},
  {t:'prediction',i:'playful',text:"Guess my next three emojis in order"},
  {t:'confession',i:'chaos',text:"Confess one lie you told just to look cool"},
  {t:'voice',i:'bold',text:"Voice note: your honest first impression of me"},
  {t:'question',i:'playful',text:"Takealot cart or sneaker plug — where does your money go?"}
];

/* ---------- helpers ---------- */
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast._);toast._=setTimeout(()=>t.classList.remove('show'),2200)}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
// Deterministic fingerprint of the ordered list → the Lock ID trust signal.
function lockId(list){
  let h=0x811c9dc5;const s=list.map(p=>p.text).join('|');
  for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=(h*0x01000193)>>>0}
  return 'LOCK-'+h.toString(36).toUpperCase().padStart(7,'0').slice(0,7);
}
const b=t=>'*'+t+'*', it=t=>'_'+t+'_';
function waUrl(text){const n=store.number.replace(/\D/g,'');return(n?'https://wa.me/'+n+'?text=':'https://wa.me/?text=')+encodeURIComponent(text)}

/* ---------- state ---------- */
let game=null; // {title,mode,lang,lock,list:[{n,text,t,i}],used:[]}

/* ---------- generation ---------- */
function brief(){
  return{
    title:$('#title').value.trim(),
    mode:document.querySelector('[name=mode]:checked').value,
    aud:$('#aud').value, level:$('#level').value,
    lang:$('#lang').value, count:+$('#count').value,
    note:$('#brief').value.trim(),
    types:[...document.querySelectorAll('#types input:checked')].map(c=>c.value)
  };
}
function buildFromBank(spec){
  let pool=BANK.filter(p=>spec.mode!=='mix'||!spec.types.length||spec.types.includes(p.t));
  if(!pool.length)pool=BANK;
  let out=shuffle(pool);
  while(out.length<spec.count)out=out.concat(shuffle(pool));
  return out.slice(0,spec.count).map(p=>({text:p.text,t:p.t,i:p.i}));
}
function aiPrompt(spec){
  const langs={en:'English',zu:'isiZulu',af:'Afrikaans',mix:'a natural mix of English and isiZulu'};
  return `You write prompts for a WhatsApp number-guessing game. Each number hides one short prompt the other person answers in the chat.
Audience: ${spec.aud}. Intensity: ${spec.level}. Language: ${langs[spec.lang]}.
${spec.note?'Context about the person: '+spec.note:''}
${spec.mode==='mix'&&spec.types.length?'Use only these types: '+spec.types.join(', ')+'.':'Mix the types freely.'}
Return ONLY a JSON array of exactly ${spec.count} objects, no prose, no markdown fences. Each object: {"text": string (max ~110 chars, ready to send), "t": one of question|photo|voice|challenge|confession|choice|rating|prediction, "i": one of chill|playful|bold|chaos}. Keep it warm and consent-friendly; nothing explicit, nothing coercive.`;
}
async function callAI(spec){
  const body={model:store.model,max_tokens:1500,messages:[{role:'user',content:aiPrompt(spec)}]};
  let data;
  if(store.endpoint){
    const r=await fetch(store.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    if(!r.ok)throw new Error('Proxy returned '+r.status);
    data=await r.json();
  }else{
    if(!store.k)throw new Error('no-key');
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':store.k,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify(body)});
    if(!r.ok)throw new Error('API returned '+r.status);
    data=await r.json();
  }
  const txt=(data.content||[]).filter(c=>c.type==='text').map(c=>c.text).join('').trim().replace(/^```json?|```$/g,'').trim();
  const arr=JSON.parse(txt);
  return arr.map(p=>({text:String(p.text||'').trim(),t:p.t||'question',i:p.i||'playful'})).filter(p=>p.text).slice(0,spec.count);
}
function assemble(spec,list){
  const ordered=spec.mode==='pick'?shuffle(list):list; // genuine shuffle of number→prompt
  game={
    title:spec.title||(spec.mode==='pick'?'Pick a Number':spec.mode==='random'?'Random Round':'Custom Mix'),
    mode:spec.mode, lang:spec.lang,
    list:ordered.map((p,idx)=>({n:idx+1,...p})),
    used:[]
  };
  game.lock=lockId(game.list);
  renderBoard(); view('board');
}
async function doAI(){
  const spec=brief(), btn=$('#goAI');
  if(!store.k&&!store.endpoint){view('settings');toast('Add your API key (or proxy URL) first');return}
  btn.disabled=true;btn.textContent='Generating…';
  try{assemble(spec,await callAI(spec));toast('Game ready')}
  catch(e){toast(e.message==='no-key'?'Add your API key in Settings':'AI failed — used built-in prompts');assemble(spec,buildFromBank(spec))}
  finally{btn.disabled=false;btn.textContent='Generate with AI'}
}

/* ---------- copy-ready messages ---------- */
function introMsg(){
  const range=`1–${game.list.length}`;
  return `${b('🎮 '+game.title)}\n\n${game.lang==='zu'?'Khetha inombolo':'Pick a number'} ${range} 🎯\n${it('Locked before you picked: '+game.lock)}`;
}
function revealMsg(){
  const lines=game.list.map(p=>`${b(p.n+'.')} ${p.text}`).join('\n');
  return `${b('The full list')} 🔓\n${it('Same lock: '+game.lock+' — nothing changed)')}\n\n${lines}`;
}
function lookupMsg(n){const p=game.list.find(x=>x.n===n);return p?`${b(n+'.')} ${p.text}`:''}
function remainingMsg(){
  const left=game.list.filter(p=>!game.used.includes(p.n)).map(p=>p.n);
  return left.length?`${b('Still open:')} ${left.join(', ')}`:'All numbers used — '+it('run it back?');
}

/* ---------- board ---------- */
function renderBoard(){
  const s=$('#board');
  const pick=game.mode==='pick';
  s.innerHTML=`
  <div class="bhead"><h2>${game.title}</h2><span class="lock">🔒 ${game.lock}</span></div>
  <p class="hint">${pick?'Send the intro, then tap a number as they call it. Reveal the list when they ask.':'Random order — send the list and play.'}</p>
  <div class="msgs">
    <button class="primary" data-msg="intro">Copy intro</button>
    <button data-msg="reveal">Copy full list</button>
    <button data-msg="remaining">Copy remaining</button>
    <button class="wa" data-wa="intro">Send intro ▸</button>
  </div>
  ${pick?`<div class="grid">${game.list.map(p=>`<button class="tile${game.used.includes(p.n)?' used':''}" data-n="${p.n}">${p.n}</button>`).join('')}</div>`:
         `<div class="card"><ol>${game.list.map(p=>`<li style="margin:6px 0">${p.text}</li>`).join('')}</ol></div>`}
  <div class="sv">
    <span class="hint">${game.list.length} prompts • ${game.lang==='mix'?'EN+ZU':game.lang.toUpperCase()}</span>
    <div class="srow"><button class="ghost" id="saveGame">Save</button><button class="ghost" id="again">New</button></div>
  </div>`;
  s.querySelectorAll('[data-msg]').forEach(b=>b.onclick=()=>copy({intro:introMsg,reveal:revealMsg,remaining:remainingMsg}[b.dataset.msg]()));
  s.querySelectorAll('[data-wa]').forEach(b=>b.onclick=()=>window.open(waUrl(introMsg()),'_blank'));
  s.querySelectorAll('.tile').forEach(t=>t.onclick=()=>openNumber(+t.dataset.n));
  $('#saveGame').onclick=saveCurrent;
  $('#again').onclick=()=>view('setup');
}
function openNumber(n){
  const p=game.list.find(x=>x.n===n);
  const d=$('#sheet');
  d.innerHTML=`<h3>Number ${n} <span class="hint">· ${p.t} · ${p.i}</span></h3>
    <pre>${p.text.replace(/</g,'&lt;')}</pre>
    <div class="srow">
      <button class="primary" id="cpN">Copy this prompt</button>
      <button class="wa" id="waN">Send ▸</button>
    </div>
    <div class="srow">
      <button id="tone">Shift tone</button>
      <button id="regen">Regenerate</button>
      <button class="ghost" id="mark">${game.used.includes(n)?'Mark unused':'Mark used'}</button>
    </div>
    <button class="ghost" id="closeN" style="width:100%;margin-top:8px">Close</button>`;
  $('#cpN').onclick=()=>copy(lookupMsg(n));
  $('#waN').onclick=()=>window.open(waUrl(lookupMsg(n)),'_blank');
  $('#mark').onclick=()=>{game.used.includes(n)?game.used=game.used.filter(x=>x!==n):game.used.push(n);d.close();renderBoard()};
  $('#closeN').onclick=()=>d.close();
  $('#tone').onclick=()=>reworkPrompt(n,'tone');
  $('#regen').onclick=()=>reworkPrompt(n,'regen');
  d.showModal();
}
async function reworkPrompt(n,kind){
  const p=game.list.find(x=>x.n===n);
  if(!store.k&&!store.endpoint){toast('Needs AI — add a key in Settings');return}
  const want=kind==='tone'?'Rewrite it one notch bolder, same type and language.':'Write a fresh different prompt, same type, intensity and language.';
  const msg=`Current WhatsApp game prompt (type ${p.t}, intensity ${p.i}): "${p.text}". ${want} Return ONLY the new prompt text, no quotes, no prose.`;
  const btn=$('#'+(kind==='tone'?'tone':'regen'));btn.disabled=true;btn.textContent='…';
  try{
    const body={model:store.model,max_tokens:200,messages:[{role:'user',content:msg}]};
    const r=store.endpoint
      ?await fetch(store.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
      :await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':store.k,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify(body)});
    if(!r.ok)throw 0;
    const data=await r.json();
    const t=(data.content||[]).filter(c=>c.type==='text').map(c=>c.text).join('').trim().replace(/^["']|["']$/g,'');
    if(t){p.text=t;game.lock=lockId(game.list);toast('Updated — lock refreshed');$('#sheet').close();renderBoard();}
  }catch{toast('Could not reach AI')}
  finally{btn.disabled=false}
}

/* ---------- copy ---------- */
async function copy(text){
  try{await navigator.clipboard.writeText(text);toast('Copied')}
  catch{
    const d=$('#sheet');
    d.innerHTML=`<h3>Copy manually</h3><pre id="man">${text.replace(/</g,'&lt;')}</pre><button class="ghost" id="closeMan" style="width:100%">Close</button>`;
    d.showModal();$('#closeMan').onclick=()=>d.close();
    const r=document.createRange();r.selectNodeContents($('#man'));const s=getSelection();s.removeAllRanges();s.addRange(r);
  }
}

/* ---------- saved games ---------- */
function saveCurrent(){
  const all=store.games();all.unshift({...game,ts:Date.now()});store.saveGames(all);toast('Saved to this device')
}
function renderSaved(){
  const all=store.games(),l=$('#savedList');
  if(!all.length){l.innerHTML='<p class="hint">No saved games yet. Build one and tap Save.</p>';return}
  l.innerHTML=all.map((g,idx)=>`<div class="card" style="padding:14px 16px">
    <div class="bhead"><b>${g.title}</b><span class="lock">${g.lock}</span></div>
    <p class="hint">${g.list.length} prompts • ${new Date(g.ts).toLocaleDateString()}</p>
    <div class="srow"><button data-open="${idx}">Open</button><button class="ghost" data-del="${idx}">Delete</button></div>
  </div>`).join('');
  l.querySelectorAll('[data-open]').forEach(btn=>btn.onclick=()=>{game=all[+btn.dataset.open];game.used=game.used||[];renderBoard();view('board')});
  l.querySelectorAll('[data-del]').forEach(btn=>btn.onclick=()=>{const a=store.games();a.splice(+btn.dataset.del,1);store.saveGames(a);renderSaved()});
}

/* ---------- nav / setup wiring ---------- */
function view(v){
  ['setup','board','saved','settings'].forEach(id=>$('#'+id).hidden=(id!==v));
  document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.v===v||(v==='board'&&b.dataset.v==='setup')));
  if(v==='saved')renderSaved();
  scrollTo(0,0);
}
function syncMode(){
  const m=document.querySelector('[name=mode]:checked').value;
  $('#modeHelp').textContent=MODES[m];
  $('#typesWrap').hidden=m!=='mix';
}

function init(){
  $('#types').innerHTML=TYPES.map(([v,l])=>`<label><input type="checkbox" value="${v}" checked>${l}</label>`).join('');
  document.querySelectorAll('[name=mode]').forEach(r=>r.onchange=syncMode);syncMode();
  $('#goAI').onclick=doAI;
  $('#goBank').onclick=()=>{const s=brief();assemble(s,buildFromBank(s));toast('Built from built-in prompts')};
  $('#number').value=store.number;$('#key').value=store.k;$('#model').value=store.model;$('#endpoint').value=store.endpoint;
  $('#saveSet').onclick=()=>{
    localStorage.setItem('wa.number',$('#number').value.trim());
    localStorage.setItem('wa.key',$('#key').value.trim());
    localStorage.setItem('wa.model',$('#model').value.trim()||'claude-opus-4-8');
    localStorage.setItem('wa.endpoint',$('#endpoint').value.trim());
    toast('Settings saved');view('setup');
  };
  document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>view(b.dataset.v));
  view('setup');
}

/* ---------- PWA install ---------- */
let deferredPrompt=null;
const isStandalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const isiOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent);
const snoozed=()=>Date.now()-(+localStorage.getItem('wa.installSnooze')||0)<7*864e5;
function snooze(){localStorage.setItem('wa.installSnooze',Date.now())}
function showInstall(kind){
  if(isStandalone()||snoozed())return;
  let bar=$('#install');
  if(!bar){bar=document.createElement('div');bar.id='install';bar.className='install';document.body.appendChild(bar)}
  bar.innerHTML=kind==='ios'
    ?`<span>Install: tap <b>Share</b> then <b>Add to Home Screen</b></span><button class="x" id="instX" aria-label="Dismiss">✕</button>`
    :`<span>Add WA Games to your home screen</span><span class="ig"><button class="primary" id="instY">Install</button><button class="x" id="instX" aria-label="Dismiss">✕</button></span>`;
  requestAnimationFrame(()=>bar.classList.add('show'));
  $('#instX').onclick=()=>{bar.classList.remove('show');snooze()};
  const y=$('#instY');
  if(y)y.onclick=async()=>{
    if(!deferredPrompt)return;
    deferredPrompt.prompt();
    const {outcome}=await deferredPrompt.userChoice;
    deferredPrompt=null;bar.classList.remove('show');
    if(outcome!=='accepted')snooze();
  };
}
addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;showInstall('android')});
addEventListener('appinstalled',()=>{const b=$('#install');if(b)b.classList.remove('show');deferredPrompt=null});
if(isiOS()&&!isStandalone())setTimeout(()=>showInstall('ios'),1600);
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));

init();
