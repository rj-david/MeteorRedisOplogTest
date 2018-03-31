// Meteor Packages
import { Meteor } from 'meteor/meteor';

// Helpers
import validatedPublications from '../helpers/validatedPublications';

// Collections
import { Notifications } from '../collections/Notifications';

if (Meteor.isServer) {
    let publications = [];

    // Publish only active count of notifications.
    publications.push(validatedPublications(
        'notifications.get.active',
        (inputs) => {},
        function () {

            let count = 0;
            let initializing = true;

            let filter = {
                userId: '123456',
                active: true
            }
            const handle = Notifications.find(filter, {
                namespace: `userId::123456`
            }).observeChanges({
                added: (id) => {
                    count += 1;
                    if (!initializing) {
                        this.changed('counts', 'activeNotifications', { count });
                    }
                },
                removed: (id) => {
                    count -= 1;
                    this.changed('counts', 'activeNotifications', { count });
                }
                // We don't care about `changed` events.
            });

            // Instead, we'll send one `added` message right after `observeChanges` has
            // returned, and mark the subscription as ready.
            initializing = false;
            this.added('counts', 'activeNotifications', { count });
            this.ready();

            // Stop observing the cursor when the client unsubscribes. Stopping a
            // subscription automatically takes care of sending the client any `removed`
            // messages.
            this.onStop(() => handle.stop());
        }
    ));
}