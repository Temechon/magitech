'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Gui = (function () {
    function Gui(game) {
        _classCallCheck(this, Gui);

        this.game = game;

        this.towers = $('.tower');
        this.sendWaveButton = $('#send-wave');
        this.goldLabel = $('#gold');

        // The wave progress
        this.wavePointer = $('#wave-pointer');
        // Get the length of the wave indicator
        this.waveIndicatorLength = this.wavePointer.parent() // get parent node
        .css('width') // get width '300px'
        .slice(0, -2); // chop last two characters

        this.addAction();
    }

    _createClass(Gui, [{
        key: 'addAction',
        value: function addAction() {
            var _this = this;

            // For Each tower button, add a click event on it
            this.towers.on('click', function (elem) {
                // Create a tower by passing its CONFIG name
                _this.game.createTower($(elem.currentTarget).attr('id'));
            });

            this.sendWaveButton.click(function () {
                _this.game.sendWave();
            });
        }

        /**
         * Refresh all label of this GUI panel
         */
    }, {
        key: 'refresh',
        value: function refresh() {
            this.goldLabel.text(this.game.gold);
        }

        /**
         * Refresh the wave pointer indicating the current state of the wave
         */
    }, {
        key: 'updateWavePointer',
        value: function updateWavePointer(percentage) {
            this.wavePointer.css('right', this.waveIndicatorLength * percentage);
        }
    }]);

    return Gui;
})();
//# sourceMappingURL=Gui.js.map
