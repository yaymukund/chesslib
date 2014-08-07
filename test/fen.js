require('traceur/bin/traceur-runtime.js');

var test = require('tape');

var Fen = require('../lib/codecs/fen.js').Fen;

var fenCodes = [
	'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
	'2kr1bnr/1pp2ppp/p7/2pP4/6P1/2N2Q1P/PPP2PK1/R1B1q3 w - -',
	'1r3Q2/p3P2k/2bp2p1/1pb5/5PP1/8/P6P/7K w - -',
	'6k1/5pp1/p6p/8/R2K3r/2P5/8/8 w - -',
	'8/6pk/6pp/8/3Q4/5P1P/2p1K1P1/1q6 w - -',
	'6R1/pp1n4/2pr2k1/5pp1/8/3B1P2/PPPK1P2/8 b - -',
	'rnbq1b1r/1p3kp1/p2p1n1p/4N3/4P3/2N5/PPP2PPP/R1BQK2R b KQ -',
	'3r4/p1R5/5k1p/6p1/2p5/8/P3nPPP/R4K2 b - -',
	'r1bq1b1r/ppppkBp1/2n5/4P1p1/3p4/5Q2/PPP3PP/RNB1R1K1 b - -',
];


test('it can decode and encode FEN losslessly', function (t) {
	t.plan(fenCodes.length);

	fenCodes.forEach(function (code) {
		t.equal(code, new Fen(code).fen);
	});
});