import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFollow, thunkUnfollow} from "../../store/session";

const Follows = ({profileUsername}) => {
    const dispatch = useDispatch();
    // console.log(username);

    const sessionUser = useSelector((state) => state.session.user);
    const [follow, setFollow] = useState(false);

    useEffect(() => {
        for (let i = 0; i < sessionUser.following.length; i++) {
            let user = sessionUser.following[i]
            if (user.username === profileUsername) {
                setFollow(true)
            }
        }
    }, [sessionUser.following, profileUsername])

    function followButton() {
        setFollow(true)
        dispatch(thunkFollow(profileUsername))
    }

    function unfollowButton() {
        setFollow(false);
        dispatch(thunkUnfollow(profileUsername))
    }

    return (
        <>
            {sessionUser.username === profileUsername && (
                <div></div>
            )}
            {!follow ?
                <button onClick={followButton}>Follow</button>
                :
                <button onClick={unfollowButton}>Unfollow</button>
            }
        </>
    )
}


export default Follows;
