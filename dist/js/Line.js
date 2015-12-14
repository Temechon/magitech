"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = function Line(game, length) {
    var position = arguments.length <= 2 || arguments[2] === undefined ? BABYLON.Vector3.Zero() : arguments[2];

    _classCallCheck(this, Line);

    this.game = game;

    this.length = length;
    this.cells = [];

    for (var i = 0; i < this.length; i++) {
        var c = new Cell(this.game);
        c.position.copyFrom(position);

        c.position.x += c.size * i;

        this.cells.push(c);
    }
};
//# sourceMappingURL=Line.js.map
