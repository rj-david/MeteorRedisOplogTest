// Meteor Packages
import { Meteor } from 'meteor/meteor';

function validatedPublications(name, validator, callback) {
    Meteor.publish(name, function (inputs) {
        // validate the inputs
        try {
            validator(inputs);
        } catch (error) {
            this.error(error);
            console.log('publication validator error', error);
        }

        // bind this to the function
        newCallback = callback.bind(this);
        return newCallback(inputs);
    });

    return { name };
}

export default validatedPublications;