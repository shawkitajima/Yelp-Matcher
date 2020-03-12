import React from 'react';
import { usePosition} from 'use-position'

const SwipePage = props => {

    const { latitude, longitude } = usePosition(true);
    
    return (
        <div>
            <h1>It's Swiping Time</h1>
            <h2>Lat: {latitude}, Long: {longitude}</h2>
        </div>
    )
}

export default SwipePage;