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
        this.enemiesToSend = [];

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
                enemy.line = this.game.getRandomLine();
                enemy.position.x = this.ENEMIES_X_POSITION;
                this.enemiesToSend.push(enemy);
            }

            var count = 0;
            var t = new Timer(1500, this.game.scene, { repeat: nb, autodestroy: true });
            t.callback = function () {
                _this.enemiesToSend[count++].isWalking = true;
            };
            t.start();

            // TODO throw enemies periodically
            //setTimeout(() => {
            //    this.enemiesToSend[0].isWalking = true;
            //}, 1500)
        }
    }]);

    return WaveManager;
})();
//# sourceMappingURL=WaveManager.js.map
