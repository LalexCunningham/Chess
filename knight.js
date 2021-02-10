import Piece from './piece.js';

export default class Knight extends Piece {
	constructor (color, currentCoordinates, board, player, enemyPlayer) {
		super(color, board.pieces.KNIGHT, currentCoordinates, board, player, enemyPlayer);
	}

	getPossibleMoves () {
		let possibleMoves = []
		let attackingMoves = []

		possibleMoves.push([this.currentCoordinates[0]+1, this.currentCoordinates[1]+2]);
		possibleMoves.push([this.currentCoordinates[0]+2, this.currentCoordinates[1]+1]);
		possibleMoves.push([this.currentCoordinates[0]+2, this.currentCoordinates[1]-1]);
		possibleMoves.push([this.currentCoordinates[0]+1, this.currentCoordinates[1]-2]);
		possibleMoves.push([this.currentCoordinates[0]-1, this.currentCoordinates[1]-2]);
		possibleMoves.push([this.currentCoordinates[0]-2, this.currentCoordinates[1]-1]);
		possibleMoves.push([this.currentCoordinates[0]-2, this.currentCoordinates[1]+1]);
		possibleMoves.push([this.currentCoordinates[0]-1, this.currentCoordinates[1]+2]);

		// loop backwards to not mess with splice
		loopKnightsMoves:
		for (let i = possibleMoves.length-1; i >= 0; i--) {

			let coordinate = possibleMoves[i];

			if ((coordinate[0] > 8) || (coordinate[0] < 1) || (coordinate[1] > 8) || (coordinate[1] < 1)) {
				possibleMoves.splice(i, 1);
				continue;
			}

			let square = this.board.pieceLocations[coordinate[0] - 1][coordinate[1] - 1];

			if (square === null) {
				continue;
			} else if (square.color === this.color) {
				possibleMoves.splice(i, 1);
				continue;
			} else {
				attackingMoves.push([possibleMoves[i], square]);
				possibleMoves.splice(i, 1);
				continue;
			}
			// if ((possibleMoves[i][0] > 8) || (possibleMoves[i][0] < 1) || (possibleMoves[i][1] > 8) || (possibleMoves[i][1] < 1)) {
			// 	possibleMoves.splice(i, 1);
			// 	continue;
			// }
			// for (let piece of this.player.activePieces) {
			// 	if (piece.currentCoordinates[0] === possibleMoves[i][0] && piece.currentCoordinates[1] === possibleMoves[i][1]) {
			// 		possibleMoves.splice(i, 1);
			// 		continue loopKnightsMoves;
			// 	}
			// }
			// for (let piece of this.enemyPlayer.activePieces) {
				
			// 	if (piece.currentCoordinates[0] === possibleMoves[i][0] && piece.currentCoordinates[1] === possibleMoves[i][1]) {
			// 		attackingMoves.push([possibleMoves[i], piece]);
			// 		possibleMoves.splice(i, 1);
			// 		continue loopKnightsMoves;
			// 	}
			// }
		}
		return [possibleMoves, attackingMoves]
	}	

	// Returns all moves that would put an enemy king into check
	getCheckingMoves () {
		let moves = []

		moves.push([[this.currentCoordinates[0]+1, this.currentCoordinates[1]+2], this]);
		moves.push([[this.currentCoordinates[0]+2, this.currentCoordinates[1]+1], this]);
		moves.push([[this.currentCoordinates[0]+2, this.currentCoordinates[1]-1], this]);
		moves.push([[this.currentCoordinates[0]+1, this.currentCoordinates[1]-2], this]);
		moves.push([[this.currentCoordinates[0]-1, this.currentCoordinates[1]-2], this]);
		moves.push([[this.currentCoordinates[0]-2, this.currentCoordinates[1]-1], this]);
		moves.push([[this.currentCoordinates[0]-2, this.currentCoordinates[1]+1], this]);
		moves.push([[this.currentCoordinates[0]-1, this.currentCoordinates[1]+2], this]);

		return moves;
	}
}