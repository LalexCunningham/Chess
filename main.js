import Board from './board.js';
import Player from './player.js';

import Pawn from './pawn.js';
import Queen from './queen.js';
import King from './king.js';
import Bishop from './bishop.js';
import Knight from './knight.js';
import Rook from './rook.js';

var board = new Board();

const mainLoop = () => {
	whiteMove();
}

const blackMove = () => {
	for (let piece of whitePlayer.activePieces) {
		piece.cssElement.removeEventListener('click', piece)
	}
	for (let piece of blackPlayer.activePieces) {
		piece.setOnClick();
	}
}

const whiteMove = () => {
	for (let piece of blackPlayer.activePieces) {
		piece.cssElement.removeEventListener('click', piece)
	}
	for (let piece of whitePlayer.activePieces) {
		piece.setOnClick();
	}
}

const setUpBoard = () => {
	
	// White Pawns
	for (let i = 1; i < 9; i++) {
		let newPawn = new Pawn('white', [i, 2], board, whitePlayer, blackPlayer);
		whitePlayer.activePieces.push(newPawn);
		board.pieceList.push(newPawn);
	}
	// White Queen
	let whiteQueen = new Queen('white', [4,1], board, whitePlayer, blackPlayer);
	whitePlayer.activePieces.push(whiteQueen);
	board.pieceList.push(whiteQueen);

	// White King
	let whiteKing = new King('white', [5, 1], board, whitePlayer, blackPlayer);
	whitePlayer.activePieces.push(whiteKing);
	board.pieceList.push(whiteKing);

	// White Rooks
	let whiteRook = new Rook('white', [1,1], board, whitePlayer, blackPlayer);
	whitePlayer.activePieces.push(whiteRook);
	board.pieceList.push(whiteRook);

	whiteRook = new Rook('white', [8,1], board, whitePlayer, blackPlayer);
	whitePlayer.activePieces.push(whiteRook);
	board.pieceList.push(whiteRook);

	// White Knights
	let whiteKnight = new Knight('white', [2,1], board, whitePlayer, blackPlayer);
	whitePlayer.activePieces.push(whiteKnight);
	board.pieceList.push(whiteKnight);

	whiteKnight = new Knight('white', [7,1], board, whitePlayer, blackPlayer);
	whitePlayer.activePieces.push(whiteKnight);
	board.pieceList.push(whiteKnight);

	// White bishops
	let whiteBishop = new Bishop('white', [3,1], board, whitePlayer, blackPlayer);
	whitePlayer.activePieces.push(whiteBishop);
	board.pieceList.push(whiteBishop);

	whiteBishop = new Bishop('white', [6,1], board, whitePlayer, blackPlayer);
	whitePlayer.activePieces.push(whiteBishop);
	board.pieceList.push(whiteBishop);

	// Black Pawns
	for (let i = 1; i < 9; i++) {
		let newPawn = new Pawn('black', [i, 7], board, blackPlayer, whitePlayer);
		blackPlayer.activePieces.push(newPawn);
		board.pieceList.push(newPawn);
	}
	// Black Queen
	let blackQueen = new Queen('black', [4,8], board, blackPlayer, whitePlayer);
	blackPlayer.activePieces.push(blackQueen);
	board.pieceList.push(blackQueen);

	// Black King
	let blackKing = new King('black', [5,8], board, blackPlayer, whitePlayer);
	blackPlayer.activePieces.push(blackKing);
	board.pieceList.push(blackKing);

	// Black Rooks
	let blackRook = new Rook('black', [1,8], board, blackPlayer, whitePlayer);
	blackPlayer.activePieces.push(blackRook);
	board.pieceList.push(blackRook);

	blackRook = new Rook('black', [8,8], board, blackPlayer, whitePlayer);
	blackPlayer.activePieces.push(blackRook);
	board.pieceList.push(blackRook);

	// Black Knights
	let blackKnight = new Knight('black', [2,8], board, blackPlayer, whitePlayer);
	blackPlayer.activePieces.push(blackKnight);
	board.pieceList.push(blackKnight);

	blackKnight = new Knight('black', [7,8], board, blackPlayer, whitePlayer);
	blackPlayer.activePieces.push(blackKnight);
	board.pieceList.push(blackKnight);

	// Black Bishops
	let blackBishop = new Bishop('black', [3,8], board, blackPlayer, whitePlayer);
	blackPlayer.activePieces.push(blackBishop);
	board.pieceList.push(blackBishop);

	blackBishop = new Bishop('black', [6,8], board, blackPlayer, whitePlayer);
	blackPlayer.activePieces.push(blackBishop);
	board.pieceList.push(blackBishop);
}

var whitePlayer = new Player('white');
var blackPlayer = new Player('black');

setUpBoard();
mainLoop();
