var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
    spookySound.loop()                        

  ghost = createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3  

}
function spawnDoors()
{
  if(frameCount%200 === 0){
door = createSprite (100,-50)
climber = createSprite(100,0)
invisibleBlock = createSprite(100, 10,50,2)
//velocity
door.velocityY = 2
climber.velocityY = 2
invisibleBlock.velocityY = 2

door.x = Math.round(random(100,500))
climber.x = door.x
invisibleBlock.x = climber.x
//Adding images
door.addImage(doorImg)
climber.addImage(climberImg)
invisibleBlock.visible = false


//Lifetime
door.lifetime = 500
climber.lifetime = 500
invisibleBlock.lifetime = 500
//adding to group
doorsGroup.add(door)
climbersGroup.add(climber)
invisibleBlockGroup.add(invisibleBlock)

ghost.depth = door.depth
ghost.depth+=1


  }   



}
function draw() {
  background(200);
  if(gameState === "play") {
  spawnDoors()
  if(tower.y > 400){
      tower.y = 300
    }

if(keyDown("RIGHT_ARROW")){
ghost.x = ghost.x +3

}
if(keyDown("LEFT_ARROW")) {
    ghost.x = ghost.x-3
}

if(keyDown("space")){
ghost.velocityY = -5
  
}
ghost.velocityY = ghost.velocityY+0.8

if(ghost.isTouching(climbersGroup)){
ghost.velocityY = 0
 } 
 if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600 ){
   ghost.destroy()
  gameState ="end" 
  
 }
 
 drawSprites()
 }

 if(gameState ==="end"){
  background("black")
  fill("yellow")
  textSize(30)
text("GAME OVER!!!",200,200)
  
 }

}
