class ShootingTower extends Tower {

    constructor (game) {
        super(game);

        this.cost = 50;

        // True if the tower start to shoot, false otherwise
        this.isActivated = false;

        // This tower will shoot every xx ms
        this.shootCadency = 500;

        // Timer repeat indefinitely, each 500ms
        this.timer = new Timer(this.shootCadency, this.getScene(), {repeat:-1, autostart:true});
        this.timer.callback = () => {
            this.shoot();
        };
    }


    /**
     * Display debug information on the screen
     * @returns {string}
     */
    debug() {
        return `Shooting Tower \n * is activated : ${this.isActivated}`
    }

    /**
     * Fire a bullet if there is at least one enemy in sight
     */
    shoot () {
        if (this.isActivated) {
            let pos = this.position.clone();
            pos.y = 1;
            new Bullet(this.game, pos);
        }
    }
}