import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reducers";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const persistConfig = {
  key: "direccte",
  storage: storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(...middleware));
  let persistor = persistStore(store);
  return { store, persistor };
};
