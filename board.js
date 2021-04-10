export default class Board {
	constructor () {
		this.pieces = {
			PAWN: 'pawn',
			QUEEN: 'queen',
			KING: 'king',
			KNIGHT: 'knight',
			ROOK: 'rook',
			BISHOP: 'bishop'
		}

		this.moves = {
			MOVE: 'move',
			ATTACK: 'attack'  
		}	

		this.pieceLocations = [
					[null,null,null,null,null,null,null,null],
					[null,null,null,null,null,null,null,null],
					[null,null,null,null,null,null,null,null],
					[null,null,null,null,null,null,null,null],
					[null,null,null,null,null,null,null,null],
					[null,null,null,null,null,null,null,null],
					[null,null,null,null,null,null,null,null],
					[null,null,null,null,null,null,null,null]]
					
		this.highlightedSquares = [];
		this.pieceList = [];
	}

	tableToChessCoordinate (coordinate) {
		let x = coordinate[0] + 1;
		let y = 8 - coordinate[1];
		return [x, y]
	}

	chessToTableCoordinate (coordinate) {
		let x = coordinate[0] - 1;
		let y = 8 - coordinate[1]; 
		return [x, y]
	}

	clearHighlightedSquares () {
		this.highlightedPiece = undefined;
		for (let square of this.highlightedSquares) {
			square.removeOnClick();
		}
		this.highlightedSquares = [];
	}	

	isOccupied(coordinate, colors) {
		for (let piece of this.pieceList) {
			for (let color of colors) {
				if (piece.color === color) {
					if (piece.currentCoordinates[0] === coordinate[0] &&
						piece.currentCoordinates[1] === coordinate[1]) {
						return true;
					}
				}
			}
		}

		return false;
	}

}