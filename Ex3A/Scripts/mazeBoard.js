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
    $.fn.mazeBoard = function (mazeData,rows,cols, startRow, startCol, exitRow, exitCol, playerImage, exitImage, isEnabled, callbackFunctionForMove) {
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
            rows: rows,
            cols: cols,
            goalPosRow: startRow,
            goalPosCol: startCol,
            currPosRow: exitRow,
       currPosCol: exitCol,
            




            callbackFunc: callbackFunctionForMove,


            drawMaze: function (nameOfCanvas) {
                var Canvas = document.getElementById(nameOfCanvas);
                context = Canvas.getContext("2d");
                cellWidth = Canvas.width / this.cols;
                cellHeight = Canvas.height / this.rows;
                for (var i = 0; i < this.rows; i++) {
                    for (var j = 0; j < this.cols; j++) {
                        if (this.maze[i][j] == 1) {
                            context.fillRect(cellWidth * j, cellHeight * i, cellWidth, cellHeight);
                        }
                    }
                }
               

                context.drawImage(this.userImg, this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                context.drawImage(this.endImg, this.goalPosCol * cellWidth, this.goalPosRow * cellHeight, cellWidth, cellHeight);

                callMeWhenKeyboardIsPressed =
                    function () {
                        //(event) => {
                        if (keyboardFunctionIsOn && !keyboardIsblocked) {
                            const keyName = event.key;
                            switch (keyName) {
                                case "ArrowDown":
                                    if (this.this.this.currPosRow + 1 < this.rows && this.maze[this.currPosRow + 1][this.currPosCol] != 1) {
                                        context.clearRect(this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                        this.this.currPosRow++;
                                        context.drawImage(this.userImg, this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                        callbackFunc("down", this.currPosRow, this.currPosCol);
                                        // checkFinish();
                                    }
                                    break;
                                case "ArrowUp":
                                    if (this.currPosRow - 1 >= 0 && this.maze[this.currPosRow - 1][this.currPosCol] != 1) {
                                        context.clearRect(this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                        this.currPosRow--;
                                        context.drawImage(this.userImg, this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                        callbackFunc("up", this.currPosRow, this.currPosCol);
                                        //  checkFinish();
                                    }
                                    break;
                                case "ArrowLeft":
                                    if (this.currPosCol - 1 >= 0 && this.maze[this.currPosRow][this.currPosCol - 1] != 1) {
                                        context.clearRect(this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                        this.currPosCol--;
                                        context.drawImage(this.userImg, this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                        callbackFunc("left", this.currPosRow, this.currPosCol);
                                        // checkFinish();
                                    }
                                    break;
                                case "ArrowRight":
                                    if (this.currPosCol + 1 < cols && this.maze[this.currPosRow][this.currPosCol + 1] != 1) {
                                        context.clearRect(this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                        this.currPosCol++;
                                        context.drawImage(this.userImg, this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                        callbackFunc("right", this.currPosRow, this.currPosCol);
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

            solveMaze: function (nameOfCanvas,data) {
                var canvas = document.getElementById(nameOfCanvas);
                context = canvas.getContext("2d");
                index = 0;
                var solveObj = { solutionString: data, interval: null };
                keyboardIsblocked = true;
                context.clearRect(this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                this.currPosRow = $(this).data("playerStartPos").row;
                this.currPosCol = $(this).data("playerStartPos").col;
                context.drawImage(this.userImg, this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                solveObj.interval = setInterval(function () { solve(solveObj) }, 1000);
            },
            clearCanvas: function (nameOfCanvas) {
                //thisCanvas = $(this)[0];
                var canvas = document.getElementById(nameOfCanvas);
                context = canvas.getContext("2d");

                context.clearRect(0, 0, canvas.width, canvas.height);
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
                                context.clearRect(this.currPosCol * cellWidth, this.this.currPosRow * cellHeight, cellWidth, cellHeight);
                                this.currPosCol--;
                                context.drawImage(userImg, this.currPosCol * cellWidth, this.this.currPosRow * cellHeight, cellWidth, cellHeight);
                                break;
                            }
                        case '1':
                            {
                                context.clearRect(this.currPosCol * cellWidth, this.this.currPosRow * cellHeight, cellWidth, cellHeight);
                                this.currPosCol++;
                                context.drawImage(userImg, this.currPosCol * cellWidth, this.this.currPosRow * cellHeight, cellWidth, cellHeight);
                                break;
                            }
                        case '2':
                            {
                                context.clearRect(this.currPosCol * cellWidth, this.this.currPosRow * cellHeight, cellWidth, cellHeight);
                                this.this.currPosRow--;
                                context.drawImage(userImg, this.currPosCol * cellWidth, this.this.currPosRow * cellHeight, cellWidth, cellHeight);
                                break;
                            }
                        case '3':
                            {
                                context.clearRect(this.currPosCol * cellWidth, this.this.currPosRow * cellHeight, cellWidth, cellHeight);
                                this.this.currPosRow++;
                                context.drawImage(userImg, this.currPosCol * cellWidth, this.this.currPosRow * cellHeight, cellWidth, cellHeight);
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