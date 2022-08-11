const GET_USER_POSTS = 'post/getUserPosts';
const CREATE_POST = 'post/createPost';
const GET_EXPLORE_POSTS = 'post/getExplorePosts';
const UPDATE_POST = 'post/updatePost';
const GET_SINGLE_POST = 'post/getSinglePost';
const GET_ALL_POSTS = 'post/getAllPosts';
const DELETE_POST = 'post/deletePost';
const GET_DEMO_POSTS = 'post/getDemoPosts';
const GET_FEED_POSTS = 'post/getFeedPosts';
const CLEAR_POSTS = 'posts/clearPosts';

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

export const actionGetDemoPosts = (posts) => {
    return {
        type: GET_DEMO_POSTS,
        posts
    }
}

export const actionGetFeedPosts = (posts) => {
    return {
        type: GET_FEED_POSTS,
        posts
    }
}

export const actionCreatePost = (post) => {
    return {
        type: CREATE_POST,
        post
    }
}

export const actionUpdatePost = (post) => {
    return {
        type: UPDATE_POST,
        post
    }
}

export const actionGetSinglePost = (post) => {
    return {
        type: GET_SINGLE_POST,
        post
    }
}

export const actionGetAllPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}

export const actionDeletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

export const clearPosts = () => ({
    type: CLEAR_POSTS
  })

export const thunkGetUserPosts = (username) => async (dispatch) => {
    const responses = await fetch(`/api/posts/${username}`)

    if (responses.ok) {
        const user_posts = await responses.json();
        dispatch(actionGetUserPosts(user_posts));
        return user_posts;
    }
}

export const thunkGetExplorePosts = (userId) => async (dispatch) => {
    const responses = await fetch(`/api/posts/explore/${userId}`)

    if (responses.ok) {
        const explore_posts = await responses.json();
        dispatch(actionGetExplorePosts(explore_posts));
        return explore_posts;
    }
}

export const thunkGetDemoPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/demo-posts')

    if (response.ok) {
        const demoPosts = await response.json();
        dispatch(actionGetDemoPosts(demoPosts));
        return demoPosts;
    }
}

export const thunkGetFeedPosts = (userId) => async (dispatch) => {
    const response = await fetch(`/api/posts/feed/${userId}`);

    if (response.ok) {
        const feedPosts = await response.json();
        dispatch(actionGetFeedPosts(feedPosts));
        return feedPosts;
    }
}

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

export const thunkUpdatePost =  (postId, caption) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/edit`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({caption})
    })

    if (response.ok) {
        const updatedPost = await response.json();
        dispatch(actionUpdatePost(updatedPost));
        return updatedPost
    }
}

export const thunkGetSinglePost = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`);

    if (response.ok) {
        const singlePost = await response.json();
        dispatch(actionGetSinglePost(singlePost));
        return singlePost
    }
}

export const thunkGetAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/all');

    if (response.ok) {
        const allPosts = await response.json();
        dispatch(actionGetAllPosts(allPosts));
        return allPosts;
    }
}

export const thunkDeletePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/delete`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deletedPost = await response.json();
        dispatch(actionDeletePost(postId))
        return deletedPost;
    }
}

export const thunkUpdateLike = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
    })

    if (response.ok) {
        const liked_post = await response.json();
        dispatch(actionUpdatePost(liked_post));
        return liked_post;
    }
}

export const thunkUpdateUnlike = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/unlike`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
    })

    if (response.ok) {
        const unliked_post = await response.json();
        dispatch(actionUpdatePost(unliked_post));
        return unliked_post;
    }
}

const initialState = {};

const postsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_ALL_POSTS:
            newState = {};
            action.posts.posts.forEach(post => {
                newState[post.id] = post
            });
            return newState;

        case GET_USER_POSTS:
            newState = {};
            action.posts.posts.forEach(post => {
                newState[post.id] = post
            });
            return newState;

        case GET_EXPLORE_POSTS:
            newState = {};
            action.posts.posts.forEach(post => {
                newState[post.id] = post
            });
            return newState;

        case GET_DEMO_POSTS:
            newState = {};
            action.posts.posts.forEach(post => {
                newState[post.id] = post
            });
            return newState;

        case GET_FEED_POSTS:
            newState = {};
            action.posts.posts.forEach(post => {
                newState[post.id] = post
            });
            return newState;

        case CREATE_POST:
            newState[action.post.id] = action.post
            return newState

        case UPDATE_POST:
            newState[action.post.id] = action.post
            return newState

        case GET_SINGLE_POST:
            let singlePost = {}
            singlePost[action.post.id] = action.post
            return singlePost

        case DELETE_POST:
            delete newState[action.postId]
            return newState

        case CLEAR_POSTS:
            return {};

        default:
            return state;
    }
}


export default postsReducer;
