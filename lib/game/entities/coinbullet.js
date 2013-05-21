
ig.module('game.entities.coinbullet')
    .requires(
        'impact.entity',
        
        'plugins.box2d.entity'
    )
    .defines(function() {
        EntityCoinbullet = ig.Box2DEntity.extend({
            size: { x: 8, y: 4 },

            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.B,
            collides: ig.Entity.COLLIDES.NEVER, // Collision is already handled by Box2D!
            density:1,
            animSheet: new ig.AnimationSheet('media/coinbullet.png', 16, 16),
            lifetime: 2,
            bulletPower: 25,
            bounciness: 9,
            init: function (x, y, settings) {
                this.parent(x, y, settings);

                this.addAnim('idle', 1, [0]);
                this.currentAnim.flip.x = settings.flip;


                var velocity = (settings.flip ? -30 : 30);
                this.body.ApplyImpulse(new b2.Vec2(velocity, 0), this.body.GetPosition());
                
                this.idleTimer = new ig.Timer();
            },
            update: function () {

                if (this.idleTimer.delta() > this.lifetime) {
                    this.kill();
                    return;
                }
                this.currentAnim.alpha = this.idleTimer.delta().map(
                    this.lifetime - this.fadetime, this.lifetime,
                    1, 0
                );
                this.parent();
            },
            check: function (other) {

                if (typeof (other) == 'object' && typeof (other.shot) == 'function') {
                    other.shot(this);
                    this.lifetime = this.lifetime * 0.25;
                }

            }
        });

    });


