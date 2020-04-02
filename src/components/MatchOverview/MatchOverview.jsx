import React, {useState, useEffect} from 'react';
import friendService from '../../utils/friendService';
import LikeOverview from '../LikeOverview/LikeOverview';

const MatchOverview = props => {
    const [matches, setMatches] = useState([]);
    
    useEffect(() => {
        friendService.getMatches(props.user._id, props.friend).then(res => setMatches(res));
    }, [props.friend])

    return (
        <div>
            {matches.length ? (
                matches.map((match, idx) => (
                    <LikeOverview id={match} key={idx} />
                ))
            ) : (
                <div>
                    <h1>You don't have any matches with this person, are you sure they are your friends?</h1>
                </div>
            )
            }
        </div>
    )
}

export default MatchOverview