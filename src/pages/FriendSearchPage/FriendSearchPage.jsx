import React, {useState} from 'react';
import userService from '../../utils/userService';
import SearchResult from '../../components/SearchResult/SearchResult';

const FriendSearchPage = props => {
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('');
    const [searched, setSearched] = useState(false);

    const searchFriends = () => {
        userService.search(props.user._id, search).then(res => {
            setResults(res);
            setSearched(true);
        });
    }

    return (
        <div>
            <h1>Search for Some Friend!</h1>
            <div>
                <input type="text" onChange={e => setSearch(e.target.value)}/>
                <button onClick={() => searchFriends()}>Search</button>
            </div>
            {searched && (
                <div>
                    {results.length ? (
                        <div>
                            <h2>We have results!</h2>
                            {results.map((result, idx) => (
                                <SearchResult user={props.user} result={result} key={idx} />
                            ))}
                        </div>
                    ) : 
                        <div>
                            <h2>Sorry, we couldn't find anyone who matched</h2>
                        </div>}
                </div>
            )
            }
        </div>
    )
}

export default FriendSearchPage;