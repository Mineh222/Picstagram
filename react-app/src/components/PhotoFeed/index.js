import React, { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunkGetDemoPosts, thunkGetFeedPosts } from '../../store/posts';
import { thunkGetAllUsers } from '../../store/users';
import './PhotoFeed.css';
import Likes from '../Likes';
import { thunkGetAllComments } from "../../store/comments";

export default function PhotoFeedPage() {
    const dispatch = useDispatch();

    const posts = useSelector((state) => Object.values(state.posts));
    const user = useSelector((state) => state.session.user);
    const users = useSelector((state) => Object.values(state.user));
    const comments = useSelector((state) => Object.values(state.comments));

    const shuffledUsers = users.sort(() => Math.random() - 0.5)
    const filteredUsers = shuffledUsers.filter(usr => usr.username != user.username)
    const filtered = filteredUsers.filter(usrr => !usrr.username.includes("test"))
    const lastFilter = filtered.filter(userr => !userr.followers?.includes(user.username))

    useEffect(() => {
        dispatch(thunkGetAllComments())
    }, [dispatch])

    useEffect(() => {
        if (user.following.length === 0) {
            dispatch(thunkGetDemoPosts())
        }
        if (user.following.length > 0) {
            dispatch(thunkGetFeedPosts(user.id))
        }
    }, [dispatch, user])


    useEffect(() => {
        dispatch(thunkGetAllUsers())
    }, [dispatch])

    if (!lastFilter) return null;

    const postComments = (postId) => {
        const postCommentSection = comments.filter((comment) => comment.post_id === postId)
        return (
            <>
                {postCommentSection.slice(0, 2).map((comment) => {
                    return (
                        <div className="user-comments-photo-feed">
                            <div className="user-comments-photo-feed2">
                                <NavLink id="navlink-user-comment-photo-feed" to={`/${comment.user.username}`}>
                                    <div id="photo-feed-comment-username"><b>{comment.user.username}</b></div>
                                </NavLink>
                                <div id="photo-feed-user-comment">{comment.comment}</div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    const commentsLength = (postId) => {
        const postComments = comments.filter(comment => comment.post_id === postId)
        return (
          <>
            {postComments.length === 0 ?
              <div>No comments yet</div>
              :
              <div>{postComments.length === 1 ?
                <div>View {postComments.length} comment</div>
                :
                <div>View all {postComments.length} comments</div>
              }
              </div>
            }

          </>
          )
      }

    return (
        <div className='home-page-container'>
            <div>
                {posts.length === 0 && (
                    <h3>No posts yet. Check out suggested users!</h3>
                )}
            </div>
            <div>
                {posts.reverse().map(post => {
                    return (
                        <div  key={post.id} className="post-container">
                            <div className="photo-feed-post-user-info">
                                <NavLink id="navlink-photo-feed" to={`/${post.user.username}`}>
                                    <img id="photo-feed-user-pic"src={post.user.profile_pic}></img>
                                </NavLink>
                                <NavLink id="navlink-photo-feed" to={`/${post.user.username}`}>
                                    <div id="home-page-username">{post.user.username}</div>
                                </NavLink>
                            </div>
                            <div className="home-page-posts">
                                <NavLink className="home-page-posts" to={`/post/${post.id}`}>
                                    <img id="home-page-post-pic"src={post.picture}></img>
                                </NavLink>
                                    <div className="likes-container-photo-feed">
                                        <div>
                                            <Likes sessionUser={user} post={post}/>
                                        </div>
                                        <span id="likes-count">
                                            {post.likes.length === 0 && (
                                                <div></div>
                                            )}
                                            {post.likes.length === 1 && (
                                                <span>{post.likes.length} like</span>
                                            )}
                                            {post.likes.length > 1 && (
                                                <span>{post.likes.length} likes</span>
                                            )}
                                        </span>
                                    </div>
                                    <div className="home-page-user-caption">
                                        <div id="home-page-caption">
                                            <NavLink id="navlink-photo-feed" to={`/${post.user.username}`}>
                                                <div id="home-page-username">{post.user.username}</div>
                                            </NavLink>
                                            <div id="home-page-post-caption">{post.caption}</div>
                                        </div>
                                    </div>
                                    <NavLink id="view-comments-navlink" to={`/post/${post.id}`}>
                                        {commentsLength(post.id)}
                                    </NavLink>
                                    <div>
                                        {postComments(post.id)}
                                    </div>
                                </div>
                        </div>
                    )
                })}
            </div>
            <div className="suggested-users">
                <div className="suggest-users-user-session-info">
                    <NavLink className="suggest-users-user-session-info" to={`/${user.username}`}>
                        <img id="suggest-users-user-session-pic" src={user.profile_pic}></img>
                        <div id="suggest-users-user-session-name">{user.username}</div>
                    </NavLink>
                </div>
                <h3 id="suggest-message">Suggestions For You</h3>
                {lastFilter.slice(0,5).map(user => {
                    return (
                        <div className="suggested-users-info"key={user.id}>
                            <NavLink className="suggested-users-info" to={`/${user.username}`}>
                                <img id="suggested-user-image"src={user.profile_pic}></img>
                                <div>{user.username}</div>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}
