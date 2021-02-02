import HighlightedSquare from './highlightedSquare.js';

export default class AttackingSquare extends HighlightedSquare {
	constructor (coordinates, board, piece, endangeredPiece) {
		super(coordinates, 'attack', board);
		this.piece = piece
		this.endangeredPiece = endangeredPiece;
		this.endangeredPiece.cssElement.addEventListener('click', this);
		this.endangeredPiece.cssElement.style.cursor = 'pointer';
	}

	removeOnClick () {
		this.unstyleSquare();
		this.cssElement.removeEventListener('click', this);
		this.endangeredPiece.cssElement.removeEventListener('click', this);
		this.endangeredPiece.cssElement.style.cursor = '';
	}

	click () {
		let newCoordinates = [this.cssElement.cellIndex, this.cssElement.parentNode.rowIndex];
		newCoordinates = this.board.tableToChessCoordinate(newCoordinates);
		this.endangeredPiece.kill();
		this.piece.move(newCoordinates);
		this.board.clearHighlightedSquares();
	}
}