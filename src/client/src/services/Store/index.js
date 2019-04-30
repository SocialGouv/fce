import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reducers";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const persistConfig = {
  key: "direccte",
  storage: storageSession
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
