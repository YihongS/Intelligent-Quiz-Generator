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


let countQ = 0;
// read current correctOptions from the correctResponses[countQ] array ***
let correctOptions = ['bababa','dadadda','jujujuju'];
let optionChose = [];
let questionCorrect = [];
function clickOption(){
	// Define current Choice
	$('.option').click(function (){
		// if the clicked option is previously checked, remove it
		if (optionChose.include($(this).text())) {
			$(this).removeClass('checked');
			// remove the chose option from the optionChose array
			let index = array.indexOf($(this).text());
			if (index > -1) {
			  array.splice(index, 1);
			}
		} 
		// else, check it
		else {
			optionChose.push($(this).text());
			$(this).addClass('checked')
		}
		console.log(optionChose);
	}
}

// Check if the chosen options are correct
function checkCorrect(){
	let answerCorrect = [];

	$('.btn_submit').click(function (){
		// default setting is true
		questionCorrect[countQ] = true;
		// check if the option chosed are correct
		$.each(optionChose, function( i, v ) {
			if (correctOptions.include(v)) {
				answeredCorrect[i] = true;
			} 
			else {
				answeredCorrect[i] = false;
				questionCorrect[countQ] = false;
			}
		}
		// check if all correct options are chosed
		$.each(correctOptions, function( i, v ) {
			if (!optionChose.include(v)) {
				questionCorrect[countQ] = false;
			} 
		}
		countQ += 1;
	}
}
	// try write check all that apply questions
	// read countQ from JSON ***
    optionsChoseArray[countQ] = optionChose;
    // console.log('final'+ optionChose);
    // console.log('optionChose='+ optionChose);
    // console.log('countQ='+countQ);
    if (countQ <= 7 && optionChose == questions[countQ].correctAnswer){
      score = score + 1;
      questionsCorrect[countQ] = true;
      // console.log('score='+ score);
    }
    else{
      // console.log("!===")
      questionsCorrect[countQ] = false;
    }

    if(countQ <= 7){
      countQ = countQ + 1;
      // console.log('countQ='+countQ);
      // console.log('score='+ score);

    }