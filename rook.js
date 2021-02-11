import Piece from './piece.js';

export default class Rook extends Piece {
	constructor (color, currentCoordinates, board, player, enemyPlayer) {
		super(color, board.pieces.ROOK, currentCoordinates, board, player, enemyPlayer);
	}

	getPossibleMoves () {
		let possibleMoves = []
		let attackingMoves = []

		// Move in positive Y
		for (let i = this.currentCoordinates[1] + 1; i < 9; i++) {

			let coordinate = [this.currentCoordinates[0], i];
			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1];

			if (square === null) {
				possibleMoves.push(coordinate);
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinate, square]);
				break;
			}
		}

		// Move in positive X
		for (let i = this.currentCoordinates[0] + 1; i < 9; i++) {

			let coordinate = [i, this.currentCoordinates[1]];
			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1];

			if (square === null) {
				possibleMoves.push(coordinate);
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinate, square]);
				break;
			}
		}

		// Move in negative Y
		for (let i = this.currentCoordinates[1] - 1; i > 0; i--) {

			let coordinate = [this.currentCoordinates[0], i];
			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1];

			if (square === null) {
				possibleMoves.push(coordinate);
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinate, square]);
				break;
			}
		}

		// Move in negative X
		for (let i = this.currentCoordinates[0] - 1; i > 0; i--) {

			let coordinate = [i, this.currentCoordinates[1]];
			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1];

			if (square === null) {
				possibleMoves.push(coordinate);
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinate, square]);
				break;
			}
		}
		return [possibleMoves, attackingMoves];
	}

	getCheckingMoves () {
		let moves = [];

		for (let i = this.currentCoordinates[1] + 1; i < 9; i++) {

			let coordinate = [this.currentCoordinates[0], i];
			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1];

			if (square === null) {
				moves.push(coordinate);
			} else if (square.color === this.color) {
				moves.push(coordinate);
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {

				} else {
					break;					
				}
			}
		}

		// Move in positive X
		for (let i = this.currentCoordinates[0] + 1; i < 9; i++) {

			let coordinate = [i, this.currentCoordinates[1]];
			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1];

			if (square === null) {
				moves.push(coordinate);
			} else if (square.color === this.color) {
				moves.push(coordinate);
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {

				} else {
					break;					
				}
			}
		}

		// Move in negative Y
		for (let i = this.currentCoordinates[1] - 1; i > 0; i--) {

			let coordinate = [this.currentCoordinates[0], i];
			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1];

			if (square === null) {
				moves.push(coordinate);
			} else if (square.color === this.color) {
				moves.push(coordinate);
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {

				} else {
					break;					
				}
			}
		}

		// Move in negative X
		for (let i = this.currentCoordinates[0] - 1; i > 0; i--) {

			let coordinate = [i, this.currentCoordinates[1]];
			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1];

			if (square === null) {
				moves.push(coordinate);
			} else if (square.color === this.color) {
				moves.push(coordinate);
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {

				} else {
					break;					
				}
			}
		}

		return moves;
	} 
}