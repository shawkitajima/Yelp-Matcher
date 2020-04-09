import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PendingRequest from '../../components/PendingRequest/PendingRequest';
import NotificationOverview from '../../components/NotificationOverview/NotificationOverview';
import userService from '../../utils/userService';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

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


const NotificationsPage = props => {

    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        props.getNotifications()
      }, [])
    
    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
            {props.notifications.length + props.pending.length + props.recommendations.length  ? (
            <div>
                <h1>Here are your notifications</h1>
                    {props.pending.length > 0 && (
                        <div>
                            <h2>You have friend requests pending!</h2>
                            {props.pending.map((request, idx) => (
                                <div key={idx}>
                                    <PendingRequest pending={request}  user={props.user} getNotifications={props.getNotifications} setMessage={setMessage} setOpen={setOpen} setSeverity={setSeverity}/>
                                </div>
                            ))}
                        </div>
                    )}
                    {(props.notifications.length + props.recommendations.length) > 0 && (
                        <div>
                            {props.notifications.map((notification, idx) => (
                                <div key={idx}>
                                    <NotificationOverview notification={notification} idx={idx} user={props.user} getNotifications={props.getNotifications} />
                                </div>
                            ))}
                            {props.recommendations.map((recommendation, idx) => (
                                <div key={idx}>
                                    <p>{recommendation.name} shared {recommendation.rest} with you! Look at it <Link to={`/detail/${recommendation.restId}`}>here</Link>!</p>
                                    <span><button onClick={() => userService.deleteRecommendation(props.user._id, idx).then(res => props.getNotifications())}>Mark as Seen</button></span>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
            ) : (
            <div>
                <h1>Hmm, it looks like you don't have any notifications</h1>
            </div>
            )
            }
        </div>
    )
}

export default NotificationsPage;