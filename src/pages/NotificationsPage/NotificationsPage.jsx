import React, {useState, useEffect} from 'react';
import userService from '../../utils/userService';

const NotificationsPage = props => {
    const [pending, setPending] = useState();
    const [notifications, setNotifications] = useState();

    useEffect(() => {
        userService.getNotifications(props.user._id).then(res => {
            setPending(res.pending);
            setNotifications(res.notifications);
        })
    }, [props.user])
    return (
        <div>
            {notifications + pending ? (
            <div>
                <h1>Here are your notifications</h1>
                    {pending && (
                        <div>
                            <h2>You have friend requests pending!</h2>
                            {pending.map((request, idx) => (
                                <div key={idx}>
                                    <h1>{request.name}</h1>
                                </div>
                            ))}
                        </div>
                    )}
                    {notifications && (
                        <div>
                            <h2>Here are your other notifications</h2>
                            {notifications.map((notification, idx) => (
                                <div key={idx}>
                                    <h1>{notification}</h1>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
            ) : (
            <div>
                <h1>Hmm, it looks like you don't have any notifactions</h1>
            </div>
            )
            }
        </div>
    )
}

export default NotificationsPage;