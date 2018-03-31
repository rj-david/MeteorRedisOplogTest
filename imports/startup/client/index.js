// Meteor packages
import { Meteor } from 'meteor/meteor';

// NPM modules
import React from 'react';
import ReactDOM from 'react-dom';

// React components
import Test from '../../ui/Test.jsx';

// Execute after loading the DOM
Meteor.startup(() => {
    ReactDOM.render(
        <Test />,
        document.getElementById('react-container')
    )
});