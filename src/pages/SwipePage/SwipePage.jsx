import React, {useState, useEffect} from 'react';
import { usePosition} from 'use-position';
import restaurantService from '../../utils/restaurantService';

const SwipePage = props => {

    const { latitude, longitude } = usePosition(true);

    const [rests, setRests] = useState([{}]);

    const [resIdx, setResIdx] = useState(0);

    const [offset, setOffset] = useState(0)

    const goNext = () => {
        if (resIdx >= 49) {
            setResIdx(0);
            setOffset(offset + 50);
        }
        else {
            setResIdx(resIdx + 1);
        }
    }
    useEffect(() => {
        restaurantService.restaurants(latitude, longitude, offset).then(res => setRests(res));
    }, [latitude, longitude, offset])
    
    return (
        <div>
            <h1>It's Swiping Time</h1>
            <h2>{rests[resIdx].id}</h2>
            <button onClick={() => goNext()}>Next</button>
        </div>
    )
}

export default SwipePage;