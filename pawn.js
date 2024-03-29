import Piece from './piece.js';

export default class Pawn extends Piece {
	constructor(color, currentCoordinates, board, player, enemyPlayer) {
		super(color, board.pieces.PAWN, currentCoordinates, board,  player, enemyPlayer);
	}

	getPossibleMoves() {
		let possibleMoves = [];
		let attackingSquares = [];
		let attackingMoves = [];

		if (this.color === 'black') {
			attackingSquares = [[this.currentCoordinates[0] - 1, this.currentCoordinates[1] - 1], [this.currentCoordinates[0] + 1, this.currentCoordinates[1] - 1]]

			if (this.currentCoordinates[1] - 1 < 2) {
				possibleMoves =  [] // pawn can change
			} else if (this.currentCoordinates[1] - 1 < 1|| this.numberOfMoves > 0) {
				possibleMoves =  [[this.currentCoordinates[0], this.currentCoordinates[1] - 1]]
			} else if (this.numberOfMoves === 0){
				possibleMoves =  [[this.currentCoordinates[0], this.currentCoordinates[1] - 1], [this.currentCoordinates[0], this.currentCoordinates[1] - 2]]
			}			
		} else if (this.color === 'white') {
			attackingSquares = [[this.currentCoordinates[0] - 1, this.currentCoordinates[1] + 1], [this.currentCoordinates[0] + 1, this.currentCoordinates[1] + 1]]

			if (this.currentCoordinates[1] + 1 > 8) {
				possibleMoves =  [] // pawn can change
			} else if (this.currentCoordinates[1] + 1 > 7 || this.numberOfMoves > 0) {
				possibleMoves = [[this.currentCoordinates[0], this.currentCoordinates[1] + 1]]
			} else if (this.numberOfMoves === 0) {
				possibleMoves = [[this.currentCoordinates[0], this.currentCoordinates[1] + 1], [this.currentCoordinates[0], this.currentCoordinates[1] + 2]]
			}
		}

		// enPassante logic
		if (this.board.enPassantVulnerable != null) {
			if (this.color === 'white' && this.currentCoordinates[1] === 5) {
				if (Math.abs(this.currentCoordinates[0] - this.board.enPassantVulnerable.currentCoordinates[0]) === 1) {
					attackingMoves.push([[this.board.enPassantVulnerable.currentCoordinates[0], this.board.enPassantVulnerable.currentCoordinates[1] + 1], this.board.enPassantVulnerable])
				}
			} else if (this.color === 'black' && this.currentCoordinates[1] === 4) {
				if (Math.abs(this.currentCoordinates[0] - this.board.enPassantVulnerable.currentCoordinates[0]) === 1) {
					attackingMoves.push([[this.board.enPassantVulnerable.currentCoordinates[0], this.board.enPassantVulnerable.currentCoordinates[1] - 1], this.board.enPassantVulnerable])
				}
			}
		}

		// Remove squares that are outside the board
		for (let square of attackingSquares) {
			if (square[0] < 1 || square[0] > 8 ||
				square[1] < 1 || square[1] > 8 )
				attackingSquares.splice(attackingSquares.indexOf(square), 1);
		}
		
		for (let coordinate of attackingSquares) {
			let square = this.board.pieceLocations[coordinate[0]-1][coordinate[1]-1]
			if (square === null) {
				continue;
			} else if (square.color === this.color) {
				continue;
			} else {
				attackingMoves.push([attackingSquares[attackingSquares.indexOf(coordinate)], square])
			}
		}
		
		for (let coordinate of possibleMoves) {
			let square = this.board.pieceLocations[coordinate[0]-1][coordinate[1]-1]
			if (square === null) {
				continue;
			} else {
				possibleMoves.splice(possibleMoves.indexOf(coordinate), 2)
				break;
			}
		}

		return [possibleMoves, attackingMoves];
	}

	// Returns all moves that would put an enemy king into check
	getCheckingMoves () {
		if (this.color === 'white') {
			return [[this.currentCoordinates[0]+1, this.currentCoordinates[1]+1],[this.currentCoordinates[0]-1, this.currentCoordinates[1]+1]]		
		} else if (this.color === 'black') {
			return [[this.currentCoordinates[0]+1, this.currentCoordinates[1]-1],[this.currentCoordinates[0]-1, this.currentCoordinates[1]-1]]	
		}
		
	}

}