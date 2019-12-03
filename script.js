var xend, yend, barheight, array,context, canvas, ctx, centerx ,centery;
var bars = 100, backcolor = 360 * Math.random(), rotetion = 0, barwidth = 2, radius = 250-Math.random()*50;

function initPage(){
if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0){
  audio = new Audio();
  context = new (window.AudioContext || window.webkitAudioContext)();
  analyser = context.createAnalyser();
  audio.src = "http://stream.gensokyoradio.net:8000/stream/1/";
  source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  array = new Uint8Array(analyser.frequencyBinCount);
  audio.play();
  animationLooper();
}else{
navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.mediaDevices.getUserMedia);
navigator.getUserMedia({audio:true}, function(stream){
  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  microphone = audioContext.createMediaStreamSource(stream);
  javascriptNode = audioContext.createScriptProcessor(1024, 1, 1);
  analyser.smoothingTimeConstant = 0.0;
  analyser.fftSize = 512;
  microphone.connect(analyser);
  analyser.connect(javascriptNode);
  javascriptNode.connect(audioContext.destination);
  
  javascriptNode.onaudioprocess = function() {
    canvas = document.getElementById("renderer");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext("2d");
    centerx = canvas.width / 2;
    centery = canvas.height / 2;
    array =  new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    var values = 0;
    //格納
    var length = array.length;
    for (var i = 0; i < length; i++) {
      values += array[i];
    }
    //背景
    var gradient = ctx.createLinearGradient(0,0,0,canvas.height);
    gradient.addColorStop(0,"hsl(" + (backcolor+rotetion) + ", 100%, 50%)");
    gradient.addColorStop(1,"hsl(" + (backcolor-120+rotetion) + ", 100%, 50%)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //円
    ctx.beginPath();
    ctx.arc(centerx,centery,radius,0,2*Math.PI);
    ctx.stroke();
    //グラフ
    analyser.getByteFrequencyData(array);
    for(var i = 0; i < bars; i++){
        
      rads = Math.PI * 2 / bars;
      
      barheight = array[i]*0.7;
        
      x = centerx + Math.cos(rads * (i + rotetion)) * (radius);
      y = centery + Math.sin(rads * (i + rotetion)) * (radius);
      xend = centerx + Math.cos(rads * (i + rotetion))*(radius + barheight);
      yend = centery + Math.sin(rads * (i + rotetion))*(radius + barheight);
      var lineColor = "hsl(" + (backcolor+120+rotetion) + ", +100%, "+(50+array[i]*0.1)+"%)";
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = barwidth;
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(xend,yend);
      ctx.stroke(); 
    }
    rotetion+=0.02;
  }
}, function(e){ console.log(e); });}
}

function animationLooper(){
  canvas = document.getElementById("renderer");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx = canvas.getContext("2d");
  centerx = canvas.width / 2;
  centery = canvas.height / 2;
  var gradient = ctx.createLinearGradient(0,0,0,canvas.height);
    gradient.addColorStop(0,"hsl(" + (backcolor+rotetion) + ", 100%, 50%)");
    gradient.addColorStop(1,"hsl(" + (backcolor-120+rotetion) + ", 100%, 50%)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.arc(centerx,centery,radius,0,2*Math.PI);
  ctx.stroke();
  analyser.getByteFrequencyData(array);
  for(var i = 0; i < bars; i++){
  rads = Math.PI * 2 / bars;
  bar_height = array[i]*0.7;
  x = centerx + Math.cos(rads * i) * (radius);
  y = centery + Math.sin(rads * i) * (radius);
  xend = centerx + Math.cos(rads * i)*(radius + barheight);
  yend = centery + Math.sin(rads * i)*(radius + barheight);
  var lineColor = "hsl(" + (backcolor+120+rotetion) + ", +100%, "+(50+array[i]*0.1)+"%)";
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = barwidth;
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(xend,yend);
      ctx.stroke(); }
  window.requestAnimationFrame(animationLooper);
}