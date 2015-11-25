var cardOpened = "";
var imgFlipped = "";
var imgOpened = 0;
var count = 0;
 
//match = $('#memory_game > ul > li');
var match = "#memory_game";


var imgFlags = [
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
function shuffFlags() {
	var allFlags = $(match).children();
	var thisFlag = $(match + " div:first-child");
	var flagArr = new Array();

	for (var i =0; i < allFlags.length; i++) {
		flagArr[i] = $("#" + thisFlag.attr("id") + " img").attr("src"); //changes image
		thisFlag = thisFlag.next(); //new flag is next image
	}

	thisFlag = $(match + " div: first-child");

	for (var j = 0; j < allFlags.length; j++) {
		var randomImg = random(0, flagArr.length - 1);

		$("#" + thisFlag.attr("id") + " img").attr("src", 
			flagArr[randomImg]);
		flagArr.splice(randomImg, 1);
		thisFlag = thisFlag.next();
	}
}
function restartGame() {
	shuffFlags();
	$(match + " div img").hide();
	$(match + " div").css("visibility", "visible");
	count = 0;
	$("#win").remove();
	$("#counter").html(counter + "");
	cardOpened = "";
	imgFlipped = "";
	imgOpened = 0;
	return false;

}
function flipCard() {
	var id = $(this).attr("id");

	if($("#" + id + " img").is(":hidden"))
	{
		$(match + " div").unbind("click", flipCard);

		$("#" + id + " img").slideDown('slow');

		if(imgFlipped === "") {
			cardOpened = id;
			imgFlipped = $("#" + id + " img").attr("src");
				setTimeout(function() {
					$(Source + " div").bind("click", flipCard)
				}, 200);
		} else {
			openCard = $("#" + id + " img").attr("src");
			if (imgFlipped !== openCard) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('slow');
					cardOpened = "";
					imgOpened = "";
				}, 200);
			} else {
				$("#" + id + " img").parent().css("visibility", "hidden");
				$("#" + cardOpened + " img").parent().css("visibility", "hidden");
				imgOpened++;
				cardOpened = "";
				imgOpened = "";
			}
			setTimeout(function() {
				$(match + " div").bind("click", flipCard)} , 200);
			}
			count++;
				$("#counter").html("" + count);
				
			if(imgOpened === imgFlags.length) {
				alert("Congrats, you win!");
			}
		}
	}

//possible matches
/*function matchCards(target1,target2) {
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
	} else if (target1.hasClass("match12") && target2.hasClass("match12")) {
		console.log("Match!");
	} else {
		console.log("No match");
	}
};
*/
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
			'fontFamily':'Bebas',
			'textShadow' : '2px 2px black',
			'color' : 'gray'
	});
	$('#boxBtn').css({
			'fontFamily' : 'Bebas',
			'color' : 'white'
	});
	
	$(match + " div").click(flipCard);
	shuffFlags();
		});
	$('li').click(function() {
		//show image, show text
		
		$(this).children('img').show();
		$(this).children('p').show();
});
