/* global game phaser game_state */
game_state.story = function() {};

game_state.story.prototype = {
    
    preload: function(){
        
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/spirit.png');
        game.load.spritesheet('character', 'assets/character.png', 140, 140);   
    },
    create: function(){
        game.add.sprite(0, 0, 'sky');

        game.add.sprite(460, 460, 'star');

        this.platforms = game.add.group();
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        
        game.add.sprite(300, 450, 'character');

        this.storyText = game.add.text(20, 50, 'Greetings from the goddess of dreams \r When people make wises, those fall from the skies \r in the form of what you people call shooting stars. \r We call them "spirits" \r My job is to collect those spirits \r or they fade and those dreams will not come true ',{
            fontSize: '32px',
            fill: '#000' 
        });
    },
    update: function(){
        
    }
};

game.state.add('story', game_state.story);
game.state.start('story');