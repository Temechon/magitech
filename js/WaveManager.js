class WaveManager {

    constructor(game) {
        this.game = game;

        // Enemies sent on the battlefield but not dead yet for the current wave
        this.enemiesSent = [];

        // Enemies that should be sent for the current wave
        // This array is composed of objects {enemy, line}
        this.enemiesToSend = [];

        // Enemies sent for the current wave
        // This array is indexed by lines
        this.enemiesSent = [];

        this.ENEMIES_X_POSITION = 10;
    }

    /**
     * Send the next wave
     */
    sendWave() {

        // Create X enemies
        let nb = 10;
        for (let e=0; e<nb; e++) {
            let enemy = new Enemy(this.game);
            let line = this.game.getRandomLine();

            // update enemy position
            enemy.position.z = line.cells[0].position.z;
            enemy.position.x = this.ENEMIES_X_POSITION;

            // Save enemy
            this.enemiesToSend.push({enemy:enemy, line:line});
        }

        let count = 0;
        let t = new Timer(1500, this.game.scene, {repeat:nb, autodestroy:true});
        t.callback = () => {
            let obj = this.enemiesToSend[count++];
            let enemy = obj.enemy;
            let line = obj.line;
            enemy.isWalking = true;
            // set line as hot
            line.isHot = true;

            // Save the enemy that has been sent
            this.enemiesSent.push(obj);

            // Update gui
            this.game.gui.updateWavePointer(this.getWavePercentage());
        };
        t.onFinish = () => {
            // Remove all enemies to send, cause all enemies have been sent :)
            this.enemiesToSend.length = 0;
        };
        t.start();
    }

    /**
     * The given enemy has been destroyed: delete it from the wave manager.
     * If a line has no more enemy walking, deactivate the line
     */
    removeEnemy(enemy) {
        for (let i=0; i<this.enemiesSent.length; i++) {
            let obj = this.enemiesSent[i];
            if (obj.enemy === enemy) {
                this.enemiesSent.splice(i, 1);

                if (this.getNumberOfEnemiesOnLine(obj.line) == 0) {
                    // Deactivate tower on this line
                    obj.line.isHot = false;
                }
                break;
            }
        }
    }

    /**
     * Returns the number of enemies walking along a given line.
     */
    getNumberOfEnemiesOnLine(line) {
        let sum = 0;
        for (let obj of this.enemiesSent) {
            if (obj.line === line){
                sum++;
            }
        }

        return sum;
    }

    /**
     * Returns the current percentage of this wave. At 100%,
     * all enemies have been sent.
     */
    getWavePercentage() {
        return this.enemiesSent.length / this.enemiesToSend.length;
    }
}