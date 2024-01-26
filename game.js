var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// $(".btn").on("click", function(){
//     var userChosenColour = $(this).attr("id");
//     userClickedPattern.push(userChosenColour);
//     // console.log(userClickedPattern);

//     playSound(userChosenColour);

//     animatePress(userChosenColour);
// });

// --------- OR ---------

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
    if(!started){

        $("#level-title").text("Level " + level);
        nextSequence();

        started = true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        console.log("Sucess");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);

        }

    }else{
        console.log("Wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio(name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}