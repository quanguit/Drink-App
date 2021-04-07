import { createContext } from "react";

import CATEGORY_DATA from "./category.data";

const CategoriesContext = createContext(CATEGORY_DATA);

export default CategoriesContext;
