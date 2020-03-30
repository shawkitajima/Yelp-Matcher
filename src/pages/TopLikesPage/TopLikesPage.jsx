import React, {useState, useEffect} from 'react';
import restaurantService from '../../utils/restaurantService';
import LikeOverview from '../../components/LikeOverview/LikeOverview';

const TopLikesPage = props => {
    const [topLikes, setTopLikes] = useState([]);


    useEffect(() => {
        restaurantService.topLikes().then(res => setTopLikes(res));
    }, [props.user])

    return (
        <div>
            <h1>Here are the top liked restaurants across all users</h1>
            {topLikes.map((rest, idx) => (
                < LikeOverview id={rest.like} user={props.user} key={idx} />
            ))}
        </div>
    )
}

export default TopLikesPage