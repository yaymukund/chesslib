import { WHITE, BLACK } from './constants'
import identity from 'lodash.identity'

export class Position {

	constructor({
		rows=8,
		columns=8,
		activeColor=WHITE,
		castling=true,
		enPassantTarget=null,
		halfmoveClock=0,
		fullmoveClock=0,
		arr2d=null,
	} = {}) {
		this.board = this.createBoard(rows, columns);
		this.activeColor = activeColor;
		this.castling = castling;
		this.enPassantTarget = enPassantTarget;
		this.halfmoveClock = halfmoveClock;
		this.fullmoveClock = fullmoveClock;
		this.arr2d = arr2d;
	}

	createBoard(rows=8, columns=8) {
		// ugly imperative way to create a board:
		const board = [];
		for (var i = 0; i < rows; i++) {
			var row = [];
			for (var j = 0; j < columns; j++) {
				row.push(null);
			}
			board.push(row);
		}
		return board;
	}

	placePiece(piece, rank, file) {
		if (this.board[rank][file] != null) {
			throw new Error(this.squareName(rank, file) + " occupied!")
		}
		this.board[rank][file] = piece;
	}

	squareName(rank, file) {
		return `${rankName(rank)}{fileName(file)}`
	}

	rankName(rank) {
		return 'abcdefgh'.charAt(rank)
	}

	fileName(file) {
		return "" + (file + 1);
	}

	rankIndex(rankName) {
		return 'abcdefgh'.indexOf(rankName);
	}

	fileIndex(fileName) {
		return Number(fileName) - 1;
	}

	map(fn) {
		return this.board.map((rank) => rank.map((piece) => fn(piece)));
	}

	getPiece(rank, file) {
		return this.board[rank][file];
	}

	set arr2d(arr2d) {
		arr2d.forEach((rank, i) => {
			rank.forEach((file, j) => {
				const piece = arr2d[i][j];
				if (piece != null) {
					this.placePiece(piece, i, j);
				}
			});
		})
	}

	get arr2d() {
		return this.map(identity);
	}

	get readableText() {
		return this.
			map((piece) => {
				if (piece == null) {
					return ' ';
				}
				return piece.unicode;
			}).
			map((rank) => rank.join('\t')).
			join('\n')
		;
	}
}