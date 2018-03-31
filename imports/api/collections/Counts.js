// Meteor packages
import { Mongo } from 'meteor/mongo';

// dummy collection for counting records in a real collection
export const Counts = new Mongo.Collection('counts');