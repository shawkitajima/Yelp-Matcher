import React, {useState, useEffect} from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import userService from '../../utils/userService';
import friendService from '../../utils/friendService';

import clsx from 'clsx';
import { makeStyles, useTheme, StylesProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';

import SwipePage from '../SwipePage/SwipePage'
import LikePage from '../LikePage/LikePage';
import FriendSearchPage from '../FriendSearchPage/FriendSearchPage';
import NotificationsPage from '../NotificationsPage/NotificationsPage';
import FriendPage from '../FriendPage/FriendPage';
import MatchPage from '../MatchPage/MatchPage';
import TopLikesPage from '../TopLikesPage/TopLikesPage';
import SearchResultsPage from '../SearchResultsPage/SearchResultsPage';
import NonSwipeDetailPage from '../NonSwipeDetailPage/NonSwipeDetailPage';
import RejectionsPage from '../RejectionsPage/RejectionsPage';
import FriendDetailPage from '../FriendDetailPage/FriendDetailPage';

import styles from './UserPage.module.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'white',
    color: 'black',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


const UserPage = props => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
  setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [pending, setPending] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [search, setSearch] = useState('');
  
  const getNotifications = () => {
    userService.getNotifications(props.user._id).then(res => {
      setPending(res.pending);
      setNotifications(res.notifications);
      setRecommendations(res.recommendations);
    })
  }

  useEffect(() => {
    getNotifications();
  }, [props.user,])

  const handleSubmit = e => {
    e.preventDefault();
    history.push('/searchResults', {search});
  }


  return (
      <div className={classes.root} >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <div className={styles.topMenu}>
            <Typography variant="h4" noWrap>
              <Link to='/' className={styles.logo}>yelp matcher</Link>
            </Typography>
            <form className={styles.search} onSubmit={e => handleSubmit(e)}>
              <SearchIcon  color="disabled" className={styles.searchIcon} />
              <input className={styles.inputBar} type="search" placeholder='Search restaurants...' onChange={e => setSearch(e.target.value)}/>
            </form>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List >
            <ListItem button component={Link} to="/">
              <ListItemText primary='Swipe' />
            </ListItem>
            <ListItem button component={Link} to="/likes">
              <ListItemText primary='Likes' />
            </ListItem>
            <ListItem button component={Link} to="/friends">
              <ListItemText primary='Friends' />
            </ListItem>
            <ListItem button component={Link} to="/friendSearch">
              <ListItemText primary='Search Friends' />
            </ListItem>
            <ListItem button component={Link} to="/notifications">
              <ListItemText primary='Notifications' />
            </ListItem>
            <ListItem button component={Link} to="/topLikes">
              <ListItemText primary='Top Likes' />
            </ListItem>
            <ListItem button component={Link} to="/rejections">
              <ListItemText primary='Rejections' />
            </ListItem>
            <ListItem button onClick={() => props.handleLogout()}>
              <ListItemText primary='Logout' />
            </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      <div className={classes.drawerHeader} />
          <Switch>
              <Route exact path='/' render={() => (
                  <SwipePage user={props.user}/>
              )
              }/>
              <Route exact path='/likes' render={() => (
                  <LikePage user={props.user} />
              )
              }/>
              <Route exact path='/friends' render={({history}) => (
                  <FriendPage user={props.user} />
              )
              }/>
              <Route exact path='/friendSearch' render={({history}) => (
                  <FriendSearchPage user={props.user} />
              )
              }/>
              <Route exact path='/notifications' render={({history}) => (
                <NotificationsPage user={props.user} pending={pending} notifications={notifications} recommendations={recommendations} getNotifications={getNotifications} />
              )
              }/>
              <Route exact path='/topLikes' render={({history}) => (
                <TopLikesPage user={props.user} />
              )
              }/>
              <Route exact path='/searchResults' render={({history}) => (
                <SearchResultsPage />
              )
              }/>
              <Route exact path='/detail/:id' render={({history}) => (
                <NonSwipeDetailPage user={props.user} />
              )
              }/>
              <Route exact path='/friendDetails/:id' render={({history}) => (
                <FriendDetailPage user={props.user} />
              )
              }/>
              <Route exact path='/rejections' render={({history}) => (
                <RejectionsPage user={props.user} />
              )
              }/>
          </Switch>
      </main>
    </div>
  )
}

export default UserPage;