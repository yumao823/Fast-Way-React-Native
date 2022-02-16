import { storeAuth, removeAuth } from '../constants/auth'

const initialState = {
  authenticated: false,
  users: [],
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      storeAuth(JSON.stringify(action.auth))
      return { ...state, auth: action.auth, authenticated: true }
    }
    case "LOGOUT_SUCCESS": {
      removeAuth()
      return { ...state, auth: null, authenticated: false }
    }
    case "GETUSER_SUCCESS": {
      return { ...state, users: action.users }
    }
    default: return state
  }
}

export default userReducer