import Piece from './piece.js';

export default class Bishop extends Piece {
	constructor(color, currentCoordinates, id, board, player, enemyPlayer) {
		super(color, board.pieces.BISHOP, currentCoordinates, id, board, player, enemyPlayer);
	}

	getPossibleMoves () {
		let possibleMoves = []
		let attackingMoves = []

		// Positive X and Y
		let axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			if (this.currentCoordinates[0] + i > 8 || this.currentCoordinates[1] + i > 8) {
				break;
			}

			let square = this.board.pieceLocations[(this.currentCoordinates[0] + i) - 1][(this.currentCoordinates[1] + i) - 1]

			if (square === null) {
				possibleMoves.push([this.currentCoordinates[0]+i, this.currentCoordinates[1]+i])
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([[this.currentCoordinates[0]+i, this.currentCoordinates[1]+i], square])
				break;
			}
		}

		// Positive X Negative Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			if (this.currentCoordinates[0] + i > 8 || this.currentCoordinates[1] - i < 1) {
				break;
			}

			let square = this.board.pieceLocations[(this.currentCoordinates[0] + i) - 1][(this.currentCoordinates[1] - i) - 1]

			if (square === null) {
				possibleMoves.push([this.currentCoordinates[0] + i, this.currentCoordinates[1] - i])
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([[this.currentCoordinates[0] + i, this.currentCoordinates[1] - i], square])
				break;
			}

		}


		// Negative X and Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			if (this.currentCoordinates[0] - i < 1 || this.currentCoordinates[1] - i < 1) {
				break;
			}

			let square = this.board.pieceLocations[(this.currentCoordinates[0] - i) - 1][(this.currentCoordinates[1] - i) - 1]

			if (square === null) {
				possibleMoves.push([this.currentCoordinates[0] - i, this.currentCoordinates[1] - i])
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([[this.currentCoordinates[0] - i, this.currentCoordinates[1] - i], square])
				break;
			}

		}

		// Negative X Positive Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			if (this.currentCoordinates[0] - i < 1 || this.currentCoordinates[1] + i > 8) {
				break;
			}

			let square = this.board.pieceLocations[(this.currentCoordinates[0] - i) - 1][(this.currentCoordinates[1] + i) - 1]

			if (square === null) {
				possibleMoves.push([this.currentCoordinates[0] - i, this.currentCoordinates[1] + i])
			} else if (square.color === this.color) {
				break;
			} else {
				attackingMoves.push([[this.currentCoordinates[0] - i, this.currentCoordinates[1] + i], square])
				break;
			}

		}
		return [possibleMoves, attackingMoves];
	}

	getCheckingMoves() {
		let moves = []


		// Positive X and Y
		let axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			if (this.currentCoordinates[0] + i > 8 || this.currentCoordinates[1] + i > 8) {
				break;
			}

			let square = this.board.pieceLocations[(this.currentCoordinates[0] + i) - 1][(this.currentCoordinates[1] + i) - 1]

			if (square === null) {
				moves.push([this.currentCoordinates[0]+i, this.currentCoordinates[1]+i])
			} else if (square.color === this.color) {
				moves.push([[this.currentCoordinates[0]+i, this.currentCoordinates[1]+i], square])
				break;
			} else {
				break;
			}
			
		}

		// Positive X Negative Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			if (this.currentCoordinates[0] + i > 8 || this.currentCoordinates[1] - i < 1) {
				break;
			}

			let square = this.board.pieceLocations[(this.currentCoordinates[0] + i) - 1][(this.currentCoordinates[1] - i) - 1]

			if (square === null) {
				moves.push([this.currentCoordinates[0]+i, this.currentCoordinates[1] - i])
			} else if (square.color === this.color) {
				moves.push([[this.currentCoordinates[0]+i, this.currentCoordinates[1] - i], square])
				break;
			} else {
				break;
			}
		}


		// Negative X and Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			if (this.currentCoordinates[0] - i < 1 || this.currentCoordinates[1] - i < 1) {
				break;
			}

			let square = this.board.pieceLocations[(this.currentCoordinates[0] - i) - 1][(this.currentCoordinates[1] - i) - 1]

			if (square === null) {
				moves.push([this.currentCoordinates[0] - i, this.currentCoordinates[1] - i])
			} else if (square.color === this.color) {
				moves.push([[this.currentCoordinates[0] - i, this.currentCoordinates[1] - i], square])
				break;
			} else {
				break;
			}
		}

		// Negative X Positive Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			if (this.currentCoordinates[0] - i < 1 || this.currentCoordinates[1] + i > 8) {
				break;
			}

			let square = this.board.pieceLocations[(this.currentCoordinates[0] - i) - 1][(this.currentCoordinates[1] + i) - 1]

			if (square === null) {
				moves.push([this.currentCoordinates[0] - i, this.currentCoordinates[1] + i])
			} else if (square.color === this.color) {
				moves.push([[this.currentCoordinates[0] - i, this.currentCoordinates[1] + i], square])
				break;
			} else {
				break;
			}
		}
		return moves;
	}
}