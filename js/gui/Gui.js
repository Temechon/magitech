class Gui {
    constructor(game) {

        this.game = game;

        this.towerButton = $("#tower1");
        this.sendWaveButton = $("#send-wave");
        this.goldLabel = $("#gold");
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

    /**
     * Refresh all label of this GUI panel
     */
    refresh() {
        this.goldLabel.text(this.game.gold);
    }
}