
var panel = $('#quiz-area');
var countStartNumber = 30;


/////////////////////////////////////////

//CLICK EVENTS

/////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
    game.reset();
});

$(document).on('click', 'answer-button', function(e) {
    game.clicked(e);
});

$(document).on('click', '#start', function(e) {
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestions();
});