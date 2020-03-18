import React, {useState, useEffect} from 'react';
import userService from '../../utils/userService';
import LikeOverview from '../LikeOverview/LikeOverview';

const LikePage = props => {
    const [likes, setLikes] = useState([]);
    const [change, setChange] = useState(0);
    useEffect(() => {
        userService.getLikes(props.user._id).then(res => setLikes(res));
    }, [change, props.user])
    return (
        <div>
            <h1>Likes</h1>
            {likes.map((rest, idx) => (
                <>
                    < LikeOverview id={rest} user={props.user} key={idx} setChange={setChange} change={change} />
                    <button onClick={() => userService.removeLike(props.user._id, rest).then(res => setChange(change + 1))
                    }>Remove</button>
                </>
            ))}
        </div>
    )
}

export default LikePage