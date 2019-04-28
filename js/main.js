// $.getJSON("python/test.json", function(json) {
//     console.log(json); // this will show the info it in firebug console
// });

// var testJSON = JSON.parse(answerData);
// console.log(testJSON);

$(document).ready(function(){
	$.get('./python/correctAnswerByScore.json').done(function(ca) {
		console.log(ca[0])
	})





	// var correct = [];
	// var incorrect = [];
	// length.
	// var partialQ1 = [];
	// if (Question_id==1 and (0<Student_score_on_question<1) {partialQ1.append(Answer_text)} else {};

	// //

	// var partial = [partialQ1,partialQ2,partialQ3,partialQ4];


	// var optionSet = [];
	// var countQ1 = 0;
	// // Give a harder set
	// // Judge if partialQ1 > 0;
	// if (length.partialQ1()) {} else {}
	// // 

	// jquery-csv
		// $.ajax({
		//   type: "GET",  
		//   url: "Answers_data_prj3.csv",
		//   dataType: "text",       
		//   success: function(response)  
		//   {
		// 	data = $.csv.toObjects(response);
		// 	console.log(data);
		// 	generateHtmlTable(data);
		//   }   
		// });

	// Fake examples pretending the JSON file that I will get
	var question1 = {
	    problemStatement:'Microwaves are electric waves that could NOT penetrate?',
	    optionA:'A. Food',
	    optionB:'B. Ceramics',
	    optionC:'C. Glass',
	    optionD:'D. Metal',
	    correctAnswers:['D. Metal','C. Glass']
	  }

	var question2 = {
	    problemStatement:'How does the microwave heat the food?',
	    optionA:'A. Activating the water molecules in the food',
	    optionB:'B. Heat the air inside the microwave oven.',
	    optionC:'C. Heat the container of the food and then conduct the heat to the food',
	    optionD:'D. Activating all the molecules in the food',
	    correctAnswers:['A. Activating the water molecules in the food']
	  }


	var question3 = {
	    problemStatement:'In what order does the microwave heat the food?',
	    optionA:'A. Heat the inside first then the outside',
	    optionB:'B. Heat the outside first then the inside',
	    optionC:'C. Heat all parts at the same time',
	    optionD:'D. Heat in a random order',
	    correctAnswers:['C. Heat all parts at the same time']
	  }
	var questions = [question1,question2,question3]


	let countQ = 0;
	// read current correctOptions from the correctResponses[countQ] array ***
	let correctOptions = questions[countQ].correctAnswers;
	console.log(correctOptions);
	let optionChose = [];
	let questionCorrect = [];
	let answeredCorrect = [];

	function initializeQuestion(){
		console.log("initialized the question")
		let correctOptions = questions[countQ].correctAnswers;
		console.log(correctOptions);
		let optionChose = [];
		let questionCorrect = [];
		let answeredCorrect = [];
		$('.option').removeClass('checked')
	}

	function changeQuestion(){
		$('.questionPrompt').text(questions[countQ].problemStatement)
		$('#optionA').text(questions[countQ].optionA)
		$('#optionB').text(questions[countQ].optionB)
		$('#optionC').text(questions[countQ].optionC)
		$('#optionD').text(questions[countQ].optionD)
	}

	// Define current Choice
	$('.option').click(function (){
		console.log("clicked text is " + $(this).text());
		// if the clicked option is previously checked, remove it
		if (optionChose.includes($(this).text())) {
			$(this).removeClass('checked');
			// remove the chose option from the optionChose array
			let index = optionChose.indexOf($(this).text());
			if (index > -1) {
			  optionChose.splice(index, 1);
			}
		} 
		// if the clicked option is not previously checked, check it
		else {
			optionChose.push($(this).text());
			$(this).addClass('checked')
		}
		console.log(optionChose);
	})


	// Check if the chosen options are correct
	function checkCorrect(){
		// default setting is true
		questionCorrect[countQ] = true;
		// check if the option chosen are correct
		$.each(optionChose, function( i, v ) {
			if (correctOptions.includes(v)) {
				answeredCorrect[i] = true;
			} 
			else {
				answeredCorrect[i] = false;
				questionCorrect[countQ] = false;
			}
		})

		// check if all correct options are chosen
		$.each(correctOptions, function( i, v ) {
			if (!optionChose.includes(v)) {
				questionCorrect[countQ] = false;
			} 
		})	
	}

	function giveFeedback(){
		// if the student got it correct
		if (questionCorrect[countQ]) {
			$('.feedback-text').text('Correct! Your hardwork of studying has paid off, now let’s go on to the next question!')
		} 
		else {
			$('.feedback-text').text("Not correct. Let's try again")
		}
	}

	function continueScene(el) {
	  var next = $(el).data('next');
	  console.log(next);
	  $(el).parent('.scene').fadeOut();
	  $(next).fadeIn();
	}

	$('.btn_submit').click(function (){
		checkCorrect();
		console.log("question correct: " + questionCorrect[countQ])
		continueScene(this)
		console.log('go to feedback')
		giveFeedback()
		countQ += 1;
	})

	$('.btn_next_question').click(function (){
		initializeQuestion()
		// ATTENTION! now it will change question no matter correct or incorrect! NEED TO BE CHANGE!!!!
		changeQuestion()
		continueScene(this)
		console.log('back to question')
	})



})