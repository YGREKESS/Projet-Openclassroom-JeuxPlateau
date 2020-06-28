class Board {

  constructor (row, cell, wall, weapons) {
    this.map = [];
    this.row = row;
    this.cell = cell;
    this.wall = wall;
    this.weapons = weapons;
  }

  generateMap() {
    for (var i = 0; i <= this.row; i++) {
      var line = [];
      for (var j = 0; j <= this.cell; j++) {
        line.push(0);
      }
      this.map.push(line);
    }
  }

  displayMap() {
    var body = document.getElementById("map");
    body.innerHTML = "";
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    this.map.forEach((line, i) => {
      var row = document.createElement("tr");
      row.setAttribute("id", "row");
      row.setAttribute("data-y", i );
      line.forEach((cell, j) => {
        var cell = document.createElement("td");
        cell.setAttribute("id", "cell");
        cell.setAttribute("data-x", j ); // attribution attribut data-x
        cell.setAttribute("data-y", i ); // attribution attribut data-y
        var className = " ";        
          (this.map[i][j] == "x") ? className = "wall" 
          : (this.map[i][j] == 0) ? className = "vide"
          : (this.map[i][j] == "Joueur 1") ? className = "player1"
          : (this.map[i][j] == "Joueur 2") ? className = "player2"
          : (this.map[i][j] == "_") ? className = "move"
          : (this.map[i][j] == "Bazooka") ? className = "Bazooka"
          : (this.map[i][j] == "Katana") ? className = "Katana"
          : (this.map[i][j] == "Carabine") ? className = "Carabine"
          : (this.map[i][j] == "Arc") ? className = "Arc"
          : className = this.map[i][j];
        cell.setAttribute("class", className);
        row.appendChild(cell);
      });
      tblBody.appendChild(row);
    })
    // Le <tbody> rentre dans le <table>
    tbl.appendChild(tblBody);
    // Le <table> rentre dans #map
    body.appendChild(tbl);
  }

  generatePositions(filter) {
    var possibilities = [];
    var typeCase = filter;
    this.map.forEach((line, i) => {
      line.forEach((cell, j) => {
        if (cell == typeCase) {
          possibilities.push([j, i]);
        }
      });
    });
    return possibilities;
  }

  generateWall() { // WALL = 1
    for (var i = 1; i <= this.wall; i++) {
      var x = randomInt(0, this.cell); // on genere un nombre entre 1 et 10
      var y = randomInt(0, this.row);
      this.map[y][x] = "x";
    }
  }

  generateGameElements(){
    game.board_1.generateWall();
    game.player1.generatePlayer();
    game.player2.generatePlayer();
    game.arc.generateWeapon();
    game.bazooka.generateWeapon();
    game.katana.generateWeapon();
    game.carabine.generateWeapon();
  }
}
