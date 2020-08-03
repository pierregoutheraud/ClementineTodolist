import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../modules/index";

let store = null;

export function getStore() {
  return store;
}

export default preloadedState => {
  let middlewares = [thunk];

  store = createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(...middlewares))
  );

  return store;
};
