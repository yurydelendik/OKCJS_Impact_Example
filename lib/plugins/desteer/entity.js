
ig.module(
    'plugins.desteer.entity'
)
.requires(
    'plugins.desteer.lib',
    'impact.game'
)
.defines(function () {
    
    ig.global.DE = ig.global.DE || {};
    ig.global.DE.Steer = ig.global.DE.Steer || {};
    ig.global.DE.Steer.Extenders = ig.global.DE.Steer.Extenders || {};

    ig.global.DE.Steer.Extenders.Ig = function (entity, max_speed) {


        entity.max_speed =  max_speed || 10;


        entity.de_pos = function () {
            return DE.Math.Vec2d(entity.pos);
        };

        entity.de_heading = function () {
            return DE.Math.HeadingVec(entity.currentAnim.angle);
        };

        entity.de_max_speed = function () {
            return entity.max_speed;
        };

        return entity;
    };

    ig.DeSteerEntity = ig.global.DE.Steer.Extender.Extend(ig.Entity, "Ig");

    console.log(ig.DeSteerEntity);

});