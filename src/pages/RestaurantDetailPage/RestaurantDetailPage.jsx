import React, {useState, useEffect} from 'react';
import { usePosition} from 'use-position';
import restaurantService from '../../utils/restaurantService';
import friendService from '../../utils/friendService';
import userService from '../../utils/userService';
import utilities from '../../utils/utilities';
import styles from './RestaurantDetailPage.module.css';


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import ShareIcon from '@material-ui/icons/Share';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const RestaurantDetailPage = props => {

    const [detail, setDetail] = useState({});  
    const [loaded, setLoaded] = useState(false);
    const [reviews, setReviews] = useState({reviews: []})
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [open, setOpen] = useState(false);

    const { latitude, longitude } = usePosition();

    const today = new Date().getDay();
    
    const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const classes = useStyles();

    const handleSnackClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    useEffect(() => {
        restaurantService.detail(props.id).then(res => {
            setDetail(res);
            setLoaded(true);
        });
        restaurantService.reviews(props.id).then(res => setReviews(res));
    }, [props.id]);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };


    const share = friend => {
        friendService.share(friend, props.user.name, detail.name, detail.id).then(res => {
            setMessage(res.message);
            setSeverity(res.severity);
            setOpen(true);
        });
    }

    const like = rest => {
        userService.like(props.user._id, rest, detail.name).then(res => {
            setMessage(res.message);
            setSeverity(res.severity);
            setOpen(true);
        });
        if (props.swipe) {
            props.moveNext()
        }
        else {
            userService.see(props.user._id, rest);
        }
    } 

    return (
        <div className={`${styles.padding} ${classes.root}`}>
            {loaded ? ( 
            <>
                <div className={styles.flexHori}>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>
                    <div>
                        <h1>{detail.name}</h1>
                        <div className={styles.ratings}>
                            <img className={styles.starImg} src={require(`./large_${detail.rating}.png`)} alt="sorry"/>
                            <span> &nbsp; {detail.review_count} Reviews</span>
                        </div>
                        <p>
                            <span>{detail.price} &nbsp;</span>
                            {detail.categories.map((category, idx) => (
                                <span key={idx}>{category.title} &nbsp;</span>
                            ))}
                        </p>
                        {/* HEYY */}
                        {/* {detail.is_closed ? (<p>Closed</p>) : (<p>Open Until {utilities.formatTime(detail.hours[0].open[today].end)}</p>)} */}
                        {detail.is_closed ? (<p style={{color: 'red'}}>Closed</p>) : (<p style={{color: 'green'}}>Open Now!</p>)}
                        <div className={styles.iconParent}>
                            <AddCircleIcon style={{ color: 'green', fontSize: 40 }} onClick={() => {
                                like(props.id)
                            }} />
                            <ShareIcon style={{ color: 'blue', fontSize: 40 }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                            {props.friends.map((friend, idx) => (
                                <MenuItem onClick={() => {
                                    handleClose();
                                    share(friend);
                                }} key={idx}>{friend.name}</MenuItem>
                            ))}
                            </Menu>
                            {props.swipe && <CancelIcon style={{ color: 'red', fontSize: 40 }} onClick={() => props.moveNext()}/>}
                        </div>
                    </div>
                    <div><img className={styles.restImg} src={detail.photos[0]} alt=""/></div>
                    <div><img className={styles.restImg} src={detail.photos[1]} alt=""/></div>
                    <div><img className={styles.restImg} src={detail.photos[2]} alt=""/></div>
                </div>
                <div className={styles.bottomHori}>
                    <div>
                        <h2>Location</h2>
                    {props.location !== '0' ? (
                            <img className={styles.mapImg} src={`https://maps.googleapis.com/maps/api/staticmap?center=${detail.coordinates.latitude},${detail.coordinates.longitude}&zoom=15&size=400x400&markers=color:blue%7Clabel:S%7C${detail.coordinates.latitude},${detail.coordinates.longitude}&key=AIzaSyAqXlmJCxRWZkIRpwD932Gl4vXk8WyCr6U`} alt="sorry"/>
                        ) : (
                            <iframe
                                className={styles.mapImg} src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyAf1s9Gi3M1F9MwtNd1Xp_y1qfCnd-O-Dc&origin=${latitude},${longitude}&destination=${detail.coordinates.latitude},${detail.coordinates.longitude}&avoid=tolls|highways`} allowFullScreen>
                            </iframe>
                        )}
                        <p>{detail.location.address1}, {detail.location.city} {detail.location.zip_code}</p>
                        <p>{detail.display_phone}</p>
                    </div>
                    <div>
                        <h2>Hours</h2>
                        <p>Unfortunately, due to the current Coronavirus pandemic, we cannot provide accurate hours at this time</p>
                        {/* HEYY */}
                        {/* {detail.hours[0].open.map((obj, idx) => (
                            <p key={idx}>{weekdays[obj.day]} &nbsp; {utilities.formatTime(obj.start)} - {utilities.formatTime(obj.end)}</p>
                        ))} */}
                    </div>
                    <div>
                        <h2>Recommended Reviews</h2>
                        {reviews.reviews.map((review, idx) => (
                            <div key={idx}>
                                <div className={styles.ratings}>
                                    <span>Rating: &nbsp;</span><img className={styles.starImg} src={require(`./large_${review.rating}.png`)} alt="sorry"/>
                                    <span>&nbsp;{utilities.formatDate(review.time_created)}</span>
                                </div>
                                <p>{review.text}</p>
                            </div>
                        ))}
                        <a href={detail.url} target="_blank" rel="noopener noreferrer">See all reviews ></a>
                    </div>
                </div>
            </>
            ) : (
                <LinearProgress />
            )
            }

        </div>
    )
}

export default RestaurantDetailPage;