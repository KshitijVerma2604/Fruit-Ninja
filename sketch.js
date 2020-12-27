var alien1Image, alien2Image, alienGroup;
var fruit1Image,fruit2Image, fruit3Image, fruit4Image, fruitGroup;
var gameOverImage;
var backGround,backGroundImage;
var sword,swordImage;
var gameState;
var play=0;
var end=1;
var score=0;

function preload() {
  swordImage = loadImage("sword.png");
  alien1Image = loadImage("alien1.png");
  alien2Image = loadImage("alien2.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  gameOverImage = loadImage("gameOver.png");
  backGroundImage = loadImage("backGround.jpg")
}

function setup(){
  createCanvas(600,350);
  sword=createSprite(350,200,10,10);
  sword.addImage(swordImage);
  sword.scale=0.7;
  // sword.debug=true;
  sword.setCollider("circle",0,0,60)
  gameState=play;
  backGround=createSprite(300,170,10,10);
  backGround.addImage(backGroundImage);
  backGround.scale=2;
  fruitGroup = createGroup();
  alienGroup = createGroup();
}

function draw() {
  background(180);
 if(gameState===play){
   sword.y=World.mouseY;
   sword.x=World.mouseX;
  if(fruitGroup.isTouching(sword)){
    score++;
    fruitGroup.destroyEach();
  } 
  if(alienGroup.isTouching(sword)){
    score=0;
    gameState=end;
  }
 }
  if(gameState===end){
    fruitGroup.destroyEach();
    alienGroup.destroyEach();
    sword.addImage(gameOverImage);
    sword.y=180;
    sword.x=300;
  }
sword.depth=backGround.depth;
sword.depth++;
  
 alienSpawn();
 fruitSpawn();
  
  
  drawSprites();
  text("score:"+score,300,20);
}

function fruitSpawn(){
  if (frameCount % 80 === 0){ 
     var fruit=createSprite(random(20,580),360,10,10);      fruit.velocityY=-4;
 fruit.scale=0.2;
 // fruit.debug=true;
 fruit.depth=backGround.depth;
 fruit.depth++;
 fruit.setCollider("circle",0,0,100);
  var rand=Math.round(random(1,4));
   switch(rand){
    case 1: fruit.addImage(fruit1Image);
            break;
    case 2: fruit.addImage(fruit2Image);
            break;
    case 3: fruit.addImage(fruit3Image);
            break;
    case 4: fruit.addImage(fruit4Image);
            break;
    default:break;
   }
    fruit.lifetime=150;
    fruitGroup.add(fruit);                        
  }
}
function alienSpawn(){
  if(frameCount % 200 === 0){
    var alien=createSprite(random(20,480),360,10,10);
    alien.velocityY=-8;
    alien.scale=0.8;
    alien.depth=backGround.depth;
    alien.depth++;
    // alien.debug=true;
    alien.setCollider("circle",0,0,20);
    var rand=Math.round(random(1,2))
    switch(rand){
     case 1: alien.addImage(alien1Image);
             break;
     case 2: alien.addImage(alien2Image);
             break;
     default : break;
    }
    alien.lifetime=100;
    alienGroup.add(alien);
  }
}