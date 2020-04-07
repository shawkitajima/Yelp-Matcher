import React, {useState, useEffect} from 'react';
import restaurantService from '../../utils/restaurantService';
import styles from './TopLikesPage.module.css';

import RestaurantOverview from '../../components/ResterauntOverview/RestaurantOverview';

const TopLikesPage = props => {
    const [topLikes, setTopLikes] = useState([]);


    useEffect(() => {
        restaurantService.topLikes().then(res => setTopLikes(res));
    }, [props.user])

    return (
        <div>
            <h1>Here are the top liked restaurants across all users right now!</h1>
            <div className={styles.flexHori}>
                {topLikes.map((rest, idx) => (
                    < RestaurantOverview id={rest.like} user={props.user} key={idx} />
                ))}
            </div>
        </div>
    )
}

export default TopLikesPage