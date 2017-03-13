var Ball = require('./ball');
var PlayerBuilder = require('./playerBuilder');
var Player = require('./player');
var PlatformBuilder = require('./platformBuilder');

var game = new Phaser.Game(800, 300, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render });

var ball;
var players;
var playerBuilder;

function preload() {
    game.load.image('ball', 'assets/ball.png');
    game.load.image('player', 'assets/player.png');
    game.load.image('platform', 'assets/platform.png');
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    ball = new Ball(game, 400, 150);

    playerBuilder = new PlayerBuilder(game);

    PlatformBuilder.buildDefaultPlatforms(game);

    game.input.gamepad.start();

    players = [];
    players[0] = playerBuilder.generateNewPlayer(300, 150);
    players[1] = playerBuilder.generateNewPlayer(500, 150);

    game.add.existing(ball);
    game.add.existing(players[0]);
    game.add.existing(players[1]);

    ball.body.onCollide = new Phaser.Signal();
    ball.body.onWorldBounds = new Phaser.Signal();
    ball.body.onCollide.add(handleBallCollision, this);
    ball.body.onWorldBounds.add(handleBallBoundsCollision, this);

    game.world.swap(ball, players[0]);
    game.world.swap(ball, players[1]);

    game.physics.arcade.gravity.y = 700;
}

function update() {

    doCollisions();

    ball.body.velocity.x *= 0.99;

    for (var i = 0; i < players.length; i++) {
        players[i].doUpdate(ball);
    }
}


function render() {
}

function handleBallBoundsCollision(ball, target) {
    handleBallCollision(ball, { key: 'wall' });
}

function handleBallCollision(ball, target) {
    if (!ball.isHeld && ball.isActive && (target.key === 'wall' || target.key === 'platform')) {
        ball.isActive = false;
        ball.resetColor();
    }
    if (target.key === 'player' && !ball.isHeld && ball.isActive && !target.hasBall) {
        //Track a score or something.
        console.log(target.id + " was hit.");
        ball.isActive = false;
        ball.resetColor();
    }
}

function doCollisions() {
    PlatformBuilder.doCollisions(game, [players[0], players[1], ball]);
    
    game.physics.arcade.collide(players[0], ball);
    game.physics.arcade.collide(players[1], ball);
    game.physics.arcade.collide(players[0], players[1]);
}