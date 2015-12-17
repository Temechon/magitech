class WaveManager {

    constructor(game) {
        this.game = game;

        // Enemies sent on the battlefield but not dead yet for the current wave
        this.enemiesSent = [];

        // Enemies that should be sent for the current wave
        this.enemiesToSend = [];

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
            enemy.line = this.game.getRandomLine();
            enemy.position.x = this.ENEMIES_X_POSITION;
            this.enemiesToSend.push(enemy);
        }

        for (let e of this.enemiesToSend) {
            e.isWalking = true;
        }

        // TODO throw enemies periodically
        //setTimeout(() => {
        //    this.enemiesToSend[0].isWalking = true;
        //}, 1500)
    }
}