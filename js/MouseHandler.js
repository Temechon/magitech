class MouseHandler {


    constructor(game) {

        this.game = game;

        // This object will follow the mouse
        this.followMouse = null;

        $(window).mousemove((evt) => {
            if (this.followMouse) {
                // Update pointer coordinate
                this.game.scene._updatePointerPosition(evt);
                // Pick ground position according to the mouse cursor
                let worldPos = this.getWorldPosition();
                if (worldPos) {
                    let c = this.game.getNearestCell(worldPos);
                    this.followMouse.position.copyFrom(c.position);

                }

            }
        })

    }

    // Project the given screen coordinate into 3D world
    getWorldPosition() {
        let scene = this.game.scene;
        var pr = scene.pick(scene._pointerX, scene._pointerY, (mesh) => { return mesh.name == "ground"; }, false);
        if (pr.hit) {
            return pr.pickedPoint.clone();
        }
        return null;
    }



}