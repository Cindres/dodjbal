var Ball = (function() {

    this.isActive;

    function Ball(game, x, y) {

        Phaser.Sprite.call(this, game, x, y, 'ball');
        game.physics.arcade.enable([this]);

        this.isActive = false;

        this.width = 15;
        this.height = 15;

        this.body.collideWorldBounds = true;

        this.body.bounce.x = 0.7;
        this.body.bounce.y = 0.7;
    }

    Ball.prototype = Object.create(Phaser.Sprite.prototype);

    Ball.prototype.constructor = Ball;
    
    return Ball;

})();

module.exports = Ball;