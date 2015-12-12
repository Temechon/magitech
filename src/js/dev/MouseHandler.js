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
                this.followMouse.position = this.getWorldPosition();
            }
        })

    }

    // Project the given screen coordinate into 3D world
    getWorldPosition() {
        let scene = this.game.scene;
        this.game.scene.pick(scene._pointerX, scene._pointerY, null, false);
        if (pick.hit) {
            return pick.pickedPoint.clone();
        }
    }



}