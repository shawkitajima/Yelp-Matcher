import React, {useState, useEffect} from 'react';
import restaurantService from '../../utils/restaurantService';

const LikeOverview = props => {
    const [details, setDetails] = useState({});
    useEffect(() => {
        restaurantService.detail(props.id).then(res => setDetails(res));
    }, [])
    return (
        <div>
            <h1>{details.name}</h1>
        </div>
    )
}

export default LikeOverview