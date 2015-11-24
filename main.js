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
	$('li').each(function(index) {
		match.push( index + $(this).html() );
	});
});