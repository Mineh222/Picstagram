import { Link } from 'react-router-dom';
import '../FollowersModal/FollowersModal.css';

export default function FollowingModal({user, setTrigger}) {


    return (
        <div>
            <div id="heading-container-follows-modal">
                <h3 id="follows-modal-heading">Following</h3>
            </div>
            {user.following.length === 0 && (
                <h3 id="follows-modal-heading" >Not following anyone yet</h3>
            )}
            {user.following.map(following => {
                return (
                    <div className="follow-modal-user-info" key={following.id}>
                        <Link className="follow-modal-user-info" to={`/${following.username}`} onClick={() => setTrigger(false)}>
                            <img id="follow-modal-user-pic" src={following.profile_pic}></img>
                            <div id="user-names-follow-modal">
                                <div id="username-follow-modal">{following.username}</div>
                                <div>{following.full_name}</div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>

    )
}
