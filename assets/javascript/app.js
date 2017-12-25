var correct = 0;
var unanswered = 0
var incorrect = 0;
var numQuestions = 6;
var answersArr = ['c', 'b', 'b', 'd', 'b', 'a'];
var responsesArr = [];
var time = 60;
var timeoutID;

function startGame() {
	//User started game, we are displaying timer and questions.  Start button no longer needed.
    $("#gameQuestions").css("visibility", "visible");
    $("#timer").css("visibility", "visible");
    $("#startGame").css("display", "none");
    //at this point we also start the timers: (interval) to count down seconds on display and (timeOut) to end game -> calculate results
    timer();
    timeOut();
}
function timer() {
	//Take in condition that time must be positive # to run, when its not, clearInterval
	var intervalID = setInterval(function() {
		if (time > 1) {
			time--;
		} else {
			clearInterval(intervalID);
		}
	//Updates time each second to display to user
	$("#updateTimer").text(time)},1000);
}
function timeOut() {
	//When the user is out of time, the scores will be calculated
	timeoutID = setTimeout(function () {
	getScores();
	}, 60000);
}
//TimeOut is cleared, answers are saved and checked against correct responses
function getScores() {
	clearTimeout(timeoutID);
	for (var i = 1; i < numQuestions + 1; i++) {
		responsesArr.push(document.forms['game'][(eval(new String('q' + i)))].value);
	}
	checkGame();
}
//Goes through each answer and sees if its correct, incorrect, or unanswered -> Then calls to show Results to user
function checkGame() {
	for (var i = 0; i < numQuestions; i++) {
		if (responsesArr[i] === "") {
			unanswered++;
		} else if (responsesArr[i] === answersArr[i]) {
			correct++;
		} else {
			incorrect++;
		}
	}
	showResults();
}
//Results are displayed to the user
function showResults() {
	$("#gameQuestions").css("display", "none");
	$("#results").css("visibility", "visible");
	$("#timer").css("display", "none");
	$("#correctScore").text(correct);
	$("#unansweredScore").text(unanswered);
	$("#incorrectScore").text(incorrect);
}