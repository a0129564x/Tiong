//TIONG JIA EN   A0129564x

//Note: This game is designed by laptop users with mousepads and no mouse.
//Kindly play it on a laptop with mousepad as well. If played using a mouse, it might be too easy.


//http://speckyboy.com/demo/windmill-demo/index.html


require.config({
    paths: {"jsaSound": "http://animatedsoundworks.com:8001"}
});


require(
    ["jsaSound/jsaModels/jsaFMnative2"],     //this is to load sound modules 
    function (nativeFactory) {
        
        //printing onto console to ensure programme is working    
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));

        // Made the dimensions of the paper variables so that they can be referred to for the background.
        var pWidth = paper.canvas.offsetWidth;
        var pHeight = paper.canvas.offsetHeight;

        // Gave the game a nice background by creating a variable rectangle that covers the paper and filling it with an online image
        // Set the dimensions of the rectangle to be pWidth and pHeight predetermined above
        var background = paper.rect(0,0,pWidth,pHeight).attr({
            fill:"url(http://heartfelt.med.ubc.ca/files/2012/07/wood-background.png)"
        });

        var counter; // Counts clicks on target object  
        var totalcount;
        var time = 0; // Set the time at the start of the game at 0
		
		//variables to adjust the squares
		var adjustX = 200;
		var adjustY = 100;

        // startButton with text on top
        var startButton = paper.circle(300, 200, 40);
        var startText = paper.text(300, 200, 'START');

        // Styled the startButton by assigning it attributes
        startButton.attr({
            stroke: "black",
            fill: "white",
            "stroke-width":3
        });

        // Styled the text of the startButton by assigning it attributes
        startText.attr({
            stroke: "navy",
            "font-family": "phosphate",
            "font-size": 22
        })
        
        // Initialise/call for the start button to be hidden during the game 
        startButton.hide();
        startText.hide();

        // creating a new variable that holds the function 
        // where the start button is shown 
        // initialising the "for" loop that is useful since it can run the same code over and over again, each time with a different value. This will be useful since I want my boxes to "blink" at random order for every round played
        var ready = function(){
            startButton.show();
            startText.show();
			for(var i = 0 ; i < buttons.length; i++){
				buttons[i].attr({x:-100,y:-100}); //sets buttons to be out of screen by assigning it attributes of x = -100 and y = -100 when the start button is shown
				
			}
			rightcounter = 0;
			totalrights ="";
			points = 0; //set starting point to be 0
			document.getElementById("spnScore").innerHTML = "00"; //setting score shown to be 00 at the start on the screen
			adjustX = 200;
			adjustY = 100;
        }

			//number of rights 
			var rightcounter = 0;
			// the sequence
			var totalrights = "";
			//total points 
			var points =0;
        	// Create the target rectangle and put it "off screen" where it can't be seen until the game starts
        	// Using Array to set the buttons as it is a smarter way to store multiple values in a single variable
        	// Assign each button a different colour for the game's purpose by assigning it attributes
			var buttons = new Array
			buttons[0] = paper.rect(-100, -100, 100, 100).attr({fill:"red"});
			buttons[1] = paper.rect(-100, -100, 100, 100).attr({fill:"blue"});;
			buttons[2] = paper.rect(-100, -100, 100, 100).attr({fill:"green"});;
			buttons[3] = paper.rect(-100, -100, 100, 100).attr({fill:"yellow"});;
			buttons[4] = paper.rect(-100, -100, 100, 100).attr({fill:"purple"});;
			buttons[5] = paper.rect(-100, -100, 100, 100).attr({fill:"orange"});;
			buttons[6] = paper.rect(-100, -100, 100, 100).attr({fill:"teal"});;
			buttons[7] = paper.rect(-100, -100, 100, 100).attr({fill:"violet"});;
			buttons[8] = paper.rect(-100, -100, 100, 100).attr({fill:"white"});;


		//	creating soundplay variable to hold the function that contains my sound
        var soundplay = function(){

                native.setParam("play", 1);
                native.setParam("Release Time", 0.05);
                
                //applying setTimer(function, ms), which generates a one-off callback to function after 100 millisecond
                var soundOff = setTimeout(function(){
                    native.setParam("play", 0);
                }, 100);  

        }


        // Called when the start button is clicked to hide the startButton and begin the game
        var start = function(){

        	//printing on the console once again to track game progress and ensure function is working
			console.log("The width is "+ pWidth+ " the height is "+ pHeight);
            console.log("Game is starting!");

            // hides the startButton and the text so players can play the game without obstruction
            startButton.hide();
            startText.hide();

            var backgroundSound = new Audio('resources/harp.wav');
            backgroundSound.play();	//calling my background sound
        

            // Sets counter to zero at the start of game
            counter = 0;
			levelsetter();


        }
		
		//function to add points
		var addPoints = function(){
			//adding points, where points = points + 1
			points++;
			//setting score to be aligned nicely
			//this is achieved by utilising conditionals to perform different actions based on different conditions
			//"if" to specify a block of code to be executed, if a specified condition of points lesser than 10 is true
			//"else if"  to specify a new condition to test, if points is not lesser than 10
			if(points <10){
				document.getElementById("spnScore").innerHTML = "0"+points;
			}else if(points >=10){
				document.getElementById("spnScore").innerHTML = points;
				
			}
		}
		
		//function when the correct button is clicked
		var clickRight = function(){
			rightcounter++;
			addPoints(); //this will add to the existing points
			// using conditionals again to check if the sequence is fulfilled or else the game will move on to the next sequence
			if(totalrights.length <= rightcounter){
				levelsetter();
			}else{
				console.log("you have " +rightcounter +" rights and right buttons are " + totalrights);   //printing onto console to check
				setButtons(); //this resets the button for the next round
				
			}
			soundplay();
		}

		//function when the wrong button is clicked
		//leads to Game Over alert
		var clickWrong= function(){
			alert("Game Over! You have "+ points + " points!");
			//reset the game
			ready();
			
		}

		//setting the level
		var levelsetter = function(){
			//getting the level through the length of the sequence.
			var level = totalrights.length/5;
			
			//setting each level using conditionals
			if(level == 0){		
				//alerts instructions
				alert("HOW TO PLAY \n 1. Watch the sequence \n 2. Click the right sequence after watching");
				//setting the position of the button
				buttons[0].attr({x:adjustX+0,y:adjustY+0});
				buttons[1].attr({x:adjustX+100,y:adjustY+0});
				buttons[2].attr({x:adjustX+0,y:adjustY+100});
				buttons[3].attr({x:adjustX+100,y:adjustY+100});
				//clear Buttons 
				clearButton();
				//Set Level 
				setLevel(5,4);

			}else if(level == 1){
				alert("Ready for level 2?");
				//adjusting the position for new buttons
				adjustX = adjustX -50;
				buttons[0].attr({x:adjustX+0,y:adjustY+0});
				buttons[1].attr({x:adjustX+100,y:adjustY+0});
				buttons[2].attr({x:adjustX+0,y:adjustY+100});
				buttons[3].attr({x:adjustX+100,y:adjustY+100});
				buttons[4].attr({x:adjustX+200,y:adjustY+0});
				buttons[5].attr({x:adjustX+200,y:adjustY+100}); 
				clearButton();
				setLevel(10,6);
				
			}else if(level == 2){
				alert("Ready for the final level?");
				adjustY =  adjustY - 50;
				buttons[0].attr({x:adjustX+0,y:adjustY+0});
				buttons[1].attr({x:adjustX+100,y:adjustY+0});
				buttons[2].attr({x:adjustX+0,y:adjustY+100});
				buttons[3].attr({x:adjustX+100,y:adjustY+100});
				buttons[4].attr({x:adjustX+200,y:adjustY+0});
				buttons[5].attr({x:adjustX+200,y:adjustY+100});
				buttons[6].attr({x:adjustX+0,y:adjustY+200});
				buttons[7].attr({x:adjustX+100,y:adjustY+200});
				buttons[8].attr({x:adjustX+200,y:adjustY+200}); 
				clearButton();
				setLevel(15,9);

			}else{
				//ends the game after finishing 3 levels.
				alert("Congratulations! You win!");
				clearButton();
				//reset game
				ready();
				
			}
		}
		
		//clearing buttons function with the help of "for" loops
		var clearButton = function(){
			//remove event listener
			for(var b = 0; b< buttons.length; b++){
				buttons[b].node.removeEventListener('click',clickWrong);
				buttons[b].node.removeEventListener('click',clickRight);
				
			}
			
		}
		
		//setting the buttons for the stage
		var setButtons = function(){
			//setting every button to be wrong 
			for(var b = 0; b< buttons.length; b++){
				buttons[b].node.addEventListener('click', clickWrong);
				
			}
			//getting the right button
			var right = parseInt(totalrights[rightcounter]);
			console.log("Right position is "+ right);
			console.log(buttons[right].attr()['fill']);
			//remove the wrong button function for the right button
			buttons[right].node.removeEventListener('click',clickWrong);
			//adding the right button function
			buttons[right].node.addEventListener('click', clickRight);
		}
		
		//setting level function with two argumments
		var setLevel = function(times,nobuttons){
			console.log("setting level");
			//reset the sequence to blank
			totalrights = "";
			//reset the number of rights
			rightcounter= 0;
			
			var rightnum =0;
			var oldRightnum = 0;
			var oldcolor = buttons[0].attr()["fill"];
			var nooftimes = 0;
			//setting interval for showing the sequence
			var showtimes = setInterval(function(){
				//setting the previous color of the button back to its original color
				buttons[oldRightnum].attr({fill:oldcolor});
				//randomly selects a sequence
				rightnum = randInt(0,nobuttons-1);
				//adding the number to the sequence
				totalrights += rightnum;
				//setting the button that needs to be changed back to orignal color 
				oldRightnum = rightnum;
				//getting original color of button that is going to be changed
				oldcolor = buttons[oldRightnum].attr()["fill"];
				//setting the button to black
				buttons[rightnum].attr({fill:"black"});
				console.log("old number is " + oldRightnum + " old color is "+ oldcolor);
				//adding the nooftimes the sequence has gone through
				nooftimes++;
				soundplay();
				//checking if the sequence is already more than the desired amount of times. need to be 1 more to set button colors back to original color
					if(nooftimes > times){
						//stopping the sequence
						clearInterval(showtimes);
						buttons[oldRightnum].attr({fill:oldcolor});
						totalrights = totalrights.substr(0,totalrights.length-1);
						setButtons();
					}
				},1000);

			console.log("sequence is " + totalrights);
			
		}
		

        // Created addEventListeners to both the startButton and the startText so that the game will load when any part of the button is clicked
        startButton.node.addEventListener('click', start);
        startText.node.addEventListener('click', start);

        // Return a random integer between m and n inclusive
        var randInt = function (m, n){
            var range = n-m+1;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        }

        // When target is clicked, clickSquare function is activated to count the number of clicks on target
        //target.node.addEventListener('click', clickSquare);

        // startButton appears once page is loaded
        ready();

    //
    var native = nativeFactory();
        native.setParam("play", 0);    //or// native.setParamNorm("play", 0.000);
        native.setParamNorm("Carrier Frequency", 0.48);    //or// native.setParamNorm("Carrier Frequency", 0.300);
        native.setParamNorm("Modulation Index", 0.05);    //or// native.setParamNorm("Modulation Index", 0.010);
        native.setParamNorm("Modulator Frequency", 0.7);    //or// native.setParamNorm("Modulator Frequency", 0.150);
        native.setParam("Gain", 0.7);    //or// native.setParamNorm("Gain", 0.250);
        native.setParam("Attack Time", 0.05);    //or// native.setParamNorm("Attack Time", 0.050);
        native.setParam("Release Time", 0.05);    //or// native.setParamNorm("Release Time", 0.333);


    }
);





