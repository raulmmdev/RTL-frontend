import { combineReducers } from "redux";
import * as fromShows from "./APIReducer";
export default combineReducers({
  show: fromShows.reducer
});
