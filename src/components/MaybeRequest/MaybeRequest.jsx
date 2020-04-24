import React, {useState} from 'react';
import styles from './MaybeRequest.module.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const MaybeRequest = props => {

    return (
        <div className={styles.container}>
            <img className={styles.imgIcon} src={require('../FriendSearchResult/pikachu.png')} alt=""/>
            <div className={styles.details}>
                <h1>{props.result.name}</h1>
                <span><LocationOnIcon />{props.result.location}</span>
            </div>
            <div className={styles.addIcon}>
                <button onClick={() => props.removeMaybe(props.idx)}>Remove</button>
            </div>
        </div>
    )
}

export default MaybeRequest;