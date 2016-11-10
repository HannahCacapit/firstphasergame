/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}


game_state.main = function() {};
game_state.main.prototype = {


    preload: function() {

        game.load.image('sky', 'assets/background.png');
        game.load.image('ground', 'assets/floor.png');
        game.load.image('star', 'assets/dream.png');
        game.load.spritesheet('character', 'assets/character.png', 140, 140);

    },


    create: function() {

        //We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // A simple background for our game
        game.add.sprite(0, 0, 'sky');

        //This platform contains the ground and the 2 ledges we can jump on
        this.platforms = game.add.group();

        //We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        //Here we create the ground
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');

        //Scale it to fit the width of the game (the originalsprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //Now let's create ledges
        var ledge = this.platforms.create(330, 260, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.2, 0.5);
        ledge = this.platforms.create(40, 400, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.25, 0.5);
        ledge = this.platforms.create(110, 110, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.22, 0.5);
        ledge = this.platforms.create(540, 400, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.25, 0.5);
        ledge = this.platforms.create(510, 110, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.22, 0.5);
        
        //The this.player and its settings
        this.player = game.add.sprite(275, game.world.height - 210, 'character');

        //We need to add physics to this character
        game.physics.arcade.enable(this.player);

        //Player physics properties. Give the little guy a slight bounce
        this.player.body.bounce.y = /*global BOUNCE*/ -0.2;
        this.player.body.gravity.y = /*global GRAVITY*/ +350;
        this.player.body.collideWorldBounds = true;

        //Our two animations, walking left and right
        this.player.animations.add('right', [1, 2, 3, 4], 10, true);
        this.player.animations.add('left', [5, 6, 7, 8], 10, true);
        
        this.player.body.setSize(50, 75, 45, 30);

        //Our controls
        this.cursors = game.input.keyboard.createCursorKeys();

        //Finally some this.stars to collect
        this.stars = game.add.group();

        //We will enable physics for any star that is created in this group
        this.stars.enableBody = true;
       
        //Here we'll create 6 of them evenly spaced apart
        for (var i = 0; i < 6; i++) {
            //Create a star inside of the 'this.stars' group
            var star = this.stars.create(i * 133, 0, 'star');
            //Let gravity do its thing
            star.body.gravity.y = 300;

            //This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        
        //The this.score
       this.scoreText = game.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#000'
        });
        this.score = 0;
    },


    update: function() {
        game.debug.body(this.stars)
        //Collide the player and the platforms
        game.physics.arcade.collide(this.player, this.platforms);

        //Reset the the this.players velocity (movement)
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            //Moveto the left
            this.player.body.velocity.x = -180;

            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            //Move to the right
            this.player.body.velocity.x = 180;

            this.player.animations.play('right');
        
        }
        else {
            //Stand still
            this.player.animations.stop();

            this.player.frame = 0;
        }
        

        //Allow the this.player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }

        //Collide the stars and platforms
        game.physics.arcade.collide(this.stars, this.platforms);

        //Check to see if this.player overlaps with any of the this.stars, if he does call the collectStar function
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

        if(this.score===100){
            game.add.text(130, 290, ' I can only collect 100 dreams for now. \r Thank you for helping me collect wishes. \r Now I can make those dreams come true!',{
            fontSize: '32px',
            fill: '#000' 
        });
        }
    },

    collectStar: function(player, star) {
        //Removes the star from the screen
       if(this.score < 100){ star.kill();
        this.score++;
        this.scoreText.text = "Score: " + this.score;
        
        game.physics.arcade.collide(this.stars, this.platforms);
        
        //Create a star inside of the 'this.stars' group
        var i = 0; i < 6; i+=1
        star = this.stars.create(Math.random() * 800, 0, 'star');

        //We will enable physics for any star that is created in this group
        this.stars.enableBody = true;
       
        //Let gravity do its thing
        star.body.gravity.y = 300;

        //This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
       }
    }

};
game.state.add('main', game_state.main);
