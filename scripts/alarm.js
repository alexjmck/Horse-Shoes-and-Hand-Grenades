$(function () {
	function playAudio(task) {
      if(task == 'play'){
           $(".alarm-audio").trigger('play');
      }
      if(task == 'stop'){
           $(".alarm-audio").trigger('pause');
           $(".alarm-audio").prop("currentTime",0);
      }
 	}

	$("#stop").click(function() {
 		playAudio("stop");
	})
	$("#play").click(function() {
		playAudio("play");
	})
});