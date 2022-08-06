const GET_ALL_POST_COMMENTS = 'comment/getALLPostComments';
const POST_COMMENT = 'comment/postComment';
const UPDATE_COMMENT = 'comment/updateComment';
const DELETE_COMMENT = 'comment/deleteComment';

export const actionGetAllPostComments = (comments) => {
    return {
        type: GET_ALL_POST_COMMENTS,
        comments
    }
}

export const actionPostComment = (comment) => {
    return {
        type: POST_COMMENT,
        comment
    }
}

export const actionUpdateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

export const actionDeleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export const thunkGetAllPostComments = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}/comments`)

    if (response.ok) {
        const comments = await response.json();
        dispatch(actionGetAllPostComments(comments));
        return comments;
    }
}

export const thunkPostComment = (id, comment) => async dispatch => {
    const response = await fetch(`/api/posts/${id}/comments/new`, {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(comment)
    });

    if (response.ok) {
        const newComment = await response.json();
        dispatch(actionPostComment(newComment));
        return newComment;
    }
}

export const thunkUpdateComment = (commentId, comment) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}/update`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({comment})
    })

    if (response.ok) {
        const updatedComment = await response.json();
        dispatch(actionUpdateComment(updatedComment));
        return updatedComment
    }
}

export const thunkDeleteComment = (id) => async dispatch => {
    const response = await fetch(`/api/comments/${id}/delete`, {
        method: 'DELETE',
    })

    if (response.ok) {
        const deletedComment = await response.json();
        dispatch(actionDeleteComment(id));
        return deletedComment
    }
}

let initialState = {}

const commentsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_ALL_POST_COMMENTS:
            newState = {};
            action.comments.comments.forEach(comment => {
                newState[comment.id] = comment
            })
            return newState

        case POST_COMMENT:
            newState[action.comment.id] = action.comment
            return newState

        case UPDATE_COMMENT:
            newState[action.comment.id] = action.comment
            return newState

        case DELETE_COMMENT:
            delete newState[action.commentId]
            return newState

        default:
            return state;
    }
}

export default commentsReducer;
