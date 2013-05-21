ig.module('game.entities.player')
    .requires(
        'impact.entity',
        'game.entities.coinbullet',
        'plugins.box2d.entity'
    )
    .defines(function () {

        EntityPlayer = ig.Entity.extend({
            collides: ig.Entity.COLLIDES.PASSIVE,
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,
            health: 100,
            offset: { x: 0, y: 0 },
            maxVel: { x: 275, y: 275 },
            size: { x: 20, y: 65 },
            friction: { x: 600, y: 0 },
            name: "player",
            standing: true,
            animSheet: new ig.AnimationSheet('media/amanda.png', 48, 66),
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                ig.game.player = this;
                // Add the animations
                this.addAnim('idle', 1, [0]);
                this.addAnim('down', 0.5, [3]);
                this.addAnim('left', 0.2, [0, 1, 0, 2]);
                this.addAnim('right', 0.2, [0, 1, 0, 2]);
                this.addAnim('up', 0.1, [4]);
                

                ig.global.DE.Steer.Extender.Extend(this, "Ig");
                this.max_speed = 10;

                ig.game.player = this;
            },
            update: function () {
                this.handlePlayerMovement();
                this.parent();
            },
            
            check: function () {

                

                this.vel.x = -275;
                this.vel.y = -100;
            },

            handlePlayerMovement: function () {
                var leftRightForce = 150;
                var jumpForce = 400;                
                


                
                if (ig.input.pressed('shoot')) {
                    var x = this.pos.x + (this.flip ? -6 : 6);
                    var y = this.pos.y + 6;
                    ig.game.spawnEntity(EntityCoinbullet, x, y, { flip: this.currentAnim.flip.x });
                   

                }


                if (ig.input.pressed('up') && ig.input.state('left')) {
                    
                    if (this.standing) {
                        this.gravityFactor = 1;
                        this.offset = { x: 18, y: 0 };
                        this.vel.y = -jumpForce;
                        this.currentAnim = this.anims.up;
                        this.currentAnim.flip.x = true;
                    } 
                }
                else if (ig.input.pressed('up') && ig.input.state('right')) {
                    
                    if (this.standing) {
                        this.gravityFactor = 1;
                        this.offset = { x: 10, y: 0 };
                        this.vel.y = -jumpForce;
                        this.currentAnim = this.anims.up;
                        this.currentAnim.flip.x = false;
                    } 
                } else if (ig.input.pressed('up')) {
                    if (this.standing) {
                        this.gravityFactor = 1;
                        this.vel.y = -jumpForce;
                        this.vel.x = 0;
                        this.currentAnim = this.anims.up;
                        if (this.lastpressed === 'right') {
                            this.offset = { x: 10, y: 0 };
                            this.currentAnim.flip.x = false;
                        } else if (this.lastpressed === 'left') {
                            this.offset = { x: 18, y: 0 };
                            this.currentAnim.flip.x = true;
                        }
                    }
                } 
                else if (ig.input.state('left') && !ig.input.state('up')) {
                    if (this.standing) {
                        this.offset = { x: 28, y: 0 };
                        this.accel.x = -leftRightForce;
                        this.currentAnim = this.anims.left;
                        this.currentAnim.flip.x = true;
                    }
                    this.lastpressed = 'left';
                } else if (ig.input.state('right') && !ig.input.state('up')) {

                    if (this.standing) {
                        this.offset= { x: 0, y: 0 };
                        this.accel.x = leftRightForce;
                        this.currentAnim = this.anims.right;
                        this.currentAnim.flip.x = false;
                    }
                    this.lastpressed = 'right';
                    
                } else if (!ig.input.state('up')) {
                    
                    if (this.standing) {
                        this.currentAnim = this.anims.idle;
                        if (this.lastpressed === 'right') {
                            this.offset = { x: 0, y: 0 };
                            this.currentAnim.flip.x = false;
                        } else if (this.lastpressed === 'left') {
                            this.offset = { x: 28, y: 0 };
                            this.currentAnim.flip.x = true;
                        }
                    }
                }


                if (ig.input.released('left')) {
                    this.vel.x = 0;
                    this.accel.x = 0;
                    this.currentAnim.flip.x = true;
                    if (this.standing) {
                        this.currentAnim = this.anims.idle;
                        this.currentAnim.flip.x = true;
                    }
                    this.lastpressed = 'left';
                } else if (ig.input.released('right')) {
                    this.vel.x = 0;
                    this.accel.x = 0;
                    if (this.standing) {
                        this.currentAnim = this.anims.idle;
                        this.currentAnim.flip.x = false;
                    }
                    this.lastpressed = 'right';
                } else if (ig.input.released('up')) {
                    if (this.standing) {
                        this.vel.y = 0;
                        this.currentAnim = this.anims.idle;
                    }
                } 
                
            }

        });
    });
