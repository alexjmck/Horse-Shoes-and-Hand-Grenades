
'use strict';


	/*$("#stop").click(function() {
 		playAudio("stop");
	});
	$("#play").click(function() {
		playAudio("play");
	});*/


function generateLetterNum(){
	var letterNum = Math.floor(Math.random() * 10) + 1;
	return letterNum;
}

function mapLetter(number){
	if (number == 1)
		return 'a';
	else if (number == 2)
		return 'b';
	else if (number == 3)
		return 'c';
	else if (number == 4)
		return 'd';
	else if (number == 5)
		return 'e';
	else if (number == 6)
		return 's';
	else if (number == 7)
		return 'u';
	else if (number == 8)
		return 'v';
	else if (number == 9)
		return 'x';
	else if (number == 10)
		return 'y';
}

var doesMatch = function(data, letter){
	//console.log(data["outputs"][0]["data"]["concepts"]);
	var first = data["outputs"][0]["data"]["concepts"][0].name;
	var second = data["outputs"][0]["data"]["concepts"][1].name;

	/*console.log(first);
	console.log(second);*/
	if (first == letter || second == letter){
		return true;
	}
	else {
		return false;
	}

}
/*
$(function () {

	var letterNum = generateLetterNum();
	var letter = mapLetter(letterNum);
	$(".image img").remove();
	$(".image").append("<img src='images/letters/" + letter + "-sign.jpg'>");

	$.getJSON("scripts/sample.json", function(data){
		if (doesMatch(data, letter)){
			playAudio("stop");
		} else {
			letterNum = generateLetterNum();
			letter = mapLetter(letterNum);
			$(".image img").remove();
			$(".image").append("<img src='images/letters/" + letter + "-sign.jpg'>");

		}
	});

});*/


//Core of capture.js below
function playAudio(task) {
    if(task == 'play'){
         $(".alarm-audio").trigger('play');
    }
    if(task == 'stop'){
         $(".alarm-audio").trigger('pause');
         $(".alarm-audio").prop("currentTime",0);
    }
}

var jsonData;

(function () {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 1280; // We will scale the photo width to this
  var height = 720; // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;
  var letterNum;
  var letter;
  var results;

  function startup () {
    //randomizer
    letterNum = generateLetterNum();
    letter = mapLetter(letterNum);
    $(".image img").remove();
    $(".image").append("<img src='images/letters/" + letter + "-sign.jpg' width='300' height='250'>");

//starup actual code

    video = document.getElementById('video');

    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    navigator.getMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function (stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        if (video.mozSrcObject !== undefined) {
          // FF18a
          video.mozSrcObject = stream;
        } else if (video.srcObject !== undefined) {
          video.srcObject = stream;
        } else {
          // FF16a, 17a
          video.src = stream;
        }
        video.crossOrigin = 'anonymous';
        video
          .play()
          .then(results => {
            //console.log(results);
          })
          .catch(error => {
            console.log('err: ', error);
          });
      },
      function (err) {
        console.log('An error occured! ' + err);
      }
    );

    video.addEventListener(
      'canplay',
      function (ev) {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);

          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.

          if (isNaN(height)) {
            height = width / (4 / 3);
          }

          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      },
      false
    );

    startbutton.addEventListener(
      'click',
      function (ev) {
        takepicture();
        ev.preventDefault();
      },
      false
    );

    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto () {
    var context = canvas.getContext('2d');
    context.fillStyle = '#AAA';
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.


  function takepicture () {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;

      context.drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/png');
      var b64 = data.split(',')[1];

				//Uncomment line below, enter stdlib deployment info

//      lib.username.service['@dev']({picture: b64}).then(results => {
        //console.log(results);
        var first = results["outputs"][0]["data"]["concepts"][0].name;
        var second = results["outputs"][0]["data"]["concepts"][1].name;
        //var first = 'E'
        //var second = 'V'

        console.log(first);
        console.log(second);
        if (first.toLowerCase() == letter || second.toLowerCase() == letter){
          playAudio("stop");
        }
        else {

        }

      }).catch(error => {
        console.log(error)
      })
      photo.setAttribute('src', data);
    } else {
      clearphoto();
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})();
