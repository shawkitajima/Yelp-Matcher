import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './FriendGlance.module.css';
import friendService from '../../utils/friendService'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import FavoriteIcon from '@material-ui/icons/Favorite';


const FriendGlance = props => {

    //MaterialUI menu logic
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };


    //Our logic
    const [loading, setLoading] = useState(true)
    const [details, setDetails] = useState({})

    useEffect(() => {
        friendService.getDetails(props.user._id, props.friend._id).then(res => {
            setDetails(res);
            setLoading(false);
        });
    }, [props.user, props.friend])

    return (
        <>
        {loading ? (<LinearProgress />) : (
            <div className={styles.body}>
                <div>
                    <MoreHorizIcon style={{ fontSize: 30 }} onClick={handleClick}/>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => {
                            friendService.deleteFriend(props.user._id, props.friend._id).then(res => props.getFriends(props.user._id));
                            handleClose();
                        }}>
                            Delete Friend
                        </MenuItem>
                    </Menu>
                </div>
                <img className={styles.icon} src={require('../../pages/FriendDetailPage/meowth.png')} alt=""/>
                <Link className={styles.link} to={`/friendDetails/${props.friend._id}`}><div style={{textTransform: 'capitalize'}}>{details.name}</div></Link>
                <div>
                    <LocationOnIcon style={{ fontSize: 16 }}/> 
                    <div>{details.location}</div>
                </div>
                <div>
                    When I go to Taco Bell, I make sure I go to the drive through.
                    I don't want to get judged when I order a party pack for myself.
                </div>
                <hr className={styles.underline} />
                <div className={styles.stats}>
                    <div>
                        <FavoriteIcon style={{fontSize: 20}}/>
                        <div>{details.likes.length}</div>
                    </div>
                    <div>
                        <AllInclusiveIcon style={{fontSize: 20}}/>
                        <div>{details.friendCount}</div>
                    </div>
                    <div>
                        <LocalDiningIcon style={{fontSize: 20}}/>
                        <div>{details.matches.length}</div>
                    </div>
                </div>
            </div>
        )}
    </>
    )
}

export default FriendGlance