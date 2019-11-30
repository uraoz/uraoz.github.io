navigator.webkitGetUserMedia({audio:true}, function(stream){
audioContext = new AudioContext();
analyser = audioContext.createAnalyser();
microphone = audioContext.createMediaStreamSource(stream);
javascriptNode = audioContext.createScriptProcessor(1024, 1, 1);

analyser.smoothingTimeConstant = 0.0;
analyser.fftSize = 512;

microphone.connect(analyser);
analyser.connect(javascriptNode);
javascriptNode.connect(audioContext.destination);

//canvasContext = $("#canvas")[0].getContext("2d");
canvasContext = document.getElementById("test");
canvasContext= canvasContext.getContext("2d");

javascriptNode.onaudioprocess = function() {
var array =  new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(array);
var values = 0;

var length = array.length;
for (var i = 0; i < length; i++) {
values += array[i];
}

var average = values / length;
canvasContext.clearRect(0, 0, 150, 300);
canvasContext.fillStyle = '#00ff00';
canvasContext.fillRect(0,130-average,25,140);
}

}, function(e){ console.log(e); }
                        );