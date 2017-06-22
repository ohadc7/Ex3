keyboardFunctionIsOn = false;
keyboardIsblocked = false;
var index = 0;

(function ($) {
    $.fn.mazeBoard = function (mazeData,rows,cols, startRow, startCol, exitRow, exitCol, playerImage, exitImage, isEnabled, callbackFunctionForMove) {
        var mazeObject = {
          
            userImg: playerImage,
            endImg: exitImage,
            maze: mazeData,
            rows: rows,
            cols: cols,
            goalPosRow: exitRow,
            goalPosCol: exitCol,
            currPosRow: startRow,
            currPosCol: startCol,
            movable: isEnabled,
            callbackFunc: callbackFunctionForMove,


            drawMaze: function (nameOfCanvas) {
                var Canvas = document.getElementById(nameOfCanvas);
                context = Canvas.getContext("2d");
                cellWidth = Canvas.width / this.cols;
                cellHeight = Canvas.height / this.rows;
                userImg =  this.userImg;
                currPosRow = this.currPosRow;
                currPosCol = this.currPosCol;
                callbackFunc = this.callbackFunc;
                maze = this.maze;
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
                        if (keyboardFunctionIsOn && !keyboardIsblocked) {
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
                        }
                    };



                if (this.movable) {
                    'use strict';
                    keyboardFunctionIsOn = true;
                    document.addEventListener('keydown', callMeWhenKeyboardIsPressed, false);
                }
            },

            solveMaze: function (nameOfCanvas,data) {
                var canvas = document.getElementById(nameOfCanvas);
                context = canvas.getContext("2d");
                index = 0;
                var solveObj = { solutionString: data, interval: null, userImg: this.userImg, currPosRow:this.currPosRow, currPosCol: this.currPosCol, };
                keyboardIsblocked = true;
                context.clearRect(this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
               
                context.drawImage(this.userImg, this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                solveObj.interval = setInterval(function() {
                    len = solveObj.solutionString.length;
                    if (index >= len) {
                        clearInterval(solveObj.interval);
                        keyboardIsblocked = false;
                        return;
                    }
                    switch (solveObj.solutionString[index]) {
                        case '0':
                            {
                                context.clearRect(solveObj.currPosCol * cellWidth, solveObj.currPosRow * cellHeight, cellWidth, cellHeight);
                                solveObj.currPosCol--;
                                context.drawImage(solveObj.userImg, solveObj.currPosCol * cellWidth, solveObj.currPosRow * cellHeight, cellWidth, cellHeight);
                                break;
                            }
                        case '1':
                            {
                                context.clearRect(solveObj.currPosCol * cellWidth, solveObj.currPosRow * cellHeight, cellWidth, cellHeight);
                                solveObj.currPosCol++;
                                context.drawImage(solveObj.userImg, solveObj.currPosCol * cellWidth, solveObj.currPosRow * cellHeight, cellWidth, cellHeight);
                                break;
                            }
                        case '2':
                            {
                                context.clearRect(solveObj.currPosCol * cellWidth, solveObj.currPosRow * cellHeight, cellWidth, cellHeight);
                                solveObj.currPosRow--;
                                context.drawImage(solveObj.userImg, solveObj.currPosCol * cellWidth, solveObj.currPosRow * cellHeight, cellWidth, cellHeight);
                                break;
                            }
                        case '3':
                            {
                                context.clearRect(solveObj.currPosCol * cellWidth, solveObj.currPosRow * cellHeight, cellWidth, cellHeight);
                                solveObj.currPosRow++;
                                context.drawImage(solveObj.userImg, solveObj.currPosCol * cellWidth, solveObj.currPosRow * cellHeight, cellWidth, cellHeight);
                                break;
                            }
                        default:
                            break;
                    }
                    if (index < len) {
                        index++;
                    }
                }, 1000);
            },
            clearCanvas: function (nameOfCanvas) {
                var canvas = document.getElementById(nameOfCanvas);
                context = canvas.getContext("2d");
                context.clearRect(0, 0, canvas.width, canvas.height);
                if (keyboardFunctionIsOn) {
                    document.removeEventListener('keydown', callMeWhenKeyboardIsPressed);
                }
            },         

        }
        return mazeObject
    };

    
}( jQuery ));