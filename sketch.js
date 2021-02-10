var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var fodGroup, obstacleGroup;
var score, ground, bgd1, bgd;
var play = 1,end = 0,gameState = play;

function preload() {

  bgd = loadImage("jungle.jpg");

  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

}

function setup() {
  createCanvas(700, 500);

  bgd1 = createSprite(200, 150, 400, 400);
  bgd1.addImage(bgd);
  bgd1.scale = 1.8;
  bgd1.velocityX = -4;

  ground = createSprite(200, 450, 900, 20);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;


  monkey = createSprite(80, 350, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.14;
  
  score = 0;

  foodGroup = new Group();
  obstacleGroup = new Group();

}

function draw() {


  if (gameState === play) {

    if (keyDown("space") && monkey.y >= 380) {
      monkey.velocityY = -15;
    }
    if (bgd1.x < 0) {
      bgd1.x = 200;
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    monkey.velocityY = monkey.velocityY + 0.45;
    spawnBanana();
    spawnObstacle();

if (foodGroup.isTouching(monkey)) {
      score = score + 2
      foodGroup.destroyEach();
      monkey.scale+=+0.003;
    }
 
    monkey.collide(ground);

   

if (obstacleGroup.isTouching(monkey)) {
      gameState=end;
  }
}
  else if (gameState === end) {
    bgd1.velocityX = 0;
    ground.velocityX = 0;
    monkey.visible=false;

    obstacleGroup.destroyEach();
    foodGroup.destroyEach();

  }
  drawSprites();

if(gameState=== end){

  textSize(30);
  fill ("white");
  text("Game Over!!",250,250);
}
  textSize(30);
  stroke(5)
  fill("black");
  text("Score :" + score, 10, 35);


}

function spawnBanana() {
  if (frameCount % 120 === 0) {
    var banana = createSprite(750, Math.round(random(70, 350)), 20, 20);
    banana.velocityX = -6;
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    foodGroup.add(banana);
    banana.lifetime =125;

    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}

function spawnObstacle() {
  if (frameCount % 150 === 0) {
    obstacle = createSprite(750, 410, 20, 20);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 187.5;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    obstacle.setCollider("rectangle", 0, 0, 300, 300);
  }
}