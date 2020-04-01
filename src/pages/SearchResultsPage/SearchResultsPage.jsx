import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import { usePosition} from 'use-position';
import LinearProgress from '@material-ui/core/LinearProgress';
import restaurantService from '../../utils/restaurantService';
import RestaurantOverview from '../../components/ResterauntOverview/RestaurantOverview';
import styles from './SearchResultsPage.module.css';

const SearchResultsPage = props => {
    const location = useLocation();
    const { latitude, longitude } = usePosition();
    const search = location.state.search;
    const [searchResults, setSearchResults] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        restaurantService.search(search, latitude, longitude).then(res => {
            setSearchResults(res);
            setLoaded(true);
        })
    }, [search, latitude, longitude])

    return (
        <div>
            <h1>Search Results!</h1>
            <div className={styles.flexHori}>
            {searchResults.map((rest, idx) => (
                <div key={idx}>
                    < RestaurantOverview id={rest.id} key={idx} />
                </div>
            ))}
        </div>
        </div>
    )
}

export default SearchResultsPage;