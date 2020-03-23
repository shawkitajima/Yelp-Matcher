import React, {useState, useEffect} from 'react';
import userService from '../../utils/userService';
import LikeOverview from '../../components/LikeOverview/LikeOverview';

const LikePage = props => {
    const [likes, setLikes] = useState([]);

    const updateLikes = () => {
        userService.getLikes(props.user._id).then(res => setLikes(res));
    }

    useEffect(() => {
        updateLikes();
    }, [props.user])

    return (
        <div>
            <h1>Likes</h1>
            {likes.map((rest, idx) => (
                <>
                    < LikeOverview id={rest} user={props.user} key={idx} />
                    <button onClick={() => userService.removeLike(props.user._id, rest).then(res => updateLikes())
                    }>Remove</button>
                </>
            ))}
        </div>
    )
}

export default LikePage