'use strict';

	function playAudio(task) {
      if(task == 'play'){
           $(".alarm-audio").trigger('play');
      }
      if(task == 'stop'){
           $(".alarm-audio").trigger('pause');
           $(".alarm-audio").prop("currentTime",0);
      }
 	}

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

});
