import HighlightedSquare from './highlightedSquare.js';

class castlingSquare extends HighlightedSquare {
	constructor (coordinates, board, piece, rook, rookCoordinates) {
		super(coordinates, 'move', board);
		this.piece = piece;
		this.rook = rook;
		this.rookCoordinates = rookCoordinates;
	}

	removeOnClick () {
		this.unstyleSquare();
		this.cssElement.removeEventListener('click', this);
	}

	click () {
		let newCoordinates = [this.cssElement.cellIndex, this.cssElement.parentNode.rowIndex];
		this.piece.move(this.board.tableToChessCoordinate(newCoordinates));
		this.rook.move(this.rookCoordinates);
		this.board.clearHighlightedSquares();
	} 
}

export default castlingSquare;