var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var score 
var gameState = PLAY
var PLAY = 1
var END = 0
var ground

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  createCanvas(600, 600)


  monkey = createSprite(100, 450, 50, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1

  ground = createSprite(300, 480, 600, 5)

  bananaGroup = new Group();
  rockGroup = new Group();

}


function draw() {
  background("white");
  if (gameState === PLAY) {



    ground.velocityX = -(4 + 3 * score / 100)

    score = score + Math.round(getFrameRate() / 60);


  text("Score" + score,100,500)

    monkey.velocityY = monkey.velocityY + 0.8

    //jump when the space key is pressed
    if (keyDown("SPACE") && monkey.y >= 450) {
      monkey.velocityY = monkey.velocityY -12;

    }

    //add gravity

    spawnBanana()
    spawnRocks();

    if (rockGroup.isTouching(monkey)) {
      gameState = END;

    }
  }
 if (gameState === END) {


    rockGroup.velocityX = 0;
    monkey.velocityY = 0


    //set lifetime of the game objects so that they are never destroyed
    rockGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    rockGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);


  }

  drawSprites();
}

function spawnRocks() {

  if (frameCount % 100 === 0) {
    obstacle = createSprite(650, 441, 50, 50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2
    obstacle.velocityX = -9
    obstacles.liftime = 600
    rockGroup.add(obstacle)
  }
}


function spawnBanana() {

  if (frameCount % 80 === 0) {
    banana = createSprite(650, 341, 50, 50);
    banana.addImage(bananaImage);
    banana.scale = 0.1
    banana.velocityX = -9
    banana.y = Math.round(random(220, 341))
    banana.liftime = 600
    bananaGroup.add(banana)

  }
}