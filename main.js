var counter = 0;
var imgFound = 0;
var boxOpened = "";
var imgOpened = "";
var source = "";

match = [];

var match = $('li').map(function() {
	return $(this).val();
}).get();

function randomImg(maxValue, minValue) {
	return Math.round(Math.random() * (maxValue - minValue) +
		minValue);
}

function shuffleImgs() {

}

$(function() {
	$('#start_game').click(function() {
			//$("#play_window").show();
		$('#start_window').hide();

		});
	$('#card').flip();
		//figure out which cards to flip
		//show card


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
		
	});
	$('li').each(function(index) {
		match.push( index + $(this).html() );
});