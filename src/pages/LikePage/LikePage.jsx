import React, {useState, useEffect} from 'react';
import userService from '../../utils/userService';
import RestaurantOverview from '../../components/ResterauntOverview/RestaurantOverview';
import styles from './LikePage.module.css'

const LikePage = props => {
    const [likes, setLikes] = useState([]);

    const updateLikes = () => {
        userService.getLikes(props.user._id).then(res => setLikes(res));
    }

    useEffect(() => {
        updateLikes();
    }, [props.user])

    return (
        <div className={styles.flexHori}>
            {likes.map((rest, idx) => (
                <div key={idx}>
                    < RestaurantOverview id={rest} key={idx} />
                </div>
            ))}
        </div>
    )
}

export default LikePage