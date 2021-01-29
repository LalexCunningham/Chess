export default class HighlightedSquare {
	constructor (coordinates, type, board) {
		this.board = board;
		let tableCoordinates = this.board.chessToTableCoordinate(coordinates);

		this.type = type;

		this.cssElement = document.getElementById('board').rows[tableCoordinates[1]].cells[tableCoordinates[0]];

		this.styleSquare();

		this.cssElement.addEventListener('click', this);
	}

	styleSquare () {
		let color = window.getComputedStyle(this.cssElement).backgroundColor;

		if (color === 'rgb(153, 153, 153)') {
			if (this.type === this.board.moves.ATTACK) {
				this.cssElement.style.backgroundColor = 'rgb(221, 41, 34)';
			} else {
				this.cssElement.style.backgroundColor = 'rgb(192, 201, 126)';
			}
			
		} else {
			if (this.type === this.board.moves.ATTACK) {
				this.cssElement.style.backgroundColor = 'rgb(221, 41, 30)';
			} else {
				this.cssElement.style.backgroundColor = 'rgb(244, 255, 160)';
			}	
		}
		this.cssElement.style.cursor = 'pointer';
	}

	unstyleSquare () {
		let color = window.getComputedStyle(this.cssElement).backgroundColor;

		if (color === 'rgb(192, 201, 126)' || color === 'rgb(221, 41, 34)') {
			this.cssElement.style.backgroundColor = 'rgb(153, 153, 153)';
		} else {
			this.cssElement.style.backgroundColor = 'rgba(0, 0, 0, 0)';
		}
		this.cssElement.style.cursor = '';
	}


	handleEvent () {
		switch (event.type) {
		case 'click':
			this.click();
			break;
		default:
			console.log("unhandled event type")
		}
	}

	click () {
		if (this.type === this.board.moves.MOVE) {
			let newCoordinates = [this.cssElement.cellIndex, this.cssElement.parentNode.rowIndex];
			this.board.highlightedPiece.move(this.board.tableToChessCoordinate(newCoordinates));
			this.board.clearHighlightedSquares();
		} else if (this.type === this.board.moves.ATTACK) {
			let newCoordinates = [this.cssElement.cellIndex, this.cssElement.parentNode.rowIndex];
			newCoordinates = this.board.tableToChessCoordinate(newCoordinates);
			for (let piece of this.board.highlightedPiece.enemyPlayer.activePieces) {
				if (piece.currentCoordinates[0] === newCoordinates[0] && piece.currentCoordinates[1] === newCoordinates[1]) {
					piece.kill();
				}
			}
			this.board.highlightedPiece.move(newCoordinates);
			this.board.clearHighlightedSquares();
		}
	}
}