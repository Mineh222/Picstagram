// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const FOLLOW = 'session/follow';
const UNFOLLOW = 'session/unfollow';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const removeUser = () => ({
  type: REMOVE_USER,
})

export const actionFollowUser = (user) => {
  return {
      type: FOLLOW,
      user
  }
}

export const actionUnfollowUser = (user) => {
  return {
      type: UNFOLLOW,
      user
  }
}

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (email, full_name, username, password, confirmPassword) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      full_name,
      username,
      password,
      confirmPassword
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const thunkUploadProfilePic = (userId, formData) => async (dispatch) => {
  const response = await fetch(`/api/users/profile/${userId}/new-profile-pic`, {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return data
  }
}

export const thunkUpdateUserProfile = (id, full_name, username, bio) => async (dispatch) => {
  const response = await fetch(`/api/users/profile/${id}/edit`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id, full_name, username, bio})
  })

  if (response.ok) {
    const updatedProfile = await response.json();
    dispatch(setUser(updatedProfile));
    return updatedProfile;
  }
}

export const thunkFollow = (username) => async (dispatch) => {
  const response = await fetch(`/api/users/${username}/follow`, {
    method: "PUT",
    headers: {'Content-Type': 'application/json'}
  })

  if (response.ok) {
    const follow_user = await response.json();
    dispatch(actionFollowUser(follow_user));
    return follow_user;
  }
}

export const thunkUnfollow = (username) => async (dispatch) => {
  const response = await fetch(`/api/users/${username}/unfollow`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'}
  })

  if (response.ok) {
    const unfollow_user = await response.json();
    dispatch(actionUnfollowUser(unfollow_user));
    return unfollow_user;
  }
}

export default function reducer(state = initialState, action) {
  let newState = {...state}
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case FOLLOW:
      newState.user.following.push(action.user)
      return newState;
    case UNFOLLOW:
      const spliceIndex = newState.user.following.findIndex(user => user.id === action.user.id)
      newState.user.following.splice(spliceIndex, 1)
      return newState;
    default:
      return state;
  }
}
