import React, {useState, useEffect} from 'react';
import userService from '../../utils/userService';
import RestaurantOverview from '../../components/ResterauntOverview/RestaurantOverview';
import GridOnIcon from '@material-ui/icons/GridOn';
import MenuIcon from '@material-ui/icons/Menu';

import styles from './LikePage.module.css'

const LikePage = props => {
    const [likes, setLikes] = useState([]);

    const [view, setView] = useState(1);

    const updateLikes = () => {
        userService.getLikes(props.user._id).then(res => setLikes(res));
    }

    useEffect(() => {
        updateLikes();
    }, [props.user])

    return (
        <div>
            <div className={styles.viewIcons}>
                <MenuIcon onClick={() => setView(1)} />
                <GridOnIcon onClick={() => setView(0)} />
            </div>
            <div className={view ? styles.noWrap : styles.wrap}>
                {likes.map((rest, idx) => (
                    <div key={idx}>
                        < RestaurantOverview id={rest} key={idx} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LikePage