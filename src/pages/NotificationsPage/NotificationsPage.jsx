import React from 'react';
import PendingRequest from '../../components/PendingRequest/PendingRequest';

const NotificationsPage = props => {

    return (
        <div>
            {props.notifications + props.pending ? (
            <div>
                <h1>Here are your notifications</h1>
                    {props.pending.length > 0 && (
                        <div>
                            <h2>You have friend requests pending!</h2>
                            {props.pending.map((request, idx) => (
                                <div key={idx}>
                                    <PendingRequest pending={request}  user={props.user}/>
                                </div>
                            ))}
                        </div>
                    )}
                    {props.notifications.length > 0 && (
                        <div>
                            <h2>Here are your other notifications</h2>
                            {props.notifications.map((notification, idx) => (
                                <div key={idx}>
                                    <h1>{notification}</h1>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
            ) : (
            <div>
                <h1>Hmm, it looks like you don't have any notifications</h1>
            </div>
            )
            }
        </div>
    )
}

export default NotificationsPage;