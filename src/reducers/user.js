const INITIAL_STATE = {
  email: '',
};
export const USER_LOGIN = 'USER_LOGIN';

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN: {
    return { email: action.userInfo.email };
  }
  default:
    return state;
  }
};

export default user;
