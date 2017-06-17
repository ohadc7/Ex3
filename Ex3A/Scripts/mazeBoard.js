/*
* credit: thanks to the first answer in
* https://stackoverflow.com/questions/1117086/how-to-create-a-jquery-plugin-with-methods/22976877#22976877
* and to https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
*/

keyboardFunctionIsOn = false;

(function( $ ){
    var callbackFunc;

    var methods = {
        mazeBoard: function (mazeData, startRow, startCol, exitRow, exitCol, playerImage, exitImage, isEnabled, 
            callbackFunctionForMove//function(direction, playerRow, playerCol)
        ) {
			$(this).data("mazeData", mazeData);
			$(this).data("playerStartPos", {row: startRow, col: startCol});
			$(this).data("exitPos", {row: exitRow, col: exitCol});
			$(this).data("playerImage", playerImage);
            $(this).data("exitImage", exitImage);
            $(this).data("isEnabled", isEnabled);
            callbackFunc = callbackFunctionForMove;
        },

        drawMaze : function( ) {
			 thisCanvas = $(this)[0];
			 userImg = $(this).data("playerImage");
			 endImg = $(this).data("exitImage");
			var maze = $(this).data("mazeData");
			var myCanvas = $(this);
			context = thisCanvas.getContext("2d");
			var rows = maze.length;
			var cols = maze[0].length;
		     cellWidth = thisCanvas.width / cols;
			 cellHeight = thisCanvas.height / rows;
			
			for (var i = 0; i < rows; i++) {
				for (var j = 0; j < cols; j++) {
					if (maze[i][j] == 1) {
						context.fillRect(cellWidth * j, cellHeight * i, cellWidth, cellHeight);
					}
				}
			}
			goalPosRow = $(this).data("exitPos").row;
			goalPosCol = $(this).data("exitPos").col;
			currPosRow = $(this).data("playerStartPos").row;
			currPosCol = $(this).data("playerStartPos").col;
			
			context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
			context.drawImage(endImg, goalPosCol * cellWidth, goalPosRow * cellHeight, cellWidth, cellHeight);

            callMeWhenKeyboardIsPressed =
                function () {
                    //(event) => {
                    const keyName = event.key;
                    switch (keyName) {
                        case "ArrowDown":
                            if (currPosRow + 1 < rows && maze[currPosRow + 1][currPosCol] != 1) {
                                context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                currPosRow++;
                                context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                callbackFunc("down", currPosRow, currPosCol);
                            }
                            break;
                        case "ArrowUp":
                            if (currPosRow - 1 >= 0 && maze[currPosRow - 1][currPosCol] != 1) {
                                context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                currPosRow--;
                                context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                callbackFunc("up", currPosRow, currPosCol);
                            }
                            break;
                        case "ArrowLeft":
                            if (currPosCol - 1 >= 0 && maze[currPosRow][currPosCol - 1] != 1) {
                                context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                currPosCol--;
                                context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                callbackFunc("left", currPosRow, currPosCol);
                            }
                            break;
                        case "ArrowRight":
                            if (currPosCol + 1 < cols && maze[currPosRow][currPosCol + 1] != 1) {
                                context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                currPosCol++;
                                context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                callbackFunc("right", currPosRow, currPosCol);
                            }
                            break;
                        default:
                            return; // Quit when this doesn't handle the key event.
                    }
                };



            if ($(this).data("isEnabled")) {
                'use strict';
                keyboardFunctionIsOn = true;
                document.addEventListener('keydown', callMeWhenKeyboardIsPressed, false);
            }
        },
        solveMaze: function(data){
            var solveObj = { solutionString: data, interval: null };
            context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
            currPosRow = $(this).data("playerStartPos").row;
            currPosCol = $(this).data("playerStartPos").col;
            context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
            solveObj.interval = setInterval(function () { solve(solveObj) }, 1000);
        },
        clearCanvas: function () {
            thisCanvas = $(this)[0];
            context = thisCanvas.getContext("2d");
            context.clearRect(0, 0, thisCanvas.width, thisCanvas.height);
            if (keyboardFunctionIsOn) {
                document.removeEventListener('keydown', callMeWhenKeyboardIsPressed);
            }
        },

        hide : function( ) {  },

        update : function( content ) {  }

    };

    $.fn.mazeBoard = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.mazeBoard' );
        }    
    };

})( jQuery );


 

var index = 0;
function solve(solutionObj) {
    //index++;
    len = solutionObj.solutionString.length;
    if (index >= len) {
        clearInterval(solutionObj.interval);
        return;
    }
    
        switch (solutionObj.solutionString[index])
        {
            case '0':
                {
                    context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                    currPosCol--;
                    context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                    break;
                }
            case '1':
                {
                    context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                    currPosCol++;
                    context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                    break;
                }
            case '2':
                {
                    context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                    currPosRow--;
                    context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                    break;
                }
            case '3':
                {
                    context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                    currPosRow++;
                    context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                    break;
                }
            default:
                break;
    }
        if (index < len) {
            index++;
        }
};
