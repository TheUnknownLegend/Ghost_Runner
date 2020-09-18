var PLAY = 1;
var END = 0;
var gameState = PLAY;

var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;

var horrorSound;

var ghost,ghostImg,ghostJump;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  
  horrorSound = loadSound("spooky.wav");
  
  ghostImg = loadImage("ghost-standing.png");
  ghostJump = loadImage("ghost-jumping.png");

}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300,1,1);
  tower.addImage("background",towerImg);
  tower.velocityY = 1;
  
  doorGroup = new Group();
  climberGroup = new Group();
  
  ghost = createSprite (300,300);
  ghost.addImage("KillerWithAxe",ghostImg);
  ghost.scale = 0.45;
}

function draw(){
   console.log(tower.y);
  
 background(0);
  
  if(gameState === PLAY){
   if(tower.y>height){
     tower.y = height/2;
   }
     
    spawnDoor();
  
    //Controls
    if(keyWentDown("space"))
    {
       ghost.velocityY = -10;
    }

    ghost.velocityY = ghost.velocityY + 0.8;
     
    if(keyDown(RIGHT_ARROW))
    {
      ghost.x = ghost.x + 10;  
    }


    if(keyDown(LEFT_ARROW))
    {
      ghost.x = ghost.x - 10;
    }
   
  
  if(climberGroup.isTouching(ghost)||ghost.y > height){
    gameState = END;
    }
    drawSprites();
  }
  
  else if(gameState === END){  
    ghost.destroy();
    climberGroup.setLifetimeEach(-1);
    doorGroup.setLifetimeEach(-1);
    
    climberGroup.setVelocityYEach(0);
    doorGroup.setVelocityYEach(0);
    
    
    fill("yellow");
    textSize (30);
    text("Game Over",210,300);
   // text("Press 'R' to Restart the Game",200,330);
    
   /* if(keyDown("r")){
    gameState = PLAY; 
    }*/
  }
  

}

function spawnDoor(){
  if(frameCount%250 === 0){
      door = createSprite(Math.round(random(120,400)),50);
    climber = createSprite(200,115);
    
    door.addImage("safePlace",doorImg);
    climber.addImage ("death",climberImg);
    
    climber.x = door.x ;
    
    door.velocityY = 1;
    climber.velocityY = 1;
    
    door.lifetime = 600;
    climber.lifetime =600;
    
    ghost.depth = climber.depth;
    ghost.depth = ghost.depth + 1;
    
    doorGroup.add(door);
    climberGroup.add(climber);
  }
    
}

