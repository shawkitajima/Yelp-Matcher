import React from 'react';
import friendService from '../../utils/friendService';

const PendingRequest = props => {
    return (
        <div>
            <h1>{props.pending.name}</h1>
            <button onClick={() => friendService.acceptRequest(props.user._id, props.pending._id).then(res => {
                props.getNotifications();
                props.setMessage(res.message);
                props.setSeverity(res.severity);
                props.setOpen(true);
            })}>Add!</button>
            <button onClick={() => friendService.rejectRequest(props.user._id, props.pending._id).then(res => props.getNotifications())}>Reject</button>
        </div>
    )
}

export default PendingRequest