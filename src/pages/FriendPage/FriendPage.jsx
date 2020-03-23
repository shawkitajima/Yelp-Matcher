import React, {useState, useEffect} from 'react';
import userService from '../../utils/userService';
import FriendOverview from '../../components/FriendOverview/FriendOverview';

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
                <FriendOverview key={idx} user={props.user} friend={friend} getFriends={getFriends} />
            ))}
        </div>
    )
}

export default FriendPage;