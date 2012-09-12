$(function() {
	
	// Create a popcorn instance by calling Popcorn("#id-of-my-video")
    var pop = Popcorn("#hudlVideoPlayer");

    // add a footnote at 2 seconds, and remove it at 6 seconds
    pop.footnote({
      start: 2,
      end: 6,
      text: "Top Play!",
      target: "annotation-text-1"
    });

    // play the video right away
    pop.play();
	
	$( "#annotation-text-1" ).draggable();

});