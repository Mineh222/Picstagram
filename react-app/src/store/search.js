const SEARCH_ALL_USERS = 'search/searchAllUsers';

export const actionSearchAllUsers = (users) => {
    return {
      type: SEARCH_ALL_USERS,
      users
    }
  }


export const thunkSearchAllUsers = () => async (dispatch) => {
  const response = await fetch(`/api/users/`)
  if(response.ok){
    const data = await response.json()
    dispatch(actionSearchAllUsers(data.users))
    return data.users;
  }
}

const initialState = {}

const searchReducer = (state=initialState, action) => {
    let newState = {...state}
    switch(action.type) {
        case SEARCH_ALL_USERS:
            newState = {};
            action.users.forEach(user => {
                newState[user.id] = user
            })
            return newState;

        default:
            return state;
    }
}

export default searchReducer;
