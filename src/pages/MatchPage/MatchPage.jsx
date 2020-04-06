import React, {useState, useEffect} from 'react';
import friendService from '../../utils/friendService';
import { useParams } from "react-router-dom";
import styles from './MatchPage.module.css';

import RestaurantOverview from '../../components/ResterauntOverview/RestaurantOverview';

const MatchPage = () => {
    const {id, friend, name} = useParams();
    const [matches, setMatches] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        friendService.getMatches(id, friend).then(res => {
            setMatches(res);
            setLoaded(true);
        })
    }, [id, friend]);

    return (
        <div>
            <h1>Matches with {name}</h1>
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