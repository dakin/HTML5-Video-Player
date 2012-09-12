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

    pop.code{
      start: 1,
      end: 10,
      onStart: function(){
        $('#annotation-telestrate').show();
      },
      onEnd: function(){
        $('#annotation-telestrate').hide();
      }
    }

    // play the video right away
    pop.play();
	
  $('#annotation-telestrate').sketch();

	$('.annotation-text').draggable();

  $('#new-text-annotation').click(function(){
    
  });

});