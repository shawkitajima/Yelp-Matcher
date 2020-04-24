import React, {useState} from 'react';
import friendService from '../../utils/friendService';
import styles from './FriendSearchResult.module.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const FriendSearchResult = props => {
    const request = () => {
        friendService.request(props.user._id, props.result.id).then(res => {
            props.setMessage(res.message);
            props.setSeverity(res.severity);
            props.setOpen(true);
        });
    }

    const [disabled, setDisabled] = useState(false);

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
                        if (disabled) return;
                        props.addToMaybe(props.result);
                        setDisabled(true);
                    }} />
            </div>
        </div>
    )
}

export default FriendSearchResult;