var Player = (function() {

    this.id;

    this.hasBall;

    this.lastXDirection;

    function Player(game, x, y, id) {

        this.id = id;

        Phaser.Sprite.call(this, game, x, y, 'player');
        game.physics.arcade.enable([this]);

        this.hasBall = false;
        this.lastXDirection = null;

        this.body.collideWorldBounds = true;
        this.body.bounce.y = 0.15;
    }

    Player.prototype = Object.create(Phaser.Sprite.prototype);

    Player.prototype.constructor = Player;

    Player.prototype.isOnFloor = function() {
        return this.body.blocked.down || this.body.touching.down;
    }

    return Player;
})();

module.exports = Player;