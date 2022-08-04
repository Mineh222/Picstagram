const GET_USER_POSTS = 'post/getUserPosts';

export const actionGetUserPosts = (posts) => {
    return {
        type: GET_USER_POSTS,
        posts
    }
}

export const thunkGetUserPosts = (username) => async (dispatch) => {
    const responses = await fetch(`/api/posts/${username}`)

    if (responses.ok) {
        const user_posts = await responses.json();
        dispatch(actionGetUserPosts(user_posts));
        return user_posts;
    }
}

const initialState = {};

const postsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_USER_POSTS:
            newState = {};
            action.posts.posts.forEach(post => {
                newState[post.id] = post
            });
            return newState;

        default:
            return state;
    }
}


export default postsReducer;
