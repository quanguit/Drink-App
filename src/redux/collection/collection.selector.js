import { createSelector } from "reselect";

const collection = (state) => state.collection;

export const selectCollection = createSelector(
  [collection],
  (collection) => collection
);
