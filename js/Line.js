class Line {
    constructor(game, length, position=BABYLON.Vector3.Zero()) {
        this.game = game;

        this.length = length;
        this.cells = [];

        // Unique ID
        this.id = this.uniqueId();

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
     * Generates a unique ID for this line
     */
    uniqueId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Set a line as hot activates all the tower on this line
     */
    set isHot(val) {
        this._isHot = val;
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