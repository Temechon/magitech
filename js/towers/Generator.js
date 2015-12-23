class Generator extends Tower {
    constructor(game) {
        super(game);

        this.name = 'generator';

        this.cost = 25;

        // This tower will generate gold every xx ms
        this.goldCadency = 3500;

        // Timer repeat indefinitely, each Xms, where X is goldCadency
        this.timer = null;

        // True if the tower can start generate gold, false otherwise
        this.canGenerateGold = false;

    }

    init() {
        super.init();

        this.timer = new Timer(this.goldCadency, this.getScene(), {repeat:-1, autostart:true});
        this.timer.callback = () => {
            this.generateGold();
        };
    }

    build() {
        super.build();

        // Import generator asset
        this.addInstanceChild(this.game.assets['generator']);

        // This tower has been placed: start gold generation
        this.canGenerateGold = true;
    }

    /**
     * Generate gold
     */
    generateGold() {
        if (this.canGenerateGold) {
            this.game.gold += 15;
        }
    }

    debug() {
        return `canGenerateGold : ${this.canGenerateGold}`;
    }
}