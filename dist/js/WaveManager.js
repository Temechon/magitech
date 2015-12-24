"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WaveManager = (function () {
    function WaveManager(game) {
        _classCallCheck(this, WaveManager);

        this.game = game;

        // Enemies sent on the battlefield but not dead yet for the current wave
        this.enemiesSent = [];

        // Enemies that should be sent for the current wave
        // This array is composed of objects {enemy, line}
        this.enemiesToSend = [];

        // Enemies sent for the current wave
        // This array is indexed by lines
        this.enemiesSent = [];

        this.ENEMIES_X_POSITION = 10;
    }

    /**
     * Send the next wave
     */

    _createClass(WaveManager, [{
        key: "sendWave",
        value: function sendWave() {
            var _this = this;

            // Create X enemies
            var nb = 10;
            for (var e = 0; e < nb; e++) {
                var enemy = new Enemy(this.game);
                var line = this.game.getRandomLine();

                // update enemy position
                enemy.position.z = line.cells[0].position.z;
                enemy.position.x = this.ENEMIES_X_POSITION;

                // Save enemy
                this.enemiesToSend.push({ enemy: enemy, line: line });
            }

            var count = 0;
            var t = new Timer(1500, this.game.scene, { repeat: nb, autodestroy: true });
            t.callback = function () {
                var obj = _this.enemiesToSend[count++];
                var enemy = obj.enemy;
                var line = obj.line;
                enemy.isWalking = true;
                // set line as hot
                line.isHot = true;

                // Save the enemy that has been sent
                _this.enemiesSent.push(obj);

                // Update gui
                _this.game.gui.updateWavePointer(_this.getWavePercentage());
            };
            t.onFinish = function () {
                // Remove all enemies to send, cause all enemies have been sent :)
                _this.enemiesToSend.length = 0;
            };
            t.start();
        }

        /**
         * The given enemy has been destroyed: delete it from the wave manager.
         * If a line has no more enemy walking, deactivate the line
         */
    }, {
        key: "removeEnemy",
        value: function removeEnemy(enemy) {
            for (var i = 0; i < this.enemiesSent.length; i++) {
                var obj = this.enemiesSent[i];
                if (obj.enemy === enemy) {
                    this.enemiesSent.splice(i, 1);

                    if (this.getNumberOfEnemiesOnLine(obj.line) == 0) {
                        // Deactivate tower on this line
                        obj.line.isHot = false;
                    }
                    break;
                }
            }
        }

        /**
         * Returns the number of enemies walking along a given line.
         */
    }, {
        key: "getNumberOfEnemiesOnLine",
        value: function getNumberOfEnemiesOnLine(line) {
            var sum = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.enemiesSent[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var obj = _step.value;

                    if (obj.line === line) {
                        sum++;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return sum;
        }

        /**
         * Returns the current percentage of this wave. At 100%,
         * all enemies have been sent.
         */
    }, {
        key: "getWavePercentage",
        value: function getWavePercentage() {
            return this.enemiesSent.length / this.enemiesToSend.length;
        }
    }]);

    return WaveManager;
})();
//# sourceMappingURL=WaveManager.js.map
