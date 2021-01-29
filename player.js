export default class Player {
	constructor(color) {
		this.color = color;

		// Could be replaced by a variable in board class
		this.activePieces = []
		this.capturedPieces = []
	}
}