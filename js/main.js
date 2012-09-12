$(function() {
	
	// Create a popcorn instance by calling Popcorn("#id-of-my-video")
    var pop = Popcorn("#hudlVideoPlayer");

    // add a footnote at 2 seconds, and remove it at 6 seconds
    pop.jquery({
      start: 1,
      end: 10,
      onStart: function(){
        $('#annotation-text-1').show();
        $('#annotation-text-1').text('TopPlay!');
      },
      onEnd: function(){
        $('#annotation-text-1').hide();
      }
    });

    pop.jquery({
      start: 5,
      end: 9,
      onStart: function(){
        $('#annotation-telestrate').show();
      },
      onEnd: function(){
        $('#annotation-telestrate').hide();
      }
    })

    pop.jquery({
      start: 7,
      end: 9,
      onStart: function(){
        $('#annotation-image-1').attr('src', 'images/circle.png');
        $('#annotation-image-1').show();
      },
      onEnd: function(){
        $('#annotation-image-1').hide();
      }
    })

    // play the video right away
    pop.play();
	
	$('#annotation-telestrate').sketch();
	
	$('.annotation-text').draggable({
    containment: "#video-wrapper",
    scroll:      false 
  });
  $('.annotation-image').draggable({
    containment: "#video-wrapper",
    scroll:      false 
  });
	
	$('#new-text-annotation').click(function(){
		$("#hudlVideoPlayer").get(0).pause();
    // Create DOM Annotation
		//$('<div id="annotation-text-' . '2' . '" class="annotation-text"></div>').appendTo('#video-wrapper');
		// Create local storage
	});



});