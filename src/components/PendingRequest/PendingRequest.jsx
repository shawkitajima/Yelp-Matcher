import React from 'react';
import userService from '../../utils/userService';

const PendingRequest = props => {
    return (
        <div>
            <h1>{props.pending.name}</h1>
            <button onClick={() => userService.acceptRequest(props.user._id, props.pending._id).then(res => alert(res.message))}>Add!</button>
            <button onClick={() => userService.rejectRequest(props.user._id, props.pending._id).then(res => console.log(res))}>Reject</button>
        </div>
    )
}

export default PendingRequest