var annotationTextId = 0;
var annotationTelestrateId = 0;
var annotationSpotId = 0;

$(function() {
	
  // Create a popcorn instance by calling Popcorn("#id-of-my-video")
  var pop = Popcorn("#hudlVideoPlayer");

  $('#annotation-controls').show();
  
  // Poop out the stuff that's already in your local storage!
  var allAnnos = $.jStorage.index();
  var numAnnos = allAnnos.length;
  if (numAnnos > 0) {
	  jQuery.each(allAnnos, function() {
	  	var annoID = this.toString();
	  	var jqID = '#' + annoID;
	  	var annoObject = $.jStorage.get(annoID);
	  	if (annoObject.type == 'text') {
	  		annotationTextId++;
		  	$('<div id="' + annoObject.id + '" class="annotation-text hide" style="top: ' + annoObject.top + '; left: ' + annoObject.left + ';">' + annoObject.content + '</div>').appendTo('#video-wrapper');
		  	pop.jquery({
		  	  start: annoObject.timeStart,
		  	  end: annoObject.timeEnd,
		  	  onStart: function(){
		  	    $(jqID).removeClass('hide');
		  	  },
          onEnd: function(){
            $(jqID).addClass('hide');
          }
		  	});
		  } else if (annoObject.type == 'spot') {
		  	annotationSpotId++;
		  	$('<img id="' + annoObject.id + '" src="images/circle.png" class="annotation-spot hide" style="top: ' + annoObject.top + '; left: ' + annoObject.left + ';"/>').appendTo('#video-wrapper');
		  	pop.jquery({
		  	  start: annoObject.timeStart,
		  	  end: annoObject.timeEnd,
		  	  onStart: function(){
                $(jqID).removeClass('hide');
                pop.pause();
                setTimeout(function(){
                	pop.play();
                }, 3000);
	          },
	          onEnd: function(){
	            $(jqID).addClass('hide');
	          }
			});
		  } else if (annoObject.type == 'tele') {
		  	annotationTelestrateId++;
		  	$(annoObject.content).appendTo('#video-wrapper').sketch();;
		  	pop.jquery({
		  	  start: annoObject.timeStart,
		  	  end: annoObject.timeEnd,
		  	  onStart: function(){
            $(jqID).removeClass('hide');
          },
          onEnd: function(){
            $(jqID).addClass('hide');
          }
	  	});
		  };
	  });
  }

  // play the video right away
  pop.play();
	

  // Do a pile of shit to get the text annotation on the screen, allow you to edit it, store it's record, etc...
  $('#new-text-annotation').click(function(){
    $('video').get(0).pause();
    annotationTextId++;
    var fullAnnoID = 'annotation-text-' + annotationTextId;
    var truestart = pop.currentTime();
    var start = Math.round(truestart);
    $('<div type="text" id="' + fullAnnoID + '" class="annotation-text" style="left:100px;top:100px;"><input type="text" value="Type here"/></div>').appendTo('#video-wrapper').draggable({ 
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
    			"content": textValue
    		});
    	}
    });
    $('input').blur(function(){
      var textValue = $(this).val();
      $.jStorage.set(fullAnnoID,{
        "id": fullAnnoID,
        "type": 'text',
        "timeStart": start,
        "timeEnd": start+3,
        "top": '100px',
        "left": '100px',
        "content": textValue
      });
      console.log(fullAnnoID);
      setTimeout(function(){
        $('video').get(0).play();
        $('#' + fullAnnoID).css('opacity', '0');
      }, 1000);
    });
  });

  // Do a pile of shit to get the image annotation on the screen and store it's record, etc...
  $('#new-spot-annotation').click(function(){
    $('video').get(0).pause();
    annotationSpotId++;
    var fullAnnoID = 'annotation-spot-' + annotationSpotId;
    var truestart = pop.currentTime();
    var start = Math.round(truestart);
    $('<img type="spot" src="images/circle.png" id="' + fullAnnoID + '" class="annotation-spot" style="left:100px;top:100px;"/>').appendTo('#video-wrapper').draggable({ 
      containment: "#video-wrapper",
      scroll:      false,
      stop: function(event, ui) {
        var currentAnno = $.jStorage.get(ui.helper.context.id);
        console.log(currentAnno);
        $.jStorage.set(ui.helper.context.id,{
          "id": ui.helper.context.id,
          "type": 'spot',
          "timeStart": currentAnno.timeStart,
          "timeEnd": currentAnno.timeEnd,
          "top": ui.position.top+'px',
          "left": ui.position.left+'px'
        });
        $('video').get(0).play();
        setTimeout(function(){
          $('.annotation-spot').css('opacity', '0');
        }, 1000);
      }
    });
    $.jStorage.set(fullAnnoID,{
      "id": fullAnnoID,
      "type": 'spot',
      "timeStart": start,
      "timeEnd": start+0.8,
      "top": '100px',
      "left": '100px'
    });
    console.log(fullAnnoID);
  });

  // Do a pile of shit to get the telestration annotation on the screen and store it's record, etc...
  $('#new-telestration-annotation').click(function(){
    annotationTelestrateId++;
    var fullAnnoID = 'annotation-telestrate-' + annotationTelestrateId;
    var truestart = pop.currentTime();
    var start = Math.round(truestart);
    var newCanvasTele = '<canvas id="' + fullAnnoID + '" class="annotation-telestrate" width="852" height="420" style="left:0px; top:-40px;"></canvas>';
    $(newCanvasTele).appendTo('#video-wrapper').sketch();
    $.jStorage.set(fullAnnoID,{
      "id": fullAnnoID,
      "type": 'tele',
      "timeStart": start,
      "timeEnd": start+3,
      "top": '100px',
      "left": '100px',
      "content": newCanvasTele
    });
    console.log(fullAnnoID);
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

  $('.annotation-spot').draggable({
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
    		"content": ''
    	});
    	console.log(ui.helper.context.id);
    }
  });

});