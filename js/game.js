class Game {

	constructor(tour){
		this.tour = 0;
	}

	launchGame(){
		this.board_1 = new Board (9,9,10,4);
		this.player1 = new Player ("Joueur 1", "Main", "Aucune");
		this.player2 = new Player ("Joueur 2", "Main", "Aucune");
		this.main = new Weapon ("Main", 10);
		this.arc = new Weapon ("Arc", 20);
		this.bazooka = new Weapon ("Bazooka", 30);
		this.katana = new Weapon ("Katana", 25);
		this.carabine = new Weapon ("Carabine", 35);
		this.board_1.generateMap();
		this.board_1.generateGameElements();
		this.board_1.displayMap();

		var player = [this.player1, this.player2];
		var random = randomInt(0,player.length - 1);
		var playerQuiDoitJouer = player[random];
		playerQuiDoitJouer.playAs(playerQuiDoitJouer);
	}

	fightOrMove(playerQuiDoitJouer, playerQuiDoitPasJouer) {
		var combat = playerQuiDoitJouer.checkPlayerAround();

		if (combat == true) {
			if(this.tour == 0){
				alert("Préparez-vous, le combat commence !");
				this.tour ++;
			}
			postureDisplayBlock();
			playerQuiDoitJouer.chooseDefenseOrAttack(playerQuiDoitJouer);
		} else {
			  postureDisplayNone();
			  playerQuiDoitJouer.generatePossibleMove();
			  game.board_1.displayMap();
			  playerQuiDoitJouer.move(playerQuiDoitJouer, playerQuiDoitPasJouer);	   
		}	
	}

	// FONCTION RECOMMENCER
	reload(){
		var end = prompt("Souhaitez-vous recommencer ? Tapez OUI ou NON.")
		switch(end){
			case "OUI":
			case "Oui":
			case "oui":
				javascript:window.location.reload();
				break;

			case "NON":
			case "Non":
			case "non":
				postureDisplayNone();
				alert("A bientôt !")
				break;

			default:
	            alert("Je n'ai pas compris.");
	            this.reload();
	            break;
		}
	}
}

var game = new Game();
startButton.addEventListener("click", function play() {
	game.launchGame();
	gameTitle.style.display = "none";
	divInstruction.style.display = "none";
	startButton.style.display = "none";
	gameBoard.style.display = "block";
});