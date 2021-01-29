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

		this.pieceList = [];
		this.highlightedSquares = [];
		this.highlightedPiece;
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

	getPiece (element) {
		return this.pieceList[parseInt(element.id)];
	}

	clearHighlightedSquares () {
		this.highlightedPiece = undefined;
		for (let square of this.highlightedSquares) {
			square.unstyleSquare();
			square.cssElement.removeEventListener('click', square);
			square.cssElement.removeEventListener('click', square);
		}
		this.highlightedSquares = [];
	}	

}