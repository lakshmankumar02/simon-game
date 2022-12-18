$(".close").click(function () {
  $(".rule_container").fadeOut(800);
});

let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];

let userClickedPattern = [];

let started = false;
let level = 0;

let myScore = level;

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// for execution of button
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  $("#my_score").text(level - 1);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // to make all button flash 
  
  totalLength = gamePattern.length;

  for (let i = 0; i < totalLength; i++) {
    task(i);
  }
  function task(i) {
    setTimeout(function () {
      $("#" + gamePattern[i])
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);

      playSound(randomChosenColor);
    }, 500 * i);
  }
}

// for play audio
function playSound(name) {
  let audio = new Audio(name + ".mp3");
  audio.play();
}

// for shadow effect after pressed
function animatePress(currentColor) {
  let activeButton = $("." + currentColor);
  activeButton.addClass("pressed");

  setTimeout(() => {
    activeButton.removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
