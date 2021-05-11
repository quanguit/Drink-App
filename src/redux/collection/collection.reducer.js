import COLLECTION_DATA from "./collection.data";
//import getCategory from "../../api/category";
const INITIAL_STATE = COLLECTION_DATA;

const collectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default collectionReducer;
