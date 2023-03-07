class Game {
  constructor() {}
  //BP
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  //BP
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  // AP
  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("carro1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("carro2", car2_img);
    car2.scale = 0.07;

    fuelGroup = new Group();
    gcGroup = new Group();
    this.addRec(fuelGroup,6,fuelImg,0.02);
    this.addRec(gcGroup,20,gcImg,0.09);

    cars = [car1, car2];
  }

  //BP
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  //SA
  play() {
    this.handleElements();

    Player.getPlayersInfo(); //added

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //índice da matriz
      var index = 0;
      for (var plr in allPlayers) {
        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index].position.x = x;
        cars[index].position.y = y;

        //adicione 1 ao índice de cada loop
        index = index + 1;

        if (index === player.index) {
          stroke(10);
          fill("green");
          ellipse(x, y, 60, 60);
          this.handleFuel(index);
          this.handlePowerCoins(index);
          
          camera.position.x=cars[index-1].position.x;
          camera.position.y=cars[index-1].position.y;
        }
      }

      // manipule os eventos do teclado
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }
 
      drawSprites();
    }
  }

addRec(spriteGroup,numSprites,spriteImg,scale){



for (let index = 0; index < numSprites; index++) {
  var x = Math.round(random(width/2 + 150, width/2 -150));
  var y = Math.round(random(-height * 4,5, height - 400));
  
  var sprite = createSprite(x,y);
  sprite.addImage(spriteImg);
  
  sprite.scale = scale
  
  spriteGroup.add(sprite);
  
}

}

handleFuel(index){ 
    cars[index-1].overlap(fuelGroup,function(collector,collected){
      player.Pfuel=185
      collected.remove();
      
    })

}

 handlePowerCoins(index){
    cars[index-1].overlap(gcGroup,function(collector,collected){
      player.score+=21;
      collected.remove();
      player.update();


    })
 }

}
