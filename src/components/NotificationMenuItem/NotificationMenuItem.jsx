import React from 'react';
import {Link} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import userService from '../../utils/userService';
// We are going to resuse styles
import styles from '../FriendRequestMenuItem/FriendRequestMenuItem.module.css'

const NotificationMenuItem = props => {
    return (
        <MenuItem className={styles.container} style={{width: '30rem'}}>
            <div>{props.notif.name} accepted your friend request!</div>
            <div>
                <div className={styles.button}><Link className={styles.link} to={`/friendDetails/${props.notif.id}`}>View</Link></div>
                <div onClick={() => userService.deleteNotification(props.user._id, props.idx).then(res => props.getNotifications())} className={styles.button}>Mark Seen</div>
            </div>
        </MenuItem>        
    )
}

export default NotificationMenuItem