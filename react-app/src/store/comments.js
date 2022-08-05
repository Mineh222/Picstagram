const GET_ALL_POST_COMMENTS = 'comment/getALLPostComments';
const POST_COMMENT = 'comment/postComment';

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

        default:
            return state;
    }
}

export default commentsReducer;