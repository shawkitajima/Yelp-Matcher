import React, {useState, useEffect} from 'react';
import { usePosition} from 'use-position';
import restaurantService from '../../utils/restaurantService';
import userService from '../../utils/userService';
import Swipe from '../../components/Swipe/Swipe';

const SwipePage = props => {

    const { latitude, longitude } = usePosition();

    const [rests, setRests] = useState([{}]);

    const [resIdx, setResIdx] = useState(0);

    const [offset, setOffset] = useState(0);

    const moveNext = () => {
        userService.see(props.user._id, rests[resIdx].id)
        if (rests[resIdx + 1]) {
            setResIdx(resIdx + 1);
        }
        else {
            setResIdx(0);
            userService.offset(props.user._id);
            setOffset(offset + 1);
        }
    }

    const like = (rest) => {
        userService.like(props.user._id, rest).then(res => console.log(res));
        moveNext()
    }

    useEffect(() => {
        restaurantService.restaurants(latitude, longitude, props.user._id).then(res => setRests(res));
    }, [latitude, longitude, offset, props.user._id])
    
    return (
        <div>
            <h1>It's Swiping Time</h1>
            <Swipe id={rests[resIdx].id} />
            <button onClick={() => like(rests[resIdx].id)}>Like</button>
            <button onClick={() => moveNext()}>Nah</button>
        </div>
    )
}

export default SwipePage;