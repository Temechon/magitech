'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShootingTower = (function (_Tower) {
    _inherits(ShootingTower, _Tower);

    function ShootingTower(game) {
        _classCallCheck(this, ShootingTower);

        _get(Object.getPrototypeOf(ShootingTower.prototype), 'constructor', this).call(this, game);

        this.name = 'Shooter Tower'; // Only here for debug purpose

        // The tower cost. see superclass
        this.cost = 50;

        // True if the tower start to shoot, false otherwise
        this.isActivated = false;

        // This tower will shoot every xx ms
        this.shootCadency = 500;

        // Timer repeat indefinitely, each Xms, where X is shootCadency
        this.timer = null;
    }

    _createClass(ShootingTower, [{
        key: 'init',
        value: function init() {
            var _this = this;

            _get(Object.getPrototypeOf(ShootingTower.prototype), 'init', this).call(this);
            this.timer = new Timer(this.shootCadency, this.getScene(), { repeat: -1, autostart: true });
            this.timer.callback = function () {
                _this.shoot();
            };
        }

        /**
         * Display debug information on the screen
         * @returns {string}
         */
    }, {
        key: 'debug',
        value: function debug() {
            return 'Shooting Tower \n * is activated : ' + this.isActivated;
        }

        /**
         * Fire a bullet if there is at least one enemy in sight
         */
    }, {
        key: 'shoot',
        value: function shoot() {
            if (this.isActivated) {
                var pos = this.position.clone();
                pos.y = 1;
                new Bullet(this.game, pos);
            }
        }
    }]);

    return ShootingTower;
})(Tower);
//# sourceMappingURL=ShootingTower.js.map
