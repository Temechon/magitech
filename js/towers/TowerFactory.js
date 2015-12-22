class TowerFactory {

    constructor (game) {
        this.game = game;
    }


    build(name) {
        let result = null;
        switch (name) {
            case 'shooter' :
                result = new ShootingTower(this.game);
                break;
            case 'generator' :
                result = new Generator(this.game);
                break;
            // TODO Add your own tower type


            default :
                break;
        }
        return result;
    }
}