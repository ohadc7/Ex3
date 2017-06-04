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


// JavaScript source code
class Maze {
	/*
	example:
	    <canvas id="mazeCanvasName" width="300" height="90" style="border:2px black solid"></canvas>
	    <img src="User.png" id="user" style="display: none;"/>
		<img src="End.jpg" id="end" style="display: none;"/>
		<script>
		maze2dArray =  [[0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
						[0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
						[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]];
        const initPos = new Position(0,0);
        const goalPos = new Position(2,9);
        maze = new Maze("mazeCanvasName", maze2dArray, 3, 11, initPos, goalPos);
		</script>
	*/
	constructor(canvas, maze, rows, cols, initialPos, goalPos) {
		this._canvas = document.getElementById(canvas);
		this._maze = maze;
		this._rows = rows;
		this._cols = cols;
		this._initialPos = initialPos;
		this._goalPos = goalPos;
		this._currPos = initialPos;
	}
	get rows() {
		return this._rows;
	}
	get cols() {
		return this._cols;
	}
	get initialPos() {
		return this._initialPos;
	}
	get goalPos() {
		return this._goalPos;
	}
	get currPos() {
		return this._currPos;
	}

	calcArea() {
		return this._rows * this._cols;
	}
	
	drawMaze() {
		var userImg = document.getElementById("user");
		var endImg = document.getElementById("end");
		var maze = this._maze;
		var myCanvas = this._canvas;
		var context = this._canvas.getContext("2d");
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
	}
	
}