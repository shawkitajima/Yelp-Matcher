import React, {useState, useEffect} from 'react';
import { usePosition} from 'use-position';
import restaurantService from '../../utils/restaurantService';
import userService from '../../utils/userService';
import QuickOverview from '../QuickOverview/QuickOverview';
import styles from './FilterView.module.css';

const FilterView = props => {

    // Let's grab lat and long here
    const { latitude, longitude } = usePosition();
    // This array will store all of the restaurants to be displayed.
    const [rests, setRests] = useState([]);

    // We are going to allow users to view several pages of the results. Each page contains 4 overviews
    const [pageCount, setPageCount] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    
    // Let's define the categories here so that we don't have to hard code them in the html
    // We will also use this array to get the filtered restaurants
    // We need to be able to underline restaurants if they are selected
    // We also need to remove underlines from restaurants if they are not selected
    // To do this, we are going to create a default nonunderlined array of objects, which has a "visible" property that will be false;
    // We will initialize the "categories" array with a copy of this default
    // Each time we select a new category, we will grab a copy of the default, update visible for that category, and use setCategories on the copy
    const defaultCategories = [{ category: 'burgers', visible: false}, {category: 'chinese', visible: false}, 
        {category: 'italian', visible: false}, {category: 'japanese', visible: false},{category: 'mexican', visible: false},
        {category: 'thai', visible: false}]

    const [categories, setCategories] = useState([...defaultCategories])

    // We need to also adjust visibility of the featured and liked restaurants. We will do these via hooks
    const [featureVis, setFeatureVis] = useState(true);
    const [likeVis, setLikeVis] = useState(false);

    // Method to update the page count
    const updatePageCount = res => {
        setPageNum(1);
        setPageCount(Math.ceil(res.length / 4));
    }

    // Let's define methods that we will use to populate the rests array. We are looking for arrays of objects
    const getFeatured = () => {
        // Set visiblity
        setRests([]);
        setCategories([...defaultCategories]);
        setFeatureVis(true);
        setLikeVis(false);
        // Grab the data
        restaurantService.restaurants(latitude, longitude, props.user._id).then(res => {
            setRests(res)
            updatePageCount(res);
        });
    }

    // The getLikes method is the only method that returns an array of ids. The other methods return an array of objects.
    // Since we want to use the same "rests" array to populate the QuickOverviews, we need to convert the likes to an array of objects
    // We only need these objects to have an id property, as that is the only prop required by QuickOverview (apart from the user)
    const getRecentLikes = () => {
        // Set visiblity
        setRests([]);
        setCategories([...defaultCategories]);
        setFeatureVis(false);
        setLikeVis(true);
        // Grab the data
        userService.getLikes(props.user._id).then(res => {
            let likes = res;
            const arrofLikes = []
            likes.forEach(like => arrofLikes.unshift({"id": like}));
            setRests(arrofLikes);
            updatePageCount(arrofLikes);
        });
    }

    // Get the categories, and also update the categories array to make that index's value property true
    const getCategory = idx => {
        // Before we update the visibility features on the categories, we have to remove them from the others
        setFeatureVis(false);
        setLikeVis(false);
        // Now we can make the category visible
        // We are going to do a copy of the default categories array because I am suspicious about array referencing
        let newCategories = [...defaultCategories];
        newCategories[idx].visible = true;
        setCategories(newCategories)
        setRests([]);
        // Grab the data
        restaurantService.filter(latitude, longitude, categories[idx].category).then(res => {
            setRests(res);
            updatePageCount(res);
        });
    }

    useEffect(() => {
        getFeatured();
    }, [props.user._id, latitude, longitude])

    return (
        <>
        {latitude && longitude ? (
            <div className={styles.body}>
                <div className={styles.selection}>
                    <div onClick={() => getFeatured()}>
                        <div>Featured</div>
                        {featureVis && (<hr className={styles.underline}/>)}
                    </div>
                    <div onClick={() => getRecentLikes()}>
                        <div>Recent Likes</div>
                        {likeVis && (<hr className={styles.underline}/>)}
                    </div>
                    {categories.map((category, idx) => (
                    <div key={idx} onClick={() => getCategory(idx) }>
                        <div style={{textTransform: 'capitalize'}}>{category.category}</div>
                        {category.visible && (<hr className={styles.underline}/>)}
                    </div>
                    ))}
                </div>
                <div className={styles.overviews}>
                    {/* We are slicing the array because we only view 4 restaurants at a time */}
                        {rests.slice((4 * pageNum) - 4, pageNum * 4).map((rest, idx) => (
                            <div key={idx}>
                                <QuickOverview user={props.user} id={rest.id} />
                            </div>   
                        ))}
                </div>
                {/* This is where we can allow users to select "pages" of results */}
                <div className={styles.pageNum}>
                    {Array(pageCount).fill().map((elem, idx) => (
                        <div onClick={() => setPageNum(idx + 1)} style={{color: pageNum === idx + 1 ? '#514949' : '#D2D2D2'}}  key={idx}>{(idx + 1).toString().padStart(2, '0')}</div>
                    ))}
                </div>
            </div>
        ) : (
            <div>Loading</div>
        )}
    </>
    )

}

export default FilterView;