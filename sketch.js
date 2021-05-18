//global variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground;
var forest_img,forest,forest2;
//var survivalTime=0;
var gameState="play";

function preload(){
  
  
        //preloads for animation and images
        monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

        bananaImage = loadImage("banana.png");
        obstaceImage = loadImage("obstacle.png");
        collided = loadAnimation("sprite_3.png");
        forest_img = loadImage("forest.png");
}



function setup() {
        createCanvas(displayWidth,displayHeight);
        //created sprites
        ground=createSprite(displayWidth/2,displayHeight-50,displayWidth*100000000,5);

        forest=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
        forest2=createSprite(1700,displayHeight/2,displayWidth,displayHeight);
        forest.addImage("forest",forest_img);
        forest2.addImage("forest",forest_img);
        forest.scale=4;
        forest2.scale=4;
        monkey=createSprite(displayWidth/2,displayHeight-60)
        //added animation to monkey and scaled it down
        monkey.addAnimation("running",monkey_running);
        monkey.scale=0.3;
        
  
        //groups
        FoodGroup=new Group();
       // obstacleGroup=new Group();
        
}


function draw() {

        stroke("black");
        textSize(20);
        fill("black");
        //survivalTime=Math.ceil(frameCount/frameRate())
        
  if (gameState==="play"){
  
                
           // background("green");
          ground.shapecolour="green";
           //moving ground
           //ground.velocityX=-8
         
           //infinite ground
          // if (ground.x < 350){
          // ground.x = ground.width/2;
          monkey.velocityX = 4;
         // }

          //space condition for the monkey
          if(keyDown("space")&&monkey.y>=displayHeight/1.5){
            monkey.velocityY=-17;
           }
           //added gravity to monkey
           monkey.velocityY = monkey.velocityY + 0.8;

         camera.position.x = monkey.x;
         
         if(FoodGroup.isTouching(monkey)){
           FoodGroup.destroyEach();
          // survivalTime= survivalTime+2
         }
         console.log(monkey.x)

    
         food();
         //obstacle();
         monkey.visible=true;
         
  }  
  
        if(monkey.x>2000){
          ground.velocityX = 0;
          monkey.velocityY = 0;  
          monkey.velocityX = 0;                                          
          FoodGroup.setVelocityXEach(0);                                                                  
          FoodGroup.setLifetimeEach(-1);
          gameState="end";
          //monkey.visible=false;
          stroke("black");
          textSize(30);
          fill("white");
          text("Game Over",400,200);
        }

  
        //monkey collide with the ground
        monkey.collide(ground);

       drawSprites();
}


function food(){

      if(frameCount%40 === 0){
        //food sprite
         var food1=createSprite(displayWidth,120,70,50)
         //random y position
         food1.y=Math.round(random(displayHeight/4,displayHeight/3+400))
        //added image to monkey
         food1.addImage("food",bananaImage);
        //velocity to move the food
         food1.velocityX=-4;
        //decreased the size of food
         food1.scale=0.11;
        //lifetime for the food to protect it from memory leak
         
        //added food to the food group
         FoodGroup.add(food1);
         }
}

/*function obstacle(){
 if(frameCount% 200 === 0){
    var stone=createSprite(displayWidth,displayHeight-60);
    stone.velocityX=-10;
    stone.addImage("obstacle",obstaceImage);
    food1.scale=0.21;
      obstacleGroup.add(stone);
    } 
  
}*/

