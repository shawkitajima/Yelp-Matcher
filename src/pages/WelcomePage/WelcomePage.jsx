import React from 'react';
import styles from './WelcomePage.module.css';
import { Link } from 'react-router-dom';

import QuickOverview from '../../components/QuickOverview/QuickOverview';

const WelcomePage = props => {

    const restIds = ['J7_y8fSiuqhf9m7oiixZLw', 'KfkPjSTu0OV7yIPTZ4qi3w', '6t0C9lUr3g-hY6oQba4f0w', 'HFwEjoh7L0Lu3Ps7ypkqVg', 'r-59c9YgjqShVvQVI-AGEQ'];

    return (
        <div className={styles.container}>
            <div className={styles.firstSection}>
                <div className={styles.authSection}>
                    <div className={styles.authBtn}><Link to='/login'>Log In</Link></div>
                    <div className={styles.authBtn}><Link to='/signup'>Sign Up</Link></div>
                </div>
                <div className={styles.logoSection}>
                    <h1>yelp matcher</h1>
                    {/* <div><input type="text" placeholder="Enter Location"/></div>
                    <div onClick={() => alert('buttons work with divs')}>Explore Food</div> */}
                </div>
            </div>
            <h2>Here Are Some Restaurants Around You!</h2>
            <div className={styles.secondSection}>
                {restIds.map((rest, idx) => (
                    <QuickOverview key={idx} id={rest} style={{width: '20%' }} />
                ))}
            </div>
            <div className={styles.thirdSection}>
                <div className={styles.feature}>
                    <img className={styles.featureImg} src={require('./detail.png')} alt=""/>
                    <h2>Browse Restaurants</h2>
                    <div className={styles.featureUnderline}></div>
                    <p>We'll look at your location and suggest restaurants that you may like. You can
                        choose to like restaurants and even share them with your friends on our app!
                    </p>
                </div>
                <div className={styles.feature}>
                    <img className={styles.featureImg} src={require('./search.png')} alt=""/>
                    <h2>Search for Restaurants</h2>
                    <div className={styles.featureUnderline}></div>
                    <p>
                        We don't just randomly suggest restaurants for you - we also allow you to
                        look for restaurants that you might like!
                    </p>
                </div>
                <div className={styles.feature}>
                    <img className={styles.featureImg} src={require('./likes.png')} alt=""/>
                    <h2>View Your Matches</h2>
                    <div className={styles.featureUnderline}></div>
                    <p>
                        If you and your friends both like any restaurants, we'll show you what they are. 
                        If they don't like any of the same restaurants, are you sure they are your friends?
                    </p>
                </div>
            </div>
            <div className={styles.fourthSection}>
                    <h1>
                        About yelp matcher
                    </h1>
                    <p>
                        We are yelp-matcher. A fun little service that uses the Yelp API, and a lot of our own APIs
                        to allow users to look and like restaurants in their area. If you have any friends on our
                        service, you can share restaraunts you see with them. So if you are your friends are ever
                        struggling to decide where to get dinner, why not look at your matching likes on our 
                        service?
                    </p>
            </div>
            <footer>2020 yelp-matcher llc all rights reserved</footer>
        </div>
    )
}

export default WelcomePage;