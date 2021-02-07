import Piece from './piece.js';

export default class Queen extends Piece {
	constructor (color, currentCoordinates, id, board, player, enemyPlayer) {
		super(color, board.pieces.QUEEN, currentCoordinates, id, board, player, enemyPlayer);
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

	getCheckingMoves () {
		let moves = [];

		// Move in positive Y
		let axisBlocked = false;
		for (let i = this.currentCoordinates[1] + 1; i < 9; i++) {
			for (let piece of this.player.activePieces) {
				if (this.currentCoordinates[0] === piece.currentCoordinates[0] && i === piece.currentCoordinates[1]) {
					moves.push([[this.currentCoordinates[0], i], piece])
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[0] === piece.currentCoordinates[0] && i === piece.currentCoordinates[1]) {
						axisBlocked = true;
						break;
					}
				}
			}
		}

		// Move in positive X
		axisBlocked = false;
		for (let i = this.currentCoordinates[0] + 1; i < 9; i++) {
			for (let piece of this.player.activePieces) {
				if (this.currentCoordinates[1] === piece.currentCoordinates[1] && i === piece.currentCoordinates[0]) {
					moves.push([[i, this.currentCoordinates[1]], piece])
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[1] === piece.currentCoordinates[1] && i === piece.currentCoordinates[0]) {
						axisBlocked = true;
						break;
					}
				}
			}
		}

		// Move in negative Y
		axisBlocked = false;
		for (let i = this.currentCoordinates[1] - 1; i > 0; i--) {
			for (let piece of this.player.activePieces) {
				if (this.currentCoordinates[0] === piece.currentCoordinates[0] && i === piece.currentCoordinates[1]) {
					moves.push([[this.currentCoordinates[0], i], piece])
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[0] === piece.currentCoordinates[0] && i === piece.currentCoordinates[1]) {
						axisBlocked = true;
						break;
					}
				}
			}
		}

		// Move in negative X
		axisBlocked = false;
		for (let i = this.currentCoordinates[0] - 1; i > 0; i--) {
			for (let piece of this.player.activePieces) {
				if (this.currentCoordinates[1] === piece.currentCoordinates[1] && i === piece.currentCoordinates[0]) {
					moves.push([[i, this.currentCoordinates[1]], piece]);
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[1] === piece.currentCoordinates[1] && i === piece.currentCoordinates[0]) {
						axisBlocked = true;
						break;
					}
				}
			}
		}

		// Positive X and Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			if (this.currentCoordinates[0] + i > 8 || this.currentCoordinates[1] + i > 8) {
				break;
			}
			for (let piece of this.player.activePieces) {
				if (this.currentCoordinates[0] + i === piece.currentCoordinates[0] && this.currentCoordinates[1] + i === piece.currentCoordinates[1]) {
					moves.push([[this.currentCoordinates[0]+i, this.currentCoordinates[1]+i], piece]);
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[0] + i === piece.currentCoordinates[0] && this.currentCoordinates[1] + i === piece.currentCoordinates[1]) {
						axisBlocked = true;
						break;
					}
					
				}
			}
		}

		// Positive X Negative Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			if (this.currentCoordinates[0] + i > 8 || this.currentCoordinates[1] - i < 1) {
				break;
			}
			for (let piece of this.player.activePieces) {
				if (this.currentCoordinates[0] + i === piece.currentCoordinates[0] && this.currentCoordinates[1] - i === piece.currentCoordinates[1]) {
					moves.push([[this.currentCoordinates[0]+i, this.currentCoordinates[1] - i], piece]);
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[0] + i === piece.currentCoordinates[0] && this.currentCoordinates[1] - i === piece.currentCoordinates[1]) {
						axisBlocked = true;
						break;
					}
					
				}
			}
		}


		// Negative X and Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			if (this.currentCoordinates[0] - i < 1 || this.currentCoordinates[1] - i < 1) {
				break;
			}
			for (let piece of this.player.activePieces) {
				if (this.currentCoordinates[0] - i === piece.currentCoordinates[0] && this.currentCoordinates[1] - i === piece.currentCoordinates[1]) {
					moves.push([[this.currentCoordinates[0] - i, this.currentCoordinates[1] - i], piece]);
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[0] - i === piece.currentCoordinates[0] && this.currentCoordinates[1] - i === piece.currentCoordinates[1]) {
						axisBlocked = true;
						break;
					}
					
				}
			}
		}

		// Negative X Positive Y
		axisBlocked = false;
		for (let i = 1; i < 9; i++) {
			if (this.currentCoordinates[0] - i < 1 || this.currentCoordinates[1] + i > 8) {
				break;
			}
			for (let piece of this.player.activePieces) {
				if (this.currentCoordinates[0] - i === piece.currentCoordinates[0] && this.currentCoordinates[1] + i === piece.currentCoordinates[1]) {
					moves.push([[this.currentCoordinates[0] - i, this.currentCoordinates[1] + i], piece]);
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[0] - i === piece.currentCoordinates[0] && this.currentCoordinates[1] + i === piece.currentCoordinates[1]) {
						axisBlocked = true;
						break;
					}
					
				}
			}
		}

		return moves;
	}
}