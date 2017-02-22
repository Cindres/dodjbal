var Ball = require('./ball');
var PlayerBuilder = require('./playerBuilder');
var Player = require('./player');
var PlatformBuilder = require('./platformBuilder');

var game = new Phaser.Game(800, 300, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render });

var actionPressed;
var ball;
var player, dummyPlayer;
var playerBuilder;

function preload() {
    game.load.image('ball', 'assets/ball.png');
    game.load.image('player', 'assets/player.png');
    game.load.image('platform', 'assets/platform.png');
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    playerBuilder = new PlayerBuilder(game);

    PlatformBuilder.buildDefaultPlatforms(game);

    ball = new Ball(game, 400, 150);

    player = playerBuilder.generateNewPlayer(300, 150);
    dummyPlayer = playerBuilder.generateNewPlayer(500, 150);

    game.add.existing(ball);
    game.add.existing(player);
    game.add.existing(dummyPlayer);

    ball.body.onCollide = new Phaser.Signal();
    ball.body.onWorldBounds = new Phaser.Signal();
    ball.body.onCollide.add(handleBallCollision, this);
    ball.body.onWorldBounds.add(handleBallBoundsCollision, this);

    game.world.swap(ball, player);

    game.physics.arcade.gravity.y = 700;

    actionPressed = false;
}

function update() {

    doCollisions();

    player.body.velocity.x = 0;
    ball.body.velocity.x *= 0.99;

    //Keep ball stuck to player
    if (player.hasBall) {
        ball.x = player.x+3;
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
            ball.setColor(player.tint);
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

function handleBallBoundsCollision(ball, target) {
    handleBallCollision(ball, {key: 'wall'});
}

function handleBallCollision(ball, target) {
    if (ball.isActive && (target.key === 'wall' || target.key === 'platform')) {
        ball.resetColor();
        ball.isActive = false;
    }
    if (target.key === 'player' && ball.isActive && !target.hasBall) {
        //Track a score or something.
        console.log(target.id + " was hit.");
        ball.isActive = false;
        ball.resetColor();
    }
}

function doCollisions() {
    PlatformBuilder.doCollisions(game, [player, dummyPlayer, ball]);
    
    game.physics.arcade.collide(player, ball);
    game.physics.arcade.collide(dummyPlayer, ball);
    game.physics.arcade.collide(player, dummyPlayer);
}