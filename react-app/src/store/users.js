const GET_SINGLE_USER = 'user/getSingleUser'
const GET_ALL_USERS = 'users/getAllUsers'


export const actionGetUser = (user) => {
  return {
    type: GET_SINGLE_USER,
    user
  }
}

export const actionGetAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

export const thunkGetUser = (username) => async (dispatch) => {
  const response = await fetch(`/api/users/profile/${username}`)

  if(response.ok){
    const user = await response.json()
    dispatch(actionGetUser(user))
    return user;
  }
}

export const thunkGetAllUsers = () => async (dispatch) => {
  const response = await fetch(`/api/users/`);

  if (response.ok) {
    const users = await response.json();
    dispatch(actionGetAllUsers(users));
    return users;
  }
}

const initialState = {}

const userReducer = (state = initialState, action) => {
  let newState = {...state}
  switch(action.type) {
    case GET_SINGLE_USER:
      newState = {}
      newState[action.user.username] = action.user
      return newState

    case GET_ALL_USERS:
      newState = {}
      action.users.users.forEach(user => {
        newState[user.id] = user
      });
      return newState;

    default:
      return state
  }

}

export default userReducer;
