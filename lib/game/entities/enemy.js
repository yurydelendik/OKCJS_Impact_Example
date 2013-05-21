ig.module('game.entities.enemy')
    .requires(

        'impact.entity',

        'game.entities.coinbullet',
        'plugins.box2d.entity',
        'plugins.desteer.entity'
    )
    .defines(function () {
        EntityEnemy = ig.Box2DEntity.extend({
            // where to find the animation sheet     
            collides: ig.Entity.COLLIDES.FIXED,
            type: ig.Entity.TYPE.B,
            density: 2,
            checkAgainst: ig.Entity.TYPE.A,
            health: 250,
            offset: { x: 0, y: 0 },
            maxVel: { x: 250, y: 275 },
            size: { x: 24, y: 66 },
            friction: { x: 0, y: 0 },
            name: "enemy",
            standing: true,
            animSheet: new ig.AnimationSheet('media/meter.png', 24, 66),


            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [0]);
                
                ig.global.DE.Steer.Extender.Extend(this, "Ig");

                this.max_speed = 100;
                
            },
            update: function () {
                this.parent();
                var player = ig.game.getEntitiesByType(EntityPlayer)[0];

                var arrive = this.Steering.Arrive(player, 10);

                if (this.distanceTo(player) < 275) {
                    this.vel = arrive; //this would be what happens if not box2d

                    this.body.ApplyImpulse(new b2.Vec2(arrive.x, arrive.y), this.body.GetPosition());

                   
                }

   
                
            },

            kill: function () {

                this.parent();
            },
            shot: function (bullet) {
                this.health = this.health - (bullet.bulletPower || 1);

                if (this.health < 1) {
                    this.kill();
                    return;
                }
            }
        });
    });
