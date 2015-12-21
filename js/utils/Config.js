/**
 * The configuration object of this game
 */
class Config {

    constructor() {

        // Contains all towers
        this.towers = [];
        this._tower("shooter", 25);
        this._tower("generator", 50);


    }

    // Create a tower config object
    _tower(name, price) {
        this.towers[name] = {
            price : price
        };
    }

}