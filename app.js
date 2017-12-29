// blanked out 
var state = {
	questions: [
		{
			text: "Finish this song “he can pass the ball 40 yards, he big and he F**cking hard its",
			choices: [" Micheal Owen"," Steve Gerrard"," Jamie Carragher"," John Barnes"],
			correctChoiceIndex: 1
		},
		{
			text: "When was Liverpool FC first founded",
			choices: [" 1890"," 1891"," 1892"," 1892"],
			correctChoiceIndex: 2
		},
		{
			text: "Who is Liverpool FC biggest record transfer fee at £48m",
			choices: [" Luis Suarez"," Fernando Torres"," Mohamed Salah"," Naby keita"],
			correctChoiceIndex: 3,
		},
		{
			text: "Who is the all time leading goal scorer in all competitions for Liverpool FC",
			choices: [" Micheal Owen"," Kenny Dalglish"," Roger Hunt"," Ian Rush"],
			correctChoiceIndex: 3,
		},
		{
			text: "How many Champions league Cups have Liverpool won",
			choices: [" Two"," Three"," Four"," Five"],
			correctChoiceIndex: 3,
		}
	],
	praises : [
		"Correct, great answer",
		"That's it! well done",
		"Amazing answer",
		"YES! congratulation"	
		],

	admonishments: [
		"Oh dear that's incorrect",
		"No sorry thats wrong",
		"wrong answer, keep trying",
		],

	score: 0,
	correctQuestionIndex: 0,
	route: 'start',
	lastAnswerCorrect: false,
	feedbackRandom: 0
};

//state functions 
function setRoute(state, route) {
 	state.route = route;
};

function resetGame(state) {
	state.score = 0;
	state.currentQuestionIndex = 0;
	setRoute(state, 'start');
};

function answerQuestion(state, answer) {
	var currentQuestion = state.questions[state.currentQuestionIndex];
	state.lastAnswerCorrect = currentQuestion.correctChoiceIndex === answer; 
	if (state.lastAnswerCorrect) {
		state.score++;
	}
	selectFeedback(state);
	setRoute(state, 'answer-feedback');
};

function selectFeedback(state) {
	state.feedbackRandom = Math.random();
};

function advance(state) {
	state.currentQuestionIndex++;
	if (state.currentQuestionIndex === state.questions.length) {
		setRoute(state, 'final-feedback');
	}
	else {
		setRoute(state, 'question');
	}
};

// Change functions 
function renderApp(state, elements) {

	Object.keys(elements).forEach(function(route) {
		elements[route].hide();
	});
	elements[state.route].show();

	if (state.route === 'start') {
			renderStartPage(state, elements[state.route]);
	}
	else if (state.route === 'question') {
			renderQuestionPage(state, elements[state.route]);
	}
	else if (state.route === 'answer-feedback') {
		renderAnswerFeedbackPage(state, elements[state.route]);
	}
	else if (state.route === 'final-feedback') {
		renderFinalFeedbackPage(state, elements[state.route]);
	}
};





function renderStartPage(state, element) {
};

function renderQuestionPage(state, element) {
	renderQuestionCount(state, element.find('.question-count'));
	renderQuestionText(state, element.find('.question-text'));
	renderChoices(state, element.find('.choices'));
};

function renderAnswerFeedbackPage(state, element) {
	renderAnswerFeedbackHeader(state, element.find('.feedback-header'));
	renderAnswerFeedbackText(state, element.find(".feedback-text"));
	renderNextButtonText(state, element.find(".see-next"));
};

function renderFinalFeedbackPage(state, element) {
	renderFinalFeedbackText(state, element.find('.results-text'));
};

function renderQuestionCount(state, element) {
	var text = (state.currentQuestionIndex + 1) + "/" + state.questions.length;
	element.text(text);
};
function renderQuestionText(state, element) {
	var currentQuestion = state.questions[state.currentQuestionIndex];
	element.text(currentQuestion.text);
};

function renderChoices(state, element) {
	var currentQuestion = state.questions[state.currentQuestionIndex];
	var choices = currentQuestion.choices.map(function(choice, index) {
		return (
			'<li>' +
				'<input type="radio" name="user-answer" value="' + index + '" required>' +
				'<label>' + choice + '</label>' +
			'</li>'
		);
	});
	element.html(choices);
};

function renderAnswerFeedbackHeader(state, element) {
	var html = state.lastAnswerCorrect ?
			"<h5 class='user-was-correct'>correct</h5>" : 
			"<h5 class='user-was-incorrect'>wrong!</h5>";

	element.html(html);
};

function renderAnswerFeedbackText(state, element) {
	var choices = state.lastAnswerCorrect ? state.praises : state.admonishments;
	var text = choices[Math.floor(state.feedbackRandom * choices.length)];
	element.text(text);
};

function renderNextButtonText(state, element) {
		var text = state.currentQuestionIndex < state.questions.length - 1 ?
			"Next" : "How did you do?";
	element.text(text);
};

function renderFinalFeedbackText(state, element) {
	var text = "You got " + state.score + " out of " + 
		state.questions.length + " questions right.";
	element.text(text);
};

// action events 
var PAGE_ELEMENTS = {
	'start': $('.start-page'),
	'question': $('.question-page'),
	'answer-feedback': $('.answer-feedback-page'),
	'final-feedback': $('.final-feedback-page')
};

$("form[name='game-start']").submit(function(event) {
	event.preventDefault();
	setRoute(state, 'question');
	renderApp(state, PAGE_ELEMENTS);
});

$(".restart-game").click(function(event){
	event.preventDefault();
	resetGame(state);
	renderApp(state, PAGE_ELEMENTS);
});

$("form[name='current-question']").submit(function(event) {
	event.preventDefault();
	var answer = $("input[name='user-answer']:checked").val();
	answer = parseInt(answer, 10);
	answerQuestion(state, answer);
	renderApp(state, PAGE_ELEMENTS);
});

$(".see-next").click(function(event) {
	advance(state);
	renderApp(state, PAGE_ELEMENTS);
});

$(function() { renderApp(state, PAGE_ELEMENTS); });




















































