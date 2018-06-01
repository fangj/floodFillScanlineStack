
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

function preload() {
    game.load.image('secretImage', 'assets/pics/cougar_dragonsun.png');
}



function create() {

	//三层
	 back_layer = game.add.group();
	 mid_layer = game.add.group();
	 front_layer = game.add.group();
	
	//添加底图
    bmd = game.make.bitmapData();
    bmd.load('secretImage');
    //back_layer.add(bmd);
    
    //模糊底图
    blurSecretImage(bmd);
    
    
    //显示底图
   Caman.Event.listen("processComplete", function (job) {
	  	  console.log("End:", job.name);
	  	  bmd.dirty=true;});
   
   setTimeout(function(){
	  	 var maxLength=Math.max(bmd.width,bmd.height);
	     var scale=600/maxLength;
	     bmdContainer=bmd.addToWorld(300, 300, 0.5, 0.5,scale,scale);
	     back_layer.add(bmdContainer);
   },500);

    //显示圆点
    showDot();

	//注册按键
    cursors = game.input.keyboard.createCursorKeys();
    

    game.input.onDown.add(onClick, this);
}

function onClick(point){
	console.log("onClick",point.x,point.y);
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