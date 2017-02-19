var game = new Phaser.Game(800, 300, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render });

var actionPressed;
var player;
var platformLeft, platformMiddle, platformRight;

function preload() {
    game.load.image('ball', 'assets/ball.png');
    game.load.image('bunny', 'assets/bunny.png');
    game.load.image('platform', 'assets/platform.png');
}

function create() {

    ball = game.add.sprite(400, 150, 'ball', 2);
    player = game.add.sprite(300, 150, 'bunny', 3);
    platformLeft = game.add.sprite(100, 200, 'platform', 1);
    platformMiddle = game.add.sprite(325, 100, 'platform', 1);
    platformRight = game.add.sprite(550, 200, 'platform', 1);

    game.world.swap(ball, player);

    platformLeft.width = 150;
    platformMiddle.width = 150;
    platformRight.width = 150;

    ball.width = 15;
    ball.height = 15;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable([ball, platformLeft, platformMiddle, platformRight, player]);

    game.physics.arcade.gravity.y = 700;

    platformLeft.body.allowGravity = false;
    platformMiddle.body.allowGravity = false;
    platformRight.body.allowGravity = false;
    platformLeft.body.immovable = true;
    platformMiddle.body.immovable = true;
    platformRight.body.immovable = true;

    player.body.collideWorldBounds = true;
    ball.body.collideWorldBounds = true;

    player.body.bounce.y = 0.15;
    ball.body.bounce.x = 0.7;
    ball.body.bounce.y = 0.7;

    player.hasBall = false;
    player.lastXDirection = null;

    actionPressed = false;
}

function update() {

    doCollisions();

    player.body.velocity.x = 0;
    ball.body.velocity.x *= 0.99;

    //Keep ball stuck to player
    if (player.hasBall) {
        ball.x = player.x+5;
        ball.y = player.y+15;
    }

    handleKeys();
}


function render() {
}

function handleKeys() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        player.body.velocity.x = 200;
        player.lastXDirection = 'RIGHT';
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        player.body.velocity.x = -200;
        player.lastXDirection = 'LEFT';
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && playerIsOnFloor(player)) {        
        player.body.velocity.y = -400;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.F)) {
        if (!actionPressed) {
            actionPressed = true;
            handleBall(player);
        }
    } else {
        actionPressed = false;
    }
}

function handleBall(player) {
    if (!player.hasBall) {
        //Attempt to pick up the ball.
        if(game.physics.arcade.distanceBetween(player, ball) < 40) {
            player.hasBall = true;
            ball.body.allowGravity = false;
        }
    } else {
        //Throw the ball.
        player.hasBall = false;
        ball.body.allowGravity = true;

        if (player.lastXDirection === 'RIGHT') {
            ball.body.velocity.x = 400;
        } else if (player.lastXDirection === 'LEFT') {
            ball.body.velocity.x = -400;
        }
        ball.body.velocity.y = -200;
    }
}

function doCollisions() {
    game.physics.arcade.collide(player, platformLeft);
    game.physics.arcade.collide(player, platformMiddle);
    game.physics.arcade.collide(player, platformRight);
    game.physics.arcade.collide(player, ball);

    game.physics.arcade.collide(ball, platformLeft);
    game.physics.arcade.collide(ball, platformMiddle);
    game.physics.arcade.collide(ball, platformRight);
}

function playerIsOnFloor(player) {
    return player.body.blocked.down || player.body.touching.down;
}