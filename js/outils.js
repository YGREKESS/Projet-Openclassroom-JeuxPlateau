// INSTRUCTION + BOUTON START
var body = $("body")[0];
var gameTitle = $(".gameTitle")[0];
var divInstruction = document.createElement("div");
divInstruction.className = "divInstruction"
var instruction = "Sur la carte, un nombre limité d’armes (4 maximum) est placé aléatoirement et peut être récolté par le joueur qui passera dessus. A chaque tour, un joueur peut se déplacer d’une à trois cases (horizontalement ou verticalement) avant de terminer son tour. Si un joueur passe sur une case contenant une arme, il laisse son arme actuelle sur place et la remplace par la nouvelle. Si les joueurs se croisent sur des cases adjacentes (horizontalement ou verticalement), un combat à mort s’engage. Le joueur à débuter sera désigné aléatoirement.";
divInstruction.innerHTML = instruction;
var gameBoard = $("#jeu")[0];
gameBoard.style.display = "none";
var startButton = document.createElement("button");
startButton.className = "startButton";
startButton.type = "button";
startButton.textContent = "Démarrer la partie !";
$("body").append(divInstruction, startButton);

// INFOS JOUEUR 1
var jaugeSanteBackPlayer1 = $("#jaugeSanteBackPlayer1")[0];
var jaugeSanteFrontPlayer1 = $("#jaugeSanteFrontPlayer1")[0];
var posturePlayer1 = $("#posturePlayer1")[0];
var imageWeaponPlayer1 = $("#imageWeaponPlayer1")[0];
var nameWeaponPlayer1 = $("#nameWeaponPlayer1")[0];
var damageWeaponPlayer1 = $("#damageWeaponPlayer1")[0];

// INFOS JOUEUR 2
var jaugeSanteBackPlayer2 = $("#jaugeSanteBackPlayer2")[0];
var jaugeSanteFrontPlayer2 = $("#jaugeSanteFrontPlayer2")[0];
var posturePlayer2 = $("#posturePlayer2")[0];
var imageWeaponPlayer2 = $("#imageWeaponPlayer2")[0];
var nameWeaponPlayer2 = $("#nameWeaponPlayer2")[0];
var damageWeaponPlayer2 = $("#damageWeaponPlayer2")[0];

// GESTION POSTURES
var infosPlayer1 = $("#Player1")[0];
var infosPlayer2 = $("#Player2")[0];
var posturePlayer1Div = $(".posturePlayer1Div")[0];
var posturePlayer2Div = $(".posturePlayer2Div")[0];
var attackPlayer1 = $(".attackPlayer1Button")[0];
var defensePlayer1 = $(".defensePlayer1Button")[0];
var attackPlayer2 = $(".attackPlayer2Button")[0];
var defensePlayer2 = $(".defensePlayer2Button")[0];

// FONCTION ALEATOIRE
function randomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

// FONCTION QUI GERE L'OPACITE
function opacity(playerQuiDoitJouer) {
	if (playerQuiDoitJouer == game.player1) {
		attackPlayer2.onclick = null;
		defensePlayer2.onclick = null;
		infosPlayer1.style.opacity = 1;
		infosPlayer2.style.opacity = 0.2;
	} else {
		attackPlayer1.onclick = null;
		defensePlayer1.onclick = null;
		infosPlayer1.style.opacity = 0.2;
		infosPlayer2.style.opacity = 1;
	} 	
}

// FONCTION MISE A JOUR DES INFOS
function updateInfos(){
	//VIE
	jaugeSanteFrontPlayer1.style.width = 2 * game.player1.life + "px";
	jaugeSanteFrontPlayer2.style.width = 2 * game.player2.life + "px";
	jaugeSanteFrontPlayer1.innerHTML = game.player1.life;	
	jaugeSanteFrontPlayer2.innerHTML = game.player2.life;

	//ARME
	imageWeaponPlayer1.style.backgroundImage = "url('images/" + game.player1.weapon + ".png')";
	imageWeaponPlayer2.style.backgroundImage = "url('images/" + game.player2.weapon + ".png')";
	nameWeaponPlayer1.innerHTML = game.player1.weapon;
	nameWeaponPlayer2.innerHTML = game.player2.weapon;

	//POSTURE
	posturePlayer1.innerHTML = game.player1.posture;
	posturePlayer2.innerHTML = game.player2.posture;
}

// AFFICHAGE DES CHOIX DE POSTURES
function postureDisplayBlock(){
	posturePlayer1Div.style.display = "block";
	posturePlayer2Div.style.display = "block";
}

// CAMOUFLAGE DES CHOIX DE POSTURES
function postureDisplayNone(){
	posturePlayer1Div.style.display = "none";
	posturePlayer2Div.style.display = "none";
}