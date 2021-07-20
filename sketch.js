var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var cloudsGroup, obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOverImage,restart,restartImage

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");      
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.debug = true;
  trex.setCollider("circle",0,0,40);
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  ground.depth = trex.depth;
  trex.depth = trex.depth + 1;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)
  cloudsGroup = createGroup();
  obstaclesGroup = createGroup();
 
  gameOver = createSprite(300,100,50,50);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1.5;

  restart = createSprite(300,140,50,50);
  restart.addImage(restartImage);
  restart.scale = 0.5;
}

function draw() {
  //set background color
  background(180);
  
  console.log(trex.y)
  
 if (gameState === PLAY) {
    // jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 132) {
      trex.velocityY = -10;
    } 
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnClouds();

    spawnObstacles();
    if (obstaclesGroup.isTouching(trex)) {
      gameState = END;
    }
    gameOver.visible = false;
    restart.visible = false;

 }
 else if(gameState === END) {
ground.velocityX = 0;
obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);
trex.changeAnimation(trex_collided);
obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);
trex.velocityY = 0;
gameOver.visible = true;
restart.visible = true;
 }
  

  

  

  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds

  
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
 if (frameCount%60 === 0){

 cloud = createSprite(600,100,40,10);
 cloud.addImage(cloudImage);
 cloud.y = Math.round(random(10,60));
 cloud.scale = 0.4;
 cloud.velocityX = -3;

 cloud.depth = trex.depth;
 trex.depth = trex.depth + 1;

cloud.lifetime = 200;
cloudsGroup.add(cloud);
}
}
function spawnObstacles() {
  if (frameCount%60 === 0) {
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    var cactus = Math.round(random(1,6));
    switch(cactus){
      case 1:obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break;
      case 3:obstacle.addImage(obstacle3);
      break;
      case 4:obstacle.addImage(obstacle4);
      break;
      case 5:obstacle.addImage(obstacle5);
      break;
      case 6:obstacle.addImage(obstacle6);
      break;
      default:break;
    }
    obstacle.scale = 0.6;
    obstacle.lifetime = 200;
    obstaclesGroup.add(obstacle);
  }
}