var Ball = (function() {

    this.defaultColor;

    this.isActive;

    function Ball(game, x, y) {

        this.defaultColor = '0xC0C0C0';

        Phaser.Sprite.call(this, game, x, y, 'ball');
        game.physics.arcade.enable([this]);

        this.isActive = false;

        this.width = 15;
        this.height = 15;

        this.body.collideWorldBounds = true;

        this.body.bounce.x = 0.7;
        this.body.bounce.y = 0.7;

        this.tint = this.defaultColor;
    }

    Ball.prototype = Object.create(Phaser.Sprite.prototype);

    Ball.prototype.constructor = Ball;
    
    Ball.prototype.resetColor = function() {
        this.tint = this.defaultColor;
    }

    Ball.prototype.setColor = function(color) { 
        this.tint = color;
    };

    return Ball;

})();

module.exports = Ball;