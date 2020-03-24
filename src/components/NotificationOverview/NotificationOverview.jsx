import React from 'react';
import userService from '../../utils/userService';

const NotificationOverview = props => {
    return (
        <div>
            <h1>{props.notification}</h1>
            <button onClick={() => userService.deleteNotification(props.user._id, props.idx).then(res => props.getNotifications())}>Mark as Seen</button>
        </div>
    )
}

export default NotificationOverview