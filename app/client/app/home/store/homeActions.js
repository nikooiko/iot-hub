import api from '../../utils/api';
import { REQ_POPULATION_PER_CONTINENT } from './homeTypes';

export const reqPopulationPerContinent = () => {
  return (dispatch) => {
    return api.post('/AppUsers/populationPerContinent')
      .then(response => {
        const populationPerContinent = response.data.populationPerContinent;
        dispatch({ type: REQ_POPULATION_PER_CONTINENT, populationPerContinent });
      });
  }
};