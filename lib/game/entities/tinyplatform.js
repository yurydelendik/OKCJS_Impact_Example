ig.module('game.entities.tinyplatform')
    .requires('impact.entity', 'game.entities.platform')
    .defines(function() {
        EntityTinyplatform = EntityPlatform.extend({
            size: { x: 32, y: 40 },
            animSheet: new ig.AnimationSheet('media/tinyplatform.png', 32, 40),
        });
    });




