import React from 'react';
import styles from './WelcomePage.module.css';
import { Link } from 'react-router-dom';
import WelcomeImage from './WelcomeImage.jpg';

const WelcomePage = props => {
    return (
        <div className={styles.container}>
            <h2>Yelp Dinner Matcher</h2>
            <img className={styles.imgStyle} src={WelcomeImage} alt="sorry"/>
            <div className={styles.exp}>
                <h3>
                    Do you and your friends ever have trouble finding a place to have dinner? Is Chipotle not the choice? If so, why
                    don't you both log into our Yelp Dinner Matcher and swipe around on some places open right now? If you add your friends, we'll let
                    you know if you both liked any places.
                </h3>
            </div>
            <div className={styles.row}>
                <Link to='/login'><button className={styles.welcomePageBtn}>Login</button></Link>
                <div>or</div>
                <Link to='/signup'><button className={styles.welcomePageBtn}>Signup</button></Link>
            </div>
        </div>
    )
}

export default WelcomePage;