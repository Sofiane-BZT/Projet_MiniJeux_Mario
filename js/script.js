/*---------------------------------DECLARATION VARIABLES--------------------------------------------*/

let score = document.getElementById("score");
let cpt = 0;
// console.log(score);
let secondes = document.getElementById("secondes");
// console.log(secondes);
let temps = 30;
const play = document.getElementById("play");
const gameover = document.getElementById("gameover");
const piece = document.getElementById("piece");
const perso = document.getElementById("perso");
const goomba = document.getElementById("goomba");
const sonPiece = document.getElementById("sonpiece");
const musiqueGameover = document.getElementById("musique_gameover");
let randomNumber;
let marioMoveBy = 70;
let moveBx = 50; 
let marioInvinsible = false;

/*-------------------------POSITION MARIO - PIECE - GOOMBA AU DEMARAGE----------------------------------*/

window.addEventListener("load", () => {

  perso.style.position = "absolute";
  perso.style.left = window.innerWidth /3 + "px";
  perso.style.top = window.innerHeight /3 + "px";
});

window.addEventListener("load", () => {
  piece.style.position = "absolute";
  piece.style.left = "700px";
  piece.style.top = 0;

  goomba.style.position = "absolute";
  goomba.style.left = "800px";
  goomba.style.top = 0;

  play.style.position = "absolute";
  play.style.left = "500px";
  play.style.top = "300px";
});

/*-----------------------------GAMEOVER CACHÉ AU DEPART-----------------------------------------------------*/

window.addEventListener("load", () => {
  gameover.style.display = "none";
});

/*-------------------------------PLAY CACHÉ AU DEPART-----------------------------------------------------*/

window.addEventListener("load", () => {
  play.style.display = "none";
});
/*--------------------------------DEPLACEMENT ALEA PIECE-------------------------------*/

function movePiece() {
  piece.style.position = "absolute";
  piece.style.top = Math.random() * 100 + "%";
  piece.style.left = Math.random() * 100 + "%";
    //  console.log(piece.style.top);
    //  console.log(piece.style.left);
}setInterval(movePiece, 3000);

/*-------------------------------DEPLACEMENT ALEA GOOMBA-------------------------------*/

// function moveGoomba() {
//   goomba.style.position = "absolute";
//   goomba.style.top = Math.random() * 100 + "%";
//   goomba.style.left = Math.random() * 100 + "%";

//     //  console.log(piece.style.top);
//     //  console.log(piece.style.left);
// } setInterval(moveGoomba, 3000);

/*---------------------------MODIFICATION DU SCORE POUR AJOUTER-----------------------------------------*/

function ajouter(){
  cpt = cpt + 1;
  score.innerText = ("Score"+" "+":"+" "+ cpt);
};

/*-------------------------MODIFICATION DU SCORE POUR SOUSTRAIRE-----------------------------------------*/

function diminumerScore(){
 
  cpt = cpt <= 0 ? 0 : cpt - 1
  score.innerText = ("Score"+" "+":"+" "+ cpt);
};

/*---------------------------SUPP PIECE A LA FIN DU CHRONO------------------------------------------------*/

function removePieceAndBoomba(){
  if (temps == 0){
   piece.remove();
   goomba.remove();
  }
}
/*-----------------------------------APPARITION GAMEOVER----------------------------------------------*/

function appearGameOver(){
  if (temps == 0){
    gameover.style.display = "block";
  }
}
/*-----------------------------------APPARITION BOUTON PLAY----------------------------------------------*/

function appearPlay(){
  if (temps == 0){
    play.style.display = "block";
  }
}
/*-----------------------------------------------CHRONO---------------------------------------------------*/

function diminuerTemps(){
  temps = temps == 0 ? 0 : temps - 1
  secondes.innerText = ("Temps"+" "+"restant"+" "+":"+" "+ temps+" "+"s");
  appearGameOver();
  appearPlay();
  removePieceAndBoomba();
}
setInterval(diminuerTemps, 1000);

/*--------------------------------------COLISION PIECE------------------------------------------------------------------*/

function colisionPiece(){
  let a = perso.getBoundingClientRect();
  let b = piece.getBoundingClientRect();
  // console.log(a, "mario");
  // console.log(b, "pièce");

 
  if( (a.x < (b.x + b.width))    // trop à droite
    && ((a.x + a.width) > b.x) // trop à gauche
    && (a.y < (b.y+b.height)) // trop en bas
    && ((a.y + a.height) > b.y)) // trop en haut
    {
      // console.log("gégé");
      ajouter();
      movePiece();
      jouerSonPiece()
    } else {
      // console.log ("false"); 
    };
}
/*--------------------------------------COLISION GOOMBA------------------------------------------------------------------*/

