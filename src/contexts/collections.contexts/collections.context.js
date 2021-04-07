import { createContext } from "react";

import COLLECTION_DATA from "./collection.data";

const CollectionsContext = createContext(COLLECTION_DATA);

export default CollectionsContext;
