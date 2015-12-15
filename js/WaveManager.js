class WaveManager {

    constructor(game) {
        this.game = game;

        // Enemies sent on the battlefield but not dead yet for the current wave
        this.enemiesSent = [];

        // Enemies that should be sent for the current wave
        this.enemiesToSend = [];
    }

    /**
     * Send the next wave
     */
    sendWave() {

        // Create X enemies
        let nb = 10;
        for (let e=0; e<nb; e++) {
            let enemy = new Enemy(this.game);
            this.enemiesToSend.push(enemy);
        }

    }
}