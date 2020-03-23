import React, {useState, useEffect} from 'react';
import userService from '../../utils/userService';

const FriendPage = props => {
    const [friends, setFriends] = useState([]);

    const getFriends = () => {
        userService.getFriends(props.user._id).then(res => setFriends(res));
    }

    useEffect(() => {
        getFriends();
    }, [])

    
    return (
        <div>
            <h1>Here are your current friends!</h1>
            {friends.map((friend, idx) => (
                <div key={idx}>
                    {friend.name}
                </div>
            ))}
        </div>
    )
}

export default FriendPage;