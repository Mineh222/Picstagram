import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdateLike, thunkUpdateUnlike } from "../../store/posts";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

const Likes = ({sessionUser, post}) => {
    const dispatch = useDispatch();

    const [like, setLike] = useState(false);

    useEffect(() => {
        let userId = sessionUser.id
        for (let i = 0; i < post.likes.length; i++) {
            let user = post.likes[i];
            if (user.id === userId) {
                setLike(true)
            }
        }
    }, [sessionUser.id, post.likes])


    function likeButton() {
        setLike(true)
        dispatch(thunkUpdateLike(post.id))
    }

    function unlikeButton() {
        setLike(false)
        dispatch(thunkUpdateUnlike(post.id))
    }

    return (
        <div>
            {!like ?
                <button id="like_button" onClick={likeButton}><FavoriteBorderOutlinedIcon id="heart"/></button>
                :
                <button id="unlike_button" onClick={unlikeButton}><FavoriteOutlinedIcon id="heart2"/></button>
            }
        </div>
    )
}

export default Likes;
