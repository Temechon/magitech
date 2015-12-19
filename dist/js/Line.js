'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Line = (function () {
    function Line(game, length) {
        var position = arguments.length <= 2 || arguments[2] === undefined ? BABYLON.Vector3.Zero() : arguments[2];

        _classCallCheck(this, Line);

        this.game = game;

        this.length = length;
        this.cells = [];

        // Unique ID
        this.id = this.uniqueId();

        // A line is hot when an enemy is attached to this line
        this._isHot = false;

        for (var i = 0; i < this.length; i++) {
            // Create new cell
            var c = new Cell(this.game, this);
            c.position.copyFrom(position);

            c.position.x += c.size * i;

            this.cells.push(c);
        }
    }

    /**
     * Generates a unique ID for this line
     */

    _createClass(Line, [{
        key: 'uniqueId',
        value: function uniqueId() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c === 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
        }

        /**
         * Set a line as hot activates all the tower on this line
         */
    }, {
        key: 'isHot',
        set: function set(val) {
            this._isHot = val;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.cells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var c = _step.value;

                    if (c.tower) {
                        c.tower.isActivated = val;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        },
        get: function get() {
            return this._isHot;
        }
    }]);

    return Line;
})();
//# sourceMappingURL=Line.js.map
