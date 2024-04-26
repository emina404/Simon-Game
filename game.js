
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() { //if key is pressed
  if (!started) {  // executes once
    $("#level-title").text("Level " + level); //
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() { //This JavaScript function is triggered when an element with the class "btn" is clicked.
 
  var userChosenColour = $(this).attr("id"); // Within the click function, $(this) refers to the specific button that was clicked. .attr("id") retrieves the value of the "id" attribute of the clicked button,
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){ //if the whole user pattern is checked, generate new colour
        setTimeout(function () {
          nextSequence(); // if all items are checked, new item/colour is acitvated
        }, 1000);
      }
    } else { //reset game if the wrong button is pressed
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber]; //select one colour
  gamePattern.push(randomChosenColour); // adding colour to game pattern sequence

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //applying effect on random selected button
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) { //funciton that plays sounds based on selected colour
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() { //function that resets variables to start over
  level = 0;
  gamePattern = [];
  started = false;
}
