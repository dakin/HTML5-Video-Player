$(function() {
	
	// Create a popcorn instance by calling Popcorn("#id-of-my-video")
    var pop = Popcorn("#hudlVideoPlayer");

    // add a footnote at 2 seconds, and remove it at 6 seconds
    pop.footnote({
      start: 1,
      end: 20,
      text: "Top Play!",
      target: "annotation-text-1"
    });

    // play the video right away
    pop.play();
	
	$('.annotation-text').draggable();

  var counter = 1;
  $('#new-text-annotation').click(function(){
    counter++;
    $('#annotation-text-' + counter).clone().insertAfter('.annotation-text');
  });

});