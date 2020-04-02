import React from 'react';
import friendService from '../../utils/friendService';

const FriendOverview = props => {
    return (
        <div>
            <h1>{props.friend.name}</h1>
            <button onClick={() => {friendService.deleteFriend(props.user._id, props.friend._id).then(res => props.getFriends())}}>Delete</button>
        </div>
    )
}

export default FriendOverview