class Gui {
    constructor(game) {

        this.game = game;

        this.towers = $(".tower");
        this.sendWaveButton = $("#send-wave");
        this.goldLabel = $("#gold");

        this.addAction();

    }

    addAction() {


        // For Each tower button, add a click event on it
        this.towers.on('click', (elem)=> {
            console.log($(elem));
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