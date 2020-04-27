import React from 'react';
import styles from './FriendSearchResult.module.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const FriendSearchResult = props => {

    return (
        <div className={styles.container}>
            <img className={styles.imgIcon} src={require('./pikachu.png')} alt=""/>
            <div className={styles.details}>
                <h1>{props.result.name}</h1>
                <span><LocationOnIcon />{props.result.location}</span>
                <p>Like rate: {Math.round((props.result.rate + Number.EPSILON) * 100)}%</p>
            </div>
            <div className={styles.addIcon}>
                <AddCircleOutlineIcon className={styles.btn} fontSize='large' onClick={() => {
                        props.addToMaybe(props.result);
                    }} />
            </div>
        </div>
    )
}

export default FriendSearchResult;