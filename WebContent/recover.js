
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create,update:update });

var bmd;
var upKey;
var downKey;
var leftKey;
var rightKey;
var sprite;
//三层
var back_layer;
var mid_layer;
var front_layer;
var cursors;
var bmdContainer ;

var area;
var areaContainer;
var bmd2 ;

function preload() {
//    game.load.image('secretImage', 'assets/pics/cougar_dragonsun.png');
	game.load.image('secretImage', 'assets/pics/watermelon-duck-outline.png');
}



function create() {
	
	game.stage.backgroundColor="#fff";

	//三层
	 back_layer = game.add.group();
	 mid_layer = game.add.group();
	 front_layer = game.add.group();
	
	//添加底图
    bmd = game.make.bitmapData();
    bmd.load('secretImage');

    //添加
    area = game.add.bitmapData(game.width, game.height);
    area.smoothed = false;
    areaContainer=area.addToWorld();
    mid_layer.add(areaContainer);
    
    
    //copy
    area.copy('secretImage');
    
    //模糊底图
//    blurSecretImage(bmd);
    
    
    //显示底图
   Caman.Event.listen("processComplete", function (job) {
	  	  console.log("End:", job.name);
	  	  bmd.dirty=true;});
   
//   setTimeout(function(){
//	   		var scale=1;
//	  	 var maxLength=Math.max(bmd.width,bmd.height);
//	     scale=600/maxLength;
//	     bmdContainer=bmd.addToWorld(300, 300, 0.5, 0.5,scale,scale);
//	     back_layer.add(bmdContainer);
//   },500);

    //显示圆点
    showDot();

	//注册按键
    cursors = game.input.keyboard.createCursorKeys();
    bmd2 = game.make.bitmapData(64, 64);
    bmd2.circle(32, 32, 32, 'rgba(255,0,255,0.2)');


    game.input.onDown.add(onClick, this);
    

}

function onClick(p){
	console.log("onClick",p.x,p.y);

	//area.setPixel(p.x, p.y, 255,0,0,true);

	//area.draw(bmd2, p.x - 16, p.y - 16);
	area.rect(p.x,p.y,1,1,"#FF0000");
	area.dirty=true;
}

function blurSecretImage(bmd) {
	var c=bmd.canvas;
	 Caman(c, function () {
		   // this.exposure(100);
		    this.saturation(-80);
		 	this.stackBlur(15);
		    this.exposure(-20);
		    this.posterize(5);
		    this.render();
		  });

}

function showDot(){
	 sprite = game.add.graphics(0, 0);
	 sprite.beginFill(0xFF0000, 1);
	 sprite.drawCircle(0, 0, 10);
	 front_layer.add(sprite);
	 game.world.bringToTop(front_layer);
}


function update() {

	  if (cursors.left.isDown)
	    {
	        sprite.x -= 2;
	    }
	    else if (cursors.right.isDown)
	    {
	        sprite.x += 2;
	    }

	    if (cursors.up.isDown)
	    {
	        sprite.y -= 2;
	    }
	    else if (cursors.down.isDown)
	    {
	        sprite.y += 2;
	    }


}