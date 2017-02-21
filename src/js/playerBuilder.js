var Player = require('./player');

var PlayerBuilder = (function () {

    this.colors;

    this.colorIndex;

    this.game;

    function PlayerBuilder(game) {
        this.game = game;
        this.colorIndex = 0;
        this.colors = ['0xFF9966', '0xDD3AAD', '0xDDF2EC', '0x528881'];
    }

    PlayerBuilder.prototype.generateNewPlayer = function(x, y) {
        var player = new Player(this.game, x, y, 'Player', this.colors[this.colorIndex]);
        this.colorIndex++;
        return player;
    };

    return PlayerBuilder;

})();

module.exports = PlayerBuilder;