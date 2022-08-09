import { Link } from 'react-router-dom';

export default function FollowingModal({user, setTrigger}) {


    return (
        <div>
            <h3>Following</h3>
            {user.following.length === 0 && (
                <h3>Not following anyone yet</h3>
            )}
            {user.following.map(following => {
                return (
                    <div key={following.id}>
                        <Link to={`/${following.username}`} onClick={() => setTrigger(false)}>
                            <img src={following.profile_pic}></img>
                            <div>{following.username}</div>
                            <div>{following.full_name}</div>
                        </Link>
                    </div>
                )
            })}
        </div>

    )
}
