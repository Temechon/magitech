class Line {
    constructor(game, length, position=BABYLON.Vector3.Zero()) {
        this.game = game;

        this.length = length;
        this.cells = [];

        // A line is hot when an enemy is attached to this line
        this._isHot = false;

        for (let i=0; i<this.length; i++) {
            // Create new cell
            let c = new Cell(this.game, this);
            c.position.copyFrom(position);

            c.position.x += c.size * i;

            this.cells.push(c);
        }

    }

    /**
     * Set a line as hot activates all the tower on this line
     */
    set isHot(val) {
        this._isHot = true;
        for (let c of this.cells) {
            if (c.tower){
                c.tower.isActivated = true;
            }
        }
    }

    get isHot() {
        return this._isHot;
    }
}