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
                var Canvas1 = document.getElementById(nameOfCanvas);
                var context1 = Canvas1.getContext("2d");
                var cellWidth1 = Canvas1.width / this.cols;
                var cellHeight1 = Canvas1.height / this.rows;
                var userImg1 =  this.userImg;
                var currPosRow1 = this.currPosRow;
                var currPosCol1 = this.currPosCol;
                var callbackFunc1 = this.callbackFunc;
                var maze1 = this.maze;
                for (var i = 0; i < this.rows; i++) {
                    for (var j = 0; j < this.cols; j++) {
                        if (this.maze[i][j] == 1) {
                            context1.fillRect(cellWidth1 * j, cellHeight1 * i, cellWidth1, cellHeight1);
                        }
                    }
                }

                context1.drawImage(this.userImg, this.currPosCol * cellWidth1, this.currPosRow * cellHeight1, cellWidth1, cellHeight1);
                context1.drawImage(this.endImg, this.goalPosCol * cellWidth1, this.goalPosRow * cellHeight1, cellWidth1, cellHeight1);

                if (this.movable) {
                    'use strict';
                    document.onkeydown =
                        function () {
                            if (!keyboardIsblocked) {
                                const keyName = event.key;
                                switch (keyName) {
                                    case "ArrowDown":
                                        if (currPosRow1 + 1 < rows && maze1[currPosRow1 + 1][currPosCol1] != 1) {
                                            context1.clearRect(currPosCol1 * cellWidth1, currPosRow1 * cellHeight1, cellWidth1, cellHeight1);
                                            currPosRow1++;
                                            context1.drawImage(userImg1, currPosCol1 * cellWidth1, currPosRow1 * cellHeight1, cellWidth1, cellHeight1);
                                            callbackFunc1("down", currPosRow1, currPosCol1);
                                        }
                                        break;
                                    case "ArrowUp":
                                        if (currPosRow1 - 1 >= 0 && maze1[currPosRow1 - 1][currPosCol1] != 1) {
                                            context1.clearRect(currPosCol1 * cellWidth1, currPosRow1 * cellHeight1, cellWidth1, cellHeight1);
                                            currPosRow1--;
                                            context1.drawImage(userImg1, currPosCol1 * cellWidth1, currPosRow1 * cellHeight1, cellWidth1, cellHeight1);
                                            callbackFunc1("up", currPosRow1, currPosCol1);
                                        }
                                        break;
                                    case "ArrowLeft":
                                        if (currPosCol1 - 1 >= 0 && maze1[currPosRow1][currPosCol1 - 1] != 1) {
                                            context1.clearRect(currPosCol1 * cellWidth1, currPosRow1 * cellHeight1, cellWidth1, cellHeight1);
                                            currPosCol1--;
                                            context1.drawImage(userImg1, currPosCol1 * cellWidth1, currPosRow1 * cellHeight1, cellWidth1, cellHeight1);
                                            callbackFunc1("left", currPosRow1, currPosCol1);
                                        }
                                        break;
                                    case "ArrowRight":
                                        if (currPosCol1 + 1 < cols && maze1[currPosRow1][currPosCol1 + 1] != 1) {
                                            context1.clearRect(currPosCol1 * cellWidth1, currPosRow1 * cellHeight1, cellWidth1, cellHeight1);
                                            currPosCol1++;
                                            context1.drawImage(userImg1, currPosCol1 * cellWidth1, currPosRow1 * cellHeight1, cellWidth1, cellHeight1);
                                            callbackFunc1("right", currPosRow1, currPosCol1);
                                        }
                                        break;
                                    default:
                                        return; // Quit when this doesn't handle the key event.
                                }
                            }
                        };
                }
            },


            solveMaze: function (nameOfCanvas,data) {
                var canvas = document.getElementById(nameOfCanvas);
                context = canvas.getContext("2d");
                cellWidth = canvas.width / this.cols;
                cellHeight = canvas.height / this.rows;
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
            clearCanvas: function (nameOfCanvas, isIt) {
                var canvas = document.getElementById(nameOfCanvas);
                context = canvas.getContext("2d");
                context.clearRect(0, 0, canvas.width, canvas.height);
                document.onkeydown = null;
            },         

            move: function (nameOfCanvas, direction) {
                var Canvas = document.getElementById(nameOfCanvas);
                context = Canvas.getContext("2d");
                cellWidth = Canvas.width / this.cols;
                cellHeight = Canvas.height / this.rows;
                userImg = this.userImg;
                callbackFunc = this.callbackFunc;
                var maze = this.maze;

                    switch (direction) {
                        case "down":
                            if (this.currPosRow + 1 < rows && maze[this.currPosRow + 1][this.currPosCol] != 1) {
                                context.clearRect(this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                this.currPosRow++;
                                context.drawImage(userImg, this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                callbackFunc("down", this.currPosRow, this.currPosCol);
                            }
                            break;
                        case "up":
                            if (this.currPosRow - 1 >= 0 && maze[this.currPosRow - 1][this.currPosCol] != 1) {
                                context.clearRect(this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                this.currPosRow--;
                                context.drawImage(userImg, this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                callbackFunc("up", this.currPosRow, this.currPosCol);
                            }
                            break;
                        case "left":
                            if (this.currPosCol - 1 >= 0 && maze[this.currPosRow][this.currPosCol - 1] != 1) {
                                context.clearRect(this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                this.currPosCol--;
                                context.drawImage(userImg, this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                callbackFunc("left", this.currPosRow, this.currPosCol);
                            }
                            break;
                        case "right":
                            if (this.currPosCol + 1 < cols && maze[this.currPosRow][this.currPosCol + 1] != 1) {
                                context.clearRect(this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                this.currPosCol++;
                                context.drawImage(userImg, this.currPosCol * cellWidth, this.currPosRow * cellHeight, cellWidth, cellHeight);
                                callbackFunc("right", this.currPosRow, this.currPosCol);
                            }
                            break;
                        default:
                            return; // Quit when this doesn't handle the key event.
                    }
            },

        }
        return mazeObject
    };

}( jQuery ));