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

        game.add.sprite(450, 460, 'star');

        this.platforms = game.add.group();
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        
        game.add.sprite(300, 433, 'character');

        this.storyText = game.add.text(20, 50, ' Greetings from the collector of dreams! \r When people make wises, those fall from the skies \r in the form of what you people call shooting stars. \r My job is to collect those dreams \r or they fade and will not come true. \r I can only carry at 100 dreams at a time',{
            fontSize: '32px',
            fill: '#000' 

        });
        
        this.storyText = game.add.text(200, 350, ' press down arrow to play',{ fontSize: '32 px', fill: '#000' });
        
        this.cursors = game.input.keyboard.createCursorKeys();

    },
    update: function(){
        
        if (this.cursors.down.isDown) {
            game.state.start('main')
        }
        
    }
};

game.state.add('story', game_state.story);
game.state.start('story');