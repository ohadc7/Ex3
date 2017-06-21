/*
* credit: thanks to the first answer in
* https://stackoverflow.com/questions/1117086/how-to-create-a-jquery-plugin-with-methods/22976877#22976877
* and to https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
*/
keyboardFunctionIsOn = false;
keyboardIsblocked = false;
var index = 0;

(function ($) {
    var callbackFunc;
    $.fn.mazeBoard = function (mazeData, startRow, startCol, exitRow, exitCol, playerImage, exitImage, isEnabled, callbackFunctionForMove) {
        var mazeObject = {
            //$(this).data("mazeData", mazeData);
            //$(this).data("playerStartPos", { row: startRow, col: startCol });
            //$(this).data("exitPos", { row: exitRow, col: exitCol });
            //$(this).data("playerImage", playerImage);
            //$(this).data("exitImage", exitImage);
            //$(this).data("isEnabled", isEnabled);

            //thisCanvas: $(this)[0],
            userImg: playerImage,
            endImg: exitImage,
            maze: mazeData,
           // myCanvas: $(this),
           // context: thisCanvas.getContext("2d"),
            rows: maze.length,
            cols: maze[0].length,




            callbackFunc: callbackFunctionForMove,


            drawMaze: function (nameOfCanvas) {
                var Canvas = document.getElementById(nameOfCanvas);
                cellWidth = canvas.width / cols;
                cellHeight = canvas.height / rows;
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
                        if (keyboardFunctionIsOn && !keyboardIsblocked) {
                            const keyName = event.key;
                            switch (keyName) {
                                case "ArrowDown":
                                    if (currPosRow + 1 < rows && maze[currPosRow + 1][currPosCol] != 1) {
                                        context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                        currPosRow++;
                                        context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                        callbackFunc("down", currPosRow, currPosCol);
                                        // checkFinish();
                                    }
                                    break;
                                case "ArrowUp":
                                    if (currPosRow - 1 >= 0 && maze[currPosRow - 1][currPosCol] != 1) {
                                        context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                        currPosRow--;
                                        context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                        callbackFunc("up", currPosRow, currPosCol);
                                        //  checkFinish();
                                    }
                                    break;
                                case "ArrowLeft":
                                    if (currPosCol - 1 >= 0 && maze[currPosRow][currPosCol - 1] != 1) {
                                        context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                        currPosCol--;
                                        context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                        callbackFunc("left", currPosRow, currPosCol);
                                        // checkFinish();
                                    }
                                    break;
                                case "ArrowRight":
                                    if (currPosCol + 1 < cols && maze[currPosRow][currPosCol + 1] != 1) {
                                        context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                        currPosCol++;
                                        context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                                        callbackFunc("right", currPosRow, currPosCol);
                                        // checkFinish();
                                    }
                                    break;
                                default:
                                    return; // Quit when this doesn't handle the key event.
                            }
                        }
                    };



                if ($(this).data("isEnabled")) {
                    'use strict';
                    keyboardFunctionIsOn = true;
                    document.addEventListener('keydown', callMeWhenKeyboardIsPressed, false);
                }
            },

            solveMaze: function (data) {
                index = 0;
                var solveObj = { solutionString: data, interval: null };
                keyboardIsblocked = true;
                context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                currPosRow = $(this).data("playerStartPos").row;
                currPosCol = $(this).data("playerStartPos").col;
                context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
                solveObj.interval = setInterval(function () { solve(solveObj) }, 1000);
            },
            clearCanvas: function (nameOfCanvas) {
                //thisCanvas = $(this)[0];
                var canvas = document.getElementById(nameOfCanvas);
                context = canvas.getContext("2d");

                context.clearRect(0, 0, thisCanvas.width, thisCanvas.height);
                if (keyboardFunctionIsOn) {
                    document.removeEventListener('keydown', callMeWhenKeyboardIsPressed);
                }
            },




            /*
                function solve(solutionObj) {
                    //index++;
                    len = solutionObj.solutionString.length;
                    if (index >= len) {
                        clearInterval(solutionObj.interval);
                        keyboardIsblocked = false;
                        return;
                    }
                    switch (solutionObj.solutionString[index]) {
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
            
                    */

            /*  $.fn.mazeBoard = function(methodOrOptions) {
                  if ( methods[methodOrOptions] ) {
                      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
                  } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
                      // Default to "init"
                      return methods.init.apply( this, arguments );
                  } else {
                      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.mazeBoard' );
                  }    
              };*/
        }
        return mazeObject
    };
}( jQuery ));