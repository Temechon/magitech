class Tower extends GameObject{

    constructor(game) {
        super(game);

        // The current cell of the tower. Null at start because the tower is not placed
        this._cell = null;

        // The build cost of this tower
        this.cost = 0;

        // If true, this tower can start attacking the enemy.
        // Does nothing for generator towers.
        this.isActivated = false;
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
     * Init this tower. This method is called when the tower
     * is placed on its cell.
     */
    init() {
        // See implementation in children.
    }

    /**
     * Build this tower: create the mesh corresponding to this tower
     */
    build() {
        // See implementation in children.
    }

}