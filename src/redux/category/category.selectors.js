import { createSelector } from "reselect";

const category = (state) => state.category;

export const selectCategory = createSelector(
  [category],
  (category) => category
);
