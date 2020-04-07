import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import PendingRequest from '../../components/PendingRequest/PendingRequest';
import NotificationOverview from '../../components/NotificationOverview/NotificationOverview';
import userService from '../../utils/userService';

const NotificationsPage = props => {

    useEffect(() => {
        props.getNotifications()
      }, [])
    
    return (
        <div>
            {props.notifications.length + props.pending.length + props.recommendations.length  ? (
            <div>
                <h1>Here are your notifications</h1>
                    {props.pending.length > 0 && (
                        <div>
                            <h2>You have friend requests pending!</h2>
                            {props.pending.map((request, idx) => (
                                <div key={idx}>
                                    <PendingRequest pending={request}  user={props.user} getNotifications={props.getNotifications}/>
                                </div>
                            ))}
                        </div>
                    )}
                    {(props.notifications.length + props.recommendations.length) > 0 && (
                        <div>
                            {props.notifications.map((notification, idx) => (
                                <div key={idx}>
                                    <NotificationOverview notification={notification} idx={idx} user={props.user} getNotifications={props.getNotifications} />
                                </div>
                            ))}
                            {props.recommendations.map((recommendation, idx) => (
                                <div key={idx}>
                                    <p>{recommendation.name} shared {recommendation.rest} with you! Look at it <Link to={`/detail/${recommendation.restId}`}>here</Link>!</p>
                                    <span><button onClick={() => userService.deleteRecommendation(props.user._id, idx).then(res => props.getNotifications())}>Mark as Seen</button></span>
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