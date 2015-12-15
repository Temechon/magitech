class Gui {
    constructor(game) {

        this.game = game;

        this.towerButton = $("#tower1");
        this.sendWaveButton = $("#send-wave");
        this.addAction();

    }

    addAction() {

        this.towerButton.click(() => {
            this.game.createTower();
        });

        this.sendWaveButton.click(() => {
            this.game.sendWave();
        });
    }
}