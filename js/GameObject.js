class GameObject extends BABYLON.Mesh {
    constructor(game) {
        super("__go__", game.scene);
        this.game = game;

        // The game object is not visible
        this.isVisible = false;

        // A game object can have several children
        this._children = [];

        // tag
        BABYLON.Tags.AddTagsTo(this, "__go__");
    }

    setReady() {
        this.computeWorldMatrix(true);
        this._children.forEach(function(child) {
            child.computeWorldMatrix(true);
        });
    }

    /**
     * Create an instance of the given meshes and link them to this game object (by adding
     * them in children).
     * Child is a mesh or an array of meshes
     */
    addInstanceChild(child) {
        let children;

        if (! (child instanceof Array)) {
            children = [child];
        } else {
            children = child;
        }

        children.forEach((elem) => {
            if (elem instanceof BABYLON.Mesh) {
                let instance = elem.createInstance(elem.name);
                instance.isPickable = true;
                instance.parent = this;
                this._children.push(instance);
            } else {
                console.warn(`${elem} is not a mesh!`);
            }
        });
    }

    isCollidingWith(other) {
        // If other is a gameobject, collide each children
        if (BABYLON.Tags.MatchesQuery(other, "__go__")) {
            for (var i=0; i<this._children.length; i++) {
                for (var j=0; j<other._children.length; j++) {
                    if (this._children[i].intersectsMesh(other._children[j], true)) {
                        return true;
                    }
                }
            }
        } else {
            // Otherwise, collide each children with other
            for (i=0; i<this._children.length; i++) {
                if (this._children[i].intersectsMesh(other, true)) {
                    return true;
                }
            }
        }
    }
}