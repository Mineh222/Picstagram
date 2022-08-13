import { Link } from 'react-router-dom';
import './FollowersModal.css';

export default function FollowersModal({user, setTrigger}) {


    return (
        <div>
            <div id="heading-container-follows-modal">
                <h3 id="follows-modal-heading">Followers</h3>
            </div>
            {user.followers.length === 0 && (
                <h3 id="follows-modal-heading" >No followers yet</h3>
            )}
            {user.followers.map(follower => {
                return (
                    <div className="follow-modal-user-info" key={follower.id}>
                        <Link className="follow-modal-user-info" to={`/${follower.username}`} onClick={() => setTrigger(false)}>
                            <img id="follow-modal-user-pic" src={follower.profile_pic}></img>
                            <div id="user-names-follow-modal">
                                <div id="username-follow-modal">{follower.username}</div>
                                <div id={follower.full_name.includes(" ") ? "user-fullname" : "user-fullname-long"}>{follower.full_name}</div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>

    )
}
