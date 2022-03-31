// Coloque aqui suas actions
import { USER_LOGIN } from '../reducers/user';

const setEmail = (userInfo) => ({
  type: USER_LOGIN, userInfo,
});

export default setEmail;
