import React from 'react';
import userService from '../../utils/userService';

const FriendSearchResult = props => {
    const request = () => {
        userService.request(props.user._id, props.result.id).then(res => alert(res.message));
    }
    return (
        <div>
            <h1>{props.result.name}</h1>
            <button onClick={() => request()}>Add</button>
        </div>
    )
}

export default FriendSearchResult;