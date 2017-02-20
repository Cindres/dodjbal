var Player = (function() {

    this.body;

    this.hasBall;

    this.lastXDirection;

    this.sprite;

    function Player(game) {
        this.hasBall = false;
        this.lastXDirection = null;
        
        this.sprite = game.add.sprite(300, 150, 'bunny', 3);

        game.physics.arcade.enable([this.sprite]);

        this.body = this.sprite.body;

        this.body.bounce.y = 0.15;
    }

    return Player;
})();

module.exports = Player;