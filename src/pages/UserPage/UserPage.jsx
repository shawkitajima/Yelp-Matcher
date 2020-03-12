import React, {useState, useEffect} from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import SwipePage from '../SwipePage/SwipePage'

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

const UserPage = props => {
    const classes = useStyles();

    return (
        <div className={classes.root} >
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
              <ListItem button component={Link} to="/">
                <ListItemText primary='Swipe' />
              </ListItem>
              <ListItem button component={Link} to="/likes">
                <ListItemText primary='Likes' />
              </ListItem>
              <ListItem button component={Link} to="/matches">
                <ListItemText primary='Matches' />
              </ListItem>
              <ListItem button component={Link} to="/friends">
                <ListItemText primary='Friends' />
              </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
            <Switch>
                <Route exact path='/' render={() => (
                    <SwipePage />
                )
                }/>
                <Route exact path='/likes' render={() => (
                    <h1>Likes</h1>
                )
                }/>
                <Route exact path='/matches' render={({history}) => (
                    <h1>Matches</h1>
                )
                }/>
                <Route exact path='/friends' render={({history}) => (
                    <h1>Friends</h1>
                )
                }/>
            </Switch>
        </main>
      </div>
    )
}

export default UserPage;