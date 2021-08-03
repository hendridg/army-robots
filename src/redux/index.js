import { applyMiddleware, createStore } from "redux"
import countReducer from "./dataRobots"
import thunk from "redux-thunk"

const store = createStore(countReducer, applyMiddleware(thunk))

store.subscribe(() => {
  console.log(store.getState())
})

export default store
