class Gui {
    constructor(game) {

        this.game = game;

        this.towers = $('.tower');
        this.sendWaveButton = $('#send-wave');
        this.goldLabel = $('#gold');

        this.addAction();

    }

    addAction() {


        // For Each tower button, add a click event on it
        this.towers.on('click', (elem)=> {
            // Create a tower by passing its CONFIG name
            this.game.createTower($(elem.currentTarget).attr('id'));
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