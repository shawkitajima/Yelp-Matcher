import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './HomePage.module.css';
import FilterView from '../../components/FilterView/FilterView'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const HomePage = props => {

    const [location, setLocation] = useState(0);

    return (
        <div className={styles.body}>
            <div className={styles.topSection}>
                <div>
                    <div><MoreHorizIcon style={{fontSize: 40}} /></div>
                    <img className={styles.icon} src={require('../FriendDetailPage/meowth.png')} alt=""/>
                    <div className={styles.greeting}>Hello {props.user.name}!</div>
                    <div className={styles.message}>
                        We are so lucky to have you here with us. We
                        hope you have fun swiping and matching and 
                        making plans with us. But please avoid visiting
                        restaurants with your friends until we clear the 
                        current Coronavirus situation! This is a team effort!
                    </div>
                </div>
                <div>
                    <div className={styles.searchMessage}>Swipe in Custom Locations!</div>
                    <div className={styles.search}>
                        <div>
                            <LocationOnIcon style={{fontSize: 30}} />
                        </div>
                        <input type="text" placeholder={props.user.location} onChange={e => setLocation(e.target.value)}/>
                    </div>
                    <div className={styles.button}>
                        <Link className={styles.link} to={`/swipe/${location}`}><div>Explore Food</div></Link>
                    </div>
                </div>
            </div>
            <FilterView user={props.user} />
        </div>
    )
}
export default HomePage;