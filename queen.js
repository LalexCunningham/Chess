import Piece from './piece.js';

export default class Queen extends Piece {
	constructor (color, currentCoordinates, board, player, enemyPlayer) {
		super(color, board.pieces.QUEEN, currentCoordinates, board, player, enemyPlayer);
	}

	getPossibleMoves () {
		let possibleMoves = []
		let attackingMoves = []

		// Move in positive Y
		let axisBlocked = false;
		for (let i = this.currentCoordinates[1] + 1; i < 9; i++) {

			let coordinates = [this.currentCoordinates[0], i];
			let square = this.board.pieceLocations[coordinates[0]-1][coordinates[1]-1];

			if (square === null) {
				possibleMoves.push(coordinates);
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinates, square]);
				break;
			}
		}

		// Move in positive X
		axisBlocked = false;
		for (let i = this.currentCoordinates[0] + 1; i < 9; i++) {

			let coordinates = [i, this.currentCoordinates[1]];
			let square = this.board.pieceLocations[coordinates[0]-1][coordinates[1]-1];

			if (square === null) {
				possibleMoves.push(coordinates);
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinates, square]);
				break;
			}
		}

		// Move in negative Y
		axisBlocked = false;
		for (let i = this.currentCoordinates[1] - 1; i > 0; i--) {

			let coordinates = [this.currentCoordinates[0], i];
			let square = this.board.pieceLocations[coordinates[0]-1][coordinates[1]-1];

			if (square === null) {
				possibleMoves.push(coordinates);
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinates, square]);
				break;
			}
		}

		// Move in negative X
		axisBlocked = false;
		for (let i = this.currentCoordinates[0] - 1; i > 0; i--) {

			let coordinates = [i, this.currentCoordinates[1]];
			let square = this.board.pieceLocations[coordinates[0]-1][coordinates[1]-1];

			if (square === null) {
				possibleMoves.push(coordinates);
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinates, square]);
				break;
			}
		}

		// Positive X and Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {

			let coordinates = [this.currentCoordinates[0] + i, this.currentCoordinates[1] + i];

			if (coordinates[0] > 8 || coordinates[1] > 8) {
				break;
			}

			let square = this.board.pieceLocations[coordinates[0]-1][coordinates[1]-1];

			if (square === null) {
				possibleMoves.push(coordinates);
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinates, square]);
				break;
			}
		}

		// Positive X Negative Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {

			let coordinates = [this.currentCoordinates[0] + i, this.currentCoordinates[1] - i];

			if (coordinates[0] > 8 || coordinates[1] < 1) {
				break;
			}

			let square = this.board.pieceLocations[coordinates[0]-1][coordinates[1]-1];

			if (square === null) {
				possibleMoves.push(coordinates);
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinates, square]);
				break;
			}
		}


		// Negative X and Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {

			let coordinates = [this.currentCoordinates[0] - i, this.currentCoordinates[1] - i];

			if (coordinates[0] < 1 || coordinates[1] < 1) {
				break;
			}

			let square = this.board.pieceLocations[coordinates[0]-1][coordinates[1]-1];

			if (square === null) {
				possibleMoves.push(coordinates);
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinates, square]);
				break;
			}
		}

		// Negative X Positive Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {

			let coordinates = [this.currentCoordinates[0] - i, this.currentCoordinates[1] + i];

			if (coordinates[0] < 1 || coordinates[1] > 8) {
				break;
			}

			let square = this.board.pieceLocations[coordinates[0]-1][coordinates[1]-1];

			if (square === null) {
				possibleMoves.push(coordinates);
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([coordinates, square]);
				break;
			}
		}
		return [possibleMoves, attackingMoves];
	}

	// Returns all squares that would put an enemy king in check by this piece
	getCheckingMoves () {
		let moves = [];

		// Positive Y
		let axisBlocked = false;
		for (let i = this.currentCoordinates[1] + 1; i < 9; i++) {

			let coordinates = [this.currentCoordinates[0], i];
			let square = this.board.pieceLocations[coordinates[0] - 1][coordinates[1] - 1];

			if (square === null) {
				moves.push(coordinates);
			} else if (square.color === this.color) {
				moves.push(coordinates);
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {

				} else {
					break;					
				}
			}
		}

		// Positive X
		axisBlocked = false;
		for (let i = this.currentCoordinates[0] + 1; i < 9; i++) {
			let coordinates = [i, this.currentCoordinates[1]];
			let square = this.board.pieceLocations[coordinates[0] - 1][coordinates[1] - 1];

			if (square === null) {
				moves.push(coordinates);
			} else if (square.color === this.color) {
				moves.push(coordinates);
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {

				} else {
					break;					
				}
			}
		}

		// Negative Y
		axisBlocked = false;
		for (let i = this.currentCoordinates[1] - 1; i > 0; i--) {
			let coordinates = [this.currentCoordinates[0], i];
			let square = this.board.pieceLocations[coordinates[0] - 1][coordinates[1] - 1];

			if (square === null) {
				moves.push(coordinates);
			} else if (square.color === this.color) {
				moves.push(coordinates);
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {

				} else {
					break;					
				}
			}
		}

		// Negative X
		axisBlocked = false;
		for (let i = this.currentCoordinates[0] - 1; i > 0; i--) {
			let coordinates = [i, this.currentCoordinates[1]];
			let square = this.board.pieceLocations[coordinates[0] - 1][coordinates[1] - 1];

			if (square === null) {
				moves.push(coordinates);
			} else if (square.color === this.color) {
				moves.push(coordinates);
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {

				} else {
					break;					
				}
			}
		}

		// Positive X and Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			let coordinates = [this.currentCoordinates[0] + i, this.currentCoordinates[1] + i];
			if (coordinates[0] > 8 || coordinates[1] > 8) {
				break;
			} 
			let square = this.board.pieceLocations[coordinates[0] - 1][coordinates[1] - 1];

			if (square === null) {
				moves.push(coordinates);
			} else if (square.color === this.color) {
				moves.push(coordinates);
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {

				} else {
					break;					
				}
			}
		}

		// Positive X Negative Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			let coordinates = [this.currentCoordinates[0] + i, this.currentCoordinates[1] - i];
			if (coordinates[0] > 8 || coordinates[1] < 1) {
				break;
			}
			let square = this.board.pieceLocations[coordinates[0] - 1][coordinates[1] - 1];

			if (square === null) {
				moves.push(coordinates);
			} else if (square.color === this.color) {
				moves.push(coordinates);
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {

				} else {
					break;					
				}
			}
		}


		// Negative X and Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			let coordinates = [this.currentCoordinates[0] - i, this.currentCoordinates[1] - i];
			if (coordinates[0] < 1 || coordinates[1] < 1) {
				break;
			}
			let square = this.board.pieceLocations[coordinates[0] - 1][coordinates[1] - 1];

			if (square === null) {
				moves.push(coordinates);
			} else if (square.color === this.color) {
				moves.push(coordinates);
				break;
			} else {
				if (square.piece === this.board.pieces.KING) {

				} else {
					break;					
				}
			}
		}

		// Negative X Positive Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {

			let coordinates = [this.currentCoordinates[0] - i, this.currentCoordinates[1] + i];
			if (coordinates[0] < 1 || coordinates[1] > 8) {
				break;
			}
			let square = this.board.pieceLocations[coordinates[0] - 1][coordinates[1] - 1];

			if (square === null) {
				moves.push(coordinates);
			} else if (square.color === this.color) {
				moves.push(coordinates);
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