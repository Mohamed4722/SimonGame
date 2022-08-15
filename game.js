var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$("#Start-restart").on("click",function (){
  if (started === false) {
    $("#Start-restart").fadeOut(1)
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

function playSound(name) {
  var mon_Sound = new Audio("sounds/" + name + ".mp3");
  mon_Sound.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () { $("#" + color).removeClass("pressed");}, 100);
}

function gamOver() {
  level = 0 ;
  gamePattern = [] ;
  started = false ;
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () { $("body").removeClass("game-over");}, 200);
  $("#Start-restart").fadeIn(1)
  $("#Start-restart").text("Restart!");
  $("#level-title").text("Game Over, Press 'Restart!' to retry");
}

function checkAnswer(iterr) {
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
