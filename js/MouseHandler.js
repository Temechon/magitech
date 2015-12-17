class MouseHandler {


    constructor(game) {

        this.game = game;

        // This object will follow the mouse.
        this.followMouse = null;

        // True if the player is placing a tower
        this.isPlacingTower = false;

        // Debug mode activated
        this.debugMode = false;
        this.debugDiv = [];

        // Activate debug mode
        $(window).on('keydown', (evt) => {
            if (evt.keyCode == 222) {
                this.debugMode = !this.debugMode;
                if (!this.debugMode) {
                    for (let d of this.debugDiv) {
                        d.remove();
                    }
                }
            }
        });

        // Mouse move handler if the player selected a tower
        $(window).on('mousemove', (evt) => {
            if (this.followMouse) {
                this.isPlacingTower = true;

                // get nearest cell
                let c = this.getNearestCell(evt);
                if (c) {
                    this.followMouse.position.copyFrom(c.position);
                }
            }
        });

        // DEBUG click event
        $(window).on('click', (evt) => {
            if (this.debugMode) {
                let obj = this.getObject(evt);
                if (obj && obj.debug) {
                    let d = $("<div>")
                        .addClass('debug')
                        .css("top", evt.clientY)
                        .css("left", evt.clientX)
                        .text(obj.debug());

                    this.debugDiv.push(d);
                    $("body").append(d);
                }
            }
        });

        // Mouse click handler when the tower should be placed
        $(window).on('click', (evt) => {
            if (this.isPlacingTower && this.followMouse) {

                let c = this.getNearestCell(evt);
                if (c && c.isEmpty()) {
                    // Affect cell to tower
                    this.followMouse.cell = c;

                    // Remove tower from mousemove
                    this.followMouse = null;
                    this.isPlacingTower = false;
                }

            }
        });

    }

    // Project the given screen coordinate into 3D world
    getWorldPosition(evt) {
        // Update pointer coordinate
        this.game.scene._updatePointerPosition(evt);

        let scene = this.game.scene;
        var pr = scene.pick(scene._pointerX, scene._pointerY, (mesh) => { return mesh.name == "ground"; }, false);
        if (pr.hit) {
            return pr.pickedPoint.clone();
        }
        return null;
    }

    /**
     * Returns the object clicked
     * @param evt The mouse event
     * @returns {Mesh} The selected mesh, null otherwise
     */
    getObject(evt) {
        // Update pointer coordinate
        this.game.scene._updatePointerPosition(evt);

        let scene = this.game.scene;
        var pr = scene.pick(scene._pointerX, scene._pointerY, null, false);
        if (pr.hit) {
            return pr.pickedMesh;
        }
        return null;
    }

    /**
     * Returns the nearest cell from the current mouse position
     * @param evt The mouse event
     * @returns null if there is no world position (scene.pick returns null), the nearest Cell otherwise
     */
    getNearestCell(evt) {
        // Pick ground position according to the mouse cursor
        let worldPos = this.getWorldPosition(evt);
        if (worldPos) {
            return this.game.getNearestCell(worldPos);
        }
        return null;
    }



}