function colisionGoomba(){
  if(!marioInvinsible){
  let a = perso.getBoundingClientRect();
  let c = goomba.getBoundingClientRect();
  // console.log(a, "mario");
  // console.log(c, "goomba");
 
   
  
  if( (a.x < (c.x + c.width))    // trop à droite
    && ((a.x + a.width) > c.x) // trop à gauche
    && (a.y < (c.y+c.height)) // trop en bas
    && ((a.y + a.height) > c.y)) // trop en haut
    {
      // console.log("biiien");
      diminumerScore();
      changerCouleur();
      setTimeout(couleurPersoInitiale, 300);
      marioInvinsible = true;
      setTimeout(marioVinsible, 500);
    }
    } else {
      // console.log ("pas bien"); 
    };
  
}
/*------------------------------------------GOOMBA ALEA X ET Y----------------------------------------------------*/

function randomNumberOne(){
  randomNumber = Math.floor(Math.random() * 4) + 1;
  // console.log(randomNumber);
  
  switch (randomNumber){
    case 1:
    goomba.style.top = parseInt(goomba.style.top) + moveBx + "px";
    // console.log("goomba va a gauche");
    break;
    case 2:
    goomba.style.top = parseInt(goomba.style.top) - moveBx + "px";
    // console.log("goomba va a Droite");
    break;
    case 3:
    goomba.style.left = parseInt(goomba.style.left) - moveBx + "px";
    // console.log("goomba va en haut");
    break;
    case 4:
    goomba.style.left = parseInt(goomba.style.left) + moveBx + "px";
    // console.log("goomba va en bas"); 
    break;
    default:
      console.log("rien ne marche");
    break;
  }
}setInterval(randomNumberOne,3000);

/*-------------------------------------JOOUER SON PIECE---------------------------------------------------------*/
function jouerSonPiece(){

  sonPiece.play();
  console.log("musique jouée");
  };

/*-----------------------------------DEPLACEMENT MARIO--------------------------------------------*/

window.addEventListener("keydown", (event) => {
  
  switch (event.key) {
    case "ArrowDown":
      perso.style.top = parseInt(perso.style.top) + marioMoveBy + "px";
      colisionPiece();
      colisionGoomba();
      collisionEcranMario();
      break;
    case "ArrowUp":
      perso.style.top = parseInt(perso.style.top) - marioMoveBy + "px";
      colisionPiece();
      colisionGoomba();
      collisionEcranMario();
      break;
    case "ArrowLeft":
      perso.style.left = parseInt(perso.style.left) - marioMoveBy + "px"; 
      colisionPiece();
      colisionGoomba()
      collisionEcranMario();
      break;
    case "ArrowRight":
      perso.style.left = parseInt(perso.style.left) + marioMoveBy + "px"; 
      colisionPiece();
      colisionGoomba();
      collisionEcranMario();
      break;
  }
});

/*------------------------------CLICK SUR PLAY RELANCE PARTIE---------------------------------------------------------*/

play.addEventListener("click", () => {

  // console.log("tu as cliqué sur play");
  window.location.reload();
});


function changerCouleur(){
  perso.style.filter= "brightness(1.75)";
};

function couleurPersoInitiale(){
  perso.style.filter= "brightness(1)";
};

function marioVinsible(){
  marioInvinsible = false;
};

/*-----------------------------------COLISION MARIO AVEC ECRAN----------------------------------------*/


function collisionEcranMario(){
  // let screenWidth = window.innerWidth;
  // let screenEight= window.innerHeight;



  let positionVerticale = parseInt(perso.style.top);
  let positionHorizontale = parseInt(perso.style.left);
  // console.log("position verticale" + positionVerticale);
  // console.log("position horizontale" + positionHorizontale);
  // console.log("largeur écran " + screenWidth);
  // console.log("hauteur écran" + screenEight);


if (positionVerticale >= window.innerHeight) {
    perso.style.top = parseInt(perso.style.top) - marioMoveBy + "px";
    console.log("rebond bas");
  }
    if (positionVerticale <= 0) {
      perso.style.top = parseInt(perso.style.top) + marioMoveBy + "px";
      console.log("rebond haut");
    }
      if (positionHorizontale >= window.innerWidth) {
        perso.style.left = parseInt(perso.style.left) - marioMoveBy + "px";
        console.log("rebond droit");
      }    
        if (positionHorizontale <= 0) {
        perso.style.left = parseInt(perso.style.left) + marioMoveBy + "px";
        console.log("rebond gauche");
        }
};
