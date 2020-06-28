class Weapon {

	constructor(name, damage){
		this.weaponName = name;
		this.damage = damage;
	}

	generateWeapon() {
		var casesVides = game.board_1.generatePositions(0);
		var aleatoire = randomInt(0, casesVides.length - 1);
		var choice = casesVides[aleatoire];
		this.weaponDataX = choice[0];
		this.weaponDataY = choice[1];
		game.board_1.map[this.weaponDataY][this.weaponDataX] = this.weaponName;
	}
}