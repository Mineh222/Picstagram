import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { thunkGetAllPostComments } from '../../store/comments';
import { useParams } from 'react-router-dom';

export default function Comments() {
    const dispatch = useDispatch();
    const { postId } = useParams();

    const sessionUser = useSelector((state) => state.session.user);
    const comments = useSelector((state) => Object.values(state.comments));

    useEffect(() => {
        dispatch(thunkGetAllPostComments(postId))
    }, [dispatch, postId])

    if (!comments) return null;

    return (
        <div>
            {comments.map(comment => {
                return (
                    <div key={comment.id}>
                        <div>{comment.user.username} {comment.comment}</div>
                    </div>
                )
            })}
        </div>
    )
}
