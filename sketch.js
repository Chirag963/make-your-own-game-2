var Play = 1;
var End  = 0;
var gameState = Play;

var man, man_running;
var terrorist, terroristImage;
var score = 0;
var ST = 0;
var restart, restartImage;
var gameOverImage;
var bg, backgroundImage;
var invisibleGround;

function preload() {

  man_running = loadImage("man_running.png");
  terroristImage = loadImage("terrorist.png.jpg");

  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameoover2.jpg");

  backgroundImage = loadImage("bg.png");
  
}


function setup() {
  createCanvas(600,400);
  man = createSprite(50, 340);
  man.addImage("man_running");
  man.scale = 0.15;

  //man.velocityX = 3;

  invisibleGround = createSprite(300, 385, 600, 5);
  invisibleGround.visible = false;

  restart = createSprite(300, 200);
  restart.addImage("restart", restartImage);
  restart.scale = 0.2;
  
  gameOver = createSprite(300, 165);
  gameOver.addImage("gameOver", gameOverImage);
  gameOver.scale = 0.6;

  man.setCollider("circle", 10,30,250);
  //monkey.debug = true;

  bg = createSprite(100, 150 );
  bg.addImage(backgroundImage);




}

function draw() {

  background("bg.png");  

  bg.velocityX = -4;
  if(bg.x < 250){

      bg.x = bg.width / 2;

  } 

  man.depth = bg.depth;
  man.depth = man.depth + 1;

  terrorist.velocityX = -(4 + 3* ST/50);

   //scoring
   ST = ST + Math.round(getFrameRate()/60);

   background.velocityX = -(5 + 3* score/20);

   if (bg.x < 250){
    bg.x = bg.width/2;
}
camera.position.x = invisibleGround.x;

if(keyDown("space")&& man.y >= 340.5) {
  man.velocityY = -15;
}

man.velocityY = man.velocityY + 0.8;

spawnTerrorist();

if(terrorist.isTouching(man)){

  man.velocityY = -15;
    //gameState = End;
   
}

man.collide(invisibleGround);
}

}

//giving condition when game state is end

else if(gameState === End) {

    gameOver.visible = true;
    restart.visible = true;

  bg.velocityX = 0;
    man.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    terrorist.setLifetimeEach(-1);
    
    terrorist.setVelocityXEach(0);
         
     
     if(mousePressedOver(restart)) {
        reset();

      }

    }
  
  drawSprites();
  
  
  textSize(20);
  fill("black");
  textFont("algerian");
  text("Survival time: "+ST,10,30);

  textSize(20);
  fill("black");
  textFont("algerian");
  text("Survival: "+score,10,60);

  textSize(10);
  fill("black");
  textFont("algerian");
  text("This is an AI based game", 235, 30);

}



//draw the reset function
function reset() {
  
  //when in reset mode follow the given code
  gameState = Play;
  restart.visible = false;
  gameOver.visible = false;
  terrorist.destroyEach();
  score = 0;
  ST = 0;
}

//draw the spawn obstacle function
function spawnTerrorist() {
  
  //giving condition when frame count is divided by 100 and remainder is 0
  if(frameCount % 100 === 0){
    
   terrorist = createSprite(600, 354);
   terrorist.addImage("terrorist", terroristImage);
   terrorist.velocityX = -8;
    
   terrorist.scale = 0.15;
   terrorist.lifetime = 400;
   
   terrorist.add(terrorist);
   
  }
    
}