import React, {useState, useEffect} from 'react';
import restaurantService from '../../utils/restaurantService';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from './Swipe.module.css';

const Swipe = props => {
    const [detail, setDetail] = useState({
        categories: [],
        location: {},
        rating: 0,
        photos: []
    });

    const [reviews, setReviews] = useState({reviews: []})

    useEffect(() => {
        restaurantService.detail(props.id).then(res => setDetail(res));
        restaurantService.reviews(props.id).then(res => setReviews(res));
    }, [props.id]);

    return (
        <div>
            <h1>{detail.name}</h1>
            <Carousel showThumbs={false} infiniteLoop autoPlay >
                {detail.photos.map((photo, idx) => (
                    <div key={idx} >
                        <img src={photo} alt="sorry" className={styles.imgStyle}/>
                    </div>
                ))}
            </Carousel>
            <h2>
                {detail.categories.map((category, idx) => (
                <div key={idx}>{category.title}</div>
            ))}
            </h2>
            <h2>{detail.location.address1}, {detail.location.city} {detail.location.zip_code}</h2>
            <h2>Phone: {detail.display_phone}</h2>
            <div>
                <h2>{detail.price}</h2>
                <img src={require(`./large_${detail.rating}.png`)} alt="sorry"/>
                <h2>Based on {detail.review_count} reviews</h2>
            </div>
            {reviews.reviews.map((review, idx) => (
                    <div key={idx}>
                        <h2>Rating: {review.rating}</h2>
                        <p>{review.user.name} said: "{review.text}" ...<a href={review.url} target="_blank" rel="noopener noreferrer">read more</a></p>
                    </div>
            ))}
        </div>
    )
}

export default Swipe;