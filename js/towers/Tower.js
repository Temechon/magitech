class Tower extends GameObject{

    constructor(game) {
        super(game);

        this.position = BABYLON.Vector3.Zero();

        // The current cell of the tower. Null at start because the tower is not placed
        this._cell = null;

        // The build cost of this tower
        this.cost = 0;

        // A cell is a squared plane
        var vd = BABYLON.VertexData.CreateBox({width:0.5, height:1.5, depth:0.5});
        vd.applyToMesh(this, false);
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

    // Init this tower. Should be called when a tower can be built.
    init() {
        this.isVisible = true;
        // See implementation in childrens.
    }
}