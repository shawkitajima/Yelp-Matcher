import React, {useState, useEffect} from 'react';
import restaurantService from '../../utils/restaurantService';

const LikeOverview = props => {
    const [details, setDetails] = useState({rating: 0});
    useEffect(() => {
        restaurantService.detail(props.id).then(res => setDetails(res));
    }, [props.id])
    return (
        <div>
            <h1>
                <img src={require(`../../components/Swipe/large_${details.rating}.png`)} alt="sorry"/>
                {details.name}  {details.price}
            </h1>
        </div>
    )
}

export default LikeOverview