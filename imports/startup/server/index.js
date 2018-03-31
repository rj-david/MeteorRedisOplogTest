// Meteor Packages
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // Methods
    require('../../api/methods/test');

    // Publications
    require('../../api/publications/test');
});