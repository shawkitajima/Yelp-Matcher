import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import friendService from '../../utils/friendService';
import styles from './FriendDetailPage.module.css';
import QuickOverview from '../../components/QuickOverview/QuickOverview';


import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import LinearProgress from '@material-ui/core/LinearProgress';

const FriendDetailPage = props => {

    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [recent, setRecent] = useState(true);

    useEffect(() => {
        friendService.getDetails(props.user._id, id).then(res => {
            setDetails(res);
            setLoading(false);
        });
    }, [props.user])
    
    return (
        <>
        { loading ? (<LinearProgress />) : (
            <div className={styles.body}>
                <Link className={styles.link} to={'/friends'}><div className={styles.backToFriends}>
                    <ArrowBackIcon />
                    <div>&nbsp; My Friends</div>
                </div></Link>
                <div className={styles.topContainer}>
                    <div className={styles.friendOverview}>
                        <div><MoreHorizIcon style={{ fontSize: 40 }}/></div>
                        <img className={styles.icon} src={require('./meowth.png')} alt=""/>
                        <div style={{textTransform: 'capitalize'}}>{details.name}</div>
                        <div>
                            <LocationOnIcon style={{ fontSize: 16 }}/> 
                            <div>{details.location}</div>
                        </div>
                        <div>
                            Yolo swag I've written you some poetry. I like
                            to eat sweet and spicy things. But never
                            together. Just like Romeo and Juliet
                        </div>
                    </div>
                    <div className={styles.friendStats}>
                        <div className={styles.statBox}>
                            <AllInclusiveIcon style={{fontSize: 40}} />
                            <div>
                                <div>{details.friendCount}</div>
                                <div>Mutual Friends</div>
                            </div>
                        </div>
                        <div className={styles.statBox}>
                            <FavoriteIcon style={{fontSize: 40}} />
                            <div>
                                <div>{details.likes.length}</div>
                                <div>Liked Restaurants</div>
                            </div>
                        </div>
                        <div className={styles.statBox}>
                            <LocalDiningIcon style={{fontSize: 40}} />
                            <div>
                                <div>{details.matches.length}</div>
                                <div>Mutual Restaurants</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.feature}>
                            <QuickOverview  id={'J7_y8fSiuqhf9m7oiixZLw'} />
                            <BookmarkIcon className={styles.bookmark} style={{fontSize: 70, color: 'white'}}/>
                    </div>
                </div>
                <div className={styles.middleContainer}>
                    <div>
                        <div onClick={() => setRecent(true)}>Recent Likes</div>
                        {recent && <hr className={styles.underline}/>}
                    </div>
                    <div>
                        <div onClick={() => setRecent(false)}>Mutual Restaurants</div>
                        {!recent && <hr className={styles.underline}/>}
                    </div>
                </div>
                {
                    recent ? (
                        <div className={styles.bottomContainer}>
                            {details.likes.map((like, idx) => (
                                <div key={idx} className={styles.quick}>
                                    <QuickOverview id={like} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.bottomContainer}>
                            {details.matches.map((match, idx) => (
                                <div key={idx} className={styles.quick}>
                                    <QuickOverview id={match} />
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
            )}
        </>
    )
}

export default FriendDetailPage;