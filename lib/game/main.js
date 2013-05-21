ig.module(
    'game.main'
)
    .requires(
        'impact.game',
        'impact.font',
        'game.entities.player',
        'game.entities.enemy',
        /* level transition entities */
        'game.entities.levelchange',
        'game.entities.trigger',
        'game.entities.void',
        'game.entities.platform',
        'game.entities.tinyplatform',
        'game.entities.platformwaypoint',
        'game.entities.gamechange',        
        //Levels
        
       'game.levels.street',
       

        //AI extension


        //plugins
        'plugins.box2d.game',
        'plugins.box2d.debug',
        'plugins.scrollscreen',
        //ImpactJS debugger
        'impact.debug.debug'
    )
    .defines(function() {

        OpenScreen = ig.Game.extend({
            StartImage: new ig.Image('media/StartScreen.png'),
            init: function() {
                ig.input.bind(ig.KEY.SPACE, 'LoadGame');
            },
            update: function() {
                if (ig.input.pressed('LoadGame')) {
                    ig.system.setGame(MyGame);
                }
            },
            draw: function() {
                this.parent();
                this.StartImage.draw(0, 0);
            }
        });

        Victory = ig.Game.extend({
            StartImage: new ig.Image('media/Victory.png'),
            init: function() {
                ig.input.bind(ig.KEY.SPACE, 'LoadGame');
            },
            update: function() {
                if (ig.input.pressed('LoadGame')) {
                    ig.system.setGame(OpenScreen);
                }
            },
            draw: function() {
                this.parent();
                this.StartImage.draw(0, 0);
            }
        });

        GameOver = ig.Game.extend({
            StartImage: new ig.Image('media/GameOver.png'),
            init: function() {
                if (ig.ua.mobile) {
                    ig.system.setGame(MyGame);
                }
                ig.input.bind(ig.KEY.SPACE, 'LoadGame');
            },
            update: function() {
                if (ig.input.pressed('LoadGame')) {
                    ig.system.setGame(MyGame);
                }
            },
            draw: function() {
                this.parent();
                this.StartImage.draw(0, 0);
            }
        });
        MyGame = ig.Box2DGame.extend({
                // Load a font
                font: new ig.Font('media/04b03.font.png'),
                gravity: 500,

                init: function() {
                    ig.game.createWorldFromMap(LevelStreet);
                    ig.game.loadLevel(LevelStreet);
                    // Initialize your game here; bind keys etc.

                    // move your character
                    ig.input.bind(ig.KEY.UP_ARROW, 'up');
                    ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
                    ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
                    ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
                    ig.input.bind(ig.KEY.SPACE, 'shoot');

                    this.time = 100000;
                    this.timeMultiplier = 1;
                },

                update: function() {

                    // Update all entities and backgroundMaps
                    this.parent();

                    //this.scrollScreen();

                    if (this.time > 0) {
                        this.scrollScreen();
                    } else {
                        ig.system.setGame(GameOver);
                    }
                },

                draw: function() {
                    // Draw all entities and backgroundMaps
                    this.parent();


                    this.time = this.time - this.timeMultiplier;

                    if (this.time > 0) {
                        this.font.draw('Time Left ' + this.time, 5, 5, ig.Font.ALIGN.LEFT);
                    } else {
                        this.gameOver();
                    }
                },
                loadLevel: function(data) {
                    this.parent(data);
                    for (var i = 0; i < this.backgroundMaps.length; i++) {
                        this.backgroundMaps[i].preRender = true;
                    }
                },
                addCoin: function() {
                    //pickup item
                    GameInfo.coins += 1; //add a coin to the money
                },
                increaseScore: function(points) {
                    //increase score by certain amount of points
                    GameInfo.score += points;
                },
                addProjectile: function(nbr_projectiles) {
                    //add one projectile when you find one
                    GameInfo.projectiles += nbr_projectiles;
                },
                substractProjectile: function() {
                    //add one projectile when you find one
                    GameInfo.projectiles -= 1;
                },
                gameOver: function() {
                    this.font.draw('No Time Left', 5, 5, ig.Font.ALIGN.LEFT);
                    //this.font.draw('GAME OVER , YOU FAIL!', 256, 180, ig.Font.ALIGN.CENTER);

                },
            }
        );

        ig.main('#canvas', OpenScreen, 60, 512, 384, 1.5);
    });
