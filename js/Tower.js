class Tower extends GameObject{

    constructor(game) {
        super(game);

        this.position = BABYLON.Vector3.Zero();

        this.isVisible = true;

        // The current cell of the tower. Null at start because the tower is not placed
        this._cell = null;

        // True if the tower start to shoot, false otherwise
        this.isActivated = false;

        // This tower will shoot every xx ms
        this.shootCadency = 500;

        // Timer repeat indefinitely, each 500ms
        this.timer = new Timer(500, this.getScene(), {repeat:-1, autostart:true});
        this.timer.callback = () => {
            this.shoot();
        };

        // A cell is a squared plane
        var vd = BABYLON.VertexData.CreateBox({width:1, height:2, depth:1});
        vd.applyToMesh(this, false);


    }

    /**
     * Display debug information on the screen
     * @returns {string}
     */
    debug() {
        return `is activated : ${this.isActivated}`
    }

    /**
     * Link the given cell to this tower
     * @param cell
     */
    set cell(cell) {
        this._cell = cell;
        this._cell.tower = this;

        // If the corresponding line is hot, activate this tower
        if (this._cell.line.isHot) {
            this.isActivated = true;
        }
    }

    /**
     * Unlink the cell from this tower
     */
    unlinkCell() {
        if (this._cell) {
            this._cell.tower = null;
        }
        this._cell = null;

        // deactivate tower
        this.isActivated = false;
    }

    /**
     * Fire a bullet if there is at least one enemy in sight
     */
    shoot () {
        if (this.isActivated) {
            console.log("SHOOTING!!");
        }
    }

}