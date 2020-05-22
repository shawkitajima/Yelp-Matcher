import React, {useState, useEffect} from 'react';
import { usePosition} from 'use-position';
import {useParams} from 'react-router-dom';
import restaurantService from '../../utils/restaurantService';
import userService from '../../utils/userService';
import friendService from '../../utils/friendService';
import RestaurantDetailPage from '../RestaurantDetailPage/RestaurantDetailPage'

const SwipePage = props => {

    const { latitude, longitude } = usePosition();

    const { location } = useParams();

    const [rests, setRests] = useState([{}]);

    const [resIdx, setResIdx] = useState(0);

    const [offset, setOffset] = useState(0);

    const [friends, setFriends] = useState([]);

    const moveNext = () => {
        userService.see(props.user._id, rests[resIdx].id)
        if (rests[resIdx + 1]) {
            setResIdx(resIdx + 1);
        }
        else {
            setResIdx(0);
            setOffset(offset + 1);
        }
    }

    const like = (rest) => {
        userService.like(props.user._id, rest).then(res => console.log(res));
        moveNext()
    }


    // We will allow users to use their browser based location OR
    // They can swipe using a location they inputted in the home page
    const getRests = () => {
        if (location === '0') {
            restaurantService.restaurants(latitude, longitude, props.user._id).then(res => {
                setRests(res);
                userService.setLocation(props.user._id, res[0].location.city);
            });
        } else {
            restaurantService.restaurants(latitude, longitude, props.user._id, location).then(res => {
                setRests(res);
            })
        }
    }

    useEffect(() => {
        getRests();
        friendService.getFriends(props.user._id).then(res => setFriends(res));
    }, [latitude, longitude, offset, props.user._id])
    
    return (
        <RestaurantDetailPage id={rests[resIdx].id} like={like} moveNext={moveNext} user={props.user} friends={friends} swipe={true}/>
    )
}

export default SwipePage;