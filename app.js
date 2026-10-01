const categories=[
 {id:"couples",emoji:"❤️",name:"Couples",desc:"Love, memories & preferences"},
 {id:"friends",emoji:"😂",name:"Friends",desc:"Funny & get-to-know-you"},
 {id:"trivia",emoji:"🧠",name:"Trivia",desc:"General knowledge"},
 {id:"truth",emoji:"🔥",name:"Truth or Dare",desc:"Truths, dares & challenges"},
 {id:"would",emoji:"💬",name:"Would You Rather",desc:"Impossible choices"},
 {id:"personality",emoji:"🎭",name:"Personality",desc:"Find out how they think"},
 {id:"sa",emoji:"🇿🇦",name:"South Africa",desc:"Local trivia & culture"},
 {id:"custom",emoji:"✨",name:"Custom",desc:"Build your own theme"}
];

const banks={
couples:[
 ["mc","What's my favourite type of date?","A. Dinner out\nB. Movie night\nC. Adventure day\nD. Staying home"],
 ["open","What's one thing I do that always makes you laugh?"],
 ["mc","Which would I choose for a holiday?","A. Beach\nB. Mountains\nC. City\nD. Game reserve"],
 ["open","What's a memory of us that I would probably never forget?"],
 ["mc","Who is more likely to say 'I love you' first after an argument?","A. Me\nB. You"],
 ["open","What is one small thing that makes me feel appreciated?"],
 ["mc","If I had a free weekend, what would I most likely want to do?","A. Sleep\nB. Go out\nC. Travel\nD. Stay with you"],
 ["open","What is something I am secretly competitive about?"],
 ["mc","Which gift would I appreciate most?","A. Something practical\nB. Something romantic\nC. An experience\nD. Food"],
 ["open","What is one place you think I would love to visit with you?"]
],
friends:[
 ["mc","Which food would I pick first?","A. Pizza\nB. Burger\nC. Chicken\nD. Sushi"],
 ["open","What is my most predictable habit?"],
 ["mc","If I disappeared for a day, where would I most likely be?","A. Home\nB. With friends\nC. Travelling\nD. Sleeping"],
 ["open","What is something I always complain about?"],
 ["mc","What am I most likely to spend money on?","A. Food\nB. Cars\nC. Tech\nD. Clothes"],
 ["open","What is my funniest trait?"],
 ["mc","Who would survive longest in a zombie apocalypse?","A. Me\nB. You\nC. Neither of us"],
 ["open","What is one thing you think I should try at least once?"],
 ["mc","What kind of person annoys me most?","A. Loud\nB. Fake\nC. Slow\nD. Arrogant"],
 ["open","What is the first word that comes to mind when you think of me?"]
],
trivia:[
 ["mc","What is the capital of South Africa?","A. Johannesburg\nB. Pretoria\nC. Cape Town\nD. Durban","B"],
 ["mc","Which planet is known as the Red Planet?","A. Venus\nB. Mars\nC. Jupiter\nD. Mercury","B"],
 ["mc","How many continents are there?","A. 5\nB. 6\nC. 7\nD. 8","C"],
 ["mc","Which ocean is the largest?","A. Atlantic\nB. Indian\nC. Pacific\nD. Arctic","C"],
 ["mc","What is the chemical symbol for gold?","A. Ag\nB. Au\nC. Gd\nD. Go","B"],
 ["mc","Which language has the most native speakers?","A. English\nB. Spanish\nC. Mandarin Chinese\nD. French","C"],
 ["mc","How many sides does a hexagon have?","A. 5\nB. 6\nC. 7\nD. 8","B"],
 ["mc","Which animal is the largest living land animal?","A. Rhino\nB. Hippo\nC. Elephant\nD. Giraffe","C"],
 ["mc","What is 12 × 8?","A. 86\nB. 96\nC. 108\nD. 112","B"],
 ["mc","Which gas do humans need to breathe?","A. Oxygen\nB. Nitrogen\nC. Carbon dioxide\nD. Helium","A"]
],
truth:[
 ["mc","Truth: What's one thing you have never told me?","A. Something funny\nB. Something embarrassing\nC. Something sweet\nD. Something random"],
 ["open","Truth: What was your first impression of me?"],
 ["mc","Dare: Send a voice note using your most dramatic voice.","A. Done\nB. I'm scared"],
 ["open","Truth: What is one thing you would change about yourself?"],
 ["mc","Dare: Send the last emoji you used five times.","A. Done\nB. No chance"],
 ["open","Truth: What is your most embarrassing moment?"],
 ["mc","Dare: Give me a ridiculous nickname.","A. Done\nB. Thinking..."],
 ["open","Truth: What is something you pretend not to care about?"],
 ["mc","Dare: Send a selfie with your funniest face.","A. Done\nB. Maybe"],
 ["open","Truth: What is one thing you want to do this year?"]
],
would:[
 ["would","Would you rather have unlimited money or unlimited free time?","A. Money\nB. Free time"],
 ["would","Would you rather travel to the past or the future?","A. Past\nB. Future"],
 ["would","Would you rather always be 10 minutes late or 20 minutes early?","A. Late\nB. Early"],
 ["would","Would you rather live near the ocean or mountains?","A. Ocean\nB. Mountains"],
 ["would","Would you rather be famous or completely anonymous?","A. Famous\nB. Anonymous"],
 ["would","Would you rather give up social media or streaming forever?","A. Social media\nB. Streaming"],
 ["would","Would you rather have your dream car or dream house?","A. Car\nB. House"],
 ["would","Would you rather know when you will die or how you will die?","A. When\nB. How"],
 ["would","Would you rather never use cash again or never use cards again?","A. Cash\nB. Cards"],
 ["would","Would you rather be able to read minds or see the future?","A. Read minds\nB. See future"]
],
personality:[
 ["mc","When plans change suddenly, what would I most likely do?","A. Adapt\nB. Stress\nC. Laugh\nD. Take control"],
 ["open","What do you think motivates me the most?"],
 ["mc","In a group, what role would I naturally take?","A. Leader\nB. Entertainer\nC. Observer\nD. Problem solver"],
 ["open","What do you think I value most in a friendship?"],
 ["mc","When I have a free evening, what sounds best?","A. Going out\nB. Gaming\nC. Watching something\nD. Quiet time"],
 ["open","What do you think I worry about more than I admit?"],
 ["mc","If I received unexpected money, what would I do first?","A. Save\nB. Spend\nC. Invest\nD. Help someone"],
 ["open","What kind of compliment would mean the most to me?"],
 ["mc","When solving a problem, I am more likely to...","A. Research\nB. Experiment\nC. Ask someone\nD. Ignore it until later"],
 ["open","What is one quality you think describes me best?"]
],
sa:[
 ["mc","What is South Africa's currency?","A. Dollar\nB. Rand\nC. Shilling\nD. Pula","B"],
 ["mc","How many official languages does South Africa currently have?","A. 9\nB. 10\nC. 11\nD. 12","C"],
 ["mc","Which city is known as the Mother City?","A. Durban\nB. Pretoria\nC. Cape Town\nD. Bloemfontein","C"],
 ["mc","Which animal is NOT one of the Big Five?","A. Lion\nB. Elephant\nC. Rhino\nD. Giraffe","D"],
 ["mc","Which ocean borders South Africa to the east?","A. Pacific\nB. Indian\nC. Arctic\nD. Atlantic","B"],
 ["mc","What is the administrative capital of South Africa?","A. Pretoria\nB. Durban\nC. Cape Town\nD. Polokwane","A"],
 ["mc","Which sport is traditionally associated with the Springboks?","A. Cricket\nB. Rugby\nC. Football\nD. Tennis","B"],
 ["mc","Which province contains Johannesburg?","A. Gauteng\nB. Limpopo\nC. Free State\nD. Mpumalanga","A"],
 ["mc","What is the name commonly used for South Africa's national rugby team?","A. Proteas\nB. Bafana Bafana\nC. Springboks\nD. Amajita","C"],
 ["mc","Which waterfall is associated with the Drakensberg region?","A. Tugela Falls\nB. Victoria Falls\nC. Augrabies only\nD. Howick Falls","A"]
]
};

let selectedCategory="couples", currentGame=null;

const $=id=>document.getElementById(id);
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function show(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));$(id).classList.add("active");window.scrollTo(0,0)}

function renderCategories(){
 $("categoryGrid").innerHTML=categories.map(c=>`<button class="category ${c.id===selectedCategory?"selected":""}" data-id="${c.id}">
 <span class="emoji">${c.emoji}</span><b>${c.name}</b><small>${c.desc}</small></button>`).join("");
 document.querySelectorAll(".category").forEach(b=>b.onclick=()=>{selectedCategory=b.dataset.id;renderCategories()});
}

function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function makeQuestions(){
 const count=+$("questionCount").value;
 const allowMC=$("mc").checked, allowOpen=$("open").checked, allowWould=$("would").checked;
 let source=banks[selectedCategory]||banks.couples;
 let allowed=source.filter(q=>(q[0]==="mc"&&allowMC)||(q[0]==="open"&&allowOpen)||(q[0]==="would"&&allowWould));
 if(!allowed.length) allowed=source;
 let qs=shuffle(allowed);
 while(qs.length<count) qs=qs.concat(shuffle(allowed));
 return qs.slice(0,count).map((q,i)=>({id:i+1,type:q[0],text:q[1],options:q[2]||"",answer:q[3]||null}));
}

function generate(){
 currentGame={title:$("gameTitle").value.trim()||"WhatsApp Game",category:selectedCategory,questions:makeQuestions(),custom:$("customPrompt").value.trim()};
 $("gameHeading").textContent=currentGame.title;
 $("gameMeta").textContent=`${categories.find(c=>c.id===selectedCategory)?.name||"Game"} • ${currentGame.questions.length} questions`;
 renderGame();show("gameScreen");
}

function renderGame(){
 $("questions").innerHTML=currentGame.questions.map(q=>`<article class="question">
 <div class="q-top"><span class="q-number">QUESTION ${q.id}</span><span class="badge">${q.type==="open"?"OPEN":q.type==="would"?"WOULD YOU RATHER":"MULTIPLE CHOICE"}</span></div>
 <div class="q-text">${q.text}</div>
 ${q.options?q.options.split("\\n").map(x=>`<div class="option">${x}</div>`).join(""):""}
 </article>`).join("");
}

function waText(){
 let s=`🎮 ${currentGame.title}\\n\\n`;
 s+=`Answer the questions and reply with your answers in this format:\\n1. A\\n2. Your answer\\n3. B\\n\\n`;
 currentGame.questions.forEach(q=>{s+=`${q.id}. ${q.text}\\n`;if(q.options)s+=q.options+"\\n";s+="\\n"});
 s+=`Reply with all answers in one message. Have fun! 😄`;
 return s;
}
async function copyText(){
 try{await navigator.clipboard.writeText(waText());toast("Questions copied");}
 catch{toast("Copy unavailable — select and copy manually")}
}
function shareWA(){window.open("https://wa.me/?text="+encodeURIComponent(waText()),"_blank")}

function parseAnswers(text){
 const map={};
 text.split(/\n/).forEach(line=>{
   const m=line.match(/^\s*(\d+)\s*[\.\):\-]\s*(.*?)\s*$/);
   if(m) map[+m[1]]=m[2].trim();
 });
 return map;
}
function evaluate(){
 const answers=parseAnswers($("answerInput").value);
 let score=0, auto=0;
 const rows=currentGame.questions.map(q=>{
   const given=(answers[q.id]||"").trim();
   let status="open";
   if(q.answer){
     auto++;
     const norm=x=>x.toLowerCase().replace(/[\.\s]/g,"");
     const ok=norm(given).startsWith(norm(q.answer));
     if(ok){score++;status="correct"}else status="incorrect";
   }
   return {q,given,status};
 });
 const percent=auto?Math.round(score/auto*100):null;
 $("result").innerHTML=`<div class="result-card">
 ${percent===null?`<div class="score">✓</div><h3>Answers captured</h3><p>Open-ended questions need your own judgement.</p>`:`<div class="score">${score}/${auto}</div><h3>${percent}% automatic score</h3><p class="muted">Only questions with predefined answers are auto-scored.</p>`}
 <div class="review">${rows.map(r=>`<div class="review-row">
 <b>${r.q.id}. ${r.q.text}</b><br>
 <span class="${r.status==="correct"?"correct":r.status==="incorrect"?"incorrect":""}">${r.status==="correct"?"✓ Correct":r.status==="incorrect"?`✗ Their answer: ${r.given||"(blank)"} — correct: ${r.q.answer}`:`• Their answer: ${r.given||"(blank)"}`}</span>
 </div>`).join("")}</div></div>`;
}

$("generateBtn").onclick=generate;
$("copyBtn").onclick=copyText;
$("shareBtn").onclick=shareWA;
$("scoreBtn").onclick=()=>{show("scoreScreen");$("answerInput").focus()};
$("evaluateBtn").onclick=evaluate;
$("backBtn").onclick=()=>show("setupScreen");
$("scoreBackBtn").onclick=()=>show("gameScreen");
$("resetBtn").onclick=()=>{show("setupScreen");$("result").innerHTML="";$("answerInput").value=""};
renderCategories();
