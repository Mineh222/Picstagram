import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdateLike, thunkUpdateUnlike } from "../../store/posts";

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
                <button id="like_button" onClick={likeButton}><i id="heart" className="fa-solid fa-heart fa-2x" ></i></button>
                :
                <button id="unlike_button" onClick={unlikeButton}><i id="heart2" className="fa-solid fa-heart fa-2x"></i></button>
            }
        </div>
    )
}

export default Likes;
