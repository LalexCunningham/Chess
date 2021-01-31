import Piece from './piece.js';

export default class Pawn extends Piece {
	constructor(color, currentCoordinates, id, board, player, enemyPlayer) {
		super(color, board.pieces.PAWN, currentCoordinates, id, board,  player, enemyPlayer);
	}

	getPossibleMoves() {
		let possibleMoves = []
		let attackingSquares = []
		if (this.color === 'black') {
			attackingSquares = [[this.currentCoordinates[0] - 1, this.currentCoordinates[1] - 1], [this.currentCoordinates[0] + 1, this.currentCoordinates[1] - 1]]

			if (this.currentCoordinates[1] - 1 < 2) {
				possibleMoves =  [] // pawn can change
			} else if (this.currentCoordinates[1] - 1 < 1|| !this.firstMove) {
				possibleMoves =  [[this.currentCoordinates[0], this.currentCoordinates[1] - 1]]
			} else if (this.firstMove){
				possibleMoves =  [[this.currentCoordinates[0], this.currentCoordinates[1] - 1], [this.currentCoordinates[0], this.currentCoordinates[1] - 2]]
			}

			
		} else if (this.color === 'white') {
			attackingSquares = [[this.currentCoordinates[0] - 1, this.currentCoordinates[1] + 1], [this.currentCoordinates[0] + 1, this.currentCoordinates[1] + 1]]

			if (this.currentCoordinates[1] + 1 > 8) {
				possibleMoves =  [] // pawn can change
			} else if (this.currentCoordinates[1] + 1 > 7 || !this.firstMove) {
				possibleMoves = [[this.currentCoordinates[0], this.currentCoordinates[1] + 1]]
			} else if (this.firstMove) {
				possibleMoves = [[this.currentCoordinates[0], this.currentCoordinates[1] + 1], [this.currentCoordinates[0], this.currentCoordinates[1] + 2]]
			}
		}

		let attackingMoves = [];
		for (let piece of this.enemyPlayer.activePieces) {
			if (attackingSquares[0][0] === piece.currentCoordinates[0] && attackingSquares[0][1] === piece.currentCoordinates[1]) {
				attackingMoves.push([attackingSquares[0], piece]);
			} else if (attackingSquares[1][0] === piece.currentCoordinates[0] && attackingSquares[1][1] === piece.currentCoordinates[1]) {
				attackingMoves.push([attackingSquares[1], piece]);
			}
		}
		// TODO: check pawn for same team
		let conflictingMoves = [];
		for (let move of possibleMoves) {
			for (let piece of this.enemyPlayer.activePieces) {
				if (move[0] === piece.currentCoordinates[0] && move[1] === piece.currentCoordinates[1]) {
					possibleMoves = possibleMoves.slice(0, possibleMoves.indexOf(move))
					break;
				}
			}
		}
		return [possibleMoves, attackingMoves];
	}

	// Special method for pawns to return what fields they could attack to
	getCheckingMoves () {
		if (this.color === 'white') {
			return [[this.currentCoordinates[0]+1, this.currentCoordinates[1]+1],[this.currentCoordinates[0]-1, this.currentCoordinates[1]+1]]		
		} else if (this.color === 'black') {
			return [[this.currentCoordinates[0]+1, this.currentCoordinates[1]-1],[this.currentCoordinates[0]-1, this.currentCoordinates[1]-1]]	
		}
		
	}

}