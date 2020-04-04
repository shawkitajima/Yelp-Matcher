import React, {useState, useEffect} from 'react';
import friendService from '../../utils/friendService';
import { useLocation } from "react-router-dom";
import styles from './MatchPage.module.css';

import RestaurantOverview from '../../components/ResterauntOverview/RestaurantOverview';

const MatchPage = props => {
    const location = useLocation();
    const [matches, setMatches] = useState([]);
    const [loaded, setLoaded] = useState(false);

    console.log(location.state.friend._id);

    useEffect(() => {
        friendService.getMatches(props.user._id, location.state.friend._id).then(res => {
            setMatches(res);
            setLoaded(true);
        })
    }, [props.user, location.state.friend]);

    return (
        <div>
            <h1>Matches with {location.state.friend.name}</h1>
            {loaded && (
                matches.length > 0 ? (
                    <div className={styles.flexHori}>
                        {matches.map((match, idx) => (
                            < RestaurantOverview key={idx} id={match} />
                        ))}
                    </div>
                ) : (
                    <div>
                        <h2>It looks like you don't have any matches</h2>
                        <h2>Are you sure this person is your friend?</h2>
                    </div>
                )
            )}
        </div> 
        
    )
}

export default MatchPage;