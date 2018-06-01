
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

//test
var tooltip;
var sprite;

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
    area.update(0,0,area.width,area.height);
    
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

    //鼠标
    game.input.onDown.add(onClick, this);
    
    
    //test
	tooltip = game.make.bitmapData(64, 64);
	sprite = game.add.sprite(0, 0, tooltip);

	game.input.addMoveCallback(updateTooltip, this);


}

function updateTooltip (pointer, x, y) {

	if (x >= 0 && x <= area.width && y >= 0 && y <= area.height)
	{
		var color = area.getPixelRGB(x, y);

		tooltip.fill(0, 0, 0);
		tooltip.rect(1, 1, 62, 62, color.rgba);
	
		sprite.x = x;
		sprite.y = y;
	}

}

function onClick(p){
	console.log("onClick",p.x,p.y);

    area.setPixel(Math.floor(p.x),Math.floor(p.y),0,255,0);
//	area.rect(p.x,p.y,1,1,"#FF0000");
//	area.dirty=true;

	floodfill(area,p.x,p.y,{r:0,g:0,b:0},{r:0,g:0,b:255});
}

function floodfill(bmd,x,y,borderColor,fillColor){
	//var colorString=Phaser.Color.RGBtoString(fillColor.r,fillColor.g,fillColor.b);
	//bmd.rect(x,y,10,10,colorString);
	

	
	//return color {r,g,b}
	function _getPixel(x,y){
		return bmd.getPixel(x,y);
	}

	function _setPixel(x,y,color){
		var colorString=Phaser.Color.RGBtoString(color.r,color.g,color.b);
		//bmd.rect(x,y,1,1,colorString);
		area.setPixel(Math.floor(x),Math.floor(y),color.r,color.g,color.b);
	}

	//return boolean
	function _isColorSame(colorA,colorB){
		return colorA.r===colorB.r && colorA.g===colorB.g && colorA.b===colorB.b;
	}
	
	_floodfill(x,y,borderColor,fillColor,_getPixel,_setPixel,_isColorSame,bmd.width-1,bmd.height-1);
	bmd.dirty=true;

}

function _floodfill(x,y,borderColor,fillColor,getPixel,setPixel,isColorSame,MAX_X,MAX_Y){
	var deadCounter=100;
	function couldFill(x,y){
		var color=getPixel(x,y);
//		debugger
		//console.log(x,y,color)
		return (!isColorSame(color,borderColor)&&!isColorSame(color,fillColor));
	}
	function __floodfill(x,y){
		deadCounter--;
		if(deadCounter<0){
			return;
		}
		setPixel(x,y,fillColor);
		if(x>0&&couldFill(x-1,y))__floodfill(x-1,y);
		if(y>0&&couldFill(x,y-1))__floodfill(x,y-1);
		if(x<MAX_X&&couldFill(x+1,y))__floodfill(x+1,y);
		if(y<MAX_Y&&couldFill(x,y+1))__floodfill(x,y+1);
	}
	__floodfill(x,y);
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