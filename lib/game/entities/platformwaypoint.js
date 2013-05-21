/*
This entity does nothing but just sits there. It can be used as a target
for other entities, such as movers.
*/

ig.module(
    'game.entities.platformwaypoint'
)
    .requires(
        'impact.entity'
    )
    .defines(function () {

        EntityPlatformwaypoint = ig.Entity.extend({
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(128, 256, 2, 0.7)',
            _wmScalable: true,
            name: 'platformwaypoint',
            size: { x: 8, y: 8 },

            checkAgainst: ig.Entity.TYPE.B,

            update: function () {
            },
            check: function (other) {

                if (other.name === 'platform') {
                    if (other.headingType === 'horizontal') {
                        if (other.currentHeading === 'right') {
                            other.currentHeading = 'left';
                        } else {
                            other.currentHeading = 'right';
                        }                        
                    } else {
                        if (other.currentHeading === 'up') {
                            other.currentHeading = 'down';
                        } else {
                            other.currentHeading = 'up';
                        }
                    }
                }
            }
        });

    });