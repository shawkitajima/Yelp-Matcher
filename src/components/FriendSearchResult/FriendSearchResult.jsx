import React from 'react';
import friendService from '../../utils/friendService';

const FriendSearchResult = props => {
    const request = () => {
        friendService.request(props.user._id, props.result.id).then(res => alert(res.message));
    }
    return (
        <div>
            <h1>{props.result.name}</h1>
            <button onClick={() => request()}>Add</button>
        </div>
    )
}

export default FriendSearchResult;