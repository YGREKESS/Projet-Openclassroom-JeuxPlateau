class Player{

	constructor(name, weapon, posture){
		this.name = name;
		this.weapon = weapon;
		this.posture = posture;
		this.life = 100;
		this.isturn = false;
	}

	//GENERATION DES JOUEURS
	generatePlayer() {
		
		var casesVides = game.board_1.generatePositions(0);
		var aleatoire = randomInt(0, casesVides.length - 1);
		var choice = casesVides[aleatoire];	
		this.playerDataX = choice[0];
		this.playerDataY = choice[1];
		var playerAround = false;
		game.board_1.map[this.playerDataY][this.playerDataX] = this.name;
		damageWeaponPlayer1.innerHTML = game.main.damage;
		damageWeaponPlayer2.innerHTML = game.main.damage;	

		// Vérification de la présence d'un joueur sur une case adjacente
		var playerAround = this.checkPlayerAround();
		if (playerAround == true) {
			game.board_1.map[this.playerDataY][this.playerDataX] = 0;
			this.generatePlayer();
		}
		updateInfos();
    }

	// CHANGEMENT DE JOUEUR A CHAQUE TOUR
	playAs(playerQuiDoitJouer) { 
	  var playerQuiDoitPasJouer;

	  (playerQuiDoitJouer == game.player1) ? playerQuiDoitPasJouer = game.player2 
	  : playerQuiDoitPasJouer = game.player1;

	  playerQuiDoitJouer.isturn = true;
	  playerQuiDoitPasJouer.isturn = false;
	  game.fightOrMove(playerQuiDoitJouer, playerQuiDoitPasJouer);
	}

	// CHANGEMENT DE JOUEUR A CHAQUE TOUR
	change(playerQuiDoitJouer, playerQuiDoitPasJouer) {
	  var tmp = playerQuiDoitJouer;
	  playerQuiDoitJouer = playerQuiDoitPasJouer;
	  playerQuiDoitPasJouer = tmp; 

	  playerQuiDoitJouer.playAs(playerQuiDoitJouer);  
	}

	_generatePossibleMove (moveHorizontal, moveVertical) {
		var armes = ["Bazooka", "Katana", "Carabine", "Arc"];
		for (var i = 1; i < 4; i++) {
			var breakConditions = [
				((moveHorizontal == 1) && (this.playerDataX + i > game.board_1.cell)),
				((moveHorizontal == -1) && (this.playerDataX - i < 0)),
				((moveVertical == 1) && (this.playerDataY + i > game.board_1.row)),
				((moveVertical == -1) && (this.playerDataY - i < 0))
			];

			if (breakConditions.includes(true)) {
				break;
			}
			else if (armes.includes(game.board_1.map[this.playerDataY + moveVertical*i][this.playerDataX + moveHorizontal*i])) {
				game.board_1.map[this.playerDataY + moveVertical*i][this.playerDataX + moveHorizontal*i] = "_" + game.board_1.map[this.playerDataY + moveVertical*i][this.playerDataX + moveHorizontal*i];
			} else if (game.board_1.map[this.playerDataY + moveVertical*i][this.playerDataX + moveHorizontal*i] == 0) {
				game.board_1.map[this.playerDataY + moveVertical*i][this.playerDataX + moveHorizontal*i] = "_";
			} else {
				break;
			}
		}
	}

	//CREATION DES DEPLACEMENTS
	generatePossibleMove() {
		// A droite
		this._generatePossibleMove(1, 0);
		// A gauche
		this._generatePossibleMove(-1, 0);
		// En haut
		this._generatePossibleMove(0, -1);
		// En bas
		this._generatePossibleMove(0, 1);
	}

	checkCaseAround(moveVertical, moveHorizontal, list){
		var CaseAround = false;
		var array = list;	
			
		for (var i = 0; i < array.length ; i++) {
			var breakConditions = [
				((moveHorizontal == 1) && (this.playerDataX + moveHorizontal> game.board_1.cell)),
				((moveHorizontal == -1) && (this.playerDataX + moveHorizontal< 0)),
				((moveVertical == 1) && (this.playerDataY + moveVertical> game.board_1.row)),
				((moveVertical == -1) && (this.playerDataY + moveVertical< 0))	
			];

			if (breakConditions.includes(true)) {
				break;
			}
			else if (game.board_1.map[this.playerDataY + moveVertical][this.playerDataX + moveHorizontal] == array[i]){
				CaseAround = true;
				break;
			}	
		}
		return CaseAround;
	}

	checkPlayerAround(){
		var playerHere = false;
		// A droite
		var right = this.checkCaseAround(1, 0, ["Joueur 1", "Joueur 2"]);
		// A gauche
		var left = this.checkCaseAround(-1, 0, ["Joueur 1", "Joueur 2"]);
		// En haut
		var top = this.checkCaseAround(0, -1, ["Joueur 1", "Joueur 2"]);
		// En bas
		var bottom = this.checkCaseAround(0, 1, ["Joueur 1", "Joueur 2"]);	

		if ((right == true) || (left == true) || (top == true) || (bottom == true)) {
			playerHere = true;
		}
		return playerHere;
	}

	//SUPPRESSION DES ANCIENNES CASES
	supprPossibleMove_Weapon() {
		for (var i = 0; i <= game.board_1.cell ; i++) {
			for (var j = 0; j <= game.board_1.cell ; j++) {
				if (game.board_1.map[i][j] == "_"){
					game.board_1.map[i][j] = 0;
				}
			}
		}
		for (var i = 0; i <= game.board_1.cell ; i++) {
			for (var j = 0; j <= game.board_1.cell ; j++) {
				if (game.board_1.map[i][j] == "_Bazooka"){
					game.board_1.map[i][j] = "Bazooka"
				} else if (game.board_1.map[i][j] == "_Katana") {
					game.board_1.map[i][j] = "Katana";
				} else if (game.board_1.map[i][j] == "_Carabine") {
					game.board_1.map[i][j] = "Carabine";
				} else if (game.board_1.map[i][j] == "_Arc") {
					game.board_1.map[i][j] = "Arc";
				}
			}
		}
	}

	//DEPLACEMENTS DU JOUEUR
	move(playerQuiDoitJouer, playerQuiDoitPasJouer) {
		if (this.isturn == true) {
			var deplacement = game.board_1.generatePositions("_"); // Récupération de toutes les cases "move"
			var weapon1 = game.board_1.generatePositions("_Bazooka"); // Récupération de toutes les cases "move_bazooka"
			var weapon2 = game.board_1.generatePositions("_Katana"); // Récupération de toutes les cases "move_katana"
			var weapon3 = game.board_1.generatePositions("_Carabine"); // Récupération de toutes les cases "move_carabine"
			var weapon4 = game.board_1.generatePositions("_Arc"); // Récupération de toutes les cases "move_arc"
	  		var moves = deplacement.concat(weapon1, weapon2, weapon3, weapon4); // Tableau recupèrant toutes les cases où un déplacement y est possible.

		 		for(var i = 0; i < moves.length; i++) {
	  			var move = moves[i];
	  			var htmlElements = document.querySelector("#cell[data-x='" + move[0] + "'][data-y='" + move[1] + "']"); // Séléction de toutes les cases où un déplacement y est possible.
					htmlElements.addEventListener("click", function (e) {
						this.dropItem(parseInt(e.srcElement.dataset.y),parseInt(e.srcElement.dataset.x));						
						this.playerDataX = parseInt(e.srcElement.dataset.x);
						this.playerDataY = parseInt(e.srcElement.dataset.y);
						this.recupItem();
						this.supprPossibleMove_Weapon();
						game.board_1.displayMap();
						this.change(playerQuiDoitJouer, playerQuiDoitPasJouer);
				}.bind(this));

			}
		}

		opacity(playerQuiDoitJouer);	
	}

	//RECUPERATION DE L'ARME
	recupItem() {
		var armes = [
	        ["_Katana", game.katana],
	        ["_Bazooka", game.bazooka],
	        ["_Carabine", game.carabine],
	        ["_Arc", game.arc]
	    ];
 
        var cellPlayer = game.board_1.map[this.playerDataY][this.playerDataX];
        for (var i = 0; i < armes.length; i++) {
            var arme = armes[i];
            if (arme.includes(cellPlayer)) {  // Si on clique sur case "_arme"
                this.weapon = arme[1].weaponName; // Mise à jour de l'arme
            	updateInfos(); // Mise à jour des infos du combat	
                if (this.name == "Joueur 1") {
                    damageWeaponPlayer1.innerHTML = arme[1].damage; // Affichage des dégats
                    } else {
                    damageWeaponPlayer2.innerHTML = arme[1].damage; // Affichage des dégats
                    }
            } else {
                game.board_1.map[this.playerDataY][this.playerDataX] = this.name; //nouvelle case player
            }
        }
    }

	//ABANDON DE L'ARME
    dropItem(Y,X){
		if ((this.weapon != "Main")&&(game.board_1.map[Y][X] != "_")) {
			game.board_1.map[this.playerDataY][this.playerDataX] = this.weapon;
		} else {
			game.board_1.map[this.playerDataY][this.playerDataX] = 0;
		}	
	}

	chooseDefenseOrAttack(playerQuiDoitJouer){

		if (playerQuiDoitJouer == game.player1) {
			attackPlayer1.onclick = function(){ 
				game.player1.posture = "Attaque";
				posturePlayer1.innerHTML = game.player1.posture;
				game.player1.fight(game.player1, game.player2);
				};
			defensePlayer1.onclick = function(){ 
				game.player1.posture = "Défensive";
				posturePlayer1.innerHTML = game.player1.posture;
				playerQuiDoitJouer.change(game.player1, game.player2);
				};
			opacity(playerQuiDoitJouer);
		} else {
			attackPlayer2.onclick = function(){ 
				game.player2.posture = "Attaque";
				posturePlayer2.innerHTML = game.player2.posture;
				game.player2.fight(game.player2, game.player1);
				};
			defensePlayer2.onclick = function(){ 
				game.player2.posture = "Défensive";
				posturePlayer2.innerHTML = game.player2.posture;
				playerQuiDoitJouer.change(game.player2, game.player1);
				};
			opacity(playerQuiDoitJouer);
		} 		
	}

	fight(playerQuiDoitJouer, playerQuiDoitPasJouer){

		var armes = [
			["Main", game.main],
	        ["Katana", game.katana],
	        ["Bazooka", game.bazooka],
	        ["Carabine", game.carabine],
	        ["Arc", game.arc]
	    ];
	    // Gestion des postures
		for (var i = 0; i < armes.length; i++) {
			var arme = armes[i];
	    	if (arme.includes(this.weapon)) {
				if (playerQuiDoitPasJouer.posture == "Défensive") {
					playerQuiDoitPasJouer.life = playerQuiDoitPasJouer.life - arme[1].damage/2;
				} else {
					playerQuiDoitPasJouer.life = playerQuiDoitPasJouer.life - arme[1].damage;
				}
			}
		}					
		// Mise à jour des infos du combat				
		updateInfos();
		// Vérification fin de combat ou poursuite
		if (playerQuiDoitPasJouer.life <= 20) {
			if (playerQuiDoitPasJouer == game.player1) {	
				jaugeSanteFrontPlayer1.style.backgroundColor = "red";
				jaugeSanteFrontPlayer1.style.color = "black";
			} else {
				jaugeSanteFrontPlayer2.style.backgroundColor = "red";
				jaugeSanteFrontPlayer2.style.color = "black";
			}
		} 

		if (playerQuiDoitPasJouer.life <= 0) {
			if (playerQuiDoitPasJouer == game.player1) {			
				jaugeSanteBackPlayer1.innerHTML = 0;
				jaugeSanteFrontPlayer1.style.width = 0 + "px";
			} else {
				jaugeSanteBackPlayer2.innerHTML = 0;
				jaugeSanteFrontPlayer2.style.width = 0 + "px";
			}
			alert(this.name + " a gagné !")
			game.reload();
		} else {
			this.change(playerQuiDoitJouer, playerQuiDoitPasJouer);
		}
	}
}