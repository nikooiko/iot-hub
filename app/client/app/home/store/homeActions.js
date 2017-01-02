import api from '../../utils/api';
import { REQUEST_USERS_PER_CONTINENT } from './homeTypes';

export const requestUsersPerContinent = () => {
  return (dispatch) => {
    return api.post('/AppUsers/perContinent')
      .then(response => {
        const users = response.data.users;
        dispatch({ type: REQUEST_USERS_PER_CONTINENT, users });
      });
  }
};