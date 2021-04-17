import CATEGORY_DATA from "./category.data";

const INITIAL_STATE = CATEGORY_DATA;

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default categoryReducer;
