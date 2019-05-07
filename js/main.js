// $.getJSON("python/test.json", function(json) {
//     console.log(json); // this will show the info it in firebug console
// });


$.get('./python/questionData.json').done(function(data) {
	qd = data
})
$.get('./python/answerData.json').done(function(data) {
	ad = data
})
$.get('./python/correctAnswerByScore.json').done(function(data) {
	ca = data
})
$.get('./python/incorrectAnswerByLen.json').done(function(data) {
	ia = data
})

$(document).ready(function(){
	let countQ = 0;
	// read current correctOptions from the correctResponses[countQ] array ***
	let correctOptions = qd[countQ]["Correct_answer_choice"];
	console.log(correctOptions);
	let optionChose = [];
	let questionCorrect = [];
	let answeredCorrect = [];
	let choseOptionNotCorrectLetters = [];
	let correctOptionNotChoseLetters = [];
	let qPrompts = qd[countQ]["Question_text"]
	let oa = qd[countQ]["Choice_A_text"]
	let ob = qd[countQ]["Choice_B_text"]
	let oc = qd[countQ]["Choice_C_text"]
	let od = qd[countQ]["Choice_D_text"]
	let thisIncorOpt = [];
	let thisCorOpt = [];
	let hasAdded = false
	initializeQuestion()
	changeQuestion()

	function initializeQuestion(){
		console.log("initialized the question")
		optionChose = [];
		thisIncorOpt = []
		thisCorOpt = []
		answeredCorrect = [];
		correctOptionNotChoseLetters = []
		choseOptionNotCorrectLetters = []
		$('.option').removeClass('checked correct-choice incorrect-choice')
		$('#scene-feedback').hide()
	}

	function changeQuestion(){
		console.log("changeQuestion!!",countQ,qd[countQ])
		correctOptions = qd[countQ]["Correct_answer_choice"];
		qPrompts = qd[countQ]["Question_text"]
		oa = qd[countQ]["Choice_A_text"]
		ob = qd[countQ]["Choice_B_text"]
		oc = qd[countQ]["Choice_C_text"]
		od = qd[countQ]["Choice_D_text"]
		$('.questionPrompt').text(qPrompts)
		$('#optionA').text(oa)
		$('#optionB').text(ob)
		$('#optionC').text(oc)
		$('#optionD').text(od)
		hasAdded = false
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
			$('.correctness').text('Correct! Your hardwork of studying has paid off, now let’s go on to the next question! Keep up with the good rhythm!')
		}
		else {
			$('.correctness').text("Not correct. Let's try again! Do you know that your brain will become stronger when you practivce it? Keep up with the good rhythm!")
			correctiveFeedbacks()
		}
	}

	function correctiveFeedbacks(){
		findOptionLetter()
		let correct = correctOptionNotChoseLetters.join(", ")
		let incorrect = choseOptionNotCorrectLetters.join(", ")
		if (correct) {
			if (correctOptionNotChoseLetters.length == 1) {
				$('.correctness').append("<p class = 'feedback corrective-correct'>You didn't choose the correct option " + correct + "</p>")
			} else {
				$('.correctness').append("<p class = 'feedback corrective-correct'>You didn't choose the correct options " + correct + "</p>")
			}
			// $('.correctness').append("<p class = 'feedback corrective-correct'>You didn't choose the correct option(s) " + correct + "</p>")
		}
		if (incorrect) {
			if (choseOptionNotCorrectLetters.length == 1) {
				$('.correctness').append("<p class = 'feedback corrective-wrong'>the option " + incorrect + " you chose is wrong</p>")
			} else {
				$('.correctness').append("<p class = 'feedback corrective-wrong'>the options " + incorrect + " you chose are wrong</p>")
			}
			// $('.correctness').append("<p class = 'feedback corrective-wrong'>the option(s) " + incorrect + " you chose is/are wrong</p>")
		}
	}

	function changeOptionColors() {
		$('.option').each(function(){
			if (correctOptions.includes($(this).text())) {
				$(this).addClass("correct-choice")
				// console.log($(this).text()+'is the correct choice')
			}
			else{
				$(this).addClass("incorrect-choice")
			}
		})
	}

	function findOptionLetter() {
		$('.option').each(function(){
			let optionToPush
			// if this is a corect option and the learner didn't choose
			if ((correctOptions.includes($(this).text())) && (!optionChose.includes($(this).text()))) {
				optionToPush = $(this).siblings('.option-letter').text()
				correctOptionNotChoseLetters.push(optionToPush)
				// console.log($(this).text()+'is the correct choice')
			}
			// if chosen answer is incorrect
			else if (!correctOptions.includes($(this).text()) && (optionChose.includes($(this).text()))) {
				optionToPush = $(this).siblings('.option-letter').text()
				choseOptionNotCorrectLetters.push(optionToPush)
				// console.log("should have added to choseOptionNotCorrectLetters")
			}
			else{
				console.log("Wrong. not find anything")
			}
		})
	}

	function shuffle(array) {
	  let currentIndex = array.length, temporaryValue, randomIndex;
	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {
	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}
	//@@kx function
	function changeOptions() {
    // if current question == answerpool's first element-> question number
    let numTotalQues = ca.length
		console.log("enter function change option", numTotalQues)
    for (i = 0; i < numTotalQues; i++) {
			console.log("i "+ i)
      console.log("NOWWW what is i", i, 'CA[i][0]= ', ca[i][0], "countQ= ", countQ, " length of ca[i] "+ca[i].length )
			console.log("NOWWW what is i", i, 'IA[i][0]= ', ia[i][0], "countQ= ", countQ,"length of ia[i] " + ia[i].length)

      if (countQ == ia[i][0] - 1) {
				console.log("ca[i].length<3", ca[i].length<3,"ia[i].length<2", ia[i].length<2 )
          // if incorrect answer >= 3, randomly select 0,1,2,3 of incorrect answer
        if (ia[i].length >= 4) {
          console.log("It is over 3!")
					// random 0,1,2,3
          numIncorOpt = Math.floor(Math.random() * 4)
          console.log("random chose incorrect tobe number ", numIncorOpt)
          numCorOpt = 4 - numIncorOpt
          // need to pick out (numIncorOpt) of incorrect answers from the pool, put them in the pool of thisIncor and thisCor
          var j;
          for (j = 1; j <= numIncorOpt; j++) {
              thisIncorOpt.push(ia[i][j])
              console.log("I pushed" + ia[i][j] + "to the this incorrect option")
              console.log("this is the incorrect option for this question" + thisIncorOpt)
          }
          var k;
          for (k = 1; k <= numCorOpt; k++) {
              thisCorOpt.push(ca[i][k])
							console.log("@@@@@@@this is the correct option for this question" + thisCorOpt)
              console.log("I pushed" + ca[i][k] + "to the this correct option")
              //console.log("xxx",Array.isArray(thisCorOpt))
              //console.log("this is the first correct option for this question"+thisCorOpt[0])
              //console.log("this is the second correct option for this question"+thisCorOpt[1])
          }
          //need to delete the used options
					console.log("before splice"+ia)
          ia[i].splice(1, numIncorOpt)
					console.log("after splice"+ia)
          ca[i].splice(1, numCorOpt)
          //add the incorrect and correct options in this question to an array named thisOptions
          var thisOptions = []
					console.log("thisIncooooo", thisIncorOpt)
          thisOptions = thisIncorOpt.concat(thisCorOpt)
					console.log("length of thisOptions",thisOptions.length)
          console.log("unshuffled" + thisOptions)
          //shuffle the array named thisOptions
          thisOptions = shuffle(thisOptions)
          console.log("shuffled" + thisOptions)
					console.log("thisOptions[0]= ",thisOptions[0])
          // map that to the html element
          $("#optionA").text(thisOptions[0])
          $("#optionB").text(thisOptions[1])
          $("#optionC").text(thisOptions[2])
          $("#optionD").text(thisOptions[3])
          // now which is correct?
          correctOptions = thisCorOpt
          //console.log("IN CHANGE OPTION function", correctOptions)
        }
        //There are not enough incorrect answers in the pool!
        else {
        	if(!hasAdded){
        		console.log("hasAdded=",hasAdded," go to push")
						pushOriginal()
					}
					if ((ca[i].length<3) || (ia[i].length<2)) {
        		countQ+=1;changeQuestion();console.log("GOING TO return!");return
						console.log("you got the question wrong, gonna change options now:>=4?????:",ia[i].length)
        	}


        	thisIncorOpt = []
					thisCorOpt = []
					numIncorOpt = Math.floor(Math.random() * 2)
          console.log("random chose incorrect to be number ", numIncorOpt)
          numCorOpt = 4 - numIncorOpt
          // need to pick out (numIncorOpt) of incorrect answers from the pool, put them in the pool of thisIncor and thisCor
          var j;
					//~
          // if they are not correct answers, add them to the original incorrect answer list
          for (j = 1; j <= numIncorOpt; j++) {
						thisIncorOpt.push(ia[i][j])
					}
					var k;
					for (k = 1; k <= numCorOpt; k++) {
						thisCorOpt.push(ca[i][k])
						console.log("I pushed" + ca[i][k] + "to the this correct option")
						//console.log("xxx",Array.isArray(thisCorOpt))
						//console.log("this is the first correct option for this question"+thisCorOpt[0])
						//console.log("this is the second correct option for this question"+thisCorOpt[1])
					}
					//need to delete the used options
					ia[i].splice(1, numIncorOpt)
					ca[i].splice(1, numCorOpt)
					//add the incorrect and correct options in this question to an array named thisOptions
					var thisOptions = []
					console.log("thisIncooooo_else", thisIncorOpt)
					thisOptions = thisIncorOpt.concat(thisCorOpt)
					console.log("unshuffled" + thisOptions)
					//shuffle the array named thisOptions
					thisOptions = shuffle(thisOptions)
					console.log("shuffled" + thisOptions,"length=",thisOptions.length)
					// map that to the html element
					$("#optionA").text(thisOptions[0])
					$("#optionB").text(thisOptions[1])
					$("#optionC").text(thisOptions[2])
					$("#optionD").text(thisOptions[3])
					correctOptions = thisCorOpt
      	}
  		}
    }
  }

	function pushOriginal(){
		correctOptions = qd[countQ]["Correct_answer_choice"]
		console.log("There are not enough incorrect answers in the pool, so we will use the original ones.")

		var oriIncorrectAnswers = [];
		console.log("correct_answer_choice_original", correctOptions)
		if (!correctOptions.includes(oa)) {
			oriIncorrectAnswers.push(oa)
		}
		if (!correctOptions.includes(ob)) {
			oriIncorrectAnswers.push(ob)
		}
		if (!correctOptions.includes(oc)) {
			oriIncorrectAnswers.push(oc)
		}
		if (!correctOptions.includes(od)) {
			oriIncorrectAnswers.push(od)
		}
		// push each of them to the ia list for this question
		$.each(oriIncorrectAnswers, function (z, v) {
			ia[i].push(v)
			//thisIncorOpt.push(ia[i])
			console.log("I pushed" + ia[i] + "to the this incorrect option")
			console.log("this is the incorrect option for this question" + thisIncorOpt)
		})
		hasAdded = true;
	}

	function continueScene(el) {
	  var next = $(el).data('next');
	  console.log(next);
	  // $(el).parent('.scene').fadeOut();
	  $(next).fadeIn();
	}

	$('.btn_submit').click(function (){
		checkCorrect();
		console.log("question correct: " + questionCorrect[countQ])
		continueScene(this)
		console.log('go to feedback')
		changeOptionColors()
		giveFeedback()
		console.log("question correct: " + typeof questionCorrect+" "+questionCorrect)
	})

	$('.btn_next_question').click(function (){
		initializeQuestion()
		// ATTENTION! now it will change question no matter correct or incorrect! NEED TO BE CHANGE!!!!
		console.log("countQ= ",countQ)
		console.log("questionCorrect[countQ]= ",questionCorrect[countQ])
		console.log("questionCorrect= ",questionCorrect)
		//@@kx
		if (questionCorrect[countQ]==false){
			//console.log('kkkkkkk'+questionCorrect[countQ-1]);
			changeOptions()
		}
		//@@kx
		else {
			countQ+=1
			console.log("AAAAAAAAAAAAAAAAAA you are right, now come to question", countQ)
			//if (countQ==0){countQ+= 1}
			//countQ += 1
			changeQuestion()
		}
		continueScene(this)
		console.log('back to question')
	})

})
