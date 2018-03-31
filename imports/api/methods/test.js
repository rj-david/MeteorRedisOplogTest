// Meteor Packages
import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

// Collections
import { newNotification } from '../collections/Notifications';


let methods = [];

methods.push(new ValidatedMethod({
    name: 'notifications.add',
    validate: () => {},
    async run({}) {
        console.log('server notifications.add');
        if (Meteor.isServer) {
            let userId = '123456';
            newNotification(userId, 'sample text', 1);
        }
    }
}));