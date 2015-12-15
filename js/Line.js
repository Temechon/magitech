class Line {
    constructor(game, length, position=BABYLON.Vector3.Zero()) {
        this.game = game;

        this.length = length;
        this.cells = [];

        for (let i=0; i<this.length; i++) {
            // Create new cell
            let c = new Cell(this.game, this);
            c.position.copyFrom(position);

            c.position.x += c.size * i;

            this.cells.push(c);
        }

    }
}