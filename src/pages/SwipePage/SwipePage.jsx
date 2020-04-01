import React, {useState, useEffect} from 'react';
import { usePosition} from 'use-position';
import restaurantService from '../../utils/restaurantService';
import userService from '../../utils/userService';
import RestaurantDetailPage from '../RestaurantDetailPage/RestaurantDetailPage'

const SwipePage = props => {

    const { latitude, longitude } = usePosition();

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

    useEffect(() => {
        restaurantService.restaurants(latitude, longitude, props.user._id).then(res => setRests(res));
        userService.getFriends(props.user._id).then(res => setFriends(res));
    }, [latitude, longitude, offset, props.user._id])
    
    return (
        <RestaurantDetailPage id={rests[resIdx].id} like={like} moveNext={moveNext} user={props.user} friends={friends}/>
    )
}

export default SwipePage;