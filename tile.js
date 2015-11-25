function tile(id) {
	
	this.id = id;
	/*this.frontColor = '#fcfcfc';*/
	/*this.backColor = '#fff';*/
	this.startAt = 1000;
	this.flipped = false;
	this.backContentImage = null;
	this.flipCompleteCallbacks = new Array();
	
	this.flip = function() {

		$("#" + this.id).flip({
			direction: this.flipMethod,
			/*color: this.backColor,*/
			content: this.getBackContent(),
			onEnd: this.onFlipComplete()
		});

		$("#" + this.id + " img").show();
		
		this.flipped = true;
	};
	
	this.onFlipComplete = function() {
	
		console.log("Flip complete");
		
		while(this.flipCompleteCallbacks.length > 0) {
			
			console.log("Running callback " + this.flipCompleteCallbacks[this.flipCompleteCallbacks.length - 1]);
			this.flipCompleteCallbacks[this.flipCompleteCallbacks.length - 1]();
			this.flipCompleteCallbacks.pop();
		}
	};
	
	this.revertFlip = function() {

		console.log("Reverting tile " + this.id);
		
		$("#" + this.id + " img").hide();
		
		$("#" + this.id).revertFlip();

		this.flipped = false;
	};
	
	this.setBackContentImage = function(sBackContentImage) {
		this.backContentImage = sBackContentImage;
	};
	
	this.setTileId = function(sIdOfTile) {
		this.id = sIdOfTile;
	};

	this.setStartAt = function(iStartAt) {
		this.startAt = iStartAt;
	};
	
	this.setFrontColor = function(sColor) {
		/*this.frontColor = sColor;*/
	};

	this.setBackColor = function(sColor) {
		/*this.backColor = sColor;*/
	};

	this.setFlipMethod = function(sFlipMethod) {
		this.flipMethod = sFlipMethod;
	};
	
	this.getHTML = function() {
		return '<div id="' + this.id + '" class="tile ' + this.frontColor + '">' + '</div>';
	};

	this.getStartAt = function() {
		return this.startAt;
	};

	this.getFlipped = function() {
		return this.flipped;
	};
	
	this.getBackContent = function() {
		return '<img src="' + this.backContentImage + '"/>';
	};

	this.getBackContentImage = function() {
		return this.backContentImage;
	};
	
	this.addFlipCompleteCallback = function(callback) {
		this.flipCompleteCallbacks.push(callback);
	};
}
var tiles = new Array(),
	flips = new Array('tb', 'tb', 'tb', 'tb' ),
	iFlippedTile = null,
	iTileBeingFlippedId = null,
	tileImages = new Array(1,2,3,4,5,6),
	tileAllocation = null,
	iTimer = 0,
	iInterval = 100,
	iPeekTime = 3000;
	counts = 0;
	wrong = 0;
	




 
function getRandomImageForTile() {

	var iRandomImage = Math.floor((Math.random() * tileAllocation.length)),
		iMaxImageUse = 2;
	
	while(tileAllocation[iRandomImage] >= iMaxImageUse ) {
			
		iRandomImage = iRandomImage + 1;
			
		if(iRandomImage >= tileAllocation.length) {
				
			iRandomImage = 0;
		}
	}
	
	return iRandomImage;
}

function createTile(iCounter) {
	
	var curTile =  new tile("tile" + iCounter),
		iRandomImage = getRandomImageForTile();
		
	tileAllocation[iRandomImage] = tileAllocation[iRandomImage] + 1;
		
	curTile.setFrontColor("tileColor" + Math.floor((Math.random() * 5) + 1));
	curTile.setStartAt(500 * Math.floor((Math.random() * 5) + 1));
	curTile.setFlipMethod(flips[Math.floor((Math.random() * 3) + 1)]);
	curTile.setBackContentImage("images/" +  (iRandomImage + 1) + ".png");
	
	return curTile;
}

function initState() {

	/* Reset the tile allocation count array.  This
		is used to ensure each image is only 
		allocated twice.
	*/
	tileAllocation = new Array(0,0,0,0,0,0);
	
	while(tiles.length > 0) {
		tiles.pop();
	}
	
	$('#board').empty();
	iTimer = 0;
	
}

function initTiles() {

	var iCounter = 0, 
		curTile = null;

	initState();
	
	// Randomly create twenty tiles and render to board
	for(iCounter = 0; iCounter < 12; iCounter++) {
		
		curTile = createTile(iCounter);
		
		$('#board').append(curTile.getHTML());
		
		tiles.push(curTile);
	}	
}

function hideTiles(callback) {
	
	var iCounter = 0;

	for(iCounter = 0; iCounter < tiles.length; iCounter++) {
		
		tiles[iCounter].revertFlip();

	}
	
	callback();
}

function revealTiles(callback) {
	
	var iCounter = 0,
		bTileNotFlipped = false;

	for(iCounter = 0; iCounter < tiles.length; iCounter++) {
		
		if(tiles[iCounter].getFlipped() === false) {
		
			if(iTimer > tiles[iCounter].getStartAt()) {
				tiles[iCounter].flip();
			}
			else {
				bTileNotFlipped = true;
			}
		}
	}
	
	iTimer = iTimer + iInterval;

	if(bTileNotFlipped === true) {
		setTimeout("revealTiles(" + callback + ")",iInterval);
	} else {
		callback();
	}
}

function playAudio(sAudio) {
	
	var audioElement = document.getElementById('audioEngine');
			
	if(audioElement !== null) {

		audioElement.src = sAudio;
		audioElement.play();
	}	
}

function checkMatch() {
	
	if(iFlippedTile === null) {
		  
		iFlippedTile = iTileBeingFlippedId;

	} else {
		
		if( tiles[iFlippedTile].getBackContentImage() !== tiles[iTileBeingFlippedId].getBackContentImage()) {
			
			setTimeout("tiles[" + iFlippedTile + "].revertFlip()", 1000);
			setTimeout("tiles[" + iTileBeingFlippedId + "].revertFlip()", 1000);
			playAudio("mp3/wrong.mp3");
			wrong++
			console.log("false "+wrong);
			
			if(wrong==20)
			{
				$('#s3').fadeOut();
				initTiles();
				$('#s6').delay(500).fadeIn();
			}
			

		} else {
			playAudio("mp3/correct.mp3");
			counts++
			console.log("correct "+counts);
			if(counts==6)
			{
				
				Timer.toggle();
				var sc = document.getElementById('stopwatch').innerHTML;
				document.getElementById('score').innerHTML = 'Your Time : '+ sc +'  Missed : '+wrong;
				Timer.stop();
				$('#s3').delay(500).fadeOut();
				$('#s4').delay(1000).fadeIn();
				
			}

		}

		iFlippedTile = null;
		iTileBeingFlippedId = null;
	}

		$("#counterItems").text("missed : "+wrong);

}

function onPeekComplete() {

	$('div.tile').click(function() {
	
		iTileBeingFlippedId = this.id.substring("tile".length);
	
		if(tiles[iTileBeingFlippedId].getFlipped() === false) {
			tiles[iTileBeingFlippedId].addFlipCompleteCallback(function() { checkMatch(); });
			tiles[iTileBeingFlippedId].flip();
		}
	  
	});
}

function onPeekStart() {
	//setTimeout("hideTiles( function() { onPeekComplete(); })",iPeekTime);
	hideTiles( function() { onPeekComplete(); });
}

$(document).ready(function() {
	
	var currentURL = window.location.href;
	var title="Clialis";
	var summary ="Mind Game";
	var img ="../images/mind-game.jpg";
	
	$('#fb').click(function() {
		var fburl = "http://www.facebook.com/sharer/sharer.php?s=100&p[url]="+currentURL+"&p[images][0]="+currentURL+"/images/mind-game.jpg&p[title]=Clialis&p[summary]=clialis%20mind%20game!";
        window.open(fburl, '_blank');
		});
	$('#tw').click(function() {
		var fburl = "http://twitter.com/share?url="+currentURL+"&text=clialis mind game!&via=clialis&related=MRMDubai";
         window.open(fburl, '_blank');
		});
	
	

	$('#playButton').click(function() {

	counts = 0;
	wrong = 0;
	
	$('#s2').fadeOut();
	$('#s3').delay(500).fadeIn();
	initTiles();
	onPeekComplete();
	console.log("start game");
	$("#counterItems").text("missed : "+wrong);
	
    $(init);
	currentTime = 0;
	Timer.stop().once();
	Timer.play();
	
	//	initTiles();
	//	setTimeout("revealTiles(function() { onPeekStart(); })",iInterval);


	});
	
	$('#edButton').click(function() {	
	$('#s4').fadeOut();	
	$('#s5').delay(500).fadeIn();
	playAudio("mp3/applause.mp3");
	});
	$('#replayButton').click(function() {	
	counts = 0;
	wrong = 0;
	currentTime = 0;
	$('#s5').fadeOut();
	$('#s1').delay(500).fadeIn();
	$('#s1').delay(1500).fadeOut();
	$('#s2').delay(3000).fadeIn();
	
	
		
	});

	$('#resetButton').click(function() {
	counts = 0;
	wrong = 0;
	currentTime = 0;	
	$('#s6').fadeOut();
	$('#s1').delay(500).fadeIn();
	$('#s1').delay(1500).fadeOut();
	$('#s2').delay(3000).fadeIn();
	
	});
	
	$('#s1').delay(500).fadeIn();
	$('#s1').delay(2500).fadeOut();
	$('#s2').delay(4000).fadeIn();



    var $stopwatch, 
        incrementTime = 70, 
        currentTime = 0, 
        updateTimer = function() {
            $stopwatch.html(formatTime(currentTime));
            currentTime += incrementTime / 10;
        },
        init = function() {
            $stopwatch = $('#stopwatch');
			 Timer = $.timer(updateTimer, incrementTime, true);
	
        };
    this.resetStopwatch = function() {
        currentTime = 0;
        this.Timer.stop().once();
    };
  
	function pad(number, length) {
		var str = '' + number;
		while (str.length < length) {str = '0' + str;}
		return str;
	}
	function formatTime(time) {
		var min = parseInt(time / 6000),
			sec = parseInt(time / 100) - (min * 60),
			hundredths = pad(time - (sec * 100) - (min * 6000), 2);
//		return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
		return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2);
	}
	
});
