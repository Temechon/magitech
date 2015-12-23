class Cell extends GameObject{

    constructor(game, line) {
        super(game);

        this.position = BABYLON.Vector3.Zero();
        this.size = 1;

        // A cell belongs to a line
        this.line = line;

        // The tower on this cell
        this.tower = null;

        this.isVisible = true;

        // A cell is a squared plane
        var vd = BABYLON.VertexData.CreateGround({
            width: this.size,  height: this.size, subdivisions: 1
        });
        vd.applyToMesh(this, false);

        this.material = new BABYLON.StandardMaterial("", this.getScene());
    }

    /**
     * Returns true if this cell is empty, false otherwise
     * @returns {boolean}
     */
    isEmpty () {
        return !this.tower;
    }


    debug() {
        return `is empty : ${this.isEmpty()}, hot : ${this.line.isHot}`
    }

}