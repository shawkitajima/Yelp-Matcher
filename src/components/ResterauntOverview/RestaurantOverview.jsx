import React, {useState, useEffect} from 'react';
import restaurantService from '../../utils/restaurantService';
import LinearProgress from '@material-ui/core/LinearProgress';
import utilities from '../../utils/utilities';

import styles from './RestaurantOverview.module.css';

const RestaurantOverview = props => {
    const [detail, setDetail] = useState({rating: 0});
    const [reviews, setReviews] = useState({reviews: []})
    const [loaded, setLoaded] = useState(false);
    const [imageIdx, setImageIdx] = useState(0);

    useEffect(() => {
        restaurantService.reviews(props.id).then(res => setReviews(res));
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
                            <h2>{detail.name}</h2>
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
                            {detail.is_closed ? (<p>Currently Closed</p>) : (<p>Open Until {utilities.formatTime(detail.hours[0].open[today].end)}</p>)}
                        </div>
                        <div className={styles.location}>
                            <p>{detail.location.address1}, {detail.location.city} {detail.location.zip_code}</p>
                            <p>{detail.display_phone}</p>
                        </div>
                        <div className={styles.ratings}>
                            <span>Based on reviews from</span>
                            <a href={detail.url} target="_blank" rel="noopener noreferrer"><img className={styles.logoImg} src={require(`../../pages/RestaurantDetailPage/yelp-logo.png`)} alt="sorry"/></a>
                        </div>
                        {reviews.reviews.map((review, idx) => (
                            <div key={idx}>
                                <div className={styles.ratings}>
                                    <span>Rating: &nbsp;</span><img className={styles.starImg} src={require(`../../pages/RestaurantDetailPage/large_${review.rating}.png`)} alt="sorry"/>
                                </div>
                                <p>{review.text}</p>
                                <br/>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <LinearProgress />
            )}
        </div>
    )
}

export default RestaurantOverview;