var game = new Phaser.Game(800, 300, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render });

var player;
var platformLeft, platformMiddle, platformRight;

function preload() {
    game.load.image('bunny', 'bunny.png');
    game.load.image('platform', 'platform.png');
}

function create() {

    player = game.add.sprite(300, 150, 'bunny', 2);
    platformLeft = game.add.sprite(100, 200, 'platform', 1);
    platformMiddle = game.add.sprite(325, 100, 'platform', 1);
    platformRight = game.add.sprite(550, 200, 'platform', 1);

    platformLeft.width = 150;
    platformMiddle.width = 150;
    platformRight.width = 150;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable([platformLeft, platformMiddle, platformRight, player]);

    game.physics.arcade.gravity.y = 150;

    platformLeft.body.allowGravity = false;
    platformMiddle.body.allowGravity = false;
    platformRight.body.allowGravity = false;
    platformLeft.body.immovable = true;
    platformMiddle.body.immovable = true;
    platformRight.body.immovable = true;

    player.body.collideWorldBounds = true;
}

function update() {

    game.physics.arcade.collide(player, platformLeft);
    game.physics.arcade.collide(player, platformMiddle);
    game.physics.arcade.collide(player, platformRight);

    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        player.body.velocity.x = 150;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        player.body.velocity.x = -150;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {        
        player.body.velocity.y = -100;
    }
}

function render() {
}