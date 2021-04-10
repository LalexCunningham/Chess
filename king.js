import Piece from './piece.js';

export default class King extends Piece {
	constructor(color, currentCoordinates, board, player, enemyPlayer) {
		super(color, board.pieces.KING, currentCoordinates, board, player, enemyPlayer);
		this.player.king = this;
		this.check = false;
	}

	getPossibleMoves() {
		let possibleMoves = []
		let attackingMoves = []
		let castlingMoves = []

		possibleMoves.push([this.currentCoordinates[0], this.currentCoordinates[1] + 1]);
		possibleMoves.push([this.currentCoordinates[0] + 1, this.currentCoordinates[1] + 1]);
		possibleMoves.push([this.currentCoordinates[0] + 1, this.currentCoordinates[1]]);
		possibleMoves.push([this.currentCoordinates[0] + 1, this.currentCoordinates[1] - 1]);
		possibleMoves.push([this.currentCoordinates[0], this.currentCoordinates[1] - 1]);
		possibleMoves.push([this.currentCoordinates[0] - 1, this.currentCoordinates[1] - 1]);
		possibleMoves.push([this.currentCoordinates[0] - 1, this.currentCoordinates[1]]);
		possibleMoves.push([this.currentCoordinates[0] - 1, this.currentCoordinates[1] + 1]);

		// Castling
		if (!this.check && this.firstMove) {
			for (let piece of this.player.activePieces) {
				if (piece.piece === this.board.pieces.ROOK) {
					let pathBlocked = false;
					if (piece.firstMove) {
						if (piece.currentCoordinates[0] === 1) {
							for (let i = 2; i < 5; i++) {
								if (this.board.isOccupied([i, this.currentCoordinates[1]], ['white', 'black'])) {
									pathBlocked = true;
								}
							}
							if (!pathBlocked) {
								castlingMoves.push([[3, this.currentCoordinates[1]], piece, [4, this.currentCoordinates[1]]])
							}
							
						} else if (piece.currentCoordinates[0] === 8) {
							for (let i = 6; i < 8; i++) {
								if (this.board.isOccupied([i, this.currentCoordinates[1]], ['white', 'black'])) {
									pathBlocked = true;
								}
							} 
							if (!pathBlocked) {
								castlingMoves.push([[7, this.currentCoordinates[1]], piece, [6, this.currentCoordinates[1]]])
							}
						}
					}
				}
			}
		}

		// Remove illegal moves and add attacking moves, loop backwards to not mess with splice
		loopKingsMoves:
		for (let i = possibleMoves.length - 1; i >= 0; i--) {
			let coordinate = possibleMoves[i];

			if ((coordinate[0] > 8) || (coordinate[0] < 1) || (coordinate[1] > 8) || (coordinate[1] < 1)) {
				possibleMoves.splice(i, 1);
				continue;
			}

			for (let piece of this.enemyPlayer.activePieces) {
				for (let move of piece.getCheckingMoves()) {
					if (coordinate[0] === move[0] &&
						coordinate[1] === move[1]) {
						possibleMoves.splice(i, 1);
						continue loopKingsMoves;
					}
				}
			}


			let square = this.board.pieceLocations[coordinate[0]-1][coordinate[1]-1];

			if (square === null) {
				continue;
			} else if (square.color === this.color) {
				possibleMoves.splice(i, 1);
				continue;
			} else {
				attackingMoves.push([coordinate ,square])
				possibleMoves.splice(i, 1);
				continue;
			}


		}
		return [possibleMoves, attackingMoves, castlingMoves]
	}

	// Returns all moves that would put an enemy king into check
	getCheckingMoves () {
		let moves = [];

		moves.push([this.currentCoordinates[0], this.currentCoordinates[1] + 1]);
		moves.push([this.currentCoordinates[0] + 1, this.currentCoordinates[1] + 1]);
		moves.push([this.currentCoordinates[0] + 1, this.currentCoordinates[1]]);
		moves.push([this.currentCoordinates[0] + 1, this.currentCoordinates[1] - 1]);
		moves.push([this.currentCoordinates[0], this.currentCoordinates[1] - 1]);
		moves.push([this.currentCoordinates[0] - 1, this.currentCoordinates[1] - 1]);
		moves.push([this.currentCoordinates[0] - 1, this.currentCoordinates[1]]);
		moves.push([this.currentCoordinates[0] - 1, this.currentCoordinates[1] + 1]);

		return moves;
	}
}