import Piece from './piece.js';

export default class Rook extends Piece {
	constructor (color, currentCoordinates, id, board, player, enemyPlayer) {
		super(color, board.pieces.ROOK, currentCoordinates, id, board, player, enemyPlayer);
	}

	getPossibleMoves () {
		let possibleMoves = []
		let attackingMoves = []

		// Move in positive Y
		let axisBlocked = false;
		for (let i = this.currentCoordinates[1] + 1; i < 9; i++) {
			for (let piece of this.player.activePieces) {
				if (this.currentCoordinates[0] === piece.currentCoordinates[0] && i === piece.currentCoordinates[1]) {
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[0] === piece.currentCoordinates[0] && i === piece.currentCoordinates[1]) {
						attackingMoves.push([[this.currentCoordinates[0], i], piece])
						axisBlocked = true;
						break;
					}
				}
			}
			if (!axisBlocked) {
				possibleMoves.push([this.currentCoordinates[0], i]);
			}
		}

		// Move in positive X
		axisBlocked = false;
		for (let i = this.currentCoordinates[0] + 1; i < 9; i++) {
			for (let piece of this.player.activePieces) {
				if (this.currentCoordinates[1] === piece.currentCoordinates[1] && i === piece.currentCoordinates[0]) {
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[1] === piece.currentCoordinates[1] && i === piece.currentCoordinates[0]) {
						attackingMoves.push([[i, this.currentCoordinates[1]], piece])
						axisBlocked = true;
						break;
					}
				}
			}
			if (!axisBlocked) {
				possibleMoves.push([i, this.currentCoordinates[1]]);
			}
		}

		// Move in negative Y
		axisBlocked = false;
		for (let i = this.currentCoordinates[1] - 1; i > 0; i--) {
			for (let piece of this.player.activePieces) {
				if (this.currentCoordinates[0] === piece.currentCoordinates[0] && i === piece.currentCoordinates[1]) {
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[0] === piece.currentCoordinates[0] && i === piece.currentCoordinates[1]) {
						attackingMoves.push([[this.currentCoordinates[0], i], piece])
						axisBlocked = true;
						break;
					}
				}
			}
			if (!axisBlocked) {
				possibleMoves.push([this.currentCoordinates[0], i]);
			}
		}

		// Move in negative X
		axisBlocked = false;
		for (let i = this.currentCoordinates[0] - 1; i > 0; i--) {
			for (let piece of this.player.activePieces) {
				if (this.currentCoordinates[1] === piece.currentCoordinates[1] && i === piece.currentCoordinates[0]) {
					axisBlocked = true;
					break;
				}
			}
			if (!axisBlocked) {
				for (let piece of this.enemyPlayer.activePieces) {
					if (this.currentCoordinates[1] === piece.currentCoordinates[1] && i === piece.currentCoordinates[0]) {
						attackingMoves.push([[i, this.currentCoordinates[1]], piece]);
						axisBlocked = true;
						break;
					}
				}
			}
			if (!axisBlocked) {
				possibleMoves.push([i, this.currentCoordinates[1]]);
			}
		}
		console.log([possibleMoves, attackingMoves])
		return [possibleMoves, attackingMoves];
	}
}