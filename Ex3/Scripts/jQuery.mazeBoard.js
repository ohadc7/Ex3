/*
* credit: thanks to the first answer in
* https://stackoverflow.com/questions/1117086/how-to-create-a-jquery-plugin-with-methods/22976877#22976877
* and to https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
*/

(function( $ ){

    var methods = {
        mazeBoard : function(mazeData, startRow, startCol, exitRow, exitCol, playerImage, exitImage //rows, cols, initialPos, goalPos
																									) {
			$(this).data("mazeData", mazeData);
			$(this).data("startPos", {row: startRow, col: startCol});
			$(this).data("playerPos", {row: startRow, col: startCol});
			$(this).data("exitPos", {row: exitRow, col: exitCol});
			$(this).data("playerImage", playerImage);
			$(this).data("exitImage", exitImage);		
        },

        drawMaze : function( ) {
			var thisCanvas = $(this)[0];
			var userImg = $(this).data("playerImage");
			var endImg = $(this).data("exitImage");
			var maze = $(this).data("mazeData");
			var myCanvas = $(this);
			var context = thisCanvas.getContext("2d");
			var rows = maze.length;
			var cols = maze[0].length;
			var cellWidth = thisCanvas.width / cols;
			var cellHeight = thisCanvas.height / rows;
			
			for (var i = 0; i < rows; i++) {
				for (var j = 0; j < cols; j++) {
					if (maze[i][j] == 1) {
						context.fillRect(cellWidth * j, cellHeight * i, cellWidth, cellHeight);
					}
				}
			}
			goalPosRow = $(this).data("exitPos").row;
			goalPosCol = $(this).data("exitPos").col;
			currPosRow = $(this).data("playerPos").row;
			currPosCol = $(this).data("playerPos").col;
			
			window.onload = function() {
				context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
        		context.drawImage(endImg, goalPosCol * cellWidth, goalPosRow * cellHeight, cellWidth, cellHeight);
			}

			'use strict';
			document.addEventListener('keydown', (event) => {
				const keyName = event.key;
				switch(keyName) {
					case "ArrowDown":
						if (currPosRow + 1 < rows && maze[currPosRow + 1][currPosCol] != 1) {
							context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
							currPosRow++;
							context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
						}
						break;
					case "ArrowUp":
						if (currPosRow - 1 >= 0 && maze[currPosRow - 1][currPosCol] != 1) {
							context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
							currPosRow--;
							context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
						}
						break;
					case "ArrowLeft":
						if (currPosCol - 1 >= 0 && maze[currPosRow][currPosCol - 1] != 1) {
							context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
							currPosCol--;
							context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
						}
						break;
					case "ArrowRight":
						if (currPosCol + 1 < cols && maze[currPosRow][currPosCol + 1] != 1) {
							context.clearRect(currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
							currPosCol++;
							context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
						}
						break;
					default:
						return; // Quit when this doesn't handle the key event.
				}
			}, false);

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


/*
// JavaScript source code
(function ($) {
	$.fn.mazeBoard = function (
	//canvas, 
	maze, rows, cols, initialPos, goalPos) {

		//_canvas = document.getElementById(canvas);
		_canvas = $(this);
		_maze = maze;
		_rows = rows;
		_cols = cols;
		_initialPos = initialPos;
		_goalPos = goalPos;
		_currPos = initialPos;


		//drawMaze = function () {

			var userImg = document.getElementById("user");
			var endImg = document.getElementById("end");
			var maze = this._maze;
			var myCanvas = _canvas;
			
			//var currWidth = $(this).width();
			
			var context = this.getContext("2d");
			var rows = maze.length;
			var cols = maze[0].length;
			var cellWidth = this._canvas.width / cols;
			var cellHeight = this._canvas.height / rows;

			for (var i = 0; i < rows; i++) {
				for (var j = 0; j < cols; j++) {
					if (maze[i][j] == 1) {
						context.fillRect(cellWidth * j, cellHeight * i, cellWidth, cellHeight);
					}
				}
			}
			const goalPosRow = this._goalPos.row;
			const goalPosCol = this._goalPos.col;
			const currPosRow = this._currPos.row;
			const currPosCol = this._currPos.col;
			window.onload = function() {
				context.drawImage(userImg, currPosCol * cellWidth, currPosRow * cellHeight, cellWidth, cellHeight);
        		context.drawImage(endImg, goalPosCol * cellWidth, goalPosRow * cellHeight, cellWidth, cellHeight);
			}
		
		//};

		// Implement your plugin here
		//var x = 0;
		//alert(x);

		return this;
	};
})(jQuery);


class Position {
	constructor(row, col) {
		this._row = row;
		this._col = col;
	}
	get row() {
		return this._row;
	}
	get col() {
		return this._col;
	}
}
*/