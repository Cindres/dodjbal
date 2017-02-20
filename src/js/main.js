var Ball = require('./ball');
var Player = require('./player');

var game = new Phaser.Game(800, 300, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render });

var actionPressed;
var ball;
var player;
var dummyPlayer;
var platformLeft, platformMiddle, platformRight;

function preload() {
    game.load.image('ball', 'assets/ball.png');
    game.load.image('player', 'assets/bunny.png');
    game.load.image('platform', 'assets/platform.png');
}

function create() {

    platformLeft = game.add.sprite(100, 200, 'platform', 1);
    platformMiddle = game.add.sprite(325, 100, 'platform', 1);
    platformRight = game.add.sprite(550, 200, 'platform', 1);

    ball = new Ball(game, 400, 150);

    player = new Player(game, 300, 150);
    dummyPlayer = new Player(game, 500, 150);

    game.add.existing(ball);
    game.add.existing(player);
    game.add.existing(dummyPlayer);

    ball.body.onCollide = new Phaser.Signal();
    ball.body.onCollide.add(handleBallCollision, this);

    game.world.swap(ball, player);

    platformLeft.width = 150;
    platformMiddle.width = 150;
    platformRight.width = 150;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable([platformLeft, platformMiddle, platformRight]);

    game.physics.arcade.gravity.y = 700;

    platformLeft.body.allowGravity = false;
    platformMiddle.body.allowGravity = false;
    platformRight.body.allowGravity = false;
    platformLeft.body.immovable = true;
    platformMiddle.body.immovable = true;
    platformRight.body.immovable = true;

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
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.isOnFloor()) {        
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
        if(game.physics.arcade.distanceBetween(player, ball) < 45) {
            player.hasBall = true;
            ball.isActive = true;
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

function handleBallCollision(ball, target) {
    if (target.key === 'player' && ball.isActive && !target.hasBall) {
        console.log("Hit");
    }
}

function doCollisions() {
    //TODO: Make players an array of players, do this dynamically.
    game.physics.arcade.collide(player, platformLeft);
    game.physics.arcade.collide(player, platformMiddle);
    game.physics.arcade.collide(player, platformRight);
    game.physics.arcade.collide(player, ball);

    game.physics.arcade.collide(dummyPlayer, platformLeft);
    game.physics.arcade.collide(dummyPlayer, platformMiddle);
    game.physics.arcade.collide(dummyPlayer, platformRight);
    game.physics.arcade.collide(dummyPlayer, ball);

    game.physics.arcade.collide(player, dummyPlayer);

    game.physics.arcade.collide(ball, platformLeft);
    game.physics.arcade.collide(ball, platformMiddle);
    game.physics.arcade.collide(ball, platformRight);
}