import { REQ_POPULATION_PER_CONTINENT } from './homeTypes';

const INITIAL_STATE = {
  populationPerContinent: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case REQ_POPULATION_PER_CONTINENT:
      return {
        ...state,
        populationPerContinent: action.populationPerContinent
      };
    default:
      return state;
  }
}
