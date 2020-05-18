import React, {useState, useEffect} from 'react';
import friendService from '../../utils/friendService';
import styles from './FriendDetailPage.module.css';
import QuickOverview from '../../components/QuickOverview/QuickOverview';


import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const FriendDetailPage = props => {
    
    return (
        <div className={styles.body}>
            <div className={styles.backToFriends}>
                <ArrowBackIcon />
                <div>&nbsp; My Friends</div>
            </div>
            <div className={styles.topContainer}>
                <div className={styles.friendOverview}>
                    <div><MoreHorizIcon style={{ fontSize: 40 }}/></div>
                    <img className={styles.icon} src={require('./meowth.png')} alt=""/>
                    <div>John Smith</div>
                    <div>
                        <LocationOnIcon style={{ fontSize: 16 }}/> 
                        <div>Location</div>
                    </div>
                    <div>
                        Yolo swag I've written you some poetry. I like
                        to eat sweet and spicy things. But never
                        together. Just like Romeo and Juliet
                    </div>
                </div>
                <div className={styles.friendStats}>
                    <div className={styles.statBox}>
                        <AllInclusiveIcon style={{fontSize: 40}} />
                        <div>
                            <div>13</div>
                            <div>Mutual Friends</div>
                        </div>
                    </div>
                    <div className={styles.statBox}>
                        <FavoriteIcon style={{fontSize: 40}} />
                        <div>
                            <div>51</div>
                            <div>Liked Restaurants</div>
                        </div>
                    </div>
                    <div className={styles.statBox}>
                        <LocalDiningIcon style={{fontSize: 40}} />
                        <div>
                            <div>15</div>
                            <div>Mutual Restaurants</div>
                        </div>
                    </div>
                </div>
                <div className={styles.feature}>
                        <QuickOverview  id={'J7_y8fSiuqhf9m7oiixZLw'} />
                        <BookmarkIcon className={styles.bookmark} style={{fontSize: 70, color: 'white'}}/>
                </div>
            </div>
        </div>
    )
}

export default FriendDetailPage;