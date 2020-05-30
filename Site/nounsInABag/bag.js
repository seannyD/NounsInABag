var currentItem = "";
var currentScore = 0;
var roundsPassed = 0;

var guessedItems = [];

$('document').ready(function(){
	$("#addItemButton").click(clicksAddItem);
	$("#shuffleBagButton").click(shuffleBag);
	$("#getNextItemButton").click(getNextItem);
	$("#resetButton").click(resetBag);
	$("#endTurnButton").click(endTurn);
	$("#putMyItemsBack").click(putMyItemsBack);

	
});


function clicksAddItem(){
	var item = $("#addItemText").val();
	var sent = addItem(item);
	$("#addItemText").val("");
}

function addItem(item){

	item = item.replace(/\n/g, "");
	item = item.replace(/=/g, "");
	item = item.replace(/&/g, "");
	
	if(item==""){
		return(false);
	}

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   addedItem(xhttp.responseText);
		}
	};
	xhttp.open("POST", "add.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("item="+item);
	return(true);
}

function addedItem(response){
	// No response
}

function getNextItem(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   gotNextItem(xhttp.responseText);
		}
	};
	xhttp.open("GET", "getNextItem.php", true);
	xhttp.send();
}

function gotNextItem(response){
	console.log(response);
	if(response!="" && response!="\n" && response!=" "){
		currentItem = response;
		$("#currentItemDisplay").text(response);
	} else{
		$("#currentItemDisplay").text("-- The bag is empty! --");
	}
	// getting the first item out of the bag does not increase score
	// only 2nd, 3rd etc. count towards score.
	// TODO: stop score increasing after bag is empty 2nd time
	if(roundsPassed>0){
		incScore();
		guessedItems.push(currentItem);
	}
	roundsPassed += 1;
	
}

function shuffleBag(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   shuffledBag(xhttp.responseText);
		}
	};
	xhttp.open("GET", "shuffle.php", true);
	xhttp.send();
}

function putMyItemsBack(){
	items = guessedItems.join("\n");
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   addedItem(xhttp.responseText);
		}
	};
	xhttp.open("POST", "add.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("item="+items);
}

function shuffledBag(response){
	console.log("Bag shuffled");
}

function getBag(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   gotBag(xhttp.responseText);
		}
	};
	xhttp.open("GET", "get.php", true);
	xhttp.send();
}

function gotBag(response){
	var items = response.split("\n");
	console.log(items);
}

function resetBag(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   resettedBag(xhttp.responseText);
		}
	};
	xhttp.open("GET", "reset.php", true);
	xhttp.send();
	
	guessedItems = [];
}

function resettedBag(response){
	console.log("Bag Reset")
}

function startTurn(){
	//currentScore = 0; // No need to reset?
	roundsPassed = 0;
	currentItem = "";
	$("#currentItemDisplay").text("");
	$("#score").text("Score: "+currentScore);
}

function incScore(){
	currentScore +=1;
	$("#score").text("Score: "+currentScore);
}

function endTurn(){
	// put back current item
	addItem(currentItem);
	shuffleBag();
	currentItem = "";
	$("#currentItemDisplay").text("");
}