$(function() {
	
	// Create a popcorn instance by calling Popcorn("#id-of-my-video")
  var pop = Popcorn("#hudlVideoPlayer");
  var annotationTextId = 0;
  var annotationTelestrateId = 0;
  var annotationSpotId = 0;

  // add a footnote at 2 seconds, and remove it at 6 seconds
  pop.jquery({
    start: 1,
    end: 5,
    onStart: function(){
      $('#annotation-text-1').show();
      $('#annotation-text-1').text('TopPlay!');
    },
    onEnd: function(){
      $('#annotation-text-1').hide();
    }
  });

  pop.jquery({
    start: 7,
    end: 10,
    onStart: function(){
      $('#annotation-text-2').show();
      $('#annotation-text-2').text('TopPlay!');
    },
    onEnd: function(){
      $('#annotation-text-1').hide();
    }
  });

  pop.jquery({
    start: 1,
    end: 30,
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
	

  // Append the annotation element to the video-wrapper div
  $('#new-text-annotation').click(function(){
    annotationTextId++;
    $('<div id="annotation-text-' + annotationTextId + '" class="annotation-text hide"></div>').appendTo('#video-wrapper');
  });

  $('#new-telestration-annotation').click(function(){
    annotationTelestrateId++;
    $('<canvas id="annotation-telestrate' + annotationTelestrateId + '" width="852" height="430" class="hide"></canvas>').appendTo('#video-wrapper');
  });

  $('#new-spot-annotation').click(function(){
    annotationSpotId++;
    $('<img src="" id="annotation-image-' + annotationSpotId + '" class="annotation-image hide" />').appendTo('#video-wrapper');
  });

  // Initialize some shiz
	$('#annotation-telestrate').sketch();
	
	$('.annotation-text').draggable({
    containment: "#video-wrapper",
    scroll:      false 
  });
  $('.annotation-image').draggable({
    containment: "#video-wrapper",
    scroll:      false 
  });

});