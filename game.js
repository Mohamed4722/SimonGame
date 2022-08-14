var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).on("keypress",function (){
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").on("click",handleClick);

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function handleClick() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
}

function playSound (name) {
  var mon_Sound = new Audio("sounds/" + name + ".mp3");
  mon_Sound.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () { $("#" + color).removeClass("pressed");}, 100);
}

function gamOver(){
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () { $("body").removeClass("game-over");}, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  var level = 0 ;
  var gamePattern = [] ;
  var started = false ;
}

function checkAnswer (iterr){
  if (gamePattern[iterr] === userClickedPattern[iterr]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
      nextSequence();
      }, 1000);
    }
  } else {
    gamOver();
  }
}
