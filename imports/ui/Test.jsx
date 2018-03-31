// Meteor packages
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// NPM Modules
import React from 'react';

// Collections
import { Counts } from '../api/collections/Counts';

class Test extends React.Component {
    constructor(props) {
        super(props);
    }

    addNotification(e) {
        e.preventDefault();

        console.log('call notifications.add');
        Meteor.call('notifications.add', {}, function(error, result) {
            console.log('return notifications.add');
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps);
    }

    render() {
        return (
            <div>
                Notifications Count: {this.props.count || 0}
                <br /><br />
                <a href="#" onClick={this.addNotification.bind(this)}>Click for New Notification</a>
            </div>
        );
    }
}

export default withTracker(() => {
    let count = 0;

    let handleCount = Meteor.subscribe('notifications.get.active');
    let notificationsCount = Counts.findOne('activeNotifications');
    if (notificationsCount) {
        count = notificationsCount.count;
    }

    return {
        count
    };
})(Test);