$('#start').on('click',function(){
	$('#start').remove();
	game.loadQuestion();
})

$(document).on('click','.answer-button',function(e){
	game.clicked(e);
})

$(document).on('click','#reset',function(){
	game.reset();
})

var questions = [{
	question: "What is the capital of Canada?",
	answers: ["Toronto", "Quebec", "Vancouver", "Ottawa"],
	correctAnswer: "Ottawa",
	image : "assets/images/ottawa.jpg"
}, {
	question: "What is the capital of California?",
	answers: ["Los Angeles", "San Diego", "Sacramento", "San Francisco"],
	correctAnswer: "Sacramento",
	image : "assets/images/ottawa.jpg"
}, {
	question: "What is the capital of Germany?",
	answers: ["Dortmund", "Munich", "Berlin", "Frankfurt"],
	correctAnswer: "Berlin",
	image : "assets/images/ottawa.jpg"
}, {
	question: "What is the capital of China?",
	answers: ["Beijing", "Shanghai", "Hong Kong", "Taiwan"],
	correctAnswer: "Beijing",
	image : "assets/images/ottawa.jpg"
}, {
	question: "What is the capital of Egypt?",
	answers: ["Alexandria", "Luxor", "Giza", "Cairo"],
	correctAnswer: "Cairo",
	image : "assets/images/ottawa.jpg"
}, {
	question: "What is the capital of Australia?",
	answers: ["Sydney", "Melbourne", "Pert", "Canberra"],
	correctAnswer: "Canberra",
	image : "assets/images/ottawa.jpg"
}, {
		question: "What is the capital of Peru?",
	answers: ["Cuzco", "Machu Picchu", "Arequipa", "Lima"],
	correctAnswer: "Lima",
	image : "assets/images/ottawa.jpg"
}, {
	question: "What is the capital of England?",
	answers: ["Manchester", "London", "Liverpool", "Leeds"],
	correctAnswer: "London",
	image : "assets/images/ottawa.jpg"
}, {
	question: "What is the capital of New Yok?",
	answers: ["Manhattan", "Albany", "New York City", "The Bronx"],
	correctAnswer: "Albany",
	image : "assets/images/ottawa.jpg"
}, {
	question: "What is the capital of Panama?",
	answers: ["Panama City", "Colon", "Tocumen", "Panama Canal"],
	correctAnswer: "Panama City",
	image : "assets/images/ottawa.jpg"
}];
//properties
var game = {
	questions:questions,
	currentQuestion: 0,
	counter: 10,
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	countdown: function(){ //methods
		game.counter--;
		$('#counter').html(game.counter);
		if(game.counter<=0){
			console.log("TIME UP!");
			game.timeup();
		}
	},
	loadQuestion: function(){
		timer = setInterval(game.countdown,1000);
		$('#subwrapper').html("<h2> TIMER REMAINING <span id='counter'>10</span> Seconds</h2>");
		$('#subwrapper').append('<h2>' +questions[game.currentQuestion]. 
			question+'<h2>');
		for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
			$('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.
				currentQuestion].answers[i]+'">'+questions[game.
				currentQuestion].answers[i]+'</button>');
		}
	},
	nextQuestion: function(){
		game.counter = 10;
		$('#counter').html(game.counter);
		game.currentQuestion++;
		game.loadQuestion();
	},
	timeup: function(){
		clearInterval(timer);
		game.unanswered++;
		$('#subwrapper').html('<h2>Out of Time</h2>')
		$('#subwrapper').append('<h3> The Correct Answer Was : '+questions[game.
		currentQuestion].correctAnswer+'</h3>');
		if(game.currentQuestion==questions.length-1){
			setTimeout(game.results,3*1000);
		} else {
			setTimeout(game.nextQuestion,3*1000);
		}
	},
	results: function(){
		clearInterval(timer);
		$('#subwrapper').html("<h2>All Done!</h2>");
		$('#subwrapper').append("<h3>Correct:"+game.correct+"</h3");
		$('#subwrapper').append("<h3>incorrect:"+game.incorrect+"</h3>");
		$('#subwrapper').append("<h3>Unanswered:"+game.unanswered+"</h3>");
		$('#subwrapper').append("<button id='reset'>RESET</button>");
	},
	clicked: function(e){
		clearInterval(timer);
		if($(e.target).data("name")==questions[game.currentQuestion].
			correctAnswer){
			game.answeredCorrectly();
		} else {
			game.answeredIncorrectly();
		}
	},
	answeredCorrectly: function(){
		console.log("You Got It");
		clearInterval(timer);
		game.correct++;
		$('#subwrapper').html('<h2>You got it right!</h2>');
		if(game.currentQuestion==questions.length-1){
			setTimeout(game.results,3*1000);
		} else {
			setTimeout(game.nextQuestion,3*1000);
		}
	},
	answeredIncorrectly: function(){
		console.log("Wrong!!!")
		clearInterval(timer);
		game.incorrect++;
		$('#subwrapper').html('<h2>You got it wrong!</h2>');
		$('#subwrapper').append('<h3> The Correct Answer Was : '+questions[game.
		currentQuestion].correctAnswer+'</h3>');
		if(game.currentQuestion==questions.length-1){
			setTimeout(game.results,3*1000);
		} else {
			setTimeout(game.nextQuestion,3*1000);
		}
	},

	reset: function(){
		game.currentQuestion = 0;
		game.counter = 0;
		game.correct = 0;
		game.incorrect = 0;
		game.unanswered = 0;
		game.loadQuestion();

	}
}
