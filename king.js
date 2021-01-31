import Piece from './piece.js';

export default class King extends Piece {
	constructor(color, currentCoordinates, id, board, player, enemyPlayer) {
		super(color, board.pieces.KING, currentCoordinates, id, board, player, enemyPlayer);
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
				if (piece.piece === this.board.pieces.PAWN) {
					let attackingSquares = piece.getCheckingMoves();
					if (attackingSquares[0][0] === possibleMoves[i][0] && 
						attackingSquares[0][1] === possibleMoves[i][1] ||
						attackingSquares[1][0] === possibleMoves[i][0] && 
						attackingSquares[1][1] === possibleMoves[i][1]) {

						possibleMoves.splice(i, 1);
						continue loopKingsMoves;
					}

				} else if (piece.piece === this.board.pieces.KING) {
						// Don't call getPossibleMoves because it will cause infinite recursion

				} else {
					let enemyMoves = piece.getPossibleMoves();
					for (let move of enemyMoves[0]) {
						if (move[0] === possibleMoves[i][0] && move[1] === possibleMoves[i][1]) {
							possibleMoves.splice(i, 1);
							continue loopKingsMoves;
						}
					}
				}
				
				if (piece.currentCoordinates[0] === possibleMoves[i][0] && piece.currentCoordinates[1] === possibleMoves[i][1]) {
					attackingMoves.push([possibleMoves[i], piece]);
					possibleMoves.splice(i, 1);
					continue loopKingsMoves;
				}
			}
			
		}
		loopAttackingMoves:
		for (let i = attackingMoves.length - 1; i >= 0; i--) {
			for (let piece of this.enemyPlayer.activePieces) {
				if (piece.piece === this.board.pieces.ROOK) {
					let enemyMoves = piece.getCheckingMoves();
					for (let move of enemyMoves) {
						if (attackingMoves[i][0][0] === move[0][0] &&
							attackingMoves[i][0][1] === move[0][1]) {
							attackingMoves.splice(i,1);
							continue loopAttackingMoves;
						}
					}
				}
			}
		}

		return [possibleMoves, attackingMoves]
	}

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