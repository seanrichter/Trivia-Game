
var panel = $('#quiz-area');
var countStartNumber = 20;


/////////////////////////////////////////

//CLICK EVENTS

/////////////////////////////////////////

$(document).on('click', '#start-over', function (e) {
    game.reset();
});

$(document).on('click', 'answer-button', function (e) {
    game.clicked();
});

$(document).on('click', '#start', function (e) {
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">20</span> Seconds</h2>');
    game.loadQuestion();
});

///////////////////////////////////////


//Question Set


//////////////////////////////////////////

var questions = [{
    question: "In which month is labor day a national holiday?",
    answers: ["January", "March.", "December", "September"],
    correctAnswer: "September",
    image: "assets/images/labor-day.png"
}, {
    question: "Which state lies to the south of Georgia?",
    answers: ["Alabama", "Louisiana", "Florida", "South Carolina"],
    correctAnswer: "Florida",
    image: "assets/images/Flag_of_Florida.svg"
}, {
    question: "Which ocean is off the California coast?",
    answers: ["Pacific", "Gulf of Mexico", "Indian", "Atlantic"],
    correctAnswer: "Pacific",
    image: "assets/images/pacific-ocean.jpg"
}, {
    question: "In which state is Harvard University located?",
    answers: ["Washington", "Massachusetts", "New York", "Vermont"],
    correctAnswer: "Massachusetts",
    image: "assets/images/mass flat"
}, {
    question: "Which city is the home of Jazz music?",
    answers: ["Memphis", "Little Rock", "New Orleans", "Dallas"],
    correctAnswer: "New Orleans",
    image: "assets/images/new orleans jazz music.jpg"
}, {
    question: "Which state is home to the Crater of Diamonds state park?",
    answers: ["Arkansas", "Missourri", "Wyoming", "Nevada"],
    correctAnswer: "Arkansas",
    image: "assets/images/arkansas.png"
}, {
    question: "Which state was the first to legalize marijuana for recreational use?",
    answers: ["California", "New York", "Iowa", "Colorado"],
    correctAnswer: "Colorado",
    image: "assets/images/colorado.jpg"
}, {
    question: "Which state are the Smokey Mountains located?",
    answers: ["Georgia", "Tennessee", "North Carolina", "Kentucky"],
    correctAnswer: "Tennessee",
    image: "assets/images/tennessee flag.jpg"
}];




var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,
    countdown: function () {
        game.counter--;
        $('#counter-number').html(game.counter);

        if (game.counter === 0) {
            console.log('TIMES UP');
            game.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function () {
        game.counter = countStartNumber;
        $('#counter-number').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        $('#counter-number').html(game.counter);

        panel.html('<h2>Out of Time!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
        panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 2 * 1000);
        } else {
            setTimeout(game.nextQuestion, 2 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);

        panel.html('<h2>All Done, Here is how you did!</h2>');
        $('#counter-number').html(game.counter);
        panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
        panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
        panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
        panel.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function (e) {
        clearInterval(timer);

        if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },
    answeredIncorrectly: function () {
        game.incorrect++;
        clearInterval(timer);
        panel.html('<h2>Nope!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        panel.append('<img src"' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 2 * 1000);
        } else {
            setTimeout(game.nextQuestion, 2 * 1000);
        }
    },
    answeredCorrectly: function () {
        clearInterval(timer);
        game.correct++;
        panel.html('<h2>Correct!</h2>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 2 * 1000);
        } else {
            setTimeout(game.nextQuestion, 2 * 1000);
        }
    },
    reset: function () {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion()
    }
};