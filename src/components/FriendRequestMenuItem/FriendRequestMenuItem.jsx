import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import friendService from '../../utils/friendService';
import styles from './FriendRequestMenuItem.module.css'

const FriendRequestMenuItem = props => {
    return (
        <MenuItem className={styles.container} style={{width: '30rem'}}>
            <div>{props.friend.name} added you as a friend!</div>
            <div>
                <div onClick={() => friendService.acceptRequest(props.user._id, props.friend._id).then(res => props.getNotifications())} className={styles.button}>Accept</div>
                <div onClick={() => friendService.rejectRequest(props.user._id, props.friend._id).then(res => props.getNotifications())} className={styles.button}>Reject</div>
            </div>
        </MenuItem>        
    )
}

export default FriendRequestMenuItem