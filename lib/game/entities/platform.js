ig.module('game.entities.platform')
    .requires('impact.entity')
    .defines(function() {
        EntityPlatform = ig.Entity.extend({
            collides: ig.Entity.COLLIDES.FIXED,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            offset: { x: 0, y: 8 },
            vel: { x: 0, y: 0 },
            maxVel: { x: 30, y: 20 },
            size: { x: 64, y: 32 },
            friction: { x: 600, y: 0 },
            zIndex: -1,
            name: "platform",
            animSheet: new ig.AnimationSheet('media/scrollingplatform.png', 64, 40),
            gravityFactor: 0,

            //Our Variables
            currentHeading: "right",
            headingType: 'horizontal',
            speed : 1,

            init: function(x, y, settings) {
                this.parent(x, y, settings);
                ig.game.platform = this;
                this.addAnim('idle', 1, [0]);
            },
            
            update: function () {
                if (this.currentHeading === 'right') {
                    this.pos.x = this.pos.x + this.speed;
                } else if (this.currentHeading === 'left') {
                    this.pos.x = this.pos.x - this.speed;
                } else if (this.currentHeading === 'up') {
                    this.pos.y = this.pos.y - this.speed;
                } else if (this.currentHeading === 'down') {
                    this.pos.y = this.pos.y + this.speed;
                }
                this.parent();
            },
            check: function (other) {
                if (other.name === 'player') {
                    if (this.currentHeading === 'right') {
                        other.pos.x = other.pos.x + this.speed;
                    } else if (this.currentHeading === 'left') {
                        other.pos.x = other.pos.x - this.speed;
                    } else if (this.currentHeading === 'up') {
                        other.gravityFactor = 1;
                    } else if (this.currentHeading === 'down') {
                        other.gravityFactor = 500;
                    }
                }
                this.parent();
            }            
        });
    });




