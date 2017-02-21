var Player = (function() {

    this.id;

    this.hasBall;

    this.lastXDirection;

    this.color;

    function Player(game, x, y, id, color) {

        this.id = id;

        Phaser.Sprite.call(this, game, x, y, 'player');
        game.physics.arcade.enable([this]);

        this.width = 20;
        this.height = 40;

        this.hasBall = false;
        this.lastXDirection = null;

        this.body.collideWorldBounds = true;
        this.body.bounce.y = 0.15;

        this.tint = color;
    }

    Player.prototype = Object.create(Phaser.Sprite.prototype);

    Player.prototype.constructor = Player;

    Player.prototype.isOnFloor = function() {
        return this.body.blocked.down || this.body.touching.down;
    }

    return Player;
})();

module.exports = Player;