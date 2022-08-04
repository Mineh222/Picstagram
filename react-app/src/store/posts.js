const GET_USER_POSTS = 'post/getUserPosts';
const CREATE_POST = 'post/createPost';
const GET_EXPLORE_POSTS = 'post/getExplorePosts';

export const actionGetUserPosts = (posts) => {
    return {
        type: GET_USER_POSTS,
        posts
    }
}

export const actionGetExplorePosts = (posts) => {
    return {
        type: GET_EXPLORE_POSTS,
        posts
    }
}

export const actionCreatePost = (post) => {
    return {
        type: CREATE_POST,
        post
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

// export const thunkGetExplorePosts = () => async (dispatch) => {
//     const response
// }

export const thunkCreatePost = (formData) => async (dispatch) => {
    const response = await fetch('/api/posts/new', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        const post = await response.json();
        dispatch(actionCreatePost(post))
        return post
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

        case CREATE_POST:
            newState[action.post.id] = action.post
            return newState

        default:
            return state;
    }
}


export default postsReducer;
