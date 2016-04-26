var ctx, color = "#000";  
var num = 1;

document.addEventListener( "DOMContentLoaded", function(){
  // setup a new canvas for drawing wait for device init
    setTimeout(function(){
     newCanvas();
    }, 1000);
}, false );
// function to setup a new canvas for drawing
function newCanvas(){
  //define and resize canvas
  var dim = Math.min(window.innerWidth, window.innerHeight-90);
  document.getElementById("content").style.height = dim;
  var canvas = '<canvas id="canvas" width="'+dim+'" height="'+dim+'" align="middle"></canvas>';
  document.getElementById("content").innerHTML = canvas;
    
    // setup canvas
  ctx=document.getElementById("canvas").getContext("2d");
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;  
  
  // setup to trigger drawing on mouse or touch
    drawTouch();
    drawPointer();
    drawMouse();
}

function saveImage() {
        // save canvas image as data url (png format by default)
      var dataURL = document.getElementById("canvas").toDataURL();

      // set canvasImg image src to dataURL
      // so it can be saved as an image
      var imgName = "img" + num;
      var img = document.getElementById(imgName);
      img.style.textAlign = "right";
      img.style.display = "inline";
      //img.src = "https://www.hallaminternet.com/assets/URL-tagging-image.png";  
      img.src = dataURL;

      document.getElementById(num).appendChild(img); 
      var data = {};
      data.collab = 3;
      data.pos = num;
	try {
          $.ajax({
            type: 'POST',
            url: document.URL + 'save',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(result) {
               var random = result;
              //console.log('Posted Score to database.');
              //console.log(result);
          }
      });
        } catch (e) {

        }

      if(num === 9) {num = 1;}
      else {
        num++;
      }
}

// prototype to start drawing on touch using canvas moveTo and lineTo
var drawTouch = function() {
  var start = function(e) {
    ctx.beginPath();
    x = e.changedTouches[0].pageX;
    y = e.changedTouches[0].pageY-44;
    ctx.moveTo(x,y);
  };
  var move = function(e) {
    e.preventDefault();
    x = e.changedTouches[0].pageX;
    y = e.changedTouches[0].pageY-44;
    ctx.lineTo(x,y);
    ctx.stroke();
  };
    document.getElementById("canvas").addEventListener("touchstart", start, false);
  document.getElementById("canvas").addEventListener("touchmove", move, false);
}; 
    
// prototype to start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
var drawPointer = function() {
  var start = function(e) {
        e = e.originalEvent;
    ctx.beginPath();
    x = e.pageX;
    y = e.pageY-44;
    ctx.moveTo(x,y);
  };
  var move = function(e) {
    e.preventDefault();
        e = e.originalEvent;
    x = e.pageX;
    y = e.pageY-44;
    ctx.lineTo(x,y);
    ctx.stroke();
    };
    document.getElementById("canvas").addEventListener("MSPointerDown", start, false);
  document.getElementById("canvas").addEventListener("MSPointerMove", move, false);
};        
// prototype to start drawing on mouse using canvas moveTo and lineTo
var drawMouse = function() {
  var clicked = 0;
  var start = function(e) {
    clicked = 1;
    ctx.beginPath();
    x = e.pageX;
    y = e.pageY-44;
    ctx.moveTo(x,y);
  };
  var move = function(e) {
    if(clicked){
      x = e.pageX;
      y = e.pageY-44;
      ctx.lineTo(x,y);
      ctx.stroke();
    }
  };
  var stop = function() {
    clicked = 0;
  };
    document.getElementById("canvas").addEventListener("mousedown", start, false);
  document.getElementById("canvas").addEventListener("mousemove", move, false);
  document.addEventListener("mouseup", stop, false);
};