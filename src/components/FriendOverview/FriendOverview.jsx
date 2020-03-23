import React from 'react';
import userService from '../../utils/userService';

const FriendOverview = props => {
    return (
        <div>
            <h1>{props.friend.name}</h1>
            <button onClick={() => {userService.deleteFriend(props.user._id, props.friend._id).then(res => props.getFriends())}}>Delete</button>
        </div>
    )
}

export default FriendOverview