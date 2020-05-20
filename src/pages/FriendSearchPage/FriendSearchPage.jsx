import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import friendService from '../../utils/friendService';
import styles from './FriendSearchPage.module.css';

import FriendSearchResult from '../../components/FriendSearchResult/FriendSearchResult';
import MaybeRequest from '../../components/MaybeRequest/MaybeRequest';

import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      color: 'gray',
      padding: '0 2%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const FriendSearchPage = props => {
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('');
    const [searched, setSearched] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [open, setOpen] = useState(false);
    const [maybe, setMaybe] = useState([]);

    const addToMaybe = friend => {
        if (checkMaybe(friend.id)) return;
        const newMaybe = [...maybe, friend];
        setMaybe(newMaybe);
    }

    const removeMaybe = idx => {
        const newMaybe = [...maybe];
        newMaybe.splice(idx, 1);
        setMaybe(newMaybe);
    }

    const searchFriends = (e) => {
        if (e.charCode == 13) {
            friendService.search(props.user._id, search).then(res => {
                setResults(res);
                setSearched(true);
            });
        }
    }

    const checkMaybe = friend => {
        return maybe.some(may => may.id === friend);
    }

    const sendRequests = () => {
        maybe.forEach(friend => {
            setTimeout(() => {
                friendService.request(props.user._id, friend.id).then(res => {
                    console.log(res.message);
                    setOpen(true);
                    setSeverity(res.severity);
                    setMessage(res.message);
                });
            }, 2000);
        });
        setMaybe([]);
    }

    const classes = useStyles();

    
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    return (
    <div className={classes.root}>
            <h1>Search Friends</h1>
            <div className={styles.topContainer}>
                <div className={styles.search}>
                    <SearchIcon  color="disabled" className={styles.searchIcon} />
                    <input placeholder='Search...' className={styles.searchInput} type="text" onChange={e => setSearch(e.target.value)} onKeyPress={e => searchFriends(e)}/>
                </div>
                <div className={styles.topRight}>
                    <div><Link className={styles.link} to={'/friends'}>My Friends</Link></div>
                    <div>Search Friends</div>
                </div>
            </div>
            <div className={styles.container}>
            {searched && (
                <div className={styles.resultsContainer}>
                    {results.length ? (
                            <div className={styles.results}>
                                {results.map((result, idx) => (
                                    <FriendSearchResult user={props.user} result={result} key={idx} setMessage={setMessage} setOpen={setOpen} setSeverity={setSeverity} addToMaybe={addToMaybe} checkMaybe={checkMaybe}/>
                                ))}
                            </div>
                    ) : 
                        <div className={styles.results}>
                            <h2>Sorry, we couldn't find anyone who matched</h2>
                        </div>}
                </div>
            )
            }
            {maybe.length > 0  && (
                <div className={styles.maybe}>
                    {maybe.map((result, idx) => (
                        <MaybeRequest result={result} key={idx} idx={idx} removeMaybe={removeMaybe}/>
                    ))}
                    <div className={styles.requestButton} onClick={() => sendRequests()}>
                        <div>Send Friend Request</div>
                    </div>
                </div>
            )}
            </div>
            <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default FriendSearchPage;