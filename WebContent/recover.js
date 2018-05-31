
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create,update:update });

var bmd;
var upKey;
var downKey;
var leftKey;
var rightKey;
var sprite;

function preload() {
    game.load.image('secretImage', 'assets/pics/cougar_dragonsun.png');
}



function create() {

	//添加底图
    bmd = game.make.bitmapData();
    bmd.load('secretImage');
    
    //模糊底图
    blurSecretImage(bmd);
    
    
    //显示底图
   Caman.Event.listen("processComplete", function (job) {
	  	  console.log("End:", job.name);
	  	  bmd.dirty=true;});
   
   setTimeout(function(){
	  	 var maxLength=Math.max(bmd.width,bmd.height);
	     var scale=600/maxLength;
  	bmd.addToWorld(300, 300, 0.5, 0.5,scale,scale);
   },500);

    //显示圆点
    showDot();

	//注册按键
	  upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
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
}


function update() {

    if (upKey.isDown)
    {
        sprite.y--;
    }
    else if (downKey.isDown)
    {
        sprite.y++;
    }

    if (leftKey.isDown)
    {
        sprite.x--;
    }
    else if (rightKey.isDown)
    {
        sprite.x++;
    }

}