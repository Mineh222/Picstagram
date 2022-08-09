const GET_USER = 'user/GET_USER'


export const actionGetUser = (user) => {
  return {
    type: GET_USER,
    user
  }
}

export const thunkGetUser = (username) => async(dispatch) => {
  const response = await fetch(`/api/users/profile/${username}`)

  if(response.ok){
    const user = await response.json()
    dispatch(actionGetUser(user))
    return user;
  }
}

const initialState = {}

const userReducer = (state = initialState, action) => {
  let newState = {...state}
  switch(action.type) {
    case GET_USER:
      newState = {}
      newState[action.user.username] = action.user
      return newState

    default:
      return state
  }

}

export default userReducer;
