class Gui {
    constructor(game) {

        this.game = game;

        this.towerButton = $("#tower1");
        this.addAction();

    }

    addAction() {

        this.towerButton.click(() => {
            this.game.createTower();
        });
    }
}