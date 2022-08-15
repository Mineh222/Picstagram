import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFollow, thunkUnfollow} from "../../store/session";
import { thunkGetUser } from "../../store/users";

const Follows = ({profileUsername}) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const [follow, setFollow] = useState(false);
    const [user, setUser] = useState();

    // useEffect(() => {
    //     for (let i = 0; i < sessionUser?.following.length; i++) {
    //         let user = sessionUser.following[i]
    //         if (user.username === profileUsername) {
    //             setFollow(true)
    //         } else {
    //             setFollow(false)
    //         }
    //     }
    // }, [sessionUser.following, profileUsername])

    useEffect(() => {
        if (sessionUser?.following.find(user => user.username === profileUsername)) {
            setFollow(true)
        } else {
            setFollow(false)
        }

        if (sessionUser?.username === profileUsername) {
            setUser(true)
        }
    }, [sessionUser.following, sessionUser.username, profileUsername])

    const followButton = async (e) => {
        e.preventDefault();
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
        e.preventDefault();
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
        !user ?
            !follow ?
                <form onSubmit={followButton}>
                    <button id="follow-button">Follow</button>
                </form>
                :
                <form onSubmit={unfollowButton}>
                    <button id="unfollow-button">Unfollow</button>
                </form>
            :
            null
    )
}


export default Follows;
