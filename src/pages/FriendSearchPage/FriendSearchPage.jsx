import React, {useState} from 'react';
import friendService from '../../utils/friendService';
import FriendSearchResult from '../../components/FriendSearchResult/FriendSearchResult';

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

const FriendSearchPage = props => {
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('');
    const [searched, setSearched] = useState(false);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const searchFriends = () => {
        friendService.search(props.user._id, search).then(res => {
            setResults(res);
            setSearched(true);
        });
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
            <h1>Search for Some Friend!</h1>
            <div>
                <input type="text" onChange={e => setSearch(e.target.value)}/>
                <button onClick={() => searchFriends()}>Search</button>
            </div>
            {searched && (
                <div>
                    {results.length ? (
                        <div>
                            <h2>We have results!</h2>
                            {results.map((result, idx) => (
                                <FriendSearchResult user={props.user} result={result} key={idx} setMessage={setMessage} setOpen={setOpen} />
                            ))}
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="success">
                                        {message}
                                    </Alert>
                                </Snackbar>
                        </div>
                    ) : 
                        <div>
                            <h2>Sorry, we couldn't find anyone who matched</h2>
                        </div>}
                </div>
            )
            }
        </div>
    )
}

export default FriendSearchPage;