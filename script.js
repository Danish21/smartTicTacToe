$(document).ready(function(){

	console.log("hello");
	var turn = 2; //1 is x and 2 is o
	var level = 1; // 1 is easy and 2 is hard


	//buttons
	$oButton= $("#oButton");
	$xButton = $("#xButton");
	$startButton= $("#startButton");
	$hardButton= $("#hardButton");
	$easyButton = $("#easyButton");
	$button = $(".pickBox");


	//screens
	$startScreen=$("#startScreen");
	$gameScreen= $("#homeScreen");
	$endScreen=$("#endScreen");




	$xButton.click(function(e){

		$xButton.css("border", "solid orange");
		$oButton.css("border", "none");
		turn= 1;
		// console.log(turn);

	})

	$oButton.click(function(e){

		$oButton.css("border", "solid orange");
		$xButton.css("border", "none");
		turn = 2;
		// console.log(turn);

	})

	$easyButton.click(function(e){

		$easyButton.css("border", "solid orange");
		$hardButton.css("border", "none");
		level= 1;
		// console.log(level);

	})

	$hardButton.click(function(e){

		$hardButton.css("border", "solid orange");
		$easyButton.css("border", "none");
		level= 2;
		// console.log(level);

	})

	$startButton.click(function(e){
		$startScreen.fadeOut();
		$gameScreen.css("visibility","visible");
		$endScreen.css("visibility","hidden");

		if(turn==1){
			turn=2;// if he picked x make it o and make computer play a move as it is o
			computerMove();
			numMoves++;
		}

		console.log("level:"+ level);
	})


	////////////////////////////////
	//Game Logic 

	//array
	//stores whether x (1) or o (2) or nothing(0)
	//index o is garbage as using 1 to 9 as id will return  1 to 9
	var tttBox = [0,0,0,0,0,0,0,0,0,0]; 
	var numMoves=0; //counts number of moves


	//Game Logic for drawing and switching turns
	function toggleTurn(){ // 1 is X and 2 is O
		if(turn==1){
			turn=2;
		}
		else if(turn==2){
			turn=1;
		}
	}


	//game logic to check if someone has won
	function ThreeInRow( a, b, c){

		if(tttBox[a]!=0){ // if the first box is non zero
			
			if(tttBox[a]==tttBox[b] && tttBox[c]==tttBox[b] ){

				return true; // and the rest of the boxs are the same then return
				//three in a row;
			}
		}

		return false;

	}

	function ifWin(){ // checks all possible winning combinations
		if(ThreeInRow(1,2,3) || ThreeInRow(1,4,7) || ThreeInRow(1,5,9)  
			|| ThreeInRow(2,5,8) || ThreeInRow(3,6,9) || ThreeInRow(3,5,7) ||
			ThreeInRow(4,5,6) || ThreeInRow(7,8,9)){
				
				return true;
		}
		return false;
	}



	function userMove(boxNumber){ // changes array internally

		tttBox[boxNumber]=1;
		// console.log(tttBox[boxNumber]);
		// console.log(boxNumber);
	}


	////Computer Logic
	function computerMove(){
		if(level==1){
			computerMoveEasy();
		}

		if(level==2){

			ComputerMoveHard();

		}
	}



	//Level Easy
	function computerMoveEasy(){//level easy
		randomMove();
	}

	function randomMove(){

		while(true){
			var num= Math.floor((Math.random() * 9) + 1); //return a number between 1 and 9
			// console.log(num);
			if(tttBox[num]==0){
				
				makeComputerMove(num);
				return;
			}

		}


	}

	function makeComputerMove(index){

		tttBox[index]=2;

		if(turn==1){
			$("#"+index).find(".xIcon").css("visibility", "visible");
		}
		else{
			$("#"+index).find(".oIcon").css("visibility", "visible");
		}
		toggleTurn();
		return;

	}

	////Level hard

	function ComputerMoveHard(){


			if(numMoves==0){
				firstMove();

				return;
			}

			if(numMoves==1){
				secondMove();
				return;
			}

			if (numMoves==2) {
				thirdMove();
				return;
			}
			if(numMoves==3){
				console.log("fourthMove")
				fourthMove();
				return;
			}

			if(numMoves > 3){
				laterhalfMove();
				return;
			}


	}
	function firstMove(){
		
	// Computer making first move should take an open cornerBox

		var index = openCornerBoxIndex();

		makeComputerMove(index);
	}

	function secondMove(){ //need to finish

		if(tttBox[5]==0){
			makeComputerMove(5);
			return;
		}

		var index = openCornerBoxIndex();

		makeComputerMove(index); // or else take a corner


	}

	function thirdMove(){ // pick a random corner box
		
		var index = openCornerBoxIndex();
		makeComputerMove(index);
	}

	function fourthMove(){
		var blockingIndex = OneMoveAway(1); 

		if(blockingIndex!=0){
			makeComputerMove(blockingIndex); // if user can win block him
			return;
		}

		var integralBlockIndex = integralCheck(); // checking if he picked two integrals and me center


		if(tttBox[5]==2){
			var index = openIntegralBoxIndex(); // if have center pick random integral box
			
			if(integralBlockIndex != 0){
				index = integralBlockIndex; //block with the index
			}
			makeComputerMove(index);
			return;
		}

		makeComputerMove(openCornerBoxIndex()); // if don't center take a corner box

	}

	function laterhalfMove(){

		var winningIndex = OneMoveAway(2);

		if(winningIndex!=0){
			makeComputerMove(winningIndex); // if I can win make the move
			return;
		}

		var blockingIndex = OneMoveAway(1); 

		if(blockingIndex!=0){
			makeComputerMove(blockingIndex); // if user can win block him
			return;
		}

		randomMove(); // make random move

	}



	function openCornerBoxIndex(){

		while(true){

			var cornerBoxIndex= Math.floor((Math.random() * 4) + 1);// returns between 1 and 4 to pick one of the corners
			
			if(cornerBoxIndex==1){ // if statements convert into real corner box index
				cornerBoxIndex = 1;
			}
			if(cornerBoxIndex==2){
				cornerBoxIndex = 3;
			}
			if(cornerBoxIndex==3){
				cornerBoxIndex = 7;
			}
			if(cornerBoxIndex==4){
				cornerBoxIndex = 9;
			}

			if(tttBox[cornerBoxIndex]==0){ // check if index is empty or else finds another cornerbox
				return cornerBoxIndex;
			}
		}

	}

	function openIntegralBoxIndex(){

		while(true){

			var cornerBoxIndex= Math.floor((Math.random() * 4) + 5);// returns between 1 and 4 to pick one of the corners
			
			if(cornerBoxIndex==5){ // if statements convert into real corner box index
				cornerBoxIndex = 2;
			}
			if(cornerBoxIndex==6){
				cornerBoxIndex = 4;
			}
			if(cornerBoxIndex==7){
				cornerBoxIndex =6;
			}
			if(cornerBoxIndex==8){
				cornerBoxIndex = 8;
			}

			if(tttBox[cornerBoxIndex]==0){ // check if index is empty or else finds another cornerbox
				return cornerBoxIndex;
			}
		}

	}

	function integralCheck(){
		if(tttBox[2]==1 && tttBox[4]==1){
			return 1;
		}

		if(tttBox[4]==1 && tttBox[8]==1){
			return 7;
		}

		if(tttBox[6]==1 && tttBox[8]==1){
			return 9;
		}

		if(tttBox[2]==1 && tttBox[6]==1){
			return 3;
		}
		return 0;
	}


	function OneMoveAway(mover){ // checks if user or computer one move away based on the parameter passed in
								 //1 for user and 2 for computer//
								 //returns the index that is will be three in Row if filled in by player
		if(possible3inRow1(mover)){
			return indexOneWay(1,2,3);
		}

		if(possible3inRow2(mover)){
			return indexOneWay(4,5,6);
		}

		if(possible3inRow3(mover)){
			return indexOneWay(7,8,9);
		}

		if(possible3inCollumn1(mover)){
			return indexOneWay(1,4,7);
		}

		if(possible3inCollumn2(mover)){
			return indexOneWay(2,5,8);
		}

		if(possible3inCollumn3(mover)){
			return indexOneWay(3,6,9);
		}

		if(possible3inDiagonal1(mover)){
			return indexOneWay(1,5,9);
		}

		if(possible3inDiagonal2(mover)){
			return indexOneWay(3,5,7);
		}

		return 0;

	}
	function possibleThreeInRow( a, b, c, mover){ /// return is those three index are one away from threeinRow


		if(tttBox[a]==0 && tttBox[b]==mover && tttBox[c]==mover){
			return true;
		}

		if(tttBox[a]==mover && tttBox[b]==0 && tttBox[c]==mover){
			return true;
		}

		if(tttBox[a]==mover && tttBox[b]==mover && tttBox[c]==0){
			return true;
		}

		return false;
	}

	function indexOneWay(x,y,z){ // input indexs where there is for sure a three in a row and gives you where that spot is

		if(tttBox[x]==0){
			return x;
		}
		if(tttBox[y]==0){
			return y;
		}

		if(tttBox[z]==0){
			return z;
		}

	}


	function possible3inRow1(mover){ /// takes whose move 1 if user and 2 if computer
									/// returnsif row 1 is one moveaway from being three in a row
		 return possibleThreeInRow(1,2,3, mover); 
	}

	function possible3inRow2(mover){
		return possibleThreeInRow(4,5,6, mover);	
	}

	function possible3inRow3(mover){
		return possibleThreeInRow(7,8,9, mover);	
	}

	function possible3inCollumn1(mover){
		return possibleThreeInRow(1,4,7, mover);
	}

	function possible3inCollumn2(mover){
		return possibleThreeInRow(2,5,8, mover);
	}

	function possible3inCollumn3(mover){
		 return possibleThreeInRow(3,6,9, mover);
	
	}

	function possible3inDiagonal1(mover){
		 return possibleThreeInRow(1,5,9, mover);
	}

	function possible3inDiagonal2(mover){
		 return possibleThreeInRow(3,5,7, mover);
	}

	function printBoard(){
		for (var i = 1; i < tttBox.length; i++) {
			console.log(tttBox[i]);
		}
	}




	
	$square = $(".box"); 

	//array
	//stores whether user (1) or computer (2) or nothing(0)
	//index o is garbage as using 1 to 9 as id will return  1 to 9
	var tttBox = [0,0,0,0,0,0,0,0,0,0]; 




	
	$square.click(function(e){



		var boxNumber = parseInt(this.id); // get which box it is

		if(tttBox[boxNumber]!=0){
			return; // return out at there is already an icon there
		}

		userMove(boxNumber);
		numMoves++;
		console.log("#moves:" + numMoves);

		if(turn==1){
			$(this).find(".xIcon").css("visibility", "visible");
		}
		else{
			$(this).find(".oIcon").css("visibility", "visible");
		}
		console.log("UserWinningMove:" + OneMoveAway(1));

		toggleTurn();

		if(ifWin()){
			alert("you won");
			location.reload();
			return;
		}
		;
		if(numMoves==9){
			alert("Its a tie");
			location.reload();
			return;
		}

		

		setTimeout(function(){
			computerMove();
			numMoves++;
			console.log("#moves:" + numMoves);
			console.log("ComputerWinningMove:" + OneMoveAway(2));
			if(ifWin()){
				alert("computer won");
				location.reload();
				return;
			}
			if(numMoves==9){
				alert("Its a tie");
				location.reload();
				return;
			}
		},1000);
		
		

	})




})