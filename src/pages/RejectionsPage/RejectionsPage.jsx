import React, {useEffect, useState} from 'react';
import userService from '../../utils/userService';
import friendService from '../../utils/friendService'

import RestaurantDetailPage from '../RestaurantDetailPage/RestaurantDetailPage'

const RejectionsPage = props => {
    const [rejections, setRejections] = useState([]);
    const [friends, setFriends] = useState([]);
    const [message, setMessage] = useState();
    const [index, setIndex] = useState(0);

    const getRejections = () => {
        userService.getRejections(props.user._id).then(res => setRejections(res));
    }

    const moveNext = () => {
        if (rejections[index + 1]) {
            setIndex(index + 1);
            setMessage(false);
        }
        else {
            getRejections();
            setIndex(0);
            setMessage('You have completed a cycle of your rejections');
        }
    }

    const like = (rest) => {
        userService.like(props.user._id, rest).then(res => console.log(res));
        moveNext()
    }

    useEffect(() => {
        getRejections();
        friendService.getFriends(props.user._id).then(res => setFriends(res));
    }, [props.user]);

    return (
        rejections.length ? 
        (
            <div>
                {message && <h1>{message}</h1>}
                <RestaurantDetailPage id={rejections[index]} like={like} moveNext={moveNext} user={props.user} friends={friends} swipe={true}/>
            </div>
        ) :
        (
            <div>
                <h1>Loading Baby</h1>
            </div>
        )
    )
}

export default RejectionsPage;