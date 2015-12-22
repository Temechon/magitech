'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TowerFactory = (function () {
    function TowerFactory(game) {
        _classCallCheck(this, TowerFactory);

        this.game = game;
    }

    _createClass(TowerFactory, [{
        key: 'build',
        value: function build(name) {
            var result = null;
            switch (name) {
                case 'shooter':
                    result = new ShootingTower(this.game);
                    break;
                case 'generator':
                    result = new Generator(this.game);
                    break;
                // TODO Add your own tower type

                default:
                    break;
            }
            return result;
        }
    }]);

    return TowerFactory;
})();
//# sourceMappingURL=TowerFactory.js.map
