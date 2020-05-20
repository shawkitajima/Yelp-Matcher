import React from 'react';
import {Link} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import userService from '../../utils/userService';
// We are going to resuse styles
import styles from '../FriendRequestMenuItem/FriendRequestMenuItem.module.css'

const RecommendationMenuItem = props => {
    return (
        <MenuItem className={styles.container} style={{width: '30rem'}}>
            <div>{props.rec.name} recommended {props.rec.rest}</div>
            <div>
                <div className={styles.button}><Link className={styles.link} to={`/detail/${props.rec.restId}`}>View</Link></div>
                <div onClick={() => userService.deleteRecommendation(props.user._id, props.idx).then(res => props.getNotifications())} className={styles.button}>Delete</div>
            </div>
        </MenuItem>        
    )
}

export default RecommendationMenuItem