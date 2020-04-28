import React, {useState} from 'react';
import styles from './MaybeRequest.module.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CancelIcon from '@material-ui/icons/Cancel';

const MaybeRequest = props => {

    return (
        <div className={styles.container}>
            <img className={styles.imgIcon} src={require('../FriendSearchResult/pikachu.png')} alt=""/>
            <div className={styles.details}>
                <h1>{props.result.name}</h1>
                <span><LocationOnIcon />{props.result.location}</span>
            </div>
            <div>
                < CancelIcon style={{ fontSize: 40 }} onClick={() => props.removeMaybe(props.idx)} className={styles.removeIcon} />
            </div>
        </div>
    )
}

export default MaybeRequest;