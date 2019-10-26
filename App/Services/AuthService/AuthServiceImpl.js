import {BaseServiceImpl} from '../BaseService';

class AuthService extends BaseServiceImpl {
  registerUser = user => {
    return this.api.post('/api/users/register', user);
  };

  logIn = user => {
    return this.api.post('/api/users/login', user);
  };
}

export default new AuthService();
