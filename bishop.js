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
			for (let piece of this.player.activePieces) {
				if (this.currentCoordinates[0] + i === piece.currentCoordinates[0] && this.currentCoordinates[1] + i === piece.currentCoordinates[1]) {
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[0] + i === piece.currentCoordinates[0] && this.currentCoordinates[1] + i === piece.currentCoordinates[1]) {
						attackingMoves.push([[this.currentCoordinates[0]+i, this.currentCoordinates[1]+i], piece]);
						axisBlocked = true;
						break;
					}
					
				}
			}
			if (!axisBlocked) {
				possibleMoves.push([this.currentCoordinates[0]+i, this.currentCoordinates[1]+i])
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
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[0] + i === piece.currentCoordinates[0] && this.currentCoordinates[1] - i === piece.currentCoordinates[1]) {
						attackingMoves.push([[this.currentCoordinates[0]+i, this.currentCoordinates[1] - i], piece]);
						axisBlocked = true;
						break;
					}
					
				}
			}
			if (!axisBlocked) {
				possibleMoves.push([this.currentCoordinates[0]+i, this.currentCoordinates[1] - i])
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
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[0] - i === piece.currentCoordinates[0] && this.currentCoordinates[1] - i === piece.currentCoordinates[1]) {
						attackingMoves.push([[this.currentCoordinates[0] - i, this.currentCoordinates[1] - i], piece]);
						axisBlocked = true;
						break;
					}
					
				}
			}
			if (!axisBlocked) {
				possibleMoves.push([this.currentCoordinates[0] - i, this.currentCoordinates[1] - i])
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
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[0] - i === piece.currentCoordinates[0] && this.currentCoordinates[1] + i === piece.currentCoordinates[1]) {
						attackingMoves.push([[this.currentCoordinates[0] - i, this.currentCoordinates[1] + i], piece]);
						axisBlocked = true;
						break;
					}
					
				}
			}
			if (!axisBlocked) {
				possibleMoves.push([this.currentCoordinates[0] - i, this.currentCoordinates[1] + i])
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