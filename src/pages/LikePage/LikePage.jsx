import React, {useState, useEffect} from 'react';
import userService from '../../utils/userService';
import LikeOverview from '../LikeOverview/LikeOverview';

const LikePage = props => {
    const [likes, setLikes] = useState([]);
    useEffect(() => {
        userService.getLikes(props.user._id).then(res => setLikes(res));
    }, [])
    return (
        <div>
            <h1>Likes</h1>
            {likes.map((rest, idx) => (
                < LikeOverview id={rest} key={idx} />
            ))}
        </div>
    )
}

export default LikePage