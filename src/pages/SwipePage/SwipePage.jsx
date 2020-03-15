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

    const [seen, setSeen] = useState([{}]);

    const moveNext = () => {
        if (resIdx >= 49) {
            setResIdx(0);
            setOffset(offset + 51);
        }
        else {
            setResIdx(resIdx + 1);
        }
    }

    const like = (rest) => {
        userService.like(props.user._id, rest).then(res => console.log(res));
        moveNext()
    }



    useEffect(() => {
        restaurantService.restaurants(latitude, longitude, offset).then(res => setRests(res));
        userService.getSeen(props.user._id).then(res => setSeen(res));
    }, [latitude, longitude, offset])

    // Checks if user has already looked at this restaurant
    useEffect(() => {
        if (seen.includes(rests[resIdx].id)) {
            setResIdx(resIdx + 1);
        }
        else {
            userService.see(props.user._id, rests[resIdx].id);
        }
    }, [resIdx, seen, rests])
    
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