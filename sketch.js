const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;
//var osso1;
//var none;
var rope_cut, sade, sound1, eating_sound, air
var blower

var button;
var bunny;
var blink,eat,sad;
var osso
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  //osso1 = loadAnimation('osso.png', 'ossoCopy.png');
  //none = loadAnimation('png.png', 'png2.png');
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
  rope_cut = loadSound("eh.mp3");
  sade = loadSound("sad.wav");
  sound1 = loadSound("sound1.mp3");
  eating_sound = loadSound("eating_sound.mp3")
  air = loadSound("air.wav")
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  sound1.play()
  sound1.setVolume(0.9)

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);


  buttonM = createImg('cut_button.png');
  buttonM.position(450,10);
  buttonM.size(50,50);
  buttonM.mouseClicked(muteaudio);

  blower = createImg("blower.png")
  blower.position(10, 250)
  blower.size(150, 100)
  blower.mouseClicked(airblow);

  //osso1.frameDelay = 10;
  //none.frameDelay = 1;
  blink.frameDelay = 7;
  eat.frameDelay = 50;
  sad.frameDelay = 40;
  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  //osso.addAnimation('osso1',osso1);
  //osso.addAnimation('none', none);
  //osso.changeAnimation(none);
  bunny.changeAnimation('blinking');


 

  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);
  rope.show();
  Engine.update(engine);
  ground.show();
  if(fruit!= null){
    image(food, fruit.position.x, fruit.position.y, 60, 60)
  }
  if(collide(fruit, bunny) == true){
    bunny.changeAnimation("eating")
    eating_sound.play()
    osso = createImg('osso.png');
    osso.position(290,645);
    osso.size(100, 50)
    //osso.changeAnimation(osso1)
  }
  if(collide(fruit, ground.body) == true){
    bunny.changeAnimation("crying")
    sade.play()
  }
   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function collide(body, sprite){
  if(body!=null){
    var d = dist(
      body.position.x,
      body.position.y,
      sprite.position.x,
      sprite.position.y,
    )
    if(d<= 80){
      World.remove(engine.world, fruit);
      fruit = null;
      return true
    }
    else{
      return false
    }
  }
}

function muteaudio(){
  if(sound1.isPlaying()){
    sound1.stop()
  }
  else{
    sound1.play()
  }
}

function airblow(){
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0.01, y:0})
  air.play()
}