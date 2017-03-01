var Player = (function() {

    this.id;

    this.hasBall;

    this.game;

    this.lastXDirection;

    this.gamepad;

    function Player(game, x, y, id, color, gamepad) {

        this.game = game;
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

        this.gamepad = gamepad;
    }

    Player.prototype = Object.create(Phaser.Sprite.prototype);

    Player.prototype.constructor = Player;

    Player.prototype.isOnFloor = function() {
        return this.body.blocked.down || this.body.touching.down;
    };

    Player.prototype.handleBall = function(ball) {
        if (!this.hasBall) {
            //Attempt to pick up the ball.
            if(this.game.physics.arcade.distanceBetween(this, ball) < 45 && !ball.isHeld) {
                this.hasBall = true;
                ball.isHeld = true;
                ball.setColor(this.tint);
                ball.body.allowGravity = false;
            }
        } else {
            //Throw the ball.
            ball.isActive = true;
            ball.isHeld = false;
            this.hasBall = false;
            ball.body.allowGravity = true;

            if (this.lastXDirection === 'RIGHT') {
                ball.body.velocity.x = 400;
            } else if (this.lastXDirection === 'LEFT') {
                ball.body.velocity.x = -400;
            }
            ball.body.velocity.y = -200;
        }
    };

    Player.prototype.doUpdate = function(ball) {
        this.body.velocity.x = 0;

        //Keep ball stuck to player
        if (this.hasBall) {
            ball.x = this.x+3;
            ball.y = this.y+15;
        }

        // Handle gamepad actions
        if (this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
            this.body.velocity.x = -200;
            this.lastXDirection = 'LEFT';
        } else if (this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
            this.body.velocity.x = 200;
            this.lastXDirection = 'RIGHT';
        }
        if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_A) && this.isOnFloor()) {
            this.body.velocity.y = -400;
        }
        if (this.gamepad.isDown(Phaser.Gamepad.XBOX360_X)) {
            if (!this.actionPressed) {
                this.actionPressed = true;
                this.handleBall(ball);
            }
        } else {
            this.actionPressed = false;
        }
    };

    return Player;
})();

module.exports = Player;