import Piece from './piece.js';

export default class King extends Piece {
	constructor(color, currentCoordinates, board, player, enemyPlayer) {
		super(color, board.pieces.KING, currentCoordinates, board, player, enemyPlayer);
	}

	getPossibleMoves() {
		let possibleMoves = []
		let attackingMoves = []

		possibleMoves.push([this.currentCoordinates[0], this.currentCoordinates[1] + 1]);
		possibleMoves.push([this.currentCoordinates[0] + 1, this.currentCoordinates[1] + 1]);
		possibleMoves.push([this.currentCoordinates[0] + 1, this.currentCoordinates[1]]);
		possibleMoves.push([this.currentCoordinates[0] + 1, this.currentCoordinates[1] - 1]);
		possibleMoves.push([this.currentCoordinates[0], this.currentCoordinates[1] - 1]);
		possibleMoves.push([this.currentCoordinates[0] - 1, this.currentCoordinates[1] - 1]);
		possibleMoves.push([this.currentCoordinates[0] - 1, this.currentCoordinates[1]]);
		possibleMoves.push([this.currentCoordinates[0] - 1, this.currentCoordinates[1] + 1]);


		// loop backwards to not mess with splice
		loopKingsMoves:
		for (let i = possibleMoves.length - 1; i >= 0; i--) {

			if ((possibleMoves[i][0] > 8) || (possibleMoves[i][0] < 1) || (possibleMoves[i][1] > 8) || (possibleMoves[i][1] < 1)) {
				possibleMoves.splice(i, 1);
				continue;
			}

			for (let piece of this.player.activePieces) {
				if (piece.currentCoordinates[0] === possibleMoves[i][0] && piece.currentCoordinates[1] === possibleMoves[i][1]) {
					possibleMoves.splice(i, 1);
					continue loopKingsMoves;
				}
			}

			for (let piece of this.enemyPlayer.activePieces) {
				for (let move of piece.getCheckingMoves()) {
					if (move[0] === possibleMoves[i][0] &&
						move[1] === possibleMoves[i][1]) {
						possibleMoves.splice(i, 1);
						continue loopKingsMoves;
					}
				}
				if (piece.currentCoordinates[0] === possibleMoves[i][0] && piece.currentCoordinates[1] === possibleMoves[i][1]) {
					attackingMoves.push([possibleMoves[i], piece])
					possibleMoves.splice(i, 1);
					continue loopKingsMoves;
				}
			}
		}

		return [possibleMoves, attackingMoves]
	}

	// Returns all moves that would put an enemy king into check
	getCheckingMoves () {
		let moves = [];

		moves.push([[this.currentCoordinates[0], this.currentCoordinates[1] + 1], this]);
		moves.push([[this.currentCoordinates[0] + 1, this.currentCoordinates[1] + 1], this]);
		moves.push([[this.currentCoordinates[0] + 1, this.currentCoordinates[1]], this]);
		moves.push([[this.currentCoordinates[0] + 1, this.currentCoordinates[1] - 1], this]);
		moves.push([[this.currentCoordinates[0], this.currentCoordinates[1] - 1], this]);
		moves.push([[this.currentCoordinates[0] - 1, this.currentCoordinates[1] - 1], this]);
		moves.push([[this.currentCoordinates[0] - 1, this.currentCoordinates[1]], this]);
		moves.push([[this.currentCoordinates[0] - 1, this.currentCoordinates[1] + 1], this]);

		return moves;
	}
}