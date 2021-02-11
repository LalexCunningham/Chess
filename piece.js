import MovingSquare from './movingSquare.js';
import AttackingSquare from './attackingSquare.js';

export default class Piece {
	constructor(color, piece, currentCoordinates, board, player, enemyPlayer) {
		this.board = board;
		this.color = color;
		this.piece = piece;	
		this.currentCoordinates = [parseInt(currentCoordinates[0]), parseInt(currentCoordinates[1])];
		this.board.pieceLocations[this.currentCoordinates[0]-1][this.currentCoordinates[1]-1] = this;
		this.cssElement = this.placeCSSElement();

		// TODO: get rid of player classes
		this.player = player;
		this.enemyPlayer = enemyPlayer;

		this.firstMove = true;
	}

	move(coordinates) {
		this.board.pieceLocations[this.currentCoordinates[0]-1][this.currentCoordinates[1]-1] = null;
		let diffX = coordinates[0] - this.currentCoordinates[0];
		let diffY = coordinates[1] - this.currentCoordinates[1];

		let translationMatrix = new WebKitCSSMatrix(getComputedStyle(this.cssElement).webkitTransform);
		
		this.cssElement.style.transform = `translate(${translationMatrix.m41 + ((diffX) * 72)}px, ${translationMatrix.m42 - ((diffY) * 72)}px)`;
		
		this.currentCoordinates = coordinates; 
		this.board.pieceLocations[this.currentCoordinates[0]-1][this.currentCoordinates[1]-1] = this;
		this.firstMove = false;

		let kingCoordinates = this.enemyPlayer.king.currentCoordinates;
		let check = false;

		for (let piece of this.player.activePieces) {
			let moves = piece.getPossibleMoves()
			for (let attackingMove of moves[1]) {
				if (attackingMove[0][0] === kingCoordinates[0] &&
					attackingMove[0][1] === kingCoordinates[1]) {
					check = true;
					let possibleKingMoves = this.enemyPlayer.king.getPossibleMoves();
					if (possibleKingMoves[0].length === 0 &&
						possibleKingMoves[1].length === 0) {
						alert('Checkmate!');
					} else {
						alert('Check!');
					}
					
				}
			}
		}

		for (let piece of this.player.activePieces) {
			piece.cssElement.removeEventListener('click', piece);
		}

		// Enemy Player's turn
		if (check) {
			this.enemyPlayer.king.setOnClick();
		} else {
			for (let piece of this.enemyPlayer.activePieces) {
				piece.setOnClick();
			}
		}

	}

	highlightMoves() {
		let coordinates = this.getPossibleMoves();
		let moveCoordinates = coordinates[0];
		let attackCoordinates = coordinates[1];
		this.board.highlightedSquares = [];

		this.board.highlightedPiece = this;
		for (let coordinate of moveCoordinates) {
			let movingSquare = new MovingSquare(coordinate, this.board, this);
			this.board.highlightedSquares.push(movingSquare);
		}
		for (let coordinate of attackCoordinates) {
			let attackingSquare = new AttackingSquare(coordinate[0], this.board, this, coordinate[1]);
			this.board.highlightedSquares.push(attackingSquare);
		}
	}

	setOnClick () {
		this.cssElement.addEventListener('click', this);
	}

	handleEvent (event) {
		switch (event.type) {
			case 'click':
				this.click();
				break;
			default:
				console.log('unhandled event type');
		}
	}

	click () {
		// Stops clicks on a piece from propagating up to the (parent) html table cells
		event.stopPropagation();

		this.board.clearHighlightedSquares();
		this.highlightMoves();
	}


	placeCSSElement() {
		let table = document.getElementById('board');
		let tableCoordinates = this.board.chessToTableCoordinate(this.currentCoordinates);
		let tableCell = table.rows[tableCoordinates[1]].cells[tableCoordinates[0]];

		let newElement = document.createElement('div');
		newElement.className = `chesspiece ${this.piece} ${this.color}`;
		let symbol = '';

		switch (this.piece) {
			case this.board.pieces.PAWN:
				symbol = 'P'
				break;
			case this.board.pieces.KING:
				symbol = 'K'
				break;
			case this.board.pieces.QUEEN:
				symbol = 'Q'
				break;
			case this.board.pieces.KNIGHT:
				symbol = 'k'
				break;
			case this.board.pieces.BISHOP:
				symbol = 'B'
				break;
			case this.board.pieces.ROOK:
				symbol = 'R'
				break;
		}

		switch (this.color) {
			case 'white':
				newElement.style.backgroundColor = 'lightgrey';
				break;
			case 'black':
				newElement.style.backgroundColor = 'black';
				newElement.style.color = 'white';
				break;
		}

		newElement.innerHTML = symbol;
		tableCell.appendChild(newElement);
		return newElement;
	}

	removeCSSElement () {
		this.cssElement.style.display = 'none';
	}

	kill () {
		this.removeCSSElement();
		this.player.capturedPieces.push(this);
		let index = this.player.activePieces.indexOf(this)
		this.player.activePieces.splice(index, 1);
	}
}