class Gui {
    constructor(game) {

        this.game = game;

        this.towers = $(".tower");
        this.sendWaveButton = $("#send-wave");
        this.goldLabel = $("#gold");

        this.addAction();

    }

    addAction() {

        this.towers.each( (elem) => {
            console.log("coucou");
            //$(elem).click(() => {
            //    this.game.createTower();
            //});
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