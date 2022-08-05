const GET_ALL_POST_COMMENTS = 'comment/getALLPostComments';

export const actionGetAllPostComments = (comments) => {
    return {
        type: GET_ALL_POST_COMMENTS,
        comments
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

        default:
            return state;
    }
}

export default commentsReducer;
