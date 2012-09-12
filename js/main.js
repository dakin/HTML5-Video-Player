$(function() {
	
  // Create a popcorn instance by calling Popcorn("#id-of-my-video")
  var pop = Popcorn("#hudlVideoPlayer");
  var annotationTextId = 0;
  var annotationTelestrateId = 0;
  var annotationSpotId = 0;
  
  var textAnnoLength = 8000;
  
  
  // Poop out the stuff that's already in your local storage!
  var allAnnos = $.jStorage.index();
  var numAnnos = allAnnos.length;
  if (numAnnos > 0) {
	  jQuery.each(allAnnos, function() {
	  	var annoID = this.toString();
	  	var jqID = '#' + annoID;
	  	var annoObject = $.jStorage.get(annoID);
	  	if (annoObject.type == 'text') {
		  	$('<div id="' + annoObject.id + '" class="annotation-text hide" style="top: ' + annoObject.top + '; left: ' + annoObject.left + ';">' + annoObject.content + '</div>').appendTo('#video-wrapper');
		  	pop.jquery({
		  	  start: annoObject.timeStart,
		  	  end: annoObject.timeEnd,
		  	  onStart: function(){
		  	    pop.pause();
		  	    $(jqID).removeClass('hide');
		  	    setTimeout(function() {
		  	        $(jqID).addClass('hide');
		  	        //pop.play();
		  	    }, textAnnoLength);
		  	  }
		  	});
		  } /*else if (annoObject.type == 'spot') {
		  	$('<div id="' + annoObject.id + '" class="annotation-text hide" style="top: ' + annoObject.left + '; left: ' + annoObject.left + ';">' + annoObject.content + '</div>').appendTo('#video-wrapper');
		  	pop.jquery({
		  	  start: annoObject.timeStart,
		  	  end: annoObject.timeEnd,
		  	  onStart: function(){
		  	    pop.pause();
		  	    $(jqID).removeClass('hide');
		  	    setTimeout(function() {
		  	        $(jqID).addClass('hide');
		  	        //pop.play();
		  	    }, textAnnoLength);
		  	  }
		  	});
		  } else if (annoObject.type == 'tele') {
		  	$('<div id="' + annoObject.id + '" class="annotation-text hide" style="top: ' + annoObject.left + '; left: ' + annoObject.left + ';">' + annoObject.content + '</div>').appendTo('#video-wrapper');
		  	pop.jquery({
		  	  start: annoObject.timeStart,
		  	  end: annoObject.timeEnd,
		  	  onStart: function(){
		  	    pop.pause();
		  	    $(jqID).removeClass('hide');
		  	    setTimeout(function() {
		  	        $(jqID).addClass('hide');
		  	        //pop.play();
		  	    }, textAnnoLength);
		  	  }
		  	});
		  };*/
	  });
  }
	
  // add a footnote at 2 seconds, and remove it at 6 seconds
  pop.jquery({
    start: 2,
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
    var fullAnnoID = 'annotation-text-' + annotationTextId;
    var start = pop.currentTime();
    $('<div id="' + fullAnnoID + '" class="annotation-text" style="left:100px;top:100px;">Top Play!</div>').appendTo('#video-wrapper').draggable({
    	containment: "#video-wrapper",
    	scroll:      false,
    	stop: function(event, ui) {
    		var currentAnno = $.jStorage.get(ui.helper.context.id);
    		console.log(currentAnno);
    		$.jStorage.set(ui.helper.context.id,{
    			"id": ui.helper.context.id,
    			"type": currentAnno.type,
    			"timeStart": currentAnno.timeStart,
    			"timeEnd": currentAnno.timeEnd,
    			"top": ui.position.top+'px',
    			"left": ui.position.left+'px',
    			"content": ui.helper.context.innerHTML
    		});
    	}
    });
    $.jStorage.set(fullAnnoID,{
    	"id": fullAnnoID,
    	"type": 'text',
    	"timeStart": start,
    	"timeEnd": start+1,
    	"top": '100px',
    	"left": '100px',
    	"content": 'Top Play!'
    });
    console.log(fullAnnoID);
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
  //$('#annotation-telestrate').sketch();
	
  $('.annotation-text').draggable({
    containment: "#video-wrapper",
    scroll:      false,
    stop: function(event, ui) {
    	var currentAnno = $.jStorage.get(ui.helper.context.id);
    	console.log(currentAnno);
    	$.jStorage.set(ui.helper.context.id,{
    		"id": ui.helper.context.id,
    		"type": currentAnno.type,
    		"timeStart": currentAnno.timeStart,
    		"timeEnd": currentAnno.timeEnd,
    		"top": ui.position.top+'px',
    		"left": ui.position.left+'px',
    		"content": ui.helper.context.innerHTML
    	});
    }
  });

  $('.annotation-image').draggable({
    containment: "#video-wrapper",
    scroll:      false,
    stop: function(event, ui) {
    	$.jStorage.set(ui.helper.context.id,{
    		"id": ui.helper.context.id,
    		"type": 'spot',
    		"timeStart": '15',
    		"timeEnd": '16',
    		"top": ui.position.top,
    		"left": ui.position.left,
    		"content": ui.helper.context.innerHTML
    	});
    	console.log(ui.helper.context.id);
    }
  });

  $('.annotation-telestrate').draggable({
    containment: "#video-wrapper",
    scroll:      false,
    stop: function(event, ui) {
    	$.jStorage.set(ui.helper.context.id,{
    		"id": ui.helper.context.id,
    		"type": 'tele',
    		"timeStart": '10',
    		"timeEnd": '11',
    		"top": ui.position.top,
    		"left": ui.position.left,
    		"content": ui.helper.context.innerHTML
    	});
    	console.log(ui.helper.context.id);
    }
  });  

});