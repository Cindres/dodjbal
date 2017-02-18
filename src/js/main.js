var game = new Phaser.Game(800, 300, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render });

var player;

function preload() {
    game.load.image('bunny', 'bunny.png');
}

function create() {
    player = game.add.sprite(300, 250, 'bunny');

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable([player]);

    game.physics.arcade.gravity.y = 150;

    player.body.bounce.y = 0.5;
    player.body.collideWorldBounds = true;
}

function update() {
    // player.body.velocity.x = 0;
    // player.body.velocity.y = 0;
    // player.body.angularVelocity = 0;

    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        player.body.velocity.x = 200;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        player.body.velocity.x = -200;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {        
        player.body.velocity.y = -50;
    }
}

function render() {
}