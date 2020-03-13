import React, {useState, useEffect} from 'react';
import restaurantService from '../../utils/restaurantService';
import styles from './Swipe.module.css';

const Swipe = props => {
    const [detail, setDetail] = useState({
        categories: [{}],
        location: {},
        rating: 0
    });

    const [reviews, setReviews] = useState({})

    useEffect(() => {
        restaurantService.detail(props.id).then(res => setDetail(res));
        restaurantService.reviews(props.id).then(res => setReviews(res));
    }, [props.id]);

    return (
        <div>
            <h1>{detail.name}</h1>
            <div className={styles.imgContainer}>
                <img className={styles.imgStyle} src={detail.image_url} alt="sorry"/>
            </div>
            <h2>Category: {detail.categories[0].title}</h2>
            <h2>{detail.location.address1}, {detail.location.city} {detail.location.zip_code}</h2>
            <img src={require(`./large_${detail.rating}.png`)} alt="sorry"/>
            <h2>Based on {detail.review_count} reviews</h2>
        </div>
    )
}

export default Swipe;