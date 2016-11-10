/* global game phaser game_state */
game_state.story = function() {};

game_state.story.prototype = {
    
    preload: function(){
        
        game.load.image('sky', 'assets/background.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/dream.png');
        game.load.spritesheet('character', 'assets/character.png', 140, 140);   
    },
    create: function(){
        game.add.sprite(0, 0, 'sky');

        game.add.sprite(570, 20, 'star');

        this.platforms = game.add.group();
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        
        game.add.sprite(300, 433, 'character');

        this.storyText = game.add.text(20, 50, ' Greetings from the collector of dreams! \r When people make wishes, those fall from the skies \r in the form of what you people call shooting stars. \r I have the power to make those dreams come true \r and so it is my job to collect them. \r \r I can only carry at 100 dreams at a time',{
            fontSize: '32px',
            fill: '#000' 

        });
        
        this.storyText = game.add.text(200, 350, ' press down arrow to play',{ fontSize: '32 px', fill: '#000' });
        
        this.cursors = game.input.keyboard.createCursorKeys();

    },
    update: function(){
        
        if (this.cursors.down.isDown) {
            game.state.start('main');
        }
        
    }
};

game.state.add('story', game_state.story);
game.state.start('story');