import React, {useState, useEffect} from 'react';
import friendService from '../../utils/friendService';
import styles from './FriendPage.module.css';

import FriendGlance from '../../components/FriendGlance/FriendGlance';

import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const FriendPage = props => {
    const [friends, setFriends] = useState([]);

    const getFriends = () => {
        friendService.getFriends(props.user._id).then(res => setFriends(res));
    }

    useEffect(() => {
        getFriends();
    }, [])


    return (
        <div className={styles.body}>
            <h1>My Friends</h1>
            <div className={styles.topContainer}>
                <div className={styles.topLeft}>
                    <div className={styles.search}>
                        <SearchIcon  color="disabled" className={styles.searchIcon} />
                        <input placeholder='Search' className={styles.searchInput} type="text" />
                    </div>
                    <div>
                        <div>Sort By</div>
                        <ExpandMoreIcon color="disabled"/>
                    </div>
                </div>
                <div className={styles.topRight}>
                    <div>My Friends</div>
                    <div>Search Friends</div>
                </div>
            </div>
            <h2>{friends.length} Friends</h2>
            <div className={styles.friendList}>
                {friends.map((friend, idx) => (
                    <div key={idx}><FriendGlance friend={friend} user={props.user} getFriends={getFriends} /></div>
                ))}
            </div>
        </div>
    )
}

export default FriendPage;