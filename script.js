// ensure the web page (DOM) has loaded
document.addEventListener("DOMContentLoaded", function () {

   // Create a popcorn instance by calling Popcorn("#id-of-my-video")
   var pop = Popcorn("#hudlVideoPlayer");

   // add a footnote at 2 seconds, and remove it at 6 seconds
   pop.footnote({
     start: 2,
     end: 6,
     text: "Top Play!",
     target: "annotation-text-1",
     effect: "applyclass",
     applyclass: "show"
   });

   // play the video right away
   pop.play();

}, false);

$(document).ready(function() {

  $( ".annotation-text" ).draggable();

});