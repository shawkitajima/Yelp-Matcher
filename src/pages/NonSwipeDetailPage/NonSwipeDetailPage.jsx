import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import friendService from '../../utils/friendService';
import userService from '../../utils/userService';
import RestaurantDetailPage from '../RestaurantDetailPage/RestaurantDetailPage';


const NonSwipeDetailPage = props => {
    const { id } = useParams();
    const [friends, setFriends] = useState([]);


    const like = (rest) => {
        userService.see(props.user._id, rest);
        userService.like(props.user._id, rest).then(res => {
            res.message && console.log(res.message)
        });
    }

    useEffect(() => {
        friendService.getFriends(props.user._id).then(res => setFriends(res));
    }, [props.user._id])


    return (
        <RestaurantDetailPage id={id} user={props.user} friends={friends} swipe={false} like={like}/>
    )
};

export default NonSwipeDetailPage;