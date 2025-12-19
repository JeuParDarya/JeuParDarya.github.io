// Des codes son de w3 schools et des notes de cours 
// Mots de Noël possible
const motsNoel = [
  "NOEL",
  "SAPIN",
  "CADEAU",
  "NEIGE",
  "LUTIN",
];

const motsMedium = [
  "GIRLAND",
  "BOUGIES",
  "JOYEUX",
  "DECEMBRE",
  "FAMILLE"
];

const motsHard = [
  "CALENDRIER",
  "AVENT",
  "BETHLEEM",
  "BERGER",
  "ETABLE",
];

// Choisir un mot aléatoire
let listeMots;
if (window.location.pathname.includes("medium.html")) {
  listeMots = motsMedium;
} else if (window.location.pathname.includes("hard.html")) {
  listeMots = motsHard;
} else {
  listeMots = motsNoel; // default easy
}
let motSecret = listeMots[Math.floor(Math.random() * listeMots.length)];
let essaisRestants = 3;          // nombre total d'essais
let indiceCourant = 0;           // numéro du prochain indice à montrer
let motAffiche = motCache(motSecret);

const inputGuess = document.getElementById("guess");
const btnGuess = document.getElementById("btnGuess");
const btnReset = document.getElementById("btnReset");
const hintsBox = document.getElementById("hintText");
const scoreBox = document.querySelector(".score");

if (document.querySelector(".score")) {
  let score = parseInt(localStorage.getItem('totalScore')) || 0;
  const scoreBox = document.querySelector(".score");
  scoreBox.textContent = "Score : " + score;
}

if (document.querySelector(".username")) {
  const usernameBox = document.querySelector(".username");
  const username = localStorage.getItem('username') || 'Joueur';
  usernameBox.textContent = username;
}

function motCache(mot) {
  // un tableau de "_" de la même longueur que le mot
  return Array(mot.length).fill("_");
}

function lettreAleatoire() {
  const indicesCaches = [];
  for (let i = 0; i < motSecret.length; i++) {
    if (motAffiche[i] === "_") {
      indicesCaches.push(i);
    }
  }

  if (indicesCaches.length === 0) {
    return; // plus rien à révéler
  }

  const indexRandom = indicesCaches[Math.floor(Math.random() * indicesCaches.length)];
  motAffiche[indexRandom] = motSecret[indexRandom];

  hintsBox.textContent = motAffiche.join(" ");
}

function resetGame() {
  score = parseInt(localStorage.getItem('totalScore')) || 0;  // ← ADD THIS
  scoreBox.textContent = "Score : " + score; 
  let listeMots;
  if (window.location.pathname.includes("medium.html")) {
    listeMots = motsMedium;
  } else if (window.location.pathname.includes("hard.html")) {
    listeMots = motsHard;
  } else {
    listeMots = motsNoel;
  }
  
  motSecret = listeMots[Math.floor(Math.random() * listeMots.length)];
  essaisRestants = 3;
  indiceCourant = 0;
  motAffiche = motCache(motSecret);

  hintsBox.textContent = motAffiche.join(" ");
  inputGuess.value = "";
  inputGuess.disabled = false;
  btnGuess.disabled = false;
}

function verifierMot() {
  const reponseDonner = inputGuess.value.trim();
  if (!reponseDonner) {
    return; // ne rien faire si l'input est vide
  }

  const reponse = reponseDonner.toUpperCase();
  
  if (reponse === motSecret) {
    hintsBox.textContent = "Bravo! Tu as trouvé le mot : " + motSecret + "";

	 if (window.location.pathname.includes("easy.html")) {
    score += 100;
  } else if (window.location.pathname.includes("medium.html")) {
    score += 150;
  } else if (window.location.pathname.includes("hard.html")) {
	score += 200;
  }
  
   if (score >= 2500) {
	hintsBox.textContent = "Tu as réussi à atteindre 2500 points! Get a life <3";
    score = 0;
  }
  
    localStorage.setItem('totalScore', score);
    scoreBox.textContent = "Score : " + score;
	btnGuess.disabled = true;
    inputGuess.disabled = true;
  } else {
    essaisRestants--;
	
    lettreAleatoire();
	
	if (essaisRestants <= 0) {
      hintsBox.textContent = "Perdu! Le mot secret était : " + motSecret;
	  btnGuess.disabled = true;
      inputGuess.disabled = true;
    }
  }

  // vider le champ pour le prochain essai
  inputGuess.value = "";
  inputGuess.focus();
}

btnGuess.addEventListener("click", function (event) {
  event.preventDefault();
  verifierMot();
});

inputGuess.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    verifierMot();
  }
});

btnReset.addEventListener("click", function (event) {
  event.preventDefault();
  resetGame();
});

resetGame();

