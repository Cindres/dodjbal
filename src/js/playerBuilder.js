var Player = require('./player');

var PlayerBuilder = (function () {

    this.availableColors;

    this.colorsInUse;

    this.game;

    function PlayerBuilder(game) {
        this.game = game;
        this.colorIndex = 0;
        this.availableColors = ['0xFF9966', '0xDD3AAD', '0xDDF2EC', '0x528881'];
        this.colorsInUse = [];
    }

    PlayerBuilder.prototype.generateNewPlayer = function(x, y) {
        var colorIndex = Math.floor(Math.random() * (this.availableColors.length));

        var player = new Player(this.game, x, y, 'Player', this.availableColors[colorIndex]);

        this.colorsInUse.push(this.availableColors[colorIndex]);
        this.availableColors.splice(colorIndex, 1);

        return player;
    };

    return PlayerBuilder;

})();

module.exports = PlayerBuilder;