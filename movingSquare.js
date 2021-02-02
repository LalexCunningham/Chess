import HighlightedSquare from './highlightedSquare.js';

export default class MovingSquare extends HighlightedSquare {
	constructor (coordinates, board, piece) {
		super(coordinates, 'move', board);
		this.piece = piece;
	}

	removeOnClick () {
		this.unstyleSquare();
		this.cssElement.removeEventListener('click', this);
	}

	click () {
		let newCoordinates = [this.cssElement.cellIndex, this.cssElement.parentNode.rowIndex];
		this.piece.move(this.board.tableToChessCoordinate(newCoordinates));
		this.board.clearHighlightedSquares();
	} 
}