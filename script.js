// ensure the web page (DOM) has loaded
document.addEventListener("DOMContentLoaded", function () {

  // Create a popcorn instance by calling Popcorn("#id-of-my-video")
  var pop = Popcorn("#hudlVideoPlayer");

  // add a footnote at 2 seconds, and remove it at 6 seconds
  pop.footnote({
   start: 30,
   end: 40,
   text: "Top Play!",
   target: "annotation-text-1",
   effect: "applyclass",
   applyclass: "show"
  });

  // play popcorn
  pop.play();

}, false);

$(document).ready(function() {

  $( "#annotation-text-1" ).draggable();

});