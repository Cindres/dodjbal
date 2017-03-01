var Player = require('./player');

var PlayerBuilder = (function () {

    this.availableColors;

    this.colorsInUse;

    this.game;

    this.ball;

    this.actionPressed;

    this.playerCount;

    function PlayerBuilder(game) {
        this.game = game;
        this.colorIndex = 0;
        this.availableColors = ['0xFF9966', '0xDD3AAD', '0xDAA520', '0x528881'];
        this.colorsInUse = [];
        this.playerCount = 0;
    }

    PlayerBuilder.prototype.generateNewPlayer = function(x, y) {
        var colorIndex = Math.floor(Math.random() * (this.availableColors.length));

        var gamepad;
        switch(this.playerCount) {
            case 0:
                gamepad = this.game.input.gamepad.pad3;
                break;
            case 1:
                gamepad = this.game.input.gamepad.pad4;
                break;
            case 2:
                // gamepad = this.game.input.gamepad.pad2;
                break;
            case 3:
                // gamepad = this.game.input.gamepad.pad3;
                break;
        }

        this.playerCount++;

        var player = new Player(this.game, x, y, 'Player ' + (this.playerCount), this.availableColors[colorIndex], gamepad);

        this.colorsInUse.push(this.availableColors[colorIndex]);
        this.availableColors.splice(colorIndex, 1);

        return player;
    };

    return PlayerBuilder;

})();

module.exports = PlayerBuilder;