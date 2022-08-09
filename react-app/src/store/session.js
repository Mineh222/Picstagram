// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPLOAD_PROFILE_PIC = 'session/UploadProfilePic';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const removeUser = () => ({
  type: REMOVE_USER,
})

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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    default:
      return state;
  }
}
