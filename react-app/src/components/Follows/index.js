import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFollow, thunkUnfollow} from "../../store/session";
import { thunkGetUser } from "../../store/users";

const Follows = ({profileUsername}) => {
    const dispatch = useDispatch();

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

    const followButton = async (e) => {
        setFollow(true)
        const follow = await dispatch(thunkFollow(profileUsername))

        if (follow) {
            if (follow.username === profileUsername) {
                dispatch(thunkGetUser(profileUsername))
            }
            if (sessionUser.username === profileUsername) {
                dispatch(thunkGetUser(profileUsername))
            }
        }
    }

    const unfollowButton = async (e) => {
        setFollow(false)
        const unfollow = await dispatch(thunkUnfollow(profileUsername))

        if (unfollow) {
            if (unfollow.username === profileUsername) {
                dispatch(thunkGetUser(profileUsername))
            }
            if (sessionUser.username === profileUsername) {
                dispatch(thunkGetUser(profileUsername))
            }
        }
    }

    return (
        sessionUser.username !== profileUsername ?
            !follow ?
                    <button id="follow-button" onClick={followButton}>Follow</button>
                :
                    <button id="unfollow-button" onClick={unfollowButton}>Unfollow</button>
            :
            null
    )
}


export default Follows;
