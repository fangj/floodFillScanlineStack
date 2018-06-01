# floodFillScanlineStack
Scanline Floodfill Algorithm With Stack 
![Alt text](screenshot.png?raw=true "Screenshot")

code modfied from http://lodev.org/cgtutor/floodfill.html#Scanline_Floodfill_Algorithm_With_Stack

* 采用最简洁的scanline flood fill算法  
* 剥离算法部分方法和canvas相关访问方法

```
borderColor :()=>{r,g,b}
fillColor:()=>{r,g,b}
getPixel:(x,y)=>{r,g,b}
setPixel:(x,y,{r,g,b})
isColorSame:({r,g,b},{r,g,b})=>boolean
MAX_X:number
MAX_Y:number
```

```
function floodFillScanlineStack(x,y,borderColor,fillColor,getPixel,setPixel,isColorSame,MAX_X,MAX_Y)
{
	  
	  function couldFill(x,y){
			var color=getPixel(x,y);
			return (!isColorSame(color,borderColor)&&!isColorSame(color,fillColor));
	  }
	  
  if(isColorSame(borderColor,fillColor)) return;


  var x1;
  var spanAbove=false, spanBelow=false;

  var stack=[];
  stack.push({x:x,y:y});

  var point;
  
  while(point=stack.pop())
  {
	  var x=point.x;
	  var y=point.y;
	  
    x1 = x;
    while(x1 >= 0 && couldFill(x1,y)) x1--;
    x1++;
    spanAbove = spanBelow = false;
    while(x1 < MAX_X && couldFill(x1,y))
    {

      setPixel(x1,y,fillColor);

      if(!spanAbove && y > 0 && couldFill(x1,y-1))
      {
    	 stack.push({x:x1,y:y-1});
        spanAbove = true;
      }
      else if(spanAbove && y > 0 && !couldFill(x1,y-1))
      {
        spanAbove = false;
      }
      if(!spanBelow && y < MAX_Y - 1 && couldFill(x1,y+1))
      {
    	  stack.push({x:x1,y:y+1});
        spanBelow = true;
      }
      else if(spanBelow && y < MAX_Y - 1 && !couldFill(x1,y+1))
      {
        spanBelow = false;
      }
      x1++;
    }
  }
  setPixel(x,y,fillColor,true);//刷新显示
}
```
