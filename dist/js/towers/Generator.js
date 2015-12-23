'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Generator = (function (_Tower) {
    _inherits(Generator, _Tower);

    function Generator(game) {
        _classCallCheck(this, Generator);

        _get(Object.getPrototypeOf(Generator.prototype), 'constructor', this).call(this, game);

        this.name = 'generator';

        this.cost = 25;

        // This tower will generate gold every xx ms
        this.goldCadency = 3500;

        // Timer repeat indefinitely, each Xms, where X is goldCadency
        this.timer = null;
    }

    _createClass(Generator, [{
        key: 'init',
        value: function init() {
            var _this = this;

            _get(Object.getPrototypeOf(Generator.prototype), 'init', this).call(this);

            this.timer = new Timer(this.goldCadency, this.getScene(), { repeat: -1, autostart: true });
            this.timer.callback = function () {
                _this.generateGold();
            };
        }
    }, {
        key: 'build',
        value: function build() {
            _get(Object.getPrototypeOf(Generator.prototype), 'build', this).call(this);

            // Import generator asset
            this.addInstanceChild(this.game.assets['generator']);
        }

        /**
         * Generate gold
         */
    }, {
        key: 'generateGold',
        value: function generateGold() {
            if (this.isActivated) {
                this.game.gold += 15;
            }
        }
    }]);

    return Generator;
})(Tower);
//# sourceMappingURL=Generator.js.map
