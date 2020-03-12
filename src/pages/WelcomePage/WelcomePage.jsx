import React from 'react';
import styles from './WelcomePage.module.css';

const WelcomePage = props => {
    return (
        <div className={styles.container}>
            <h2>Yelp Dinner Matcher</h2>
            <h3>Do you and your friends ever have trouble finding a place to have dinner? Is Chipotle not the choice? If so, why
                don't you both log into our Yelp Dinner Matcher and swipe around on some places open right now? If you add your friends, we'll let
                you know if you both liked any places.
            </h3>
        </div>
    )
}

export default WelcomePage;