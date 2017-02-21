var PlatformBuilder = (function() {

    this.platforms;

    function PlatformBuilder() {
        this.platforms = [];
    }

    PlatformBuilder.prototype.buildDefaultPlatforms = function(game) {
        this.buildPlatform(game, 100, 200, 150, 25);
        this.buildPlatform(game, 325, 100, 150, 25);
        this.buildPlatform(game, 550, 200, 150, 25);        
    };

    PlatformBuilder.prototype.buildPlatform = function(game, x, y, width, height) {
        var platform = game.add.sprite(x, y, 'platform', 1);

        game.physics.arcade.enable([platform]);

        platform.width = width;
        platform.height = height;

        platform.body.allowGravity = false;
        platform.body.immovable = true;
    
        this.platforms.push(platform);
    };

    PlatformBuilder.prototype.doCollisions = function(game, gameObjects) {
        for (var i =0; i < this.platforms.length; i++) {
            for (var j = 0; j < gameObjects.length; j++) {
                game.physics.arcade.collide(this.platforms[i], gameObjects[j]);
            }
        }
    };

    return PlatformBuilder;

})();

module.exports = new PlatformBuilder();