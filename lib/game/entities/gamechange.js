ig.module('game.entities.gamechange')
    .requires('impact.entity')
    .defines(function() {
        EntityGamechange = ig.Entity.extend({
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255, 0, 255, 0.7)',
            _wmScalable: true,
            
            size: { x: 8, y: 8 },
            game: null,
            triggeredBy: function (entity, trigger) {
                if (this.game) {
                    ig.system.setGame(ig.global[this.game]);
                }
            }
        });
    });