import React, {useState, useEffect} from 'react';
import userService from '../../utils/userService';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MatchOverview from '../../components/MatchOverview/MatchOverview';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    body: {
        backgroundColor: '#181818',
        color: 'white'
    },
    root: {
        display: 'flex',
        backgroundColor: '#181818',
        color: 'white'
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: '#181818',
        color: 'white'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: '#181818',
        color: 'white'
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#181818',
        color: 'white'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: '#181818',
        color: 'white',
        padding: theme.spacing(3),
    },
}));

const MatchPage = props => {
    const classes = useStyles();

    const [friends, setFriends] = useState([{_id: 0}])

    const [selector, setSelector] = useState(0);

    useEffect(() => {
        userService.getFriends(props.user._id).then(res => setFriends(res));
    }, [props.user])

    return (
        <div>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar}/>
          <List >
              {friends.map((friend, idx) => (
                <ListItem key={idx} button onClick={() => setSelector(idx)}>
                    <ListItemText primary={friend.name} />
                </ListItem>
              ))}
          </List>
        </Drawer>
        <main className={classes.content}>
            <MatchOverview user={props.user} friend={friends[selector]._id} />
        </main>
      </div>
    )
}

export default MatchPage;