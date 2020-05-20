import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import restaurantService from '../../utils/restaurantService';
import LinearProgress from '@material-ui/core/LinearProgress';
import utilities from '../../utils/utilities';

import styles from './QuickOverview.module.css';

const QuickOverview = props => {
    const [detail, setDetail] = useState({rating: 0});
    const [loaded, setLoaded] = useState(false);
    const [imageIdx, setImageIdx] = useState(0);

    useEffect(() => {
        restaurantService.detail(props.id).then(res => {
            setDetail(res);
            setLoaded(true);
        });
    }, [props.id])
    
    const today = new Date().getDay();

    const incrementImage = () => {
        if (imageIdx >= detail.photos.length - 1) {
            setImageIdx(0);
        }
        else {
            setImageIdx(imageIdx + 1);
        }
    }

    return (
        <div className={styles.container}>
            {loaded ? (
                <div>
                    <img onClick={() => incrementImage()} className={styles.containerImg} src={detail.photos[imageIdx]} alt="sorry"/>
                    <div className={styles.details}>
                        <div>
                            {props.user ? (
                                <Link className={styles.link} to={`/detail/${detail.id}`}><h2>{detail.name}</h2></Link>
                            ) : (
                                <h2>{detail.name}</h2>
                            )}
                            <div className={styles.ratings}>
                                <img className={styles.starImg} src={require(`../../pages/RestaurantDetailPage/large_${detail.rating}.png`)} alt="sorry"/>
                                <span> &nbsp; {detail.review_count} Reviews</span>
                            </div>
                            <p>
                                <span>{detail.price} &nbsp;</span>
                                {detail.categories.map((category, idx) => (
                                    <span key={idx}>{category.title} &nbsp;</span>
                                ))}
                            </p>
                            {/* HEYY */}
                            {/* {detail.is_closed ? (<p>Currently Closed</p>) : (<p>Open Until {utilities.formatTime(detail.hours[0].open[today].end)}</p>)} */}
                            {detail.is_closed ? (<p>Currently Closed</p>) : (<p>Open Now!</p>)}
                        </div>
                    </div>
                </div>
            ) : (
                <LinearProgress />
            )}
        </div>
    )
}

export default QuickOverview;