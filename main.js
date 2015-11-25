var cardOpened = "";
var imgShow = "";
var count = 0;
var imgFound = 0;

var match = "#memory_game";

var ImgSource = [
  "http://dummygallery.com/wp-content/uploads/2015/08/USA-Flag.jpg", 
"https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1350px-Flag_of_India.svg.png",
"https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png",
"http://light-house.co.uk/wp-content/uploads/2013/03/French-Flag.jpg",
"http://chinaflag.facts.co/chineseflagof/ChinaFlagImage1.png",
"https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1280px-Flag_of_Japan.svg.png", 
"https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg",
"https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg",
"https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg",
"https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Flag_of_Canada.svg/1280px-Flag_of_Canada.svg.png",
"https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
"https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg"
];

function random(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
	//shuffle images by storing into a variable then into an array
function shuffleImgs() {
	var imgAll = $(match).children();
	var thisImg = $(match + " div:first-child");
	var imgArr = new Array();
	//targeting the first elemend inside div
	//shuffle images by storing into a variable then into an array
	for (var i = 0; i < imgAll.length; i++) {
		imgArr[i] = $("#" + thisImg.attr("id") + " img").attr("src");
		thisImg = thisImg.next();
	} //changes image
	
		thisImg = $(match + " div:first-child");
	
	for (var z = 0; z < ImgAll.length; z++) {
	var RandomNumber = RandomFunction(0, ImgArr.length - 1);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		imgArr.splice(RandomNumber, 1);
		thisImg = thisImg.next();
	}
}

function resetGame() {
	shuffleImgs();
	$(match + " div img").hide();
	$(match + " div").css("visibility", "visible");
	count = 0;
	$("#success").remove();
	$("#counter").html("" + Counter);
	cardOpened = "";
	imgShow = "";
	ImgFound = 0;
	return false;
}

function showCard() {
	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
		$(match + " div").unbind("click", showCard);
	
		$("#" + id + " img").slideDown('slow');

		if (imgShow == "") {
			cardOpened = id;
			imgShow = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(match + " div").bind("click", showCard)
			}, 200);
		} else {
			CurrentOpened = $("#" + id + " img").attr("src");
			if (imgShow != CurrentOpened) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('fast');
					$("#" + cardOpened + " img").slideUp('slow');
					cardOpened = "";
					imgShow = "";
				}, 200);
			} else {
				$("#" + id + " img").parent().css("visibility", "hidden");
				$("#" + cardOpened + " img").parent().css("visibility", "hidden");
				imgFound++;
				cardOpened = "";
				imgShow = "";
			}
			setTimeout(function() {
				$(match + " div").bind("click", showCard)
			}, 200);
		}
		count++;
		$("#counter").html("" + count);

		if (imgFound == imgFlags.length) {
			$("#counter").prepend('<span id="success">You Found All Pictues With </span>');
		}
	}
}

$(function() {
    $('#start_game').click(function() {
		//$("#play_window").show();
		$('#start_window').hide();
	});

for (var y = 1; y < 3 ; y++) {
	$.each(ImgSource, function(i, val) {
		$(match).append("<div id=card" + y + i + "><img src=" + val + " />");
	});
}
	$(match + " div").click(showCard);
	shuffleImgs();
});

	$('.jumbotron').css({
			'background' : 'black',
			'border' : '5px solid white',
			'fontFamily':'Bebas',
			'textShadow' : '2px 2px black',
			'color' : 'gray'
	});
	$('#boxBtn').css({
			'fontFamily' : 'Bebas',
			'color' : 'white'
	});