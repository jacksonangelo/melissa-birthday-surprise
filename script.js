const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const spinBtn = document.getElementById("spinBtn");
const statusText = document.getElementById("status");

const spinSound = document.getElementById("spinSound");
const winMusic = document.getElementById("winMusic");

const stageLights = document.getElementById("stageLights");

const prizes = [
"Dia de Sushi",
"Cinema no Shopping",
"Dia no Parque da Paz",
"Kit de Desenhos",
"Corrida de Card",
"Vale compras",
"Noite de jogos",
"Mergulho",
"Livro especial",
"Kit de Pintura",
"Viagem Surpresa",
"Show da Marina Sena"
];

const slices = prizes.length;
const colors = ["#9d4edd","#7b2cbf"];

let rotation = 0;

/* DESENHAR ROLETA */

function drawWheel(){

const arc = Math.PI*2/slices;

for(let i=0;i<slices;i++){

ctx.beginPath();

ctx.fillStyle = colors[i%2];

ctx.moveTo(260,260);

ctx.arc(260,260,260,arc*i,arc*(i+1));

ctx.fill();

/* TEXTO */

ctx.save();

ctx.translate(260,260);
ctx.rotate(arc*i + arc/2);

ctx.fillStyle="#fff";
ctx.font="bold 15px Poppins";
ctx.textAlign="right";

ctx.fillText(prizes[i],230,5);

ctx.restore();

}

}

drawWheel();



/* GIRAR ROLETA */

spinBtn.onclick = ()=>{

spinBtn.disabled = true;

statusText.innerText = "Girando... prepare-se 😈";

/* iniciar som */

spinSound.currentTime = 0;
spinSound.loop = true;
spinSound.play();



/* escolher vencedor */

const winnerIndex = prizes.indexOf("Show da Marina Sena");

const sliceAngle = 360 / slices;

const finalAngle =
(360 * 6) +
(360 - (winnerIndex * sliceAngle) - sliceAngle/2);



const duration = 17000;
const start = Date.now();



function animate(){

let elapsed = Date.now()-start;
let progress = elapsed/duration;

let ease = 1-Math.pow(1-progress,3);

rotation = finalAngle*ease;

canvas.style.transform = `rotate(${rotation}deg)`;


/* som desacelerando */

let speed = 1 - progress*0.7;
spinSound.playbackRate = Math.max(speed,0.3);



if(elapsed < duration){

requestAnimationFrame(animate);

}else{

canvas.style.transform = `rotate(${finalAngle}deg)`;

/* parar som */

spinSound.pause();
spinSound.currentTime = 0;

statusText.innerText = "😱 RESULTADO!!!";

setTimeout(()=>{

launchConfetti();

/* luzes de show */

stageLights.classList.add("active");

/* abrir modal */

document.getElementById("modal").style.display="flex";

/* música */

winMusic.currentTime = 12;
winMusic.play();

/* pequena vibração dramática */

document.querySelector(".modal-content").classList.add("win");

},1200);

}

}

animate();

};



/* FECHAR MODAL */

function closeModal(){

document.getElementById("modal").style.display="none";

winMusic.pause();

}



/* CONFETES */

function launchConfetti(){

for(let i=0;i<200;i++){

let c=document.createElement("div");

c.className="confetti";

c.style.left=Math.random()*100+"vw";

c.style.background=`hsl(${Math.random()*360},80%,60%)`;

c.style.animationDuration=2+Math.random()*3+"s";

document.body.appendChild(c);

setTimeout(()=>c.remove(),5000);

}

}



/* STYLE DINÂMICO CONFETE */

const style=document.createElement("style");

style.innerHTML=`

.confetti{

position:fixed;
top:-10px;

width:12px;
height:12px;

border-radius:2px;

animation:fall linear forwards;

z-index:999;

}

@keyframes fall{

to{
transform:translateY(110vh) rotate(720deg);
}

}

`;

document.head.appendChild(style);



/* MOSTRAR IMAGEM DO PREMIO */

function resgatarPremio(){

const imagem = document.getElementById("premioImagem");

imagem.style.display = "block";

}