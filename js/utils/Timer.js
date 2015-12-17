/**
* Builds a new timer. A timer can delay an action, and repeat this action X times
* @param time The time in milliseconds
* @param scene The scene
* @param callback The callback function called when the timer is finished
* @param options.autostart If set to true, the timer will autostart. False by default.
 *@param options.autodestroy If set to true, the timer will autodestroy at the end of all callback functions. False by default
 *@param options.repeat If set, the callback action will be repeated the specified number of times. 1 by default. Set to -1 if repeat infinitely
*/
class Timer {

    constructor(time, scene, options={}) {

        this._scene = scene;

        this.maxTime = this.currentTime = time;

        // True if the timer is finished, false otherwise
        this.isOver = false;

        // True if the timer is paused, false otherwise
        this.paused = false;

        // True if the timer has been started, false otherwise
        this.started = false;

        this.callback = null;

        //If set, the callback action will be repeated the specified number of times
        this.repeat = options.repeat || 1;

        this.autostart = options.autostart || false;

        this.autodestroy = options.autodestroy || false;

        this._registeredFunction = () => {
            if (this.started && !this.isOver && !this.paused) {
                this._update();
            }
        };
        scene.registerBeforeRender(this._registeredFunction);

        // Start the timer is set to autostart
        if (this.autostart) {
            this.start();
        }
    }

    /**
     * Reset the timer
     */
    reset() {
        this.currentTime = this.maxTime;
        this.isOver = false;
        this.started = false;
        this.paused = false;
    }

    /**
     * Start the timer
     */
    start() {
        this.started = true;
    }

    /**
     * Pause the timer
     */
    pause() {
        this.paused = true;
    }

    /**
     * Stop the timer, and reset it.
     * @param destroy If set to true, the timer is deleted.
     */
    stop(destroy) {
        this.started = false;
        this.reset();
        if (destroy) {
            this._destroy();
        }
    }

    /**
     * Destory the timer
     * @private
     */
    _destroy() {
        // Unregister update function
        this._scene.unregisterBeforeRender(this._registeredFunction);
    }

    /**
     * Unpause the timer
     */
    resume() {
        this.paused = false;
    }

    /**
     * The update function
     * @private
     */
    _update() {

        this.currentTime -= this._scene.getEngine().getDeltaTime();

        if (this.currentTime <= 0) {
            // The delay is finished, run the callback
            this.isOver = true;
            if (this.repeat != -1) {
                this.repeat--;
            }
            this.callback();

            if (this.repeat > 0 || this.repeat == -1) {
                this.reset();
                this.start();
            } else {
                // Autodestroy
                if (this.autodestroy) {
                    this._destroy();
                }
            }
        }
    }
}