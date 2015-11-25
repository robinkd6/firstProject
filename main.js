var guess1 = "";
var guess2 = "";
var counter = 0;
 

//need to append counter to counter button
//create a function restarting the game
//create an array that stores matched img and text

match = $('#memory_game > ul > li');


//possible matches
function matchCards(target1,target2) {
	if(target1.hasClass("match1") && target2.hasClass("match1")){
		console.log("Match!");
	} else if (target1.hasClass("match2") && target2.hasClass("match2")) {
		console.log("Match!");
	} else if (target1.hasClass("match3 ") && target2.hasClass("match3")) {
		console.log("Match!");
	} else if (target1.hasClass("match4") && target2.hasClass("match4")) {
		console.log("Match!");
	} else if (target1.hasClass("match5") && target2.hasClass("match5")) {
		console.log("Match!");
	} else if (target1.hasClass("match6") && target2.hasClass("match6")) {
		console.log("Match!");
	} else if (target1.hasClass("match7") && target2.hasClass("match7")) {
		console.log("Match!");
	} else if (target1.hasClass("match8") && target2.hasClass("match8")) {
		console.log("Match!");
	} else if (target1.hasClass("match9") && target2.hasClass("match9")) {
		console.log("Match!");
	} else if (target1.hasClass("match10") && target2.hasClass("match10")) {
		console.log("Match!");
	} else if (target1.hasClass("match11") && target2.hasClass("match11")) {
		console.log("Match!");
	} else if (target1.hasClass("match1") && target2.hasClass("match1")) {
		console.log("Match!");
	} else {
		console.log("No match");
	};
}

$(function() {
	//storing lists into variables
var matchImage = $('#memory_game > ul > .square-image');
var matchText = $('#memory_game > ul > .square-text');
console.log(matchImage);
console.log(matchText);

	$('#start_game').click(function() {
		//$("#play_window").show();
		$('#start_window').hide();
		$('img').hide();
		$('p').hide();
	});
	$('.jumbotron').css({
			'background' : 'black',
			'border' : '5px solid white',
			'fontFamily':'Pacifico',
			'textShadow' : '2px 2px black',
			'color' : 'gray'
	});
	$('#boxBtn').css({
			'fontFamily' : 'Pacifico',
			'color' : 'white'
	});
	$('li').click(function() {
		$(this).children('img').show();
		$(this).children('p').show();

	//if statement to see if img = p	
	//if (count === 1  && ($(this).children('img')) ===true) {
	//target1 = $(this).children('img');
	//} else if (count === 1 && ($(this).children('p'))===true) {
	//target1 = $(this).children('p');
	//} else {
	//target2 = ($(this).children('img') || $(this).children('p'));
	//};
	//}); /counter and guesses
		//figure out which cards to flip
		//show card

	$('li').each(function(index) {
		match.push( index + $(this).html() );
});
});
