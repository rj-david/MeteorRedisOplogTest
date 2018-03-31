// Meteor Packages
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// NPM Modules
import SimpleSchema from 'simpl-schema';

export const Notifications = new Mongo.Collection('notifications');

const notificationTypes = [
    1,      // System messages
    2,      // Complete profile
    3,      // Staff of business
];

let NotificationsSchema = new SimpleSchema({
    userId: {
        type: String,
    },
    text: {
        type: String,
        max: 128
    },
    createdAt: {
        type: Date
    },
    active: {
        type: Boolean
    },
    persistent: {
        type: Boolean
    },
    type: {
        type: Number,
        allowedValues: notificationTypes
    },
    options: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Notifications.attachSchema(NotificationsSchema);

// new notification
export function newNotification(userId, text, type, persistent = false, options = null, push = false) {
    let notificationId = Notifications.insert({
        userId,
        text,
        type,
        persistent,
        options,
        active: true,
        createdAt: new Date(),
    }, {
        namespace: `userId::${userId}`
    });

    // this is a hack. insert to update redis oplog is not working
    // notificationOn(notificationId, userId);
}

// mark notification as unread
export function notificationOn(id, userId) {
    Notifications.update({
        _id: id,
        userId
    }, {
        $set: {
            active: true
        }
    }, {
        namespace: `userId::${userId}`
    });
}

if (Meteor.isServer) {
    Notifications.deny({
        insert() { return true; },
        update() { return true; },
        remove() { return true; }
    });
}