class Gui {
    constructor(game) {

        this.game = game;

        this.towers = $('.tower');
        this.sendWaveButton = $('#send-wave');
        this.goldLabel = $('#gold');

        // The wave progress
        this.wavePointer = $('#wave-pointer');
        // Get the length of the wave indicator
        this.waveIndicatorLength = this.wavePointer
            .parent() // get parent node
            .css('width') // get width '300px'
            .slice(0,-2); // chop last two characters

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

    /**
     * Refresh the wave pointer indicating the current state of the wave
     */
    updateWavePointer(percentage) {
        this.wavePointer.css('right', this.waveIndicatorLength * percentage);
    }
}