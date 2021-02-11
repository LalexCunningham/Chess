import Piece from './piece.js';

export default class Bishop extends Piece {
	constructor(color, currentCoordinates, board, player, enemyPlayer) {
		super(color, board.pieces.BISHOP, currentCoordinates, board, player, enemyPlayer);
	}

	getPossibleMoves () {
		let possibleMoves = []
		let attackingMoves = []

		// Positive X and Y
		for (let i = 1; i < 9; i++) {
			let coordinate = [this.currentCoordinates[0] + i, this.currentCoordinates[1] + i]

			if (coordinate[0] > 8 || coordinate[1] > 8) {
				break;
			}

			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1]

			if (square === null) {
				possibleMoves.push(coordinate)
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinate, square])
				break;
			}
		}

		// Positive X Negative Y
		for (let i = 1; i < 9; i++) {
			let coordinate = [this.currentCoordinates[0] + i, this.currentCoordinates[1] - i]

			if (coordinate[0] > 8 || coordinate[1] < 1) {
				break;
			}

			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1]

			if (square === null) {
				possibleMoves.push(coordinate);
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinate, square])
				break;
			}
		}


		// Negative X and Y
		for (let i = 1; i < 9; i++) {
			let coordinate = [this.currentCoordinates[0] - i, this.currentCoordinates[1] - i]

			if (coordinate[0] < 1 || coordinate[1] < 1) {
				break;
			}

			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1]

			if (square === null) {
				possibleMoves.push(coordinate)
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinate, square])
				break;
			}
		}

		// Negative X Positive Y
		for (let i = 1; i < 9; i++) {
			let coordinate = [this.currentCoordinates[0] - i, this.currentCoordinates[1] + i]

			if (coordinate[0] < 1 || coordinate[1] > 8) {
				break;
			}

			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1]

			if (square === null) {
				possibleMoves.push(coordinate)
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinate, square])
				break;
			}
		}

		return [possibleMoves, attackingMoves];
	}

	getCheckingMoves() {
		let moves = []

		// Positive X and Y
		for (let i = 1; i < 9; i++) {
			let coordinate = [this.currentCoordinates[0] + i, this.currentCoordinates[1] + i];

			if (coordinate[0] > 8 || coordinate[1] > 8) {
				break;
			}

			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1]

			if (square === null) {
				moves.push(coordinate);
			} else if (square.color === this.color) {
				moves.push(coordinate);
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {
					moves.push(coordinate);
				} else {
					break;					
				}
			}
		}

		// Positive X Negative Y
		for (let i = 1; i < 9; i++) {
			let coordinate = [this.currentCoordinates[0] + i, this.currentCoordinates[1] - i];

			if (coordinate[0] > 8 || coordinate[1] < 1) {
				break;
			}

			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1]

			if (square === null) {
				moves.push(coordinate)
			} else if (square.color === this.color) {
				moves.push(coordinate)
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {
					moves.push(coordinate);
				} else {
					break;					
				}
			}
		}


		// Negative X and Y
		for (let i = 1; i < 9; i++) {
			let coordinate = [this.currentCoordinates[0] - i, this.currentCoordinates[1] - i];

			if (coordinate[0] < 1 || coordinate[1] < 1) {
				break;
			}

			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1]

			if (square === null) {
				moves.push(coordinate)
			} else if (square.color === this.color) {
				moves.push(coordinate)
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {
					moves.push(coordinate);
				} else {
					break;					
				}
			}
		}

		// Negative X Positive Y
		for (let i = 1; i < 9; i++) {
			let coordinate = [this.currentCoordinates[0] - i, this.currentCoordinates[1] + i];

			if (coordinate[0] < 1 || coordinate[1] > 8) {
				break;
			}

			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1]

			if (square === null) {
				moves.push(coordinate)
			} else if (square.color === this.color) {
				moves.push(coordinate)
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {
					moves.push(coordinate);
				} else {
					break;					
				}
			}
		}
		return moves;
	}
}