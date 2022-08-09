import { Link } from 'react-router-dom';

export default function FollowersModal({user, setTrigger}) {


    return (
        <div>
            <h3>Followers</h3>
            {user.followers.length === 0 && (
                <h3>No followers yet</h3>
            )}
            {user.followers.map(follower => {
                return (
                    <div key={follower.id}>
                        <Link to={`/${follower.username}`} onClick={() => setTrigger(false)}>
                            <img src={follower.profile_pic}></img>
                            <div>{follower.username}</div>
                            <div>{follower.full_name}</div>
                        </Link>
                    </div>
                )
            })}
        </div>

    )
}
