import React, {useState, useEffect} from 'react';
import restaurantService from '../../utils/restaurantService';
import styles from './RestaurantDetailPage.module.css';
import utilities from '../../utils/utilities';

import LinearProgress from '@material-ui/core/LinearProgress';

const Swipe = props => {
    const [detail, setDetail] = useState({});  

    const [loaded, setLoaded] = useState(false);

    const [reviews, setReviews] = useState({reviews: []})

    const today = new Date().getDay();
    
    const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    useEffect(() => {
        restaurantService.detail(props.id).then(res => {
            setDetail(res);
            setLoaded(true);
        });
        restaurantService.reviews(props.id).then(res => setReviews(res));
    }, [props.id]);

    return (
        <div className={styles.padding}>
            {loaded ? ( 
            <>
                <div className={styles.flexHori}>
                    <div>
                        <h1>{detail.name}</h1>
                        <div>
                            <img src={require(`./large_${detail.rating}.png`)} alt="sorry"/>
                            <span>{detail.review_count} Reviews</span>
                        </div>
                        <span>{detail.price} &nbsp;</span>
                        {detail.categories.map((category, idx) => (
                            <span key={idx}>{category.title} &nbsp;</span>
                        ))}
                        {detail.is_closed ? (<p>Closed</p>) : (<p>Open Until {utilities.formatTime(detail.hours[0].open[today].end)}</p>)}
                    </div>
                    <img className={styles.restImg} src={detail.photos[0]} alt=""/>
                    <img className={styles.restImg} src={detail.photos[1]} alt=""/>
                    <img className={styles.restImg} src={detail.photos[2]} alt=""/>
                </div>
                <div className={styles.bottomHori}>
                    <div>
                        <h2>Location</h2>
                        <img className={styles.restImg} src={`https://maps.googleapis.com/maps/api/staticmap?center=${detail.coordinates.latitude},${detail.coordinates.longitude}&zoom=15&size=400x400&markers=color:blue%7Clabel:S%7C${detail.coordinates.latitude},${detail.coordinates.longitude}&key=AIzaSyAqXlmJCxRWZkIRpwD932Gl4vXk8WyCr6U`} alt="sorry"/>
                        <p>{detail.location.address1}, {detail.location.city} {detail.location.zip_code}</p>
                        <p>{detail.display_phone}</p>
                    </div>
                    <div>
                        <h2>Hours</h2>
                        {detail.hours[0].open.map((obj, idx) => (
                            <p key={idx}>{weekdays[idx]} &nbsp; {utilities.formatTime(obj.start)} - {utilities.formatTime(obj.end)}</p>
                        ))}
                    </div>
                    <div>
                        <h2>Recommended Reviews</h2>
                        {reviews.reviews.map((review, idx) => (
                            <div key={idx}>
                                <span>Rating: &nbsp;</span><img src={require(`./large_${review.rating}.png`)} alt="sorry"/>
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

export default Swipe